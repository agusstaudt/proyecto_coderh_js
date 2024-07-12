
document.addEventListener('DOMContentLoaded', function() {
    const navButton = document.querySelector('.nav_slide_button');
    const navMenu = document.querySelector('.pull');

    navButton.addEventListener('click', function(event) {
        event.preventDefault();
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
});
