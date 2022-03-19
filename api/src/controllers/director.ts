import { Request, Response } from "express";
import { success, failure } from "../utils/helper";
import DirectorService from "../services/DirectorService";

const Director = new DirectorService();

export const addDirector = async (req: Request, res: Response) => {
  const user = await Director.checkIfUserExit(req.body.name);
  if (user) {
    return res.status(403).json(failure("User already exits."));
  }
  const newDirector = await Director.addDirector(req.body);
  return res
    .status(201)
    .json(success(newDirector, "Successfully created user."));
};

export const getDirectors = async (req: Request, res: Response) => {
  let directors = await Director.getAll();
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
  await Director.deleteById(id);

  return res.json(success(null, "Successfully deleted director."));
};
