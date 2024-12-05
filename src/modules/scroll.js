// Обробник події прокрутки сторінки
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        scrollTopBtn.style.display = 'block'; // Показуємо кнопку "Прокрутити вгору"
    } else {
        header.style.backgroundColor = '#333';
        scrollTopBtn.style.display = 'none'; // Ховаємо кнопку
    }
});

// Функція для прокрутки до початку сторінки
const scrollTopBtn = document.getElementById('scroll-top-btn');

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
