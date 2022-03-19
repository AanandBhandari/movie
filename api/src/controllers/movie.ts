import { Request, Response } from "express";
import DirectorService from "../services/DirectorService";
import MovieService from "../services/MovieService ";
import { success, failure } from "../utils/helper";

const Movie = new MovieService();
const Director = new DirectorService();

export const addMovie = async (req: Request, res: Response) => {
  const user = await Movie.checkIfUserExit(req.body.name);
  if (user) {
    return res.status(403).json(failure("Movie already exits."));
  }

  const director = await Director.findById(req.body.director);
  if (!director) {
    return res.status(403).json(failure("Invalid director ID."));
  }

  const newMovie = await Movie.addMovie(req.body);
  return res.status(201).json(success(newMovie, "Successfully created movie."));
};

export const getMovies = async (req: Request, res: Response) => {
  const movies = await Movie.getAll();
  return res.json(success(movies));
};

export const getMovie = async (req: Request, res: Response) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);
  if (!movie) {
    return res.status(404).json(failure("Movie not found."));
  }
  return res.json(success(movie));
};

export const deleteMovie = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Movie.deleteById(id);
  return res.json(success(null, "Successfully deleted movie."));
};
