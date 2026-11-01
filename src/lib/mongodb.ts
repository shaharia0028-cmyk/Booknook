import { MongoClient } from "mongodb";

const globalForMongo = globalThis as unknown as { mongoClient?: MongoClient };

const client =
  globalForMongo.mongoClient ??
  new MongoClient(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017", {
    serverSelectionTimeoutMS: 5000,
  });

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = client;
}

export const db = client.db(process.env.MONGODB_DB || undefined);
