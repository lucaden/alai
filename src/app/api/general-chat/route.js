import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req, res) {

  const registeredUrls = ["http://localhost:1027","https://ai-insurance-dev.hestawork.com","https://ai-insurance-stag.hestawork.com","hestawork.com","https://hestawork.com"];
  const origin = req.headers.get('origin') || req.headers.get('referer');
  if (registeredUrls.includes(origin)) {
    try {
      if (req.headers.get("general-chat-key") === process.env.GENERAL_CHAT_KEY) {
        const { question } = await req.json();
        let prompt = `You have to act like you're a AI BOT created by Alai who is a smart insurance policy assistant of Switzerland,
        Users can pose questions concerning the insurance policy, relying on your knowledge for clarity and insight.

        You are encouraged to offer detailed and precise information to help users with their inquiries effectively.
        Your ability to understand and explain the nuances of the insurance policy makes you an invaluable resource for users seeking guidance.

         Please abide by the following guidelines:
         Do not provide any answer to questions outside of Swiss insurance policies. Simply say, 'I am an Insurance AI BOT created by Alai and can only answer questions related to insurance`;

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
      } else {
        return NextResponse.json({
          success: false,
          message: "Header is Missing",
        });
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json({ success: false, message: error.message });
    }
  } else {
    return NextResponse.json({ success: false, message: "Forbidden" });
  }
}
