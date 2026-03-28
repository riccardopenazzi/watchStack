import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

async function get({ url, params = {} }) {
    try {
        const response = await apiClient.get(url, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function post({ url, body = {} }) {
    try {
        const response = await apiClient.post(url, body);
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
}

export default {
    get,
    post,
};