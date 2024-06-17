import AWS from "aws-sdk";
import connectToDatabase from "../../../lib/mongodb";
import InsuranceDocument from "../../../models/InsuranceDocument";
import User from "../../../models/User";
import authenticateToken from "../../../middlewares/auth";
import { NextResponse } from "next/server";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
let s3 = new AWS.S3({ apiVersion: "2006-03-01" });

async function getUser(userId) {
  await connectToDatabase();
  return User.findOne({ _id: userId });
}

async function getDocument(fileId, userId) {
  return InsuranceDocument.findOne({ _id: fileId, user: userId });
}

function deleteFileFromS3(s3Path) {
  const s3DeleteParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: s3Path.split("/").pop(),
  };

  return new Promise((resolve, reject) => {
    s3.deleteObject(s3DeleteParams, (err, data) => {
      if (err) {
        console.error(err);
        reject("Failed to delete file from AWS S3");
      } else {
        resolve(data);
      }
    });
  });
}

async function deleteDocument(fileId) {
  return InsuranceDocument.deleteOne({ _id: fileId });
}

async function handleDeleteRequest(req) {
  const { fileId } = await req.json();
  const existingUser = await getUser(req.user.userId);

  if (!existingUser) {
    return { success: false, message: "User not found" };
  }

  const document = await getDocument(fileId, existingUser._id);

  if (!document) {
    return { success: false, message: "File not found" };
  }

  await deleteFileFromS3(document.s3Path);
  await deleteDocument(fileId);

  return { success: true, message: "Deleted Successfully" };
}

export async function POST(req, res) {
  return authenticateToken(async (req, res) => {
    try {
      const result = await handleDeleteRequest(req);
      return NextResponse.json(result);
    } catch (error) {
      return NextResponse.json({ success: false, message: error.message });
    }
  })(req, res);
}
