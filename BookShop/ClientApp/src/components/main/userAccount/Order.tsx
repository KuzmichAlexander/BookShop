import React from 'react';
import {arrayParamsParse, mounthes} from "../../units/consts/consts";

type OrderType = {
    name: string;
    price: number;
    authors: string[];
    orderDate: string;
    resievedDate: string;
    count: number;
    imageURL: string;
    isResieved: boolean;
}

export const Order: React.FC<OrderType> = ({
                                               name,
                                               isResieved,
                                               imageURL,
                                               count,
                                               authors,
                                               price,
                                               orderDate,
                                               resievedDate
                                           }) => {
    return (
        <div className={'order'}>
            <div className={'order-image'}>
                <img src={imageURL} alt="фоточка"/>
            </div>
            <div>
                <div className="order-description">
                    <span>Название:</span>
                    <p>{name}</p>
                </div>
                <div className="order-description">
                    <span>Автор (-ы):</span>
                    <p>{arrayParamsParse(authors)}</p>
                </div>
                <div className="order-description">
                    <span>Кол-во:</span>
                    <p>{count}</p>
                </div>
                <div className="order-description">
                    <span>Цена за шт.:</span>
                    <p>{price} ₽</p>
                </div>
                <div className="order-description">
                    <span>Дата покупки:</span>
                    <p>{parseDate(orderDate)}</p>
                </div>
                <div className="order-description">
                    <span>Дата доставки:</span>
                    <p>{parseDate(resievedDate)}</p>
                </div>
                <div className="order-description">
                    <span>Статус товара:</span>
                    {isResieved
                        ? <p className={'message-success-mini'}>Получен</p>
                        : <p className={'message-warning-mini'}>Ожидается</p>}
                </div>
            </div>
        </div>
    );
};

const parseDate = (date: string) => {
    const dateTime = new Date(date);
    let dt = '';
    dt += dateTime.getDate() + ' ' + mounthes[dateTime.getMonth()];
    dt += ' ' + dateTime.getFullYear() + ' г.';
    return dt;
};
