import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.DB_URI) {
  throw new Error("DB_URI is not defined in the environment variables");
}

const client = new MongoClient(process.env.DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  // Add connection options for better reliability in deployment
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
});

const clientPromise = client.connect().catch((err) => {
  console.error("Failed to connect to MongoDB:", err);
  throw err;
});

export default clientPromise;
