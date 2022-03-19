import { Schema, model } from "mongoose";
import { Director, DirectorModel } from "../interfaces/Director.interface";
const DirectorSchema = new Schema(
  {
    name: String,
    image: String,
    description: String,
  },
  { timestamps: true }
);

DirectorSchema.post(
  "findOneAndDelete",
  { query: true, document: false },
  async function (doc: Director | null, next: Function) {
    if (doc) {
      model("movie").deleteMany({ director: doc._id }).exec();
    }
    next();
  }
);

DirectorSchema.post(
  "deleteMany",
  { query: true, document: false },
  async function (doc: any, next: Function) {
    if (doc) {
      model("movie").deleteMany().exec();
    }
    next();
  }
);

export default model<Director, DirectorModel>("director", DirectorSchema);
