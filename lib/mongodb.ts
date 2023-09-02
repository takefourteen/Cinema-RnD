// use mongoose to connect to mongodb
import monogoose from "mongoose";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

export const connectToDatabase = async () => {
    try {
        await monogoose.connect(uri);
        console.log("Successfully connected to mongodb");
    } catch (error) {
        console.log("Error connecting to mongodb", error);
    }
}
