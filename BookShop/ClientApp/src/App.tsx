import React, {useEffect} from 'react';
import {useTypeSelector} from "./hooks/useTypeSelector";
import {Nav} from "./components/header/Nav";
import {Main} from "./components/main/Main";
import {useActions} from "./hooks/useActions";
import {Footer} from "./components/footer/Footer";
import axios from "axios";

function App() {
    const state = useTypeSelector(state => state);
    const { userAuth, fetchBooks } = useActions()
    useEffect(() => {
        //fetchBooks();
        //userAuth();
        const url: string = document.location.origin;
        // @ts-ignore
        const data = axios.post('https://localhost:44391/api/Auth', {login: 'kekw', id: 21, password: 'kekw'})
        console.log(data)
    }, []);

    //console.log(state)
    return (
        <>
            <Nav />
            <Main />
            <Footer />
        </>
    );
}

export default App;
