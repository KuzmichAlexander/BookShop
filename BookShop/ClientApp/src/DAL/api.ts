import axios from "axios";
import {token} from "../utils/consts/consts";
import {addBookInStorageType, bookInput, bookInputParams} from "../redux/types/book/book";
import {order} from "../redux/types/book/Basket";


export const getGenres = async () => {
    const {data} = await axios.get(`/api/Genres`);
    return data;
}

export const getEditions = async () => {
    const {data} = await axios.get(`/api/Edition`);
    return data;
}

export const getCities = async () => {
    const {data} = await axios.get(`/api/Cities`);
    return data;
}

export const getAuthors = async () => {
    const {data} = await axios.get(`/api/Authors`);
    return data;
}

export const addAuthors = async (author: string) => {
    const {data} = await axios.post(`/api/Authors`, {name: author});
    return data;
}

export const addEdition = async (edition: string) => {
    const {data} = await axios.post(`/api/Edition`, {name: edition});
    return data;
}

export const addCity = async (city: string) => {
    const {data} = await axios.post(`/api/Cities`, {name: city});
    return data;
}

export const addGenre = async (genre: string) => {
    const {data} = await axios.post(`/api/Genres`, {name: genre});
    return data;
}

export const addNewBook = async (book: bookInput) => {
    const token = localStorage.getItem('token');
    const {data} = await axios.post(`/api/AddBook`, book, {headers: {Authorization: token}});
    return data;
}

export const addParamsToNewBook = async (book: bookInputParams) => {
    const token = localStorage.getItem('token');
    const {data} = await axios.put(`/api/AddBook`, book, {headers: {Authorization: token}});
    return data;
}

export const getBooksName = async () => {
    const {data} = await axios.get(`/api/AddBook`, {headers: {Authorization: token}});
    return data;
}

export const AddBookIntoStorage = async (book: addBookInStorageType) => {
    const {data} = await axios.patch(`/api/AddBook`, book, {headers: {Authorization: token}});
    return data;
}

export const payFetchOperation = async () => {
    const {data} = await axios.get(`/api/PayOperation`, {headers: {Authorization: token}});
    return data;
}

export const orderOperation = async (books: order[], city:string, token: string) => {
    const {data} = await axios.post(`/api/OrderBook`, {purchases:books, city}, {headers: {Authorization: token}});
    return data;
}

export const fetchOrders = async (token: string) => {
    const {data} = await axios.get(`/api/UserAccount`, {headers: {Authorization: token}});
    return data;
}

export const fetchMoneyMetrics = async () => {
    const {data} = await axios.get(`/api/Statistic`);
    return data;
}

export const changePassword = async (req: changePassType, token: string) => {
    const {data} = await axios.patch(`/api/ChangePassword`, req,{headers: {Authorization: token}});
    return data;
}

type changePassType = {
    oldPass: string;
    newPass: string;
}
