import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {Redirect} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {fetchOrders} from "../../../DAL/api";
import {OrderList} from "./OrderList";
import {AccountInfo} from "./AccountInfo";

export const MyAccount: React.FC = () => {
    const name = useTypeSelector(state => state.authUser.name);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            const data = await fetchOrders(token);
            setOrders(data);
        }
    }

    const getAllSum = () => {
        return orders.reduce((acc, order) => {
            // @ts-ignore
            return acc + order.count * order.price;
        } ,0)
    }

    const getBooksCount = () => {
        return orders.reduce((acc, order) => {
            // @ts-ignore
            return acc + order.count;
        } ,0)
    }
    // if (!name) {
    //     return <Redirect to={'/registration'}/>;
    // }

    return (
        <>
            <h2>Здраствуйте, {name}!</h2>
            <br/>
            <AccountInfo />

            <h3 style={{textDecoration:'underline'}}>Статистика:</h3>
            <br/>
            <p className={'acc-stats'}>Сумма выкупа: {getAllSum()} ₽</p>
            <p className={'acc-stats'}>Книг куплено: {getBooksCount()} штук</p>
            {orders.length
                ? <OrderList orders={orders.reverse()}/>
                : <p className={'acc-stats'}>Вы ещё не заказывали книг на нашем сайте :(</p>}

        </>
    );
}


