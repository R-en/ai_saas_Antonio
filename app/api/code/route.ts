import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
//import { Configuration, OpenAIApi} from "openai"
//v3
/*const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
*/

//v4
import OpenAI from 'openai';
import { ChatCompletion, ChatCompletionMessageParam } from "openai/resources/index.mjs";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const instructionMessage: ChatCompletionMessageParam ={
    role: "system",
    content: "You are a code generator. You can answer only in markdown code snippets. Use code comments for explanation."
  }

export async function POST(req:Request) {
    try{
        const {userId} = auth();
        const body = await req.json();
        const {messages} = body;

        if(!userId){
            return new NextResponse("Unauthorized", {status:401});
        }

        if(!openai.apiKey){
            return new NextResponse("OpenAI API Key not Configured", {status:500});
        }

        if(!messages){
            return new NextResponse("Messages are required", {status:400});
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages:[instructionMessage, ...messages]
        });
        return NextResponse.json(response.choices[0].message);

    }catch(error){
        console.log("[CODE_ERROR",error);
        return new NextResponse("Internal error",{status:500});
    }
}