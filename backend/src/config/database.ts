import mongoose from "mongoose";
import { Utils } from "../utils/Utils.js";

export const DatabaseConnecter = async (connection_string: string) => {
  if (Utils.isNull(connection_string)) {
    throw new Error("Database Connection Sting is required");
  }
  await mongoose
    .connect(connection_string)
    .then(() => console.log(`DB connected to --> ${connection_string}`))
    .catch((err) => {
      console.log("DB Connection -- Error =>", err);
      process.exit(1);
    });
};
