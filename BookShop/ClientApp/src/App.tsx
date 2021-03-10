import React, {useEffect} from 'react';
import {useTypeSelector} from "./hooks/useTypeSelector";
import {Nav} from "./components/header/Nav";
import {Main} from "./components/main/Main";
import {useActions} from "./hooks/useActions";
import {Footer} from "./components/footer/Footer";
import {token} from "./components/units/consts/consts";

function App() {
    const state = useTypeSelector(state => state);
    const { tokenUserAuth } = useActions();
    useEffect(() => {
        if (localStorage.getItem(token)) {

            // @ts-ignore
            const accessToken: string = localStorage.getItem(token);
            console.log(localStorage.getItem(token))
            tokenUserAuth(accessToken)
        }
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
