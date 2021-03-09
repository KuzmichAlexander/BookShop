import {Route} from 'react-router';
import {Home} from "./landing/Home";
import {Calc} from "./Calc";
import {Catalog} from "./catalog/Catalog";
import {Register} from "./regAuth/Register";

export const Main: React.FC = () => {
    document.title = 'Главная';
    return (
        <main>
            <Route exact path='/' component={Home}/>
            <div style={{marginTop: '80px'}} className={'container'}>
                <Route exact path='/calc' component={Calc}/>
                <Route exact path='/catalog' component={Catalog}/>
            </div>
            <Route exact path='/registration' component={Register}/>
        </main>
    );
};
