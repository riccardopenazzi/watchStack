import axios from "axios";

import tmdbService from "./tmdbService.js";

async function getMoviesList(vars) {
    const moviesList = await tmdbService.getMoviesList(vars);
    return moviesList;
}

export default {
    getMoviesList,
};