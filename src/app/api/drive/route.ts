import { graphClient } from "@/utils/graphClient";
import { NextRequest, NextResponse } from "next/server";
import {FileItem} from "@/types/FileItem";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get("path") || "";
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    let endpoint: string;
    if (path) {
      endpoint = `/users/${userId}/drive/items/${path}/children`;
    } else {
      endpoint = `/users/${userId}/drive/root/children`;
    }

    const response = await graphClient.api(endpoint)
      .header('Prefer', 'query-response-timeout=60')
      .select('id,name,folder,file,size')
      .orderby('name asc')
      .get();

    // Get download URLs for files
    const items = await Promise.all(
      response.value.map(async (item: FileItem) => {
        if (item.file) {
          const downloadResponse = await graphClient
            .api(`/users/${userId}/drive/items/${item.id}`)
            .select('@microsoft.graph.downloadUrl')
            .get();
          return { ...item, '@microsoft.graph.downloadUrl': downloadResponse['@microsoft.graph.downloadUrl'] };
        }
        return item;
      })
    );

    return NextResponse.json({ value: items });
  } catch (error) {
    console.error("Error fetching drive items:", error);
    return NextResponse.json(
      { error: (error as Error)?.message || "Failed to fetch drive items" },
      { status: 500 }
    );
  }
}