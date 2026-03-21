import axios from 'axios';
import tmdbClient from '../config/tmdbClient.js';

async function getMoviesList(vars) {
    const response = await tmdbClient.get(`/discover/movie`, {
        params: {
            ...vars,
        },
    });

    // al momento non sto restituendo info sulla paginazione
    return response.data.results;
}

export default {
    getMoviesList,
};