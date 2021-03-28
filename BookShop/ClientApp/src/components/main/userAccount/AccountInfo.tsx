import React, {useEffect, useState} from 'react';
import {fetchUserInfo} from "../../../DAL/api";
import {useTypeSelector} from "../../../hooks/useTypeSelector";

export const AccountInfo = () => {
    const user = useTypeSelector(state => state.authUser);

    useEffect(() => {

    }, []);




    return (
        <>
            {user ?
                <div>
                    <h3 style={{textDecoration:'underline'}}>Информация о аккаунте:</h3>
                    <div className="user-description">
                        <span>Имя</span>
                        <p>{user.name}</p>
                    </div>
                    <div className="user-description">
                        <span>Фамилия</span>
                        <p>{user.surname}</p>
                    </div>
                    <div className="user-description">
                        <span>Эл. Почта</span>
                        <p>{user.email}</p>
                    </div>
                </div>
                : null
            }
        </>

    );
}
