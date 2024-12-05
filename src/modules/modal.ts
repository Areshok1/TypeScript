import { ButtonElement, HTMLElementType } from '../types/typese';

// Змінні для модального вікна
const openModalBtn: ButtonElement = document.getElementById('open-modal-btn') as ButtonElement;
const closeModalBtn: ButtonElement = document.getElementById('close-modal-btn') as ButtonElement;
const modal: HTMLElementType = document.getElementById('modal') as HTMLElementType;
const modalOverlay: HTMLElementType = document.getElementById('modal-overlay') as HTMLElementType;

// Функція відкриття модального вікна
export function openModal(): void {
    modal.classList.add('show');
    modalOverlay.style.display = 'block';
}

// Функція закриття модального вікна
export function closeModal(): void {
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
    modalOverlay.style.display = 'none';
}

// Ініціалізація подій для модального вікна
export function initModalEvents(): void {
    openModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
}
