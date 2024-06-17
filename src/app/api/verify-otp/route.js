import { Twilio } from "twilio";
import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongodb";
import User from "../../../models/User";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const defaultPhone = [process.env.PHONE_NUMBER_1, process.env.PHONE_NUMBER_2];
  try {
    const { phoneNumber, otp } = await req.json();
    await connectToDatabase();

    const existingUser = await User.findOne({ phone: phoneNumber });
    if (!existingUser) {
      return NextResponse.json({ success: false, message: "User not found." });
    }

    try {
      let verificationCheck = {};
     if(!defaultPhone.includes(phoneNumber)){
      const client = new Twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );
       verificationCheck = await client.verify.v2
        .services(process.env.TWILIO_SERVICE_ID)
        .verificationChecks.create({ to: phoneNumber, code: otp });
     }

     if (verificationCheck?.status === "approved" || otp === process.env.VERIFIED_OTP) {
      const token = jwt.sign(
        { userId: existingUser._id },
        process.env.JWT_SECRET
      );

      return NextResponse.json({
        success: true,
        message: "OTP verified successfully.",
        token: token,
        data: existingUser,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to Verify",
      });
    }
    } catch (twilioError) {
      console.error("Error during OTP verification:", twilioError);
      return NextResponse.json({
        success: false,
        message: twilioError.message,
      });
    }
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to process the request.",
    });
  }
}
