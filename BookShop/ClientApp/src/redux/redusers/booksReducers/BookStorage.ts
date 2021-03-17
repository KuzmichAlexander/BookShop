import {BookBascketType, order, orderBookActions, orderBooksActions} from "../../types/book/Basket";
import {log} from "util";

const initialState: BookBascketType = {
    orderList: []
};

export const BookStorageReduсer = (state = initialState, action: orderBookActions): BookBascketType => {
    let hasBook = false;
    switch (action.type) {
        case orderBooksActions.ADD_BOOK:
            state.orderList.forEach(item => {
                if (item.bookId === action.payload.bookId) hasBook = true;
            })
            if (hasBook) {
                const newOrderList = state.orderList.map(oneOrder => {
                    if (oneOrder.bookId === action.payload.bookId) {
                        const addCount: order = {bookId: oneOrder.bookId, image: oneOrder.image, name: oneOrder.name, count: oneOrder.count + action.payload.count, price: action.payload.price}
                        return addCount;
                    } else {
                        return oneOrder;
                    }
                })
                return {orderList: [...newOrderList]};
            } else {
                return {orderList: [...state.orderList, action.payload]};
            }


        case orderBooksActions.REMOVE_BOOK:
            const newOrderList = state.orderList.map(order => {
                if (order.bookId === action.payload) {
                    order.count--;
                    return order;
                }
                return order;
            });
            return {orderList: [...newOrderList.filter(order => order.count !== 0)]}
        case orderBooksActions.ORDER_BOOK:
            return {orderList: [...state.orderList]};
        case orderBooksActions.GET_BOOKS_FROM_LOCALSTORAGE:
            return {orderList: [...state.orderList]};
        default:
            return state;
    }
};
