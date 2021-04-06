import React, {useEffect, useState} from 'react';
import {useTypeSelector} from "../../../../hooks/useTypeSelector";
import {Redirect} from "react-router-dom";
import {fetchMoneyMetrics} from "../../../../DAL/api";
import CountUp from "react-countup";
import {Chart} from "./Chart";
import {FullBooksInfo} from "./FullBooksInfo";
import {FullCitiesInfo} from "./FullCitysInfo";

export type chartType = {
    date: string;
    count: number;
}

export type topDataType = {
    name: string;
    count: number;
}

type moneyType = {
    booksSoldAllTime: number;
    booksSoldLastDay: number;
    booksSoldLastMonth: number;
    moneyEarnedLastDay: number;
    moneyEarnedLastMonth: number;
    moneyEarnedAllTime: number;
    chartDataMoney: chartType[];
    chartDataBooksCount: chartType[];
    topDataBooks: topDataType;
    topDataCities: topDataType;
    topDataAuthor: topDataType;
    allBooks: bookType[];
    allCities: cityType[];
}

export type cityType = {
    value: string;
    count: number;
    place: number;
}

export type bookType = {
    name: string;
    count: number;
    place: number;
    imageURL: string;
    price: number;
    edition: string;
    authors: string[];
    genres: string[];
}

const initMoney: moneyType = {
    booksSoldAllTime: 0,
    booksSoldLastDay: 0,
    booksSoldLastMonth: 0,
    moneyEarnedLastDay: 0,
    moneyEarnedLastMonth: 0,
    moneyEarnedAllTime: 0,
    chartDataMoney: [],
    chartDataBooksCount: [],
    topDataBooks: {name: '', count: 0},
    topDataCities: {name: '', count: 0},
    topDataAuthor: {name: '', count: 0},
    allBooks: [],
    allCities: [],
}

type vbType = {
    allBooksStats: boolean;
    allCitiesStats: boolean;
}

export const Metrics = () => {
    document.title = 'Статистика';
    //const isAdmin = useTypeSelector(state => state.authUser.isAdmin);
    const [moneyMetrics, setMoneyMetrics] = useState<moneyType>(initMoney);
    //if(!isAdmin) return <Redirect to={'/catalog'} />

    const [visible, setVisible] = useState<vbType>({
        allBooksStats: false,
        allCitiesStats: false
    });

    useEffect(() => {
        getMetrics()
    }, []);

    const getMetrics = async () => {
        const data = await fetchMoneyMetrics();
        setMoneyMetrics(data);
    }

    const toggleWindows = (e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => {
        // @ts-ignore
        const id: string = e.target.id;
        // @ts-ignore
        setVisible({...visible, [id]: !visible[id]});
    }

    return (
        <>
            <h2>Статистика по продажам</h2>
            <br/>
            <h3>Выручка за период, рублей:</h3>
            <div className={'earn-money-container'}>
                <div className={'earn-money-elem border-green'}>
                    <p>Сутки</p>
                    <CountUp separator={','} end={moneyMetrics.moneyEarnedLastDay} start={0}/>
                </div>
                <div className={'earn-money-elem border-blue'}>
                    <p>Месяц</p>
                    <CountUp separator={','} end={moneyMetrics.moneyEarnedLastMonth} start={0}/>
                </div>
                <div className={'earn-money-elem border-red'}>
                    <p>Весь период</p>
                    <CountUp separator={','} end={moneyMetrics.moneyEarnedAllTime} start={0}/>
                </div>
            </div>
            <h3>Выручка по дням в течении месяца:</h3>
            <Chart bgc={'rgba(75, 192, 192, .4)'} border={'rgba(75, 192, 192, 1)'} data={moneyMetrics.chartDataMoney} label={'Выручка от продажи за день'}/>
            <h3>Продано книг, штук:</h3>
            <div className={'earn-money-container'}>
                <div className={'earn-money-elem border-green'}>
                    <p>Сутки</p>
                    <CountUp separator={','} end={moneyMetrics.booksSoldLastDay} start={0}/>
                </div>
                <div className={'earn-money-elem border-blue'}>
                    <p>Месяц</p>
                    <CountUp separator={','} end={moneyMetrics.booksSoldLastMonth} start={0}/>
                </div>
                <div className={'earn-money-elem border-red'}>
                    <p>Весь период</p>
                    <CountUp separator={','} end={moneyMetrics.booksSoldAllTime} start={0}/>
                </div>
            </div>
            <Chart data={moneyMetrics.chartDataBooksCount} label={'Продано книг в день'} border={'rgba(255, 87, 51, 1)'} bgc={'rgba(255, 87, 51, .4)'}/>
            <h3>Самые самые:</h3>
            <div className={'earn-money-container'}>
                <div className={'earn-money-elem border-purple'}>
                    <p>Популярная книга</p>
                    <span className={'the-most-element'}>'{moneyMetrics.topDataBooks.name}'</span>
                    <h4>Проданно экземпляров:</h4>
                    <CountUp separator={','} end={moneyMetrics.topDataBooks.count} start={0}/>
                </div>
                <div className={'earn-money-elem border-purple'}>
                    <p>Читающий город</p>
                    <span className={'the-most-element'}>{moneyMetrics.topDataCities.name}</span>
                    <h4>Заказано книг:</h4>
                    <CountUp separator={','} end={moneyMetrics.topDataCities.count} start={0}/>
                </div>
                <div className={'earn-money-elem border-purple'}>
                    <p>Популярный автор</p>
                    <span className={'the-most-element'}>{moneyMetrics.topDataAuthor.name}</span>
                    <h4>Его книг заказано:</h4>
                    <CountUp separator={','} end={moneyMetrics.topDataAuthor.count} start={0}/>
                </div>
            </div>
            <h3>Предпочитаемые жанры</h3>
            {/*/!*<PieChart data={}/>*!/ //доделать печеньку*/}
            <div className={'edit-description'}>
                <div className={visible.allBooksStats ? 'triangle-opened' : 'triangle-closed'}></div>
                <h2 style={{display: 'block', cursor: 'pointer', width: '100%'}} id={'allBooksStats'} onClick={toggleWindows}>Полная статистика по проданным книгам</h2>
            </div>
            <FullBooksInfo data={moneyMetrics.allBooks} visible={visible.allBooksStats} />
            <div className={'edit-description'}>
                <div className={visible.allCitiesStats ? 'triangle-opened' : 'triangle-closed'}></div>
                <h2 style={{display: 'block', cursor: 'pointer', width: '100%'}} id={'allCitiesStats'} onClick={toggleWindows}>Полная статистика по городам</h2>
            </div>
            <FullCitiesInfo data={moneyMetrics.allCities}  visible={visible.allCitiesStats} />
        </>
    );
};

