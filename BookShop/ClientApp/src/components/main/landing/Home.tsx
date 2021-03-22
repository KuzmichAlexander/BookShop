import landing from '../../../images/landing/landing.jpg';
import {Link} from "react-router-dom";
import brain from '../../../images/landing/brain.svg';
import concentration from '../../../images/landing/concentration.svg';
import cake from '../../../images/landing/cake.svg';

export const Home: React.FC = () => {
    document.title = "WildBooki";

    return (
        <>
            <div className={'landing-wrapper'}>
                <img src={landing} className={'landing-image'} alt="image-with-books"/>
                <div className={'container'}>
                    <div className={'landing-center'}>
                        <h1>Познай всю силу книг</h1>
                        <br/>
                        <h1>Прямо сейчас</h1>
                    </div>
                    <div className={'landing-bottom'}>
                        <span className={'bite-to-buy'}>выбери книгу на свой вкус и цвет на WILDBOOKI</span>
                        <Link className={'link-button'} to={'/books'}>Каталог</Link>
                    </div>
                </div>
            </div>
            <div className={'container'}>
                <div className={'landing-about'}>
                    <h1>Почему именно книги?</h1>
                    <div className={'landing-reasons'}>
                        <div className={'landing-reason'}>
                            <img style={{width: '150px', height: '150px', opacity: '0.4'}} src={brain} alt="мозгусики"/>
                            <h3>развивает мышление</h3>
                            <p>блягодаря книгам, мозг начнёт работать в полную силу и вам откроется безграничный простор бесконечно вечно фрактального подобия</p>
                        </div>
                        <div className={'landing-reason'}>
                            <img style={{width: '150px', height: '150px', opacity: '0.4'}} src={concentration} alt="мозгусики"/>
                            <h3>повышает концентрацию</h3>
                            <p>научно доказано, что чтение книг усиливает концентрацию на одной вещи в разы</p>
                        </div>
                        <div className={'landing-reason'}>
                            <img style={{width: '150px', height: '150px', opacity: '0.4'}} src={cake} alt="мозгусики"/>
                            <h3>обычный тортик</h3>
                            <p>не знаю что вставить третьим пунктом, вставлю тортик :)</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};
