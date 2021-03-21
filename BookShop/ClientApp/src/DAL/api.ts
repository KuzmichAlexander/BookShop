import axios from "axios";
import {baseUrl, token} from "../components/units/consts/consts";
import {book} from "../redux/types/book/book";


export const getGenres = async () => {
    const {data} = await axios.get(`${baseUrl}/api/Genres`);
    return data;
}

export const getEditions = async () => {
    const {data} = await axios.get(`${baseUrl}/api/Edition`);
    return data;
}

export const getCities = async () => {
    const {data} = await axios.get(`${baseUrl}/api/Cities`);
    return data;
}

export const getAuthors = async () => {
    const {data} = await axios.get(`${baseUrl}/api/Authors`);
    return data;
}

export const addAuthors = async (author: string) => {
    const {data} = await axios.post(`${baseUrl}/api/Authors`, {name: author});
    return data;
}

export const addEdition = async (edition: string) => {
    const {data} = await axios.post(`${baseUrl}/api/Edition`, {name: edition});
    return data;
}

export const addCity = async (city: string) => {
    const {data} = await axios.post(`${baseUrl}/api/Cities`, {name: city});
    return data;
}

export const addGenre = async (genre: string) => {
    const {data} = await axios.post(`${baseUrl}/api/Genres`, {name: genre});
    return data;
}

export const addNewBook = async (book: book) => {
    const token = localStorage.getItem('token');
    const {data} = await axios.post(`${baseUrl}/api/AddBook`, book, {headers: {Authorization: token}});
    return data;
}
