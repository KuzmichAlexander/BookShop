import React from 'react';
import { Redirect } from 'react-router-dom';
import {useTypeSelector} from "../../../hooks/useTypeSelector";

export const EditBooks = () => {
    const isAdmin = useTypeSelector(state => state.authUser.isAdmin);
    if(!isAdmin) return <Redirect to={'/catalog'} />
    return (
        <div>
            Редактирования всякие разные (книжные конечно же)
        </div>
    );
};
