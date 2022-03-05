import { Request, Response } from "express";
import { success, failure } from "../utils/helper";
import Director from "../models/Director";
import { Director as DirectorInterface } from "src/interfaces/Director.interface";

export const addDirector = async (req: Request, res: Response) => {
  const { name, description }: DirectorInterface = req.body;

  const user = await Director.findOne({ name });
  if (user) {
    return res.status(400).json(failure("User already exits."));
  }
  const image = req.file ? `${process.env.SITE}/director/${req.file.filename}`: "";
  let newDirector = new Director({ name, description, image });
  await newDirector.save();
  return res.status(201).json(success(user, "Successfully created user."));
};

export const getDirectors = async (req: Request, res: Response) => {
  let directors = await Director.find().sort({ createdAt: -1 });
  return res.json(success(directors));
};

export const getDirector = async (req: Request, res: Response) => {
  const {id} = req.params;
  const director = await Director.findById(id).populate('director name')
  if (!director) {
    return res.status(404).json(failure("Director not found."));
  }
  return res.json(success(director));
};

export const deleteDirector = async (req: Request, res: Response) => {
  const {id} = req.params;
  await Director.findByIdAndDelete(id);
  return res.json(success("Successfully deleted director."));
};



