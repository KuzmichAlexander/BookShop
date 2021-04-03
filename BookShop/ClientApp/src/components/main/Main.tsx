import {Route} from 'react-router';
import {Home} from "./landing/Home";
import {MyAccount} from "./userAccount/MyAccount";
import {Catalog} from "./catalog/Catalog";
import {Register} from "./regAuth/Register";
import {EditBooks} from "./adminPages/EditBooks";
import {Metrics} from "./adminPages/Metrics/Metrics";
import {OrderPage} from "./OrderPage";

export const Main: React.FC = () => {
    document.title = 'Главная';
    return (
        <main>
            <Route exact path='/' component={Home}/>
            <div style={{marginTop: '80px'}} className={'container'}>
                <Route exact path='/acc' component={MyAccount}/>
                <Route exact path='/catalog' component={Catalog}/>
                <Route exact path='/order' component={OrderPage}/>

                {/*----закрытые для обычных ребят компоненты----*/}
                <Route exact path='/editbooks' component={EditBooks}/>
                <Route exact path='/metrics' component={Metrics}/>


            </div>
            <Route exact path='/registration' component={Register}/>
        </main>
    );
};
