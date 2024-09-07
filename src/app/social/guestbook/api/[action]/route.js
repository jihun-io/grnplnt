import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  return handleRequest(request, "POST", params);
}

export async function GET(request, { params }) {
  return handleRequest(request, "GET", params);
}

async function handleRequest(request, defaultMethod, params) {
  const API_URL = process.env.API_URL;
  const API_KEY = process.env.API_KEY;
  const { action } = params;

  let method = defaultMethod;
  let body;

  try {
    body = await request.json();
    method = "POST";
  } catch {
    method = "GET";
  }

  const headers = {
    "Content-Type": "application/json",
    "X-API-Key": API_KEY,
  };

  const fetchOptions = {
    method,
    headers,
  };

  if (method === "POST" && body) {
    fetchOptions.body = JSON.stringify(body);
  }

  // URL에 action 파라미터 추가
  const url = `${API_URL}/guestbook/${action}`;

  try {
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in API request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
