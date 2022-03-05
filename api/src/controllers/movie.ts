import { Request, Response } from "express";
import { success, failure } from "../utils/helper";
import Movie from "../models/Movie";
import { Movie as MovieInterface } from "src/interfaces/Movie.interface";

export const addMovie = async (req: Request, res: Response) => {
  const { name, description, genre, director }: MovieInterface = req.body;

  const user = await Movie.findOne({ name });
  if (user) {
    return res.status(400).json(failure("User already exits."));
  }
  const image = req.file ? `${process.env.SITE}/movie/${req.file.filename}`: "";
  const newMovie = new Movie({ name, description, image, genre, director });
  await newMovie.save();
  return res.status(201).json(success(newMovie, "Successfully created movie."));
};

export const getMovies = async (req: Request, res: Response) => {
  const movies = await Movie.find().select('-description').populate('director name').sort({ createdAt: -1 });
  return res.json(success(movies));
};


export const getMovie = async (req: Request, res: Response) => {
  const {id} = req.params;
  const movie = await Movie.findById(id).populate('director name')
  if (!movie) {
    return res.status(404).json(failure("Movie not found."));
  }
  return res.json(success(movie));
};

export const deleteMovie = async (req: Request, res: Response) => {
  const {id} = req.params;
  await Movie.findByIdAndDelete(id);
  return res.json(success("Successfully deleted movie."));
};



