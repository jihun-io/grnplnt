import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { hashPassword } from "@/lib/password";
import { verifyTurnstile, getClientIP } from "@/lib/turnstile";

export const runtime = "edge";

// GET /social/guestbook/api/entries - 방명록 목록 조회
export async function GET(request) {
  try {
    const { data, error } = await supabase
      .from("guestbook")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    const entries = data.map((entry) => {
      const { password, ...rest } = entry; // 비밀번호 제외
      return rest;
    });

    return NextResponse.json(entries);
  } catch (error) {
    console.error("Error fetching guestbook entries:", error);
    return NextResponse.json(
      { error: "Failed to fetch guestbook entries" },
      { status: 500 }
    );
  }
}

// POST /social/guestbook/api/entries - 방명록 작성
export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password, content, turnstile } = body;

    // Turnstile CAPTCHA 검증
    if (turnstile) {
      const clientIP = getClientIP(request);
      const verification = await verifyTurnstile(turnstile, clientIP);

      if (!verification.success) {
        return NextResponse.json(
          {
            error: "CAPTCHA verification failed",
            errorCodes: verification.errorCodes,
          },
          { status: 400 }
        );
      }
    } else {
      // Turnstile 토큰이 없는 경우
      return NextResponse.json(
        { error: "CAPTCHA verification required" },
        { status: 400 }
      );
    }

    // 비밀번호 해싱
    const hashedPassword = await hashPassword(password);

    const { data, error } = await supabase
      .from("guestbook")
      .insert([
        {
          username,
          password: hashedPassword,
          content,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      throw error;
    }

    const { password: _, ...entry } = data[0]; // 비밀번호 제외

    return NextResponse.json(
      {
        result: "success",
        entry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating guestbook entry:", error);
    return NextResponse.json(
      { error: "Failed to create guestbook entry" },
      { status: 500 }
    );
  }
}
