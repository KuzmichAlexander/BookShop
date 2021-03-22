export enum fetchBooksActions {
    FETCH_BOOKS = 'FETCH_BOOKS',
    FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS',
    FETCH_BOOKS_ERROR = 'FETCH_BOOKS_ERROR'
};

export type book = {
    name: string;
    author: string;
    description: string;
    price: number;
    pages: number;
    imageURL: string;
    genre: string
    edition: string;
    id: number;
}

export interface booksState {
    books: fetchedBookType[];
    loading: boolean;
    error: null | string;
}

export type fetchBookAction = bookFetchAction | bookFetchSuccessAction | bookFetchErrorAction

interface bookFetchAction {
    type: fetchBooksActions.FETCH_BOOKS;
 }

interface bookFetchSuccessAction {
    type: fetchBooksActions.FETCH_BOOKS_SUCCESS;
    payload: fetchedBookType[];
}

interface bookFetchErrorAction {
    type: fetchBooksActions.FETCH_BOOKS_ERROR;
    payload: string
}

export type fetchBooksOptions = {
    default: boolean;
    name?: string;
    priceAbove?: number;
    priceBelow?: number;
    genre?: string;
}

export type bookInput = {
    name: string;
    description: string;
    price: number;
    pages: number;
    imageURL: string;
    edition: string;
    id: number;
}

export type bookInputParams = {
    author: string[];
    genre: string[];
    name: string;
}

export type fetchedBookType = {
    name: string;
    author: string[];
    description: string;
    hasInStorage: boolean;
    price: number;
    pages: number;
    imageURL: string;
    genre: string[];
    edition: string;
    id: number;
}

export type addBookInStorageType = {
    name: string;
    count: number;
}
