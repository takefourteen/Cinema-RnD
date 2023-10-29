import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
}

let isConnected = false;

export const connectToDatabase = async () => {
  console.log("is there a connection?", isConnected);
  if (isConnected) {
    // If the connection is already established, return immediately.
    return;
  }

  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log("Successfully connected to mongodb");
  } catch (error) {
    console.error("Error connecting to mongodb", error);
    throw error;
  }
};
