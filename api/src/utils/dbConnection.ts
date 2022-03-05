import { connect } from "mongoose";

export default async function dbConnection(): Promise<void> {
  try {
    await connect(process.env.MONGO_URI);
    console.log("Connected to the database.");
  } catch (error) {
    console.log(`***DB ERROR***`);
    console.log({ error });
  }
}
