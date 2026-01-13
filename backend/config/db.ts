import mongoose from "mongoose";
import {envConfig} from "./env.config";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(envConfig.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

export default connectToMongoDB;