import { Router } from "express";
import DirectorRoute from "./director";
import MovieRoute from "./movie";

const router = Router();

router.use("/director", DirectorRoute);
router.use("/movie", MovieRoute);

export default router;
