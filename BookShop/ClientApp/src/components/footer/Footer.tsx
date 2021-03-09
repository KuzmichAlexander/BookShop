import vk from '../../images/footer-icons/vk.svg';
import dis from '../../images/footer-icons/discord.svg';
import git from '../../images/footer-icons/github.svg';
import insta from '../../images/footer-icons/instagram.svg';
import telega from '../../images/footer-icons/telegram.svg';
import unsplash from '../../images/footer-icons/unsplash.svg';
import flatico from '../../images/footer-icons/flaticon.svg';

export const Footer: React.FC = () => {
    return (
        <footer>
            <div className={'container'}>
                <div className={'socials'}>
                    <h3>Мои контакты:</h3>
                    <a className={'social'} href="https://vk.com/azure_drake">
                        <img src={vk} alt='иконка вк'/>
                        <p>Vkontakte</p>
                    </a>
                    <a className={'social'} href="https://vk.com/azure_drake">
                        <img src={dis} alt='иконка диса'/>
                        <p>Discord</p>
                    </a>
                    <a className={'social'} href="https://vk.com/azure_drake">
                        <img src={git} alt='иконка гита'/>
                        <p>Git Hub</p>
                    </a>
                    <a className={'social'} href="https://vk.com/azure_drake">
                        <img src={insta} alt='иконка инсты'/>
                        <p>Instagram</p>
                    </a>
                    <a className={'social'} href="https://vk.com/azure_drake">
                        <img src={telega} alt='иконка вк'/>
                        <p>Telegram</p>
                    </a>
                </div>
                <div className={'content-sourse'}>
                    <h3>Источники контента:</h3>
                    <a className={'social'} href="https://unsplash.com/">
                        <img  src={unsplash} alt='иконка unsplash'/>
                        <p>Фотографии</p>
                    </a>
                    <a className={'social'} href="https://www.flaticon.com/">
                        <img src={flatico} alt='иконка flatico'/>
                        <p>svg иконки</p>
                    </a>
                </div>
                <div className={'discription'}>
                    <p>Домашняя работа по дисциплине "Управление данными"</p>
                    <br/>
                    <hr/>
                    <h3>created by sanay152</h3>
                    <span>all rights didn't reserve</span>
                </div>
            </div>
            <hr/>
        </footer>
    );
};
