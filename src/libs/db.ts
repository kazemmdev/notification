import type { Db } from "mongodb";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string; // Ensure you define this in your .env file
const options = {};

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient>;

// For development, use a global variable to preserve the client across hot reloads
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to the .env.local file");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a function that resolves to the database instance
export const getDatabase = async (): Promise<Db> => {
  const client = await clientPromise;
  return client.db(); // Use the default database
};

export default clientPromise;
