import { movieSchema } from "../middleware/validator/schemas";
import { validator } from "../middleware/validator/validator";
import { Router } from "express";
import {
  addMovie,
  deleteMovie,
  getMovie,
  getMovies,
} from "../controllers/movie";
// import { uploader } from "../middleware/uploader";
const router = Router();

router
  .route("/")
  .get(getMovies)
  .post(movieSchema, validator, addMovie);

router.route("/:id").get(getMovie).delete(deleteMovie);

export default router;
