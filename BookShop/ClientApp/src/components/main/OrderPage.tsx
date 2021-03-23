import React, {useEffect, useState} from 'react';
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {Redirect} from "react-router-dom";
import {getAllPrice} from "./modals/Basket";
import {Order, renderItems} from "../units/OrderElement";
import {mounthes} from "../units/consts/consts";
import {getCities} from "../../DAL/api";
import {PayModal} from "./modals/PayModal";
import {Loader} from "../units/Loader";

export const OrderPage = () => {
    const isAuth = useTypeSelector(state => state.authUser.name);
    const list = useTypeSelector(state => state.booksBasket.orderList);
    const [city, setCity] = useState<string>('');
    const [citiesArray, setCitiesArray] = useState<string[]>([]);
    const [fetchCityFlag, setFetchCityFlag] = useState<boolean>(false);

    const [emptyCityWarning, setEmptyCityWarning] = useState<boolean>(false);
    const [payModal, setPayModal] = useState<boolean>(false);


    useEffect(() => {
        fetchCities();
    }, [])

    const fetchCities = async () => {
        const cities = await getCities();
        setFetchCityFlag(true);
        setCitiesArray(cities);
    }

    const fetchOrder = () => {
        //доделать операцию покупок

    }

    // if (!isAuth) {
    //     return <Redirect to={'/registration'}/>
    // }

    const changeCity = (e: any) => {
        setEmptyCityWarning(false);
        setCity(e.target.value);
    }

    const goToPay = () => {
        if (!city) {
            setEmptyCityWarning(true);
            return;
        }
        changeModal();
    }

    const changeModal = () => {
        setPayModal(!payModal);
    }

    const date = new Date();
    return (
        <>
            <h2>Оформление заказа</h2>
            <br/>
            {list.map(order => <Order key={order.bookId} {...order}  />)}
            <h2 style={{fontWeight: 400, textAlign: "right", border: "none"}}>К оплате: {getAllPrice(list)}</h2>
            <p className={'order-info'}>Оринтировочное время
                доставки: <u> {new Date(date.setHours(96)).getDate()}-{new Date(date.setHours(140)).getDate()} {mounthes[new Date(date.setHours(140)).getUTCMonth()]}</u>
            </p>
            <p className={'order-info'}>Выбирите город доставки:</p>
            <input list="data" type="text" value={city} className={'data-list'} onChange={changeCity}/>
            {fetchCityFlag ?
                <datalist id={"data"}>
                    {renderItems(citiesArray)}
                </datalist> :
                <p>Подгружаем города...</p>
            }
            {emptyCityWarning ?
                <p className={'message-warning-mini'}>Перед оплатой, необходимо выбрать город доставки</p> : null}
            <button onClick={goToPay} className={'submit-button'}>Перейти к оплате</button>
            {payModal ? <PayModal city={city} changeModal={changeModal}/> : null}

        </>
    );
}
