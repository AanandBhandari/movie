import { directorSchema } from "../middleware/validator/schemas";
import { validator } from "../middleware/validator/validator";
import { Router } from "express";
import {
  addDirector,
  deleteDirector,
  getDirector,
  getDirectors,
} from "../controllers/director";
const router = Router();

router
  .route("/")
  .get(getDirectors)
  .post(directorSchema, validator, addDirector);

router.route("/:id").get(getDirector).delete(deleteDirector);

export default router;
