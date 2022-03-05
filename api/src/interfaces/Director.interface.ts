import { Document, Model } from "mongoose";

export interface Director extends Document {
  name: string;
  image?: string;
  description: string;
}

export interface DirectorModel extends Model<Director> {
}
