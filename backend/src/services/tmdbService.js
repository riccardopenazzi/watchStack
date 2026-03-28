import axios from 'axios';
import tmdbClient from '../config/tmdbClient.js';

async function getMoviesList(vars) {
    vars ||= {};

    const response = await tmdbClient.get(`/discover/movie`, {
        params: {
            ...vars,
        },
    });

    // al momento non sto restituendo info sulla paginazione
    return response.data.results;
}

async function getGenresList(vars) {
    vars ||= {};

    const response = await tmdbClient.get(`/genre/movie/list`, {
        params: {
            ...vars,
        },
    });

    return response.data.genres;
}

export default {
    getMoviesList,
    getGenresList,
};