import { voteCollection.db } from "@/models/name";
import { databases } from "@/models/server/config";
import { Query } from "appwrite";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(request: NextRequest) {
  try {
      const { voteById, voteStatus, type, typeId } = await request.json();
      const response = await databases.listDocuments(
          db, voteCollection, [
              Query.equal("type", type),
              Query.equal("voteById", voteById),
              Query.equal("typeId", typeId),
          ]
      )
      if (response.documents.length > 0) {
          
      }

    //   this means 
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message || "creating error in answer",
      },
      {
        status: error?.status || error?.code || 500,
      }
    );
  }
}
