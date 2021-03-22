import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {CustomLabel} from "../../units/CustomLabel";
import {addAuthors, addCity, addEdition, addGenre} from "../../../DAL/api";
import {AddBookComponent} from "./AddBookComponent";
import {AddBooksInStorage} from "./AddBooksInStorage";
import {AddBookParams} from "./AddBookParams";

export const EditBooks = () => {
    document.title = "Редактирование ассортимента";

    //const isAdmin = useTypeSelector(state => state.authUser.isAdmin);
    //if(!isAdmin) return <Redirect to={'/catalog'} />


    return (
        <div>
            <AddBookParams />
            <AddBookComponent />
            <AddBooksInStorage />
        </div>
    );
};
