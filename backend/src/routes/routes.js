import express from "express";

import watchStackController from "../controllers/watchStackController.js";
// import tmdbController from "../controllers/tmdbController.js";

const router = express.Router();

router.get('/movies', watchStackController.getMoviesList);

export default router;