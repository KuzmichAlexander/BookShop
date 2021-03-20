import React from "react";
import {useDispatch} from "react-redux";
import {addBookToBasket, removeBookFromBasket} from "../../redux/action-creators/books/books";

type OrderType = {
    count: number;
    name: string;
    image: string;
    bookId: number;
    price: number;
}

export const Order: React.FC<OrderType> = ({count, name, image, bookId, price}) => {
    const dispatch = useDispatch();

    const addBook = () => {
        dispatch(addBookToBasket({count: 1, name, image, bookId, price}));
    }

    const removeBook = () => {
        dispatch(removeBookFromBasket(bookId));
    }

    return (
        <div className={'order-container'}>
            <div className={'order-info'}>
                <div className={'order-title'}>
                    <div className={'order-image'}>
                        <img src={image} alt="книжка"/>
                    </div>
                    <div>
                        <h3>{name}</h3>
                        <p className={'price-description'}>цена за 1шт: {price}</p>
                    </div>
                </div>
                <div className={'order-switcher'}>
                    <div onClick={removeBook} className={'remove-book'}>-</div>
                    <p>{count}</p>
                    <div onClick={addBook} className={'add-book'}>+</div>
                </div>
            </div>
        </div>
    )
}
