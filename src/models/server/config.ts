import env from "@/app/env";
import { clearModuleContext } from "next/dist/server/lib/render-server";

import { Avatars, Client, Databases, Storage, Users } from "node-appwrite";
let client = new Client();

client
  .setEndpoint(env.appwrite.endpoint) // Your API Endpoint
  .setProject(env.appwrite.projectId) // Your project ID
  .setKey(env.appwrite.apikey); // Your secret API key

const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);
const users = new Users(client);

export { avatars, databases, users, client, storage };
