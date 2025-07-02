import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import URL from "@/modals/Url"; // `IUrl` is not used so removed

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const data = await req.json();
    const shortUrl = data.shortUrl || nanoid(6);

    const existsBySlug = await URL.findOne({ shortUrl });
    if (existsBySlug) {
      return NextResponse.json({
        status: 400,
        message: "Custom Short Link already exists",
      });
    }

    const existsByUrl = await URL.findOne({ url: data.url });
    if (existsByUrl) {
      return NextResponse.json({
        status: 400,
        message: "URL already shortened",
      });
    }

    const urlData = new URL({
      url: data.url,
      shortUrl,
    });

    await urlData.save();

    return NextResponse.json({
      status: 201,
      message: "Short URL created successfully",
      data: urlData,
    });
  } catch (error) {
    console.error("POST /api/shorten", error);
    return NextResponse.json({
      status: 500,
      message: "Something bad happened",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
