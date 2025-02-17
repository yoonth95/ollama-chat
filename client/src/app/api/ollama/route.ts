import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000/api/v1";

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_URL}/ollama/getModels`, { cache: "no-store" });

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: "An unknown error occurred" }, { status: 500 });
    }
  }
}
