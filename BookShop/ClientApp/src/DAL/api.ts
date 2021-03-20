import axios from "axios";
import {baseUrl} from "../components/units/consts/consts";


export const getGenres = async () => {
    const {data} = await axios.get(`${baseUrl}/api/Genres`);
    console.log(data);
    return data;
}

export const getCities = async () => {
    const {data} = await axios.get(`${baseUrl}/api/Cities`);
    console.log(data);
    return data;
}

export const getAuthors = async () => {
    const {data} = await axios.get(`${baseUrl}/api/Authors`);
    console.log(data);
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
