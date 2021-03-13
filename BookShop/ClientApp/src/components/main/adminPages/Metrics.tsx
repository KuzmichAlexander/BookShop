import React from 'react';
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {Redirect} from "react-router-dom";

export const Metrics = () => {
    const isAdmin = useTypeSelector(state => state.authUser.isAdmin);
    if(!isAdmin) return <Redirect to={'/catalog'} />

    return (
        <div>
            Разные всякие метрики
        </div>
    );
};

