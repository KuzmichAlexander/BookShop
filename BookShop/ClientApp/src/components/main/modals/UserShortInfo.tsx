import React, {useEffect} from 'react';
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {useActions} from "../../../hooks/useActions";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {clearBasket} from "../../../redux/action-creators/books/books";

type UserShortInfoType = {
    showWindow: () => void;
}

export const UserShortInfo: React.FC<UserShortInfoType> = ({showWindow}) => {
    const {name, login, surname, email} = useTypeSelector(state => state.authUser);
    const {userLoguot} = useActions();
    const dispatch = useDispatch();

    useEffect(() => {

    }, [])

    const profileLogout = () => {
        //написать логику с чисткой локалстораджа
        console.log('почистил');
        userLoguot();
        dispatch(clearBasket());
    };



    return (
        <div onClick={showWindow} className={'modalWrapper'}>
            <div onClick={event => event.stopPropagation()} className={'UserInfoWindow'}>
                <p className={'info-title'}>{name} {surname}</p>
                <h3>{email}</h3>
                <Link className={'go-to-profile'} to={'/acc'}>Перейти в профиль</Link>
                <br/>
                <span onClick={profileLogout}>Выйти</span>
            </div>
        </div>
    );
};
