export type BookBascketType = {
    orderList: order[];
}

export type order = {
    bookId: number;
    name: string;
    count: number;
    image: string;
    price: number;
}

export enum orderBooksActions {
    ADD_BOOK = 'ADD_BOOK',
    REMOVE_BOOK = 'REMOVE_BOOK',
    ORDER_BOOK = 'ORDER_BOOK',
    GET_BOOKS_FROM_LOCALSTORAGE = 'GET_BOOKS_FROM_LOCALSTORAGE',
}

export type orderBookActions = addBookAction | removeBookAction | orderBookAction | getBookAction

export interface addBookAction {
    type: orderBooksActions.ADD_BOOK;
    payload: order;
}

export interface removeBookAction {
    type: orderBooksActions.REMOVE_BOOK;
    payload: number;
}

interface orderBookAction {
    type: orderBooksActions.ORDER_BOOK;
    payload: string
}

interface getBookAction {
    type: orderBooksActions.GET_BOOKS_FROM_LOCALSTORAGE;
}
