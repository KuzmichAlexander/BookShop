import React from "react";
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {order} from "../../../redux/types/book/Basket";
import {Link} from "react-router-dom";
import {Order} from "../../../utils/OrderElement";
import {useDispatch} from "react-redux";
import {clearBasket} from "../../../redux/action-creators/books/books";

type windowType = {
    showWindow?: () => void;
}

export const getAllPrice = (list: order[]) :string => {
    let totalPrice = 0;
    list.forEach((order) => {
        totalPrice += order.price * order.count;
    });
    return `${totalPrice} ₽`;
}

export const Basket: React.FC<windowType> = ({showWindow}) => {
    const list = useTypeSelector(state => state.booksBasket.orderList);
    const dispatch = useDispatch();

    return (
        <div onClick={showWindow} className={'modalWrapper basket-focus'}>
            <div onClick={event => event.stopPropagation()} className={'basketWindow'}>
                <h2>Корзина</h2>
                <br/>
                {list.length
                    ? <>
                        {list.map(order => <Order key={order.bookId} {...order}  />)}
                        <h2 style={{fontWeight: 400, textAlign: "right", border: "none"}}>Итого: {getAllPrice(list)}</h2>
                        <Link onClick={showWindow} className={'submit-button'} to={'/order'}>Перейти к оформлению</Link>
                        <br/>
                        <p onClick={() => dispatch(clearBasket())} className={'message-neutral clear-basket'}>Отчистить корзину</p>
                    </>
                    : 'Пока пусто...'}
            </div>
        </div>
    );
};
