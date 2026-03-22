import express from "express";

import watchStackController from "../controllers/watchStackController.js";
import usersController from "../controllers/usersController.js";
// import tmdbController from "../controllers/tmdbController.js";

const router = express.Router();

router.get('/movies', watchStackController.getMoviesList);

router.get('/users', usersController.getUsersList);
router.post('/create-user', usersController.createUser);

export default router;