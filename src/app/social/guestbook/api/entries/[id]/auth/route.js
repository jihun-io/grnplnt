import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { comparePassword } from "@/lib/password";

export const runtime = "edge";

// POST /social/guestbook/api/entries/[id]/auth - 수정/삭제 권한 확인
export async function POST(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { password } = body;

    // 방명록 엔트리 조회
    const { data: entry, error } = await supabase
      .from('guestbook')
      .select('password')
      .eq('id', id)
      .single();

    if (error || !entry) {
      return NextResponse.json(
        { error: "Guestbook entry not found" },
        { status: 404 }
      );
    }

    // 비밀번호 검증
    const isPasswordValid = await comparePassword(password, entry.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    // 세션 ID 생성 (실제로는 JWT 토큰이나 더 안전한 방법 사용)
    const sessionId = generateSessionId();

    return NextResponse.json({
      message: "Authentication successful",
      session_id: sessionId
    });
  } catch (error) {
    console.error("Error authenticating guestbook entry:", error);
    return NextResponse.json(
      { error: "Failed to authenticate" },
      { status: 500 }
    );
  }
}

// 간단한 세션 ID 생성 함수
function generateSessionId() {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}