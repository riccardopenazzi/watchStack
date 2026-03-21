import watchStackService from '../services/watchStackService.js';
import tmdbService from '../services/tmdbService.js';

async function getMoviesList(req, res) {
    const filters = req.query;
    // TODO: check su valori di filters ed eventualmente lanciare 400

    try {
        const moviesList = await watchStackService.getMoviesList(filters);

        if (!moviesList ||!moviesList.length) {
           return res.status(204).send();
        }

        return res.status(200).json({
            success: true,
            count: moviesList.length,
            data: moviesList,
        })
    } catch (error) {
        console.error('getMoviesList error:', error);
        if (error.response) {
            const status = error.response.status;
            const message = error.response.data.status_message || 'An error occurred while fetching the movies list.';
            return res.status(status).json({
                success: false,
                errorCode: status,
                message,
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Internal server error while fetching the movies list.',
        });
    }
}

export default {
    getMoviesList,
};