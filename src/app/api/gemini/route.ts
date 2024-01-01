import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from "@google/generative-ai";
const axios = require("axios");

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const imageUrl = searchParams.get('img');
  const type = searchParams.get('type');
  const API_KEY = 'AIzaSyCdf0QI11bfqok5uX1UXuTvonUkeOF8ooM'
  
// Converts file information (local path or URL) to a GoogleGenerativeAI.Part object.
async function fileToGenerativePart(fileInfo) {
  if (fileInfo.type === "local") {
    return {
      inlineData: {
        data: Buffer.from(fs.readFileSync(fileInfo.path)).toString("base64"),
        mimeType: fileInfo.mimeType,
      },
    };
  } else if (fileInfo.type === "url") {
    const response = await axios.get(fileInfo.url, { responseType: "arraybuffer" });
    const data = Buffer.from(response.data, "binary").toString("base64");

    return {
      inlineData: {
        data,
        mimeType: fileInfo.mimeType,
      },
    };
  } else {
    throw new Error("Invalid file information type.");
  }
}
  try {
  if (imageUrl) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const prompt = query || 'Explain This image';

  const imageFiles = [
    { type: type || "url", url: imageUrl, mimeType: "image/png" },
  ];

  const imageParts = await Promise.all(imageFiles.map(fileToGenerativePart));

  const result = await model.generateContent([prompt, ...imageParts]);
  const res = await result.response;
  const response = res.text();
  return NextResponse.json({ response }, { status: 500 })
  } else {
  const genAI = new GoogleGenerativeAI(API_KEY);

  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = query;

  const result = await model.generateContent(prompt);
  const res = await result.response;
  const response = res.text();
  return NextResponse.json({ response }, { status: 500 })
  }
  
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
