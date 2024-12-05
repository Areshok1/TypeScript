import { initModalEvents } from './modules/Modal';
import { initScrollEvents } from './modules/Scroll';
import { fetchData } from './modules/Fetch';

initModalEvents(); // Ініціалізація подій для модального вікна.
initScrollEvents(); // Ініціалізація подій для прокрутки.
fetchData(); // Виклик функції для отримання даних.
