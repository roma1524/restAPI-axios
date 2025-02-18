import axios from "axios";

const token = '28d502e6-28f6-4c8f-9eae-870db6caf5f3';
const apiKey = 'bfc4c0d3-dfa3-4627-88d9-e41dc38d4cc4';

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers: {
        Authorization: `Bearer ${token}`,
        'API-KEY': apiKey
    }
})