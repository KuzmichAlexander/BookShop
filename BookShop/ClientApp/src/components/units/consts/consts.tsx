export const baseUrl: string = document.location.origin;

export const token = 'token';

const selecetNames = ['Роман', 'Приключения', 'Ужасы', 'Программирование'];

export const createSelect = (names: string[] = selecetNames) => names.map(name => <option key={name} value={name}>{name}</option>);

export const mounthes = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
