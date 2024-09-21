import connect from "@/utils/db";
import { NextResponse } from "next/server";
import KioskComplaint from "@/models/KioskComplaint";
// POST request to create a new complaint
export const POST = async (request) => {
  const { description, location } = await request.json();

  await connect();

  const kioskComplaint = new KioskComplaint({
    description,
    location
  });

  try {
    await kioskComplaint.save();
    return new NextResponse("Complaint has been created", { status: 201 });
  } catch (err) {
    return new NextResponse(err.message, { status: 500 });
  }
};

// GET request to fetch all complaints
export const GET = async () => {
  await connect();

  try {
    const kioskComplaints = await KioskComplaint.find();
    return NextResponse.json(kioskComplaints, { status: 200 });
  } catch (err) {
    return new NextResponse(err.message, { status: 500 });
  }
};
