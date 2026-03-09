const next = /** @type {HTMLButtonElement} */ (document.querySelector('.next'));
const back = /** @type {HTMLButtonElement} */ (document.querySelector('.back'));
const reset = /** @type {HTMLButtonElement} */ (
    document.querySelector('.back-to-start')
);

let current_section = 0;

next.addEventListener('click', () => {
    navigate(current_section + 1);
});

back.addEventListener('click', () => {
    navigate(current_section - 1);
});

reset.addEventListener('click', () => {
    navigate(0);
});

/**
 * @param {number} section
 */
function navigate(section) {
    if (section === current_section) {
        return;
    }
    articles[current_section].classList.remove('current');
    articles[(current_section = section)].classList.add('current');
    if (current_section === articles.length - 1) {
        next.classList.add('hidden');
    } else {
        next.classList.remove('hidden');
    }
    if (current_section === 0) {
        back.classList.add('hidden');
    } else {
        back.classList.remove('hidden');
    }
}