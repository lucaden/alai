import { Twilio } from "twilio";
import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongodb";
import User from "../../../models/User";

export async function POST(req) {
  const defaultPhone = [process.env.PHONE_NUMBER_1, process.env.PHONE_NUMBER_2];
  try {
    const { phoneNumber } = await req.json();
    await connectToDatabase();
    const existingUser = await User.findOne({ phone: phoneNumber });

    if (!existingUser) {
      const user = new User({ phone: phoneNumber });
      await user.save();
    } else {
      console.log("User with this phone number already exists.");
    }

    try {
      if (!defaultPhone.includes(phoneNumber)) {
        const client = new Twilio(
          process.env.TWILIO_ACCOUNT_SID,
          process.env.TWILIO_AUTH_TOKEN
        );
        const verification = await client.verify.v2
          .services(process.env.TWILIO_SERVICE_ID)
          .verifications.create({ to: phoneNumber, channel: "sms" });

        console.log("Verification sent:", verification.sid);
      }
      return NextResponse.json({
        success: true,
        message: "OTP sent successfully.",
      });
    } catch (twilioError) {
      console.error("Error sending verification:", twilioError);
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
