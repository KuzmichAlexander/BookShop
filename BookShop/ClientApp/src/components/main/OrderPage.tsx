import React, {useEffect, useState} from 'react';
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {Redirect} from "react-router-dom";
import {getAllPrice} from "./modals/Basket";
import {Order, renderItems} from "../../utils/OrderElement";
import {mounthes} from "../../utils/consts/consts";
import {getCities, orderOperation} from "../../DAL/api";
import {PayModal} from "./modals/PayModal";
import {clearBasket} from "../../redux/action-creators/books/books";
import {useDispatch} from "react-redux";

export const OrderPage = () => {
    const isAuth = useTypeSelector(state => state.authUser.name);
    const list = useTypeSelector(state => state.booksBasket.orderList);
    const [city, setCity] = useState<string>('');
    const [citiesArray, setCitiesArray] = useState<string[]>([]);
    const [fetchCityFlag, setFetchCityFlag] = useState<boolean>(false);

    const [emptyCityWarning, setEmptyCityWarning] = useState<boolean>(false);
    const [payModal, setPayModal] = useState<boolean>(false);

    const [serverAnswer, setServerAnswer] = useState<string>('');

    const dispatch = useDispatch();




    useEffect(() => {
        isAuth && fetchCities();

    }, []);

    if (!isAuth) {
        return <Redirect to={'/registration'}/>;
    }

    async function fetchCities()  {
        const cities = await getCities();
        setFetchCityFlag(true);
        setCitiesArray(cities);
    }

    const fetchOrder = async () => {
        //доделать операцию покупок
        const token = localStorage.getItem('token');
        if (token) {
            const orderOperationResponce = await orderOperation(list, city, token);
            setServerAnswer(orderOperationResponce);
            if (!orderOperationResponce.includes('уже')) {
                dispatch(clearBasket());
                localStorage.removeItem('booksInBasket');
            }
        }
    }


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

            {!serverAnswer ?
                <>
                    <p className={'order-info'}>Выбирите город доставки:</p>
                    <input list="data" type="text" value={city} className={'data-list'} onChange={changeCity}/>
                    {fetchCityFlag ?
                        <datalist id={"data"}>
                            {renderItems(citiesArray)}
                        </datalist> :
                        <p>Подгружаем города...</p>
                    }
                    <button onClick={goToPay} className={'submit-button'}>Перейти к оплате</button>
                </>
                : <p>Доставка в {city}</p>
            }

            {emptyCityWarning ?
                <p className={'message-warning-mini'}>Перед оплатой, необходимо выбрать город доставки</p> : null}
            {serverAnswer ?
                <>
                    <p className={serverAnswer.includes('уже') ? "message-warning" : "message-success"}>{serverAnswer}</p>
                    <p className={'clear-basket'}>Все подробности находятся в личном кабинете</p>
                </>
                 : null}

            {payModal ? <PayModal fetchOrder={fetchOrder} city={city} changeModal={changeModal}/> : null}
        </>
    );
}
