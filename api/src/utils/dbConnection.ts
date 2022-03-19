import { connect } from "mongoose";

export default async function dbConnection(): Promise<void> {
  try {
    if (process.argv[5] === '**/*.spec.ts') {//that is for testing purpose so connect test db
      await connect(process.env.MONGO_URI_TEST);      
    } else {
      await connect(process.env.MONGO_URI);
    }

    console.log("Connected to the database.");
  } catch (error) {
    console.log(`***DB ERROR***`);
    console.log({ error });
  }
}
