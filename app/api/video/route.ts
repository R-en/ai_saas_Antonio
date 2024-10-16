import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";


const replicate = new Replicate({
    auth:process.env.REPLICATE_API_TOKEN,
});


export async function POST(req:Request) {
    try{
        const {userId} = auth();
        const body = await req.json();
        const {prompt} = body;

        if (!process.env.REPLICATE_API_TOKEN) {
            throw new Error(
              'The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it.'
            );
          }

        if(!userId){
            return new NextResponse("Unauthorized", {status:401});
        }

        if(!prompt){
            return new NextResponse("Prompt is required", {status:400});
        }
        
        const input = {
          prompt: prompt,
          go_fast: true,
          megapixels: "1",
          num_outputs: 1,
          aspect_ratio: "1:1",
          output_format: "webp",
          output_quality: 80,
          num_inference_steps: 4
        };
        
        const response = await replicate.run("black-forest-labs/flux-schnell", { input });

        return NextResponse.json(response);
    }catch(error){
        console.log("[Video_ERROR",error);
        return new NextResponse("Internal error",{status:500});
    }
}