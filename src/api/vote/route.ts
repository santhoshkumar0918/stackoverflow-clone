import {
  voteCollection,
  db,
  answerCollection,
  questionCollection,
} from "@/models/name";
import { databases, users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
import { Query, ID } from "appwrite";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(request: NextRequest) {
  try {
    const { votedById, voteStatus, type, typeId } = await request.json();
    const response = await databases.listDocuments(db, voteCollection, [
      Query.equal("type", type),
      Query.equal("voteById", votedById),
      Query.equal("typeId", typeId),
    ]);
    if (response.documents.length > 0) {
      await databases.deleteDocument(
        db,
        voteCollection,
        response.documents[0].$id
      );
      const questionOrAnswer = await databases.getDocument(
        db,
        type === "question" ? questionCollection : answerCollection,
        typeId
      );

      const authorPrefs = await users.getPrefs<UserPrefs>(
        questionOrAnswer.authorId
      );

      await users.updatePrefs<UserPrefs>(questionOrAnswer.authorId, {
        reputation:
          response.documents[0].voteStatus === "upvoted"
            ? Number(authorPrefs.reputation - 1)
            : Number(authorPrefs.reputation + 1),
      });
    }

    //   this means the prev status of the vote id equal to   current votestatus  willl go and delete the prev data updtae the reputation of author
    // with  the new vote status and then insert the new data

    if (response.documents[0]?.voteStatus !== voteStatus) {
      const doc = await databases.getDocument(db, voteCollection, ID.unique(), [
        type,
        typeId,
        voteStatus,
        votedById,
      ]);
      // Increate/Decrease the reputation of the question/answer author accordingly

      const questionOrAnswer = await databases.getDocument(
        db,
        type === "question" ? questionCollection : answerCollection,
        typeId
      );

      const authorPrefs = await users.getPrefs<UserPrefs>(
        questionOrAnswer.authorId
      );

      // if vote was present
      // first condition if previous vote was upvoted and now its downvoted then we will first decrease the reputtaion of author
      if (response.documents[0]) {
        await users.updatePrefs<UserPrefs>(questionOrAnswer.authorId, {
          reputation:
            response.documents[0].voteStatus === "upvoted"
              ? Number(authorPrefs.reputation - 1)
              : Number(authorPrefs.reputation + 1),
        });
      } else {
        await users.updatePrefs<UserPrefs>(questionOrAnswer.authorId, {
          reputation:
            voteStatus === "upvoted"
              ? Number(authorPrefs.reputation - 1)
              : Number(authorPrefs.reputation + 1),
        });
      }
      // here we collection all the data and query the database and set the limit of 1
      const [upvotes, downvotes] = await Promise.all([
        databases.listDocuments(db, voteCollection, [
          (Query.equal("type", type),
          Query.equal("typeId", typeId),
          Query.equal("voteStatus", "upvoted"),
          Query.equal("votedById", votedById),
          Query.limit(1)),
        ]),
        databases.listDocuments(db, voteCollection, [
          (Query.equal("type", type),
          Query.equal("typeId", typeId),
          Query.equal("voteStatus", "downvoted"),
          Query.equal("votedById", votedById),
          Query.limit(1)),
        ]),
      ]);

      return NextResponse.json(
        {
          data: { document: doc, voteResult: upvotes.total - downvotes.total },
          message: response.documents[0] ? "Vote Status Updated" : "Voted",
        },
        {
          status: 201,
        }
      );
    }
    const [upvotes, downvotes] = await Promise.all([
      databases.listDocuments(db, voteCollection, [
        (Query.equal("type", type),
        Query.equal("typeId", typeId),
        Query.equal("voteStatus", "upvoted"),
        Query.equal("votedById", votedById),
        Query.limit(1)),
      ]),
      databases.listDocuments(db, voteCollection, [
        (Query.equal("type", type),
        Query.equal("typeId", typeId),
        Query.equal("voteStatus", "downvoted"),
        Query.equal("votedById", votedById),
        Query.limit(1)),
      ]),
    ]);

    return NextResponse.json(
      {
        data: { document: null, voteResult: upvotes.total - downvotes.total },
        message: "Vote Withdraw",
      },
      {
        status: 201,
      }
    );
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
