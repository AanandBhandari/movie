import { Request, Response } from "express";
import { success, failure } from "../utils/helper";
import Director from "../models/Director";
import fs from "fs";
import { Director as DirectorInterface } from "../interfaces/Director.interface";
import Movie from "../models/Movie";

export const addDirector = async (req: Request, res: Response) => {
  const { name, description }: DirectorInterface = req.body;

  if (!req.file) {
    return res.status(403).json(failure("No image provided"));
  }

  const user = await Director.findOne({ name });
  if (user) {
    return res.status(400).json(failure("User already exits."));
  }
  const image = req.file
    ? `${process.env.SITE}/director/${req.file.filename}`
    : "";
  let newDirector = new Director({ name, description, image });
  await newDirector.save();
  return res
    .status(201)
    .json(success(newDirector, "Successfully created user."));
};

export const getDirectors = async (req: Request, res: Response) => {
  let directors = await Director.find().sort({ createdAt: -1 });
  return res.json(success(directors));
};

export const getDirector = async (req: Request, res: Response) => {
  const { id } = req.params;
  const director = await Director.findById(id);
  if (!director) {
    return res.status(404).json(failure("Director not found."));
  }
  return res.json(success(director));
};

export const deleteDirector = async (req: Request, res: Response) => {
  const { id } = req.params;
  let director = await Director.findByIdAndDelete(id);

  // console.log({ director });

  //clear movies and director image
  await Movie.deleteMany({ director: id }).exec();
  let image = director.image;
  if (image) {
    image = image.replace(process.env.SITE, "");
    let path = `${__dirname}/../public${image}`;
    console.log(path, fs.existsSync(path));
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  }
  return res.json(success("Successfully deleted director."));
};
