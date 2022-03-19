import { Document, Model, Types } from "mongoose";

export interface Movie extends Document {
  name: string;
  description: string;
  image?: string;
  genre: string;
  director: Types.ObjectId;
}

export interface MovieModel extends Model<Movie> {}
