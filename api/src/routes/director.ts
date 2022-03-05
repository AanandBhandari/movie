import { directorSchema } from "../middleware/validator/schemas";
import { validator } from "../middleware/validator/validator";
import { Router } from "express";
import {
  addDirector,
  deleteDirector,
  getDirector,
  getDirectors,
} from "../controllers/director";
import { uploader } from "../middleware/uploader";
const router = Router();

router.route("/").get(getDirectors);
//   .post(uploader, directorSchema, validator, addDirector);

// router.post("/", uploader, addDirector);

router.route("/:id").get(getDirector).delete(deleteDirector);

export default router;
