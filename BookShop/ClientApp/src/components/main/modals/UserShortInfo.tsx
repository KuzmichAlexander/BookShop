import React from 'react';
import {useTypeSelector} from "../../../hooks/useTypeSelector";

export const UserShortInfo = () => {
    const {name, login, surname, email} = useTypeSelector(state => state.authUser);

    const userLogout = () => {

        //написать логику с чисткой локалстораджа
    }

    const profileEdit = () => {

    }

    return (
        <div className={'UserInfoWindow'}>
            <p>{name} {surname}</p>
            <br/>
            <h3>{email}</h3>
            <span onClick={userLogout}>Редактировать профиль</span>
            <br/>
            <br/>
            <span onClick={profileEdit}>Выйти</span>
        </div>
    );
};
