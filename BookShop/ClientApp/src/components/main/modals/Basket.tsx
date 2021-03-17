import {CustomLabel} from "../../units/CustomLabel";
import React from "react";
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {useActions} from "../../../hooks/useActions";
import {useDispatch} from "react-redux";
import {addBookToBasket, removeBookFromBasket} from "../../../redux/action-creators/books/books";
import {order} from "../../../redux/types/book/Basket";

type windowType = {
    showWindow: () => void;
}


export const Basket: React.FC<windowType> = ({showWindow}) => {
    const list = useTypeSelector(state => state.booksBasket.orderList);
    console.log(list)

    const order = () => {
        console.log("заказ оформлен");
    }

    const getAllPrice = () :string => {
        let totalPrice = 0;
        list.forEach((order) => {
            totalPrice += order.price * order.count;
        });
        return `${totalPrice} ₽`;
    }


    return (
        <div onClick={showWindow} className={'modalWrapper basket-focus'}>
            <div onClick={event => event.stopPropagation()} className={'basketWindow'}>
                <h2>Корзина</h2>
                <br/>
                {list.length
                    ? <>
                        {list.map(order => <Order key={order.bookId} {...order}  />)}
                        <h2 style={{fontWeight: 400, textAlign: "right", border: "none"}}>Итого: {getAllPrice()}</h2>
                        <button onClick={order} className={'submit-button'}>Перейти к оформлению</button>
                    </>

                    : 'Пока пусто...'}
            </div>
        </div>
    );
};

type OrderType = {
    count: number;
    name: string;
    image: string;
    bookId: number;
    price: number;
}

const Order: React.FC<OrderType> = ({count, name, image, bookId, price}) => {
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
