export const baseUrl: string = document.location.origin;

export const token = 'token';

export const createSelect = (names: string[]) => names.map(name => <option key={name} value={name}>{name}</option>);

export const mounthes = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

const backgroundColors = [
    "rgba(255, 0, 0, .5)",
    "rgba(0, 255, 0, .5)",
    "rgba(255,123,0,0.7)",
    "rgba(0,255,255,0.5)",
    "rgba(0,0,255,0.5)",
    "rgba(255,0,255,0.5)",
    "rgba(119,207,67,0.5)",
    "rgba(176,81,186,0.7)",
    "rgb(195,42,108, .6)",
];

export const getBGColors = (count: number) => {
    const colors = [...backgroundColors.sort(() => 0.5 - Math.random())];
    colors.length = count;
    return colors;
};

export const arrayParamsParse = (items: string[] = ['пока пусто... данные подгружаются']) :string => {
    let str: string = ' ';
    items.forEach(item => {
        str += item + ' / '
    });
    str = str.slice(0, str.length - 2);
    return str;
}
