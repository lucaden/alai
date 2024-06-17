import connectToDatabase from '../../../lib/mongodb';
import InsuranceDocument from '../../../models/InsuranceDocument';
import User from '../../../models/User';
import authenticateToken from '../../../middlewares/auth';
import { NextResponse } from 'next/server';
export async function GET(req, res) {
  return authenticateToken(async (req, res) => {
    try {
      await connectToDatabase();
      const existingUser = await User.findOne({ _id: req.user.userId });
      if (!existingUser) {
        return NextResponse.json({ success: false, message: "User not found" });
      }
      const userDocuments = await InsuranceDocument.find({ user: existingUser._id });
      const documents = userDocuments.map(doc => ({
        fileId:doc._id,
        name: doc.name,
        s3Path: doc.s3Path,
        mimetype: doc.mimetype,
      }));

      return NextResponse.json({ success: true, documents });
    } catch (error) {
      return NextResponse.json({ success: false, message: error.message });
    }
  })(req, res);
}