import AWS from "aws-sdk";
import connectToDatabase from "../../../lib/mongodb";
import InsuranceDocument from "../../../models/InsuranceDocument";
import User from "../../../models/User";
import authenticateToken from "../../../middlewares/auth";
import { NextResponse } from "next/server";
import mammoth from "mammoth";
const PdfParse = require("pdf-parse");
// AWS Configuration
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

export async function POST(req, res) {
  return authenticateToken(async (req, res) => {
    try {
      await connectToDatabase();

      const data = await req.formData();
      const existingUser = await User.findOne({ _id: req.user.userId });

      if (!existingUser) {
        return NextResponse.json({ success: false, message: "User not found" });
      }

      const originalFile = data.get("file");
      if (!originalFile) {
        return NextResponse.json({
          success: false,
          message: "File is required",
        });
      }

      const originalFileBuffer = Buffer.from(await originalFile.arrayBuffer());

      const originalFileParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${Date.now()}-${originalFile.name}`,
        Body: originalFileBuffer,
        ACL: "public-read",
      };

      const s3UploadPromise = new Promise((resolve, reject) => {
        s3.upload(originalFileParams, (err, data) => {
          if (err) {
            console.error(err);
            reject("Failed to upload file to AWS S3");
          } else {
            resolve(data.Location);
          }
        });
      });

      const s3Location = await s3UploadPromise;
      let fileData;
      let documents;

      console.log(originalFile.type);

      switch (originalFile.type) {
        case "application/pdf":
          fileData = await PdfParse(originalFileBuffer);
          documents = fileData.text;
          break;

        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          fileData = await mammoth.extractRawText({
            buffer: originalFileBuffer,
          });
          documents = fileData.value;
          break;

        default:
          return NextResponse.json({
            success: false,
            message: "Unsupported file type",
          });
      }

      const insuranceDocument = new InsuranceDocument({
        user: existingUser._id,
        name: originalFile.name,
        s3Path: s3Location,
        mimetype: originalFile.type,
        documentText: documents,
      });

      await insuranceDocument.save();
      return NextResponse.json({
        success: true,
        message: "Uploaded Successfully",
        data: insuranceDocument,
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: error.message });
    }
  })(req, res);
}
