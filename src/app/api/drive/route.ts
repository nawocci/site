import { graphClient } from "@/utils/graphClient";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// Cache duration in seconds (5 minutes)
const CACHE_DURATION = 300;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get("path") || "";
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    let endpoint = "";
    if (path) {
      endpoint = `/users/${userId}/drive/items/${path}/children`;
    } else {
      endpoint = `/users/${userId}/drive/root/children`;
    }

    const response = await graphClient.api(endpoint)
      .header('Prefer', 'query-response-timeout=60')
      .select('id,name,folder,file,webUrl,parentReference')
      .orderby('name asc')
      .get();

    // Set cache headers
    const headers = {
      'Cache-Control': `s-maxage=${CACHE_DURATION}, stale-while-revalidate`,
      'ETag': `"${path}-${Date.now()}"`,
    };

    return NextResponse.json(response, { headers });
  } catch (error) {
    console.error("Error fetching drive items:", error);
    return NextResponse.json(
      { error: (error as Error)?.message || "Failed to fetch drive items" },
      { status: 500 }
    );
  }
}

// Revalidation endpoint
export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get("path") || "";
  
  revalidatePath(`/api/drive?path=${path}`);
  return NextResponse.json({ revalidated: true, now: Date.now() });
} 