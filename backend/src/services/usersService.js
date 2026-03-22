import axios from "axios";

import db from "../config/db.js";
import bcrypt from "bcrypt";

import UserDTO from "../dtos/userDto.js";

async function createUser(vars) {
    vars ||= {};

    const { name, surname, username, password } = vars;

    const checkUsersList = await getUsersList({ username });
    if (checkUsersList && checkUsersList.length > 0) {
        throw new Error('Username already exists. Please choose a different username.');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const sqlQuery = 'INSERT INTO app_user (name, surname, username, password) VALUES (?, ?, ?, ?)';
    const [result] = await db.execute(sqlQuery, [name, surname, username, hashedPassword]);
    return result.insertId;
}

async function getUsersList(vars) {
    vars ||= {};

    let sqlQuery = 'SELECT * FROM app_user WHERE 1=1';
    const queryParams = [];

    if (vars.username) {
        sqlQuery += ' AND username = ?';
        queryParams.push(vars.username);
    }

    if (vars.name) {
        sqlQuery += ' AND name = ?';
        queryParams.push(vars.name);
    }

    if (vars.surname) {
        sqlQuery += ' AND surname = ?';
        queryParams.push(vars.surname);
    }

    if (vars.userId) {
        sqlQuery += ' AND user_id = ?';
        queryParams.push(vars.userId);
    }

    if (vars.userIds && Array.isArray(vars.userIds) && vars.userIds.length > 0) {
        sqlQuery += ` AND user_id IN (${vars.userIds.map(() => '?').join(',')})`;
        queryParams.push(...vars.userIds);
    }

    if (vars.usernamePattern) {
        sqlQuery += ' AND username LIKE ?';
        queryParams.push(`%${vars.usernamePattern}%`);
    }

    if (vars.namePattern) {
        sqlQuery += ' AND name LIKE ?';
        queryParams.push(`%${vars.namePattern}%`);
    }

    if (vars.surnamePattern) {
        sqlQuery += ' AND surname LIKE ?';
        queryParams.push(`%${vars.surnamePattern}%`);
    }

    const [usersList] = await db.execute(sqlQuery, queryParams);
    return (usersList || [])
            .map(user => new UserDTO(user))
            ;
}

export default {
    createUser,
    getUsersList
};