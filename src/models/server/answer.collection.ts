import { Permission } from "appwrite";
import { databases } from "./config";
import { db, answerCollection } from "../name";

export default async function createAnswerCollection() {
  await databases.createCollection(db, answerCollection, answerCollection, [
    Permission.create("users"),
    Permission.delete("users"),
    Permission.read("users"),
    Permission.update("users"),
    Permission.read("any"),
  ]);
  console.log("Answer  collection Created");

  // creating Attributes

  await Promise.all([
    databases.createStringAttribute(
      db,
      answerCollection,
      "content",
      10000,
      true
    ),
    databases.createStringAttribute(
      db,
      answerCollection,
      "questionId",
      50,
      true
    ),
    databases.createStringAttribute(db, answerCollection, "authorId", 50, true),
  ]);
  console.log("Answer Collection Created");
}
