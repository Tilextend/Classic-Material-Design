

/*浮动操作按钮*/

document.querySelectorAll('.fab').forEach((element) => {
    element.addEventListener('mousedown', (event) => {
        if (event.button !== 0) {
            return;
        }
        element.classList.add('pressed');
    });
    element.addEventListener('mouseup', (event) => {
        element.classList.remove('pressed');
    });
});
