import axios from "axios";
import connectToDatabase from "../../../lib/mongodb";
import InsuranceDocument from "../../../models/InsuranceDocument";
import User from "../../../models/User";
import authenticateToken from "../../../middlewares/auth";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  return authenticateToken(async (req, res) => {
    try {
      await connectToDatabase();
      const { documentIds, question } = await req.json();
      const existingUser = await User.findOne({ _id: req.user.userId });
      if (!existingUser) {
        return NextResponse.json({ success: false, message: "User not found" });
      }
      let prompt = "";
      if (!documentIds) {
        prompt = `You have to act like you're an AI BOT created by Alai who is a smart insurance policy assistant of Switzerland,,
        Users can pose questions concerning the insurance policy, relying on your knowledge for clarity and insight.

        You are encouraged to offer detailed and precise information to help users with their inquiries effectively. 
        Your ability to understand and explain the nuances of the insurance policy makes you an invaluable resource for users seeking guidance.
        
        Please abide by the following guidelines:

        Do not provide any answer to questions outside of Swiss insurance policies. Simply say, 'I am an Insurance AI BOT created by Alai and can only answer questions related to insurance.`;
      } else {
        const documents = await InsuranceDocument.findOne({
          _id: { $in: documentIds },
          user: existingUser._id,
        });
        if (documents.documentText === 0) {
          return NextResponse.json({
            success: false,
            message: "Documents Don't have content.",
          });
        }
        const documentContents = documents.documentText;
        prompt = `
        Welcome to the Smart Insurance Policy Assistant! Your role is to provide a comprehensive analysis of crucial insurance policy documents.

        Insurance Policy Documents: ${documentContents}

        As a specialized insurance policy assistant, you play a vital role in decoding and explaining the details contained within these documents. Users will direct questions to you based on the insurance policy documents provided.

        IMPORTANT: 
        
        Ensure that the responses offered are specific to the Swiss Market Place, excluding other countries.
        If a question is framed within the context of the document but references another country, please offer an apology. 
        
        IMPORTANT: 
        
        In your apologies, clarify that you are an AI BOT created by alai. Do not identify as an AI BOT developed by OpenAI.

        Please abide by the following guidelines:

        Address queries with answers that are directly drawn from the specified insurance policy document.
        For questions that cannot be answered with the document's content, please offer a general insurance response.
        Aim to deliver insightful and accurate information to aid users in their questions.
        Do not provide any answer to questions outside of Swiss insurance policies. Simply say, 'I am an Insurance AI BOT created by Alai and can only answer questions related to insurance. 
      `;
      }
      const openAIAnswer = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4-0125-preview",
          messages: [
            { role: "assistant", content: prompt },
            { role: "user", content: question },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPEN_AI_KEY || ""}`,
          },
        }
      );

      const result = openAIAnswer.data.choices[0].message.content;

      return NextResponse.json({ success: true, message: result });
    } catch (error) {
      return NextResponse.json({ success: false, message: error.message });
    }
  })(req, res);
}
