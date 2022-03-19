import { Schema, model, Types } from "mongoose";
import { Movie, MovieModel } from "../interfaces/Movie.interface";
const MovieSchema = new Schema(
  {
    director: {
      type: Types.ObjectId,
      ref: "director",
    },
    name: String,
    image: String,
    description: String,
    genre: String,
  },
  { timestamps: true }
);

export default model<Movie, MovieModel>("movie", MovieSchema);
