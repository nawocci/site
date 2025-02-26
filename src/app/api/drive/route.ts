import { graphClient } from "@/utils/graphClient";
import { NextRequest, NextResponse } from "next/server";

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
      .select('id,name,folder,file,size,webUrl')
      .orderby('name asc')
      .get();

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching drive items:", error);
    return NextResponse.json(
      { error: (error as Error)?.message || "Failed to fetch drive items" },
      { status: 500 }
    );
  }
}