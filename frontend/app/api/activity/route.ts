import { NextResponse } from "next/server";
import { getActivityFromBackend, createActivityInBackend } from "@/lib/backendApi";

export async function GET() {
  try {
    const logs = await getActivityFromBackend();
    return NextResponse.json(logs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error instanceof Error ? error.message : "Unable to fetch activity logs." } },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    
    if (!payload.action || !payload.info) {
      return NextResponse.json(
        { error: { message: "action and info are required" } },
        { status: 400 }
      );
    }
    
    const activity = await createActivityInBackend({
      action: payload.action,
      info: payload.info
    });
    
    return NextResponse.json({ data: activity }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error instanceof Error ? error.message : "Unable to create activity log." } },
      { status: 500 }
    );
  }
}
