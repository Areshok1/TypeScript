import { initModalEvents } from './modules/Modal.js'; 
import { initScrollEvents } from './modules/Scroll.js';
import { fetchData } from './modules/Fetch.js';

initModalEvents(); // Ініціалізація подій для модального вікна.
initScrollEvents(); // Ініціалізація подій для прокрутки.
fetchData(); // Виклик функції для отримання даних.
