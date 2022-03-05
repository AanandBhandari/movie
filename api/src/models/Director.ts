import { Schema, model } from "mongoose";
import fs from "fs";
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
  "findByIdAndDelete",
  { query: false, document: true },
  function (doc: Director, next: Function) {
    model("movie").deleteMany({ director: doc._id }).exec();
    //Remove director image
    let image = doc.image;
    if (image) {
      image = image.replace(process.env.SITE, "");
      let path = `${__dirname}/../${image}`;
      if (fs.existsSync(path)) {
        fs.unlinkSync(path);
      }
      next();
    }
  }
);

export default model<Director, DirectorModel>("director", DirectorSchema);
