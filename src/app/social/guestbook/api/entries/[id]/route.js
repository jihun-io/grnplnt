import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { comparePassword } from "@/lib/password";

export const runtime = "edge";

// GET /social/guestbook/api/entries/[id] - 개별 방명록 조회
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const { data, error } = await supabase
      .from("guestbook")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      return NextResponse.json(
        { error: "Guestbook entry not found" },
        { status: 404 }
      );
    }

    const { password, ...entry } = data; // 비밀번호 제외

    return NextResponse.json(entry);
  } catch (error) {
    console.error("Error fetching guestbook entry:", error);
    return NextResponse.json(
      { error: "Failed to fetch guestbook entry" },
      { status: 500 }
    );
  }
}

// PUT /social/guestbook/api/entries/[id] - 방명록 수정
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { username, content, session_id } = body;

    // 세션 검증 로직 (필요시)
    // TODO: 세션 검증 구현

    const { data, error } = await supabase
      .from("guestbook")
      .update({
        username,
        content,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select();

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: "Guestbook entry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      result: "success",
    });
  } catch (error) {
    console.error("Error updating guestbook entry:", error);
    return NextResponse.json(
      { error: "Failed to update guestbook entry" },
      { status: 500 }
    );
  }
}

// DELETE /social/guestbook/api/entries/[id] - 방명록 삭제
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { password } = body;

    // 비밀번호 검증
    const { data: entry, error: fetchError } = await supabase
      .from("guestbook")
      .select("password")
      .eq("id", id)
      .single();

    if (fetchError || !entry) {
      return NextResponse.json(
        { error: "Guestbook entry not found" },
        { status: 404 }
      );
    }

    // 비밀번호 검증
    const isPasswordValid = await comparePassword(password, entry.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const { error } = await supabase.from("guestbook").delete().eq("id", id);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      result: "success",
    });
  } catch (error) {
    console.error("Error deleting guestbook entry:", error);
    return NextResponse.json(
      { error: "Failed to delete guestbook entry" },
      { status: 500 }
    );
  }
}
