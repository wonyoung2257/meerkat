import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getClient } from "./app/utils/supabase/server";
import { updateSession } from "./app/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
  const supabase = getClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log("🚀 ~ middleware ~ session:", session);

  if (!session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
