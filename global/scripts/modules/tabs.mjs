/*标签栏*/

document.querySelectorAll('.tab-bar button').forEach((element) => {
    element.addEventListener('click', () => {
        if (element.classList.contains('activated')) {
            return;
        }

        if (element.parentNode.querySelector('.previous-activated') !== null) {
            element.parentNode.querySelector('.previous-activated').classList.remove('previous-activated');
        }

        element.parentNode.classList.remove('left', 'right');
        previousActivatedElement = element.parentNode.querySelector('.activated');


        if (previousActivatedElement.compareDocumentPosition(element) == 2) {
            element.parentNode.classList.add('left');
        } else {
            element.parentNode.classList.add('right');
        }
        previousActivatedElement.classList.add('previous-activated');
        previousActivatedElement.classList.remove('activated');
        element.classList.add('activated');

        previousActivatedElement.addEventListener('animationend', (event) => {
            event.target.classList.remove('previous-activated');
        });
    });
});