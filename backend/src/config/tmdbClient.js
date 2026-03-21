import axios from "axios";
import 'dotenv/config';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
/**
 * Client specifico per le chiamate a TMDB, in modo da non dover ripetere ogni volta parametri come il toke di autorizzazione
 */
const tmdbClient = axios.create({
    baseURL: TMDB_BASE_URL,
    headers: {
        Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
    },
});

tmdbClient.interceptors.request.use(config => {
    config.params = {
        language: 'it-IT',
        ...config.params,
    };
    return config;
});

export default tmdbClient;