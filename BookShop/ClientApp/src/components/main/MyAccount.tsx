import {useTypeSelector} from "../../hooks/useTypeSelector";
import {Redirect} from "react-router-dom";
import React from "react";


export const MyAccount: React.FC = () => {
    const name = useTypeSelector(state => state.authUser.name);

    if (!name) {
        return <Redirect to={'/registration'}/>;
    }

    return (
        <div>
            <kbd>Здесь будет ЛК {name}</kbd>
        </div>
    );
};
