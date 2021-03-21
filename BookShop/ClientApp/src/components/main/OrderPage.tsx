import React, {useEffect, useState} from 'react';
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {Link, Redirect} from "react-router-dom";
import {Basket, getAllPrice} from "./modals/Basket";
import {Order, renderItems} from "../units/OrderElement";
import {mounthes} from "../units/consts/consts";
import {getCities} from "../../DAL/api";
import {log} from "util";

export const OrderPage = () => {
    const isAuth = useTypeSelector(state => state.authUser.name);
    const list = useTypeSelector(state => state.booksBasket.orderList);
    const [city, setCity] = useState<string>('');
    const [citiesArray, setCitiesArray] = useState<string[]>([]);
    const [fetchCityFlag, setFetchCityFlag] = useState<boolean>(false);

    useEffect(  () => {
        fetchCities();
    }, [])

    const fetchCities = async () => {
        const cities = await getCities();
        setFetchCityFlag(true);
        setCitiesArray(cities);
        console.log(cities);
    }

    if (!isAuth) {
        return <Redirect to={'/registration'}/>
    }

    const changeCity = (e: any) => {
        setCity(e.target.value);
    }

    const date = new Date();
    return (
        <>
            <h2>Оформление заказа</h2>
            <br/>
            {list.map(order => <Order key={order.bookId} {...order}  />)}
            <h2 style={{fontWeight: 400, textAlign: "right", border: "none"}}>К оплате: {getAllPrice(list)}</h2>
            <p className={'order-info'}>Оринтировочное время
                доставки: <u> {new Date(date.setHours(96)).getDate()}-{new Date(date.setHours(140)).getDate()} {mounthes[new Date(date.setHours(140)).getUTCMonth() - 1]}</u></p>
            <p className={'order-info'}>Выбирите город доставки:</p>
            <input list="data" type="text" value={city} className={'data-list'} onChange={changeCity}/>
            {fetchCityFlag ?
                <datalist id={"data"}>
                    {renderItems(citiesArray)}
                </datalist> :
                <p>Подгружаем города...</p>
            }
            <button className={'submit-button'}>Перейти к оплате</button>
        </>
    );
};
