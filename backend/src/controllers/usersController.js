import usersService from "../services/usersService.js";

/**
 * Recupera una lista di utenti filtrata in base ai parametri forniti.
 * @param {Object} req - Oggetto Request di Express.
 * @param {Object} req.query - Parametri di ricerca.
 * @param {string} [req.query.username] - Username esatto.
 * @param {string} [req.query.name] - Nome esatto.
 * @param {string} [req.query.surname] - Cognome esatto.
 * @param {string|number} [req.query.userId] - ID univoco utente.
 * @param {string} [req.query.userIds] - Stringa di ID separati da virgola o array.
 * @param {string} [req.query.usernamePattern] - Pattern di ricerca parziale per username.
 * @param {string} [req.query.namePattern] - Pattern di ricerca parziale per nome.
 * @param {string} [req.query.surnamePattern] - Pattern di ricerca parziale per cognome.
 * @param {Object} res - Oggetto Response di Express.
 * @returns {Promise<Response>} JSON con status 200 e array di utenti, o 500 in caso di errore.
 */
async function getUsersList(req, res) {
    const { username, name, surname, userId, usernamePattern, namePattern, surnamePattern } = req.query;
    let { userIds } = req.query;

    //TODO: controllo su filtri obbligatori che deciderò poi

    if (userIds && !Array.isArray(userIds)) {
        userIds = userIds.split(',').map(id => id.trim());
    }

    try {
        const usersList = await usersService.getUsersList({ username, name, surname, userId, userIds, usernamePattern, namePattern, surnamePattern });

        if (!usersList || !usersList.length) {
            return res.status(204).send();
        }

        return res.status(200).json({
            success: true,
            data: usersList,
        });
    } catch (error) {
        console.error('getUsersList error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error while fetching users list.',
        });
    }
}

/**
 * Crea un nuovo utente nel sistema dopo aver validato i campi obbligatori.
 * @param {Object} req - Oggetto Request di Express.
 * @param {Object} req.body - Dati dell'utente.
 * @param {string} req.body.name - Nome dell'utente (Obbligatorio).
 * @param {string} req.body.surname - Cognome dell'utente (Obbligatorio).
 * @param {string} req.body.username - Username univoco (Obbligatorio).
 * @param {string} req.body.password - Password in chiaro (Obbligatorio).
 * @param {Object} res - Oggetto Response di Express.
 * @returns {Promise<Response>} JSON con l'oggetto utente creato (200) o messaggio di errore (400/500).
 */
async function createUser(req, res) {
    const { name, surname, username, password } = req.body;
    
    if (!name || !surname || !username || !password) {
        console.error('createUser error: Missing required fields', req.body);
        return res.status(400).json({
            success: false,
            message: 'Missing required fields: name, surname, username, and password are all required.',
        });
    }

    try {
        const newUser = await usersService.createUser({ name, surname, username, password });
        return res.status(200).json({
            success: true,
            data: newUser,
        });
    } catch (error) {
        console.error('createUser error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error while creating user.',
        });
    }
}

async function executeLogin(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        console.error('executeLogin error: Missing username or password', req.body);
        return res.status(400).json({
            success: false,
            message: 'Missing required fields: username and password are required.',
        });
    }

    try {
        const usersList = await usersService.executeLogin({ username, password });

        if (!usersList || !usersList.length) {
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password.',
            });
        }

        return res.status(200).json({
            success: true,
            data: usersList[0],
        });
    } catch (error) {
        console.error('executeLogin error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error while executing login.',
        });
    }
}

export default {
    createUser,
    getUsersList,
    executeLogin
};