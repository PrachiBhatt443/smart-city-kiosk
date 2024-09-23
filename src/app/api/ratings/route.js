import connect from "@/utils/db";
import Rating from "@/models/Rating";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { userId, crimeReduction, roadCondition, complaintResolution, noiseReduction, overcrowding, traffic, airQuality } = await request.json();
  
  await connect();

  const rating = new Rating({
    userId,
    crimeReduction,
    roadCondition,
    complaintResolution,
    noiseReduction,
    overcrowding,
    traffic,
    airQuality
  });

  try {
    await rating.save();
    return new NextResponse("Rating has been created", { status: 201 });
  } catch (err) {
    return new NextResponse(err.message, { status: 500 });
  }
};

export const GET = async () => {
  await connect();

  try {
    const ratings = await Rating.find();
    return NextResponse.json(ratings, { status: 200 });
  } catch (err) {
    return new NextResponse(err.message, { status: 500 });
  }
};
