import React from 'react';
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {useActions} from "../../../hooks/useActions";

type UserShortInfoType = {
    showWindow: () => void;
}

export const UserShortInfo: React.FC<UserShortInfoType> = ({showWindow}) => {
    const {name, login, surname, email} = useTypeSelector(state => state.authUser);
    const {userLoguot} = useActions();
    const profileLogout = () => {
        //написать логику с чисткой локалстораджа
        console.log('почистил');
        userLoguot();
    }

    const profileEdit = () => {

    }

    return (
        <div onClick={showWindow} className={'modalWrapper'}>
            <div onClick={event => event.stopPropagation()} className={'UserInfoWindow'}>
                <p className={'info-title'}>{name} {surname}</p>
                <br/>
                <h3>{email}</h3>
                <span onClick={profileEdit}>Редактировать профиль</span>
                <br/>
                <br/>
                <span onClick={profileLogout}>Выйти</span>
            </div>
        </div>
    );
};
