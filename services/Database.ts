import mongoose from "mongoose";
import { MONGO_URI } from "../config";

export default async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      autoIndex: true,
    });

    console.log("DB Conected...");
  } catch (error) {
    console.log(error);
  }
};
