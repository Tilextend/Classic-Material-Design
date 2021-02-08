/*文本框*/

document.querySelectorAll('.text-field input[type=text]').forEach((element) => {
    element.addEventListener('mouseenter', () => {
        element.parentNode.classList.add('hovered');
    });
    element.addEventListener('mouseleave', () => {
        element.parentNode.classList.remove('hovered');
    });
    element.addEventListener('focus', () => {
        element.parentNode.classList.add('focused');
    });
    element.addEventListener('blur', () => {
        if (element.value.length !== 0) {
            element.parentNode.classList.add('typed');
        } else {
            element.parentNode.classList.remove('typed');
        }
        element.parentNode.classList.remove('focused');
    });
    element.addEventListener('click', (event) => {
        element.parentNode.style.setProperty('--origin-x', event.offsetX + 'px');
    });
});