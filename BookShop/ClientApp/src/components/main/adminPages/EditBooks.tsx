import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {CustomLabel} from "../../../utils/CustomLabel";
import {addAuthors, addCity, addEdition, addGenre} from "../../../DAL/api";
import {AddBookComponent} from "./AddBookComponent";
import {AddBooksInStorage} from "./AddBooksInStorage";
import {AddBookParams} from "./AddBookParams";

type vbType = {
    addbookparams: boolean;
    addbook: boolean;
    addbookintostorage: boolean;
}

export const EditBooks = () => {
    const [visible, setVisible] = useState<vbType>({
        addbookparams: false,
        addbook: false,
        addbookintostorage:false
    });
    document.title = "Редактирование ассортимента";

    const isAdmin = useTypeSelector(state => state.authUser.isAdmin);
    if(!isAdmin) return <Redirect to={'/catalog'} />

    const toggleWindows = (e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => {
        // @ts-ignore
        const id: string = e.target.id;
        // @ts-ignore
        setVisible({...visible, [id]: !visible[id]})
    }

    return (
        <div>
            <div className={'edit-description'}>
                <div className={visible.addbookparams ? 'triangle-opened' : 'triangle-closed'}></div>
                <h2 style={{display: 'block', cursor: 'pointer', width: '100%'}} id={'addbookparams'} onClick={toggleWindows}>Редактирования всякие разные (книжные конечно же)</h2>
            </div>
            <AddBookParams visible={visible.addbookparams} />
            <div className={'edit-description'}>
                <div className={visible.addbook ? 'triangle-opened' : 'triangle-closed'}></div>
                <h2 style={{display: 'block', cursor: 'pointer', width: '100%'}} id={'addbook'} onClick={toggleWindows}>Добавление книги</h2>
            </div>
            <AddBookComponent visible={visible.addbook} />
            <div className={'edit-description'}>
                <div className={visible.addbook ? 'triangle-opened' : 'triangle-closed'}></div>
                <h2 style={{display: 'block', cursor: 'pointer', width: '100%'}} id={'addbookintostorage'} onClick={toggleWindows}>Добавление книг на склад</h2>
            </div>
            <AddBooksInStorage visible={visible.addbookintostorage} />
        </div>
    );
};
