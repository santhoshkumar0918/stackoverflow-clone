import { Permission } from "node-appwrite";
import { questionAttachmentBucket } from "../name";
import { storage } from "./config";
import { Role } from "appwrite";

export default async function getOrCreateStorage() {
  try {
    await storage.getBucket(questionAttachmentBucket);
    console.log("Storage Connected");
  } catch (error) {
    try {
      await storage.createBucket(
        questionAttachmentBucket,
        questionAttachmentBucket,
        [
          // Permission.create("users"),
          // Permission.read("users"),
          // Permission.update("users"),
          // Permission.delete("users"),
          // Permission.read("any"),
          Permission.create(Role.guests()), // Allow guests to create
          Permission.write(Role.guests()), // Allow guests to write
          Permission.create(Role.users()), // Allow authenticated users to create
          Permission.read(Role.users()), // Allow authenticated users to read
          Permission.update(Role.users()), // Allow authenticated users to update
          Permission.delete(Role.users()), // Allow authenticated users to delete
          Permission.read(Role.any()),
        ],
        false,
        undefined,
        undefined,
        ["jpg", "png", "gif", "jpeg", "webp", "heic"]
      );
      console.log("Storage created");
      console.log("storage Connected");
    } catch (error) {
      console.error("Error created in storage", error);
    }
  }
}
