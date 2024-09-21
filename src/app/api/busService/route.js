import connect from '@/utils/db';
import BusService from '@/models/BusService';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { action, ...data } = await request.json();
  await connect();

  try {
    switch (action) {
      case 'addService':
        return await addBusService(data);
      case 'bookTicket':
        return await bookTicket(data);
      default:
        return new NextResponse('Invalid action', { status: 400 });
    }
  } catch (err) {
    return new NextResponse(err.message, { status: 500 });
  }
}

async function addBusService(data) {
  const { route, schedule, fare } = data;
  
  if (!route || !schedule || !fare) {
    return new NextResponse('Missing required fields', { status: 400 });
  }

  const newService = new BusService({
    route,
    schedule,
    fare,
    bookings: []
  });

  await newService.save();
  return new NextResponse('Bus service added successfully', { status: 201 });
}

async function bookTicket(data) {
  const { serviceId, passengerName, numberOfTickets } = data;

  const busService = await BusService.findById(serviceId);

  if (!busService) {
    return new NextResponse('Bus service not found', { status: 404 });
  }

  busService.bookings.push({
    passengerName,
    numberOfTickets,
  });

  await busService.save();
  return new NextResponse('Ticket booked successfully', { status: 201 });
}

export async function GET() {
  await connect();

  try {
    const busServices = await BusService.find();
    return NextResponse.json(busServices, { status: 200 });
  } catch (err) {
    return new NextResponse(err.message, { status: 500 });
  }
}