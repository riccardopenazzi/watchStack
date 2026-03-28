import axios from "axios";

import tmdbService from "./tmdbService.js";

async function getMoviesList(vars) {
    const moviesList = await tmdbService.getMoviesList(vars);
    return moviesList;
}

async function getGenresList(vars) {
    const genresList = await tmdbService.getGenresList(vars);
    return genresList;
}

export default {
    getMoviesList,
    getGenresList,
};