import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import User from '../../../models/User';
import authenticateToken from '../../../middlewares/auth';

export async function POST(req, res) {
return authenticateToken(async (req, res) => {
  try {
    const { firstName, lastName } = await req.json();
    const userId = req.user.userId;
    if (!firstName || !lastName) {
      return NextResponse.json({ success: false, message: 'Missing required fields' });
    }
    await connectToDatabase();
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { firstName, lastName },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return NextResponse.json({ success: false, message: 'User not found' });
    }
    return NextResponse.json({ success: true, message: 'User details updated',data:updatedUser });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Failed to update user' });
  }
})(req, res);
}
