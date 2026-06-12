import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req: NextRequest) {
  // Validate body
  let body: { name?: unknown; attending?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const attending = typeof body.attending === "boolean" ? body.attending : true;

  if (name.length < 2) {
    return NextResponse.json({ error: "Name must be at least 2 characters." }, { status: 400 });
  }

  // Validate env vars
  const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!rawKey || !sheetId) {
    console.error("Missing env vars: GOOGLE_SERVICE_ACCOUNT_KEY or GOOGLE_SHEET_ID");
    return NextResponse.json(
      { error: "Server configuration error. Please try again later." },
      { status: 500 }
    );
  }

  // Parse service account key
  let serviceAccountKey: Record<string, unknown>;
  try {
    serviceAccountKey = JSON.parse(
      Buffer.from(rawKey, "base64").toString("utf-8")
    );
  } catch {
    return NextResponse.json({ error: "Invalid service account key." }, { status: 500 });
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccountKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const now = new Date();
    const timestamp = now.toLocaleString("en-US", {
      timeZone: "America/Chicago",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    const rsvpAt = now.toISOString();

    const values = [[timestamp, name, attending ? "Yes" : "No", rsvpAt]];

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "A:D",
      valueInputOption: "RAW",
      requestBody: { values },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Google Sheets append error:", err);
    return NextResponse.json(
      { error: "Failed to save your RSVP. Please try again." },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
