import { Schema, model, Types } from "mongoose";
import { Movie, MovieModel } from "../interfaces/Movie.interface";
import fs from "fs";
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

// MovieSchema.post(
//   "deleteOne",
//   { query: false, document: true },
//   function (doc: Movie, next: Function) {
//     //Remove movie image from storage
//     console.log({ doc });
//     let image = doc.image;
//     if (image) {
//       image = image.replace(process.env.SITE, "");
//       let path = `${__dirname}/../${image}`;
//       if (fs.existsSync(path)) {
//         fs.unlinkSync(path);
//       }
//     }
//     next();
//   }
// );

export default model<Movie, MovieModel>("movie", MovieSchema);
