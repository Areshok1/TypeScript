import { ButtonElement, HTMLElementType } from '../types/typese';

// Змінні для елементів, що реагують на прокрутку
const header: HTMLElementType = document.querySelector('header') as HTMLElementType;
const scrollTopBtn: ButtonElement = document.getElementById('scroll-top-btn') as ButtonElement;

// Обробник події прокрутки сторінки
export function handleScroll(): void {
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        scrollTopBtn.style.display = 'block';
    } else {
        header.style.backgroundColor = '#333';
        scrollTopBtn.style.display = 'none';
    }
}

// Прокрутка до початку сторінки
export function scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Ініціалізація подій для прокрутки
export function initScrollEvents(): void {
    window.addEventListener('scroll', handleScroll);
    scrollTopBtn.addEventListener('click', scrollToTop);
}
