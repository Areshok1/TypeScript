const openModalBtn = document.getElementById('open-modal-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('modal-overlay');

openModalBtn.addEventListener('click', () => {
    modal.classList.add('show');
    modalOverlay.style.display = 'block';
});

closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300); // Затримка для плавного закриття
    modalOverlay.style.display = 'none';
});
