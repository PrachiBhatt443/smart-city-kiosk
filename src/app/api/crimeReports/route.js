// app/api/crimeReports/route.js
import connect from "@/utils/db";
import { NextResponse } from "next/server";
import CrimeReport from "@/models/CrimeReport";

// POST request to create a new crime report
export const POST = async (request) => {
  const { description, crimeType, location, language } = await request.json();

  await connect();

  const newCrimeReport = new CrimeReport({
    description,
    crimeType,
    location,
    language,
  });
  console.log(newCrimeReport)
  try {
    await newCrimeReport.save();
    return new NextResponse("Crime report has been created", { status: 201 });
  } catch (err) {
    return new NextResponse(err.message, { status: 500 });
  }
};

// GET request to fetch all crime reports
export const GET = async () => {
  await connect();

  try {
    const crimeReports = await CrimeReport.find();
    return NextResponse.json(crimeReports, { status: 200 });
  } catch (err) {
    return new NextResponse(err.message, { status: 500 });
  }
};
