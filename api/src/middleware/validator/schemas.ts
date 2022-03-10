import { check } from "express-validator";

export const directorSchema = [
  check("name", "Name is required").notEmpty(),
  check("description", "Description is required").notEmpty(),
  check("image", "Image is required").notEmpty(),
  check("image", "Image must be url").isURL(),
];
export const movieSchema = [
  check("name", "Name is required").notEmpty(),
  check("description", "Description is required").notEmpty(),
  check("genre", "Genre is required").notEmpty(),
  check("director", "Director is required").notEmpty(),
  check("image", "Image is required").notEmpty(),
  check("image", "Image must be url").isURL(),
];