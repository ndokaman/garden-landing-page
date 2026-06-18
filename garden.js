const label = document.querySelector('.center-hover-label');
document.querySelectorAll('.bottom a').forEach(a => {
    a.addEventListener('mouseenter', () => {
        label.textContent = a.textContent;
        label.classList.add('visible');
    });
    a.addEventListener('mouseleave', () => {
        label.classList.remove('visible');
    });
});
