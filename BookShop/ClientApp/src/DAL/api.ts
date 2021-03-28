import axios from "axios";
import {baseUrl, token} from "../components/units/consts/consts";
import {addBookInStorageType, book, bookInput, bookInputParams} from "../redux/types/book/book";
import {useTypeSelector} from "../hooks/useTypeSelector";
import {order} from "../redux/types/book/Basket";
import {log} from "util";


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

export const addNewBook = async (book: bookInput) => {
    const token = localStorage.getItem('token');
    const {data} = await axios.post(`${baseUrl}/api/AddBook`, book, {headers: {Authorization: token}});
    return data;
}

export const addParamsToNewBook = async (book: bookInputParams) => {
    const token = localStorage.getItem('token');
    const {data} = await axios.put(`${baseUrl}/api/AddBook`, book, {headers: {Authorization: token}});
    return data;
}

export const getBooksName = async () => {
    const {data} = await axios.get(`${baseUrl}/api/AddBook`, {headers: {Authorization: token}});
    return data;
}

export const AddBookIntoStorage = async (book: addBookInStorageType) => {
    const {data} = await axios.patch(`${baseUrl}/api/AddBook`, book, {headers: {Authorization: token}});
    return data;
}

export const payFetchOperation = async () => {
    const {data} = await axios.get(`${baseUrl}/api/PayOperation`, {headers: {Authorization: token}});
    return data;
}

export const orderOperation = async (books: order[], city:string, token: string) => {
    const {data} = await axios.post(`${baseUrl}/api/OrderBook`, {purchases:books, city}, {headers: {Authorization: token}});
    return data;
}

export const fetchOrders = async (token: string) => {
    const {data} = await axios.get(`${baseUrl}/api/UserAccount`, {headers: {Authorization: token}});
    return data;
}

export const fetchUserInfo = async (token: string) => {
    const {data} = await axios.get(`${baseUrl}/api/Auth`, {headers: {Authorization: token}});
    console.log(data);
    return data;
}
