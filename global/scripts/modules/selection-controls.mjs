/*复选框*/

document.querySelectorAll('.checkbox input').forEach((element) => {
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
        element.parentNode.classList.remove('focused');
    });
    element.addEventListener('keyup', (event) => {
        if (event.key !== " " && event.key !== "Enter") {
            return;
        }
        checkboxSwitch(element);
    });
    element.addEventListener('click', (event) => {
        if (event.button !== 0) {
            return;
        }
        checkboxSwitch(element);
    });
});

function checkboxSwitch(element) {
    if (element.parentNode.classList.contains('checked')) {
        element.parentNode.classList.add('unchecked', 'to-unchecked');
        element.parentNode.classList.remove('checked', 'to-checked');
    } else {
        element.parentNode.classList.add('checked', 'to-checked');
        element.parentNode.classList.remove('unchecked', 'to-unchecked');
    }
}

/*单选按钮*/

let radioButtonName;

document.querySelectorAll('input[type=radio]').forEach((element) => {
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
        element.parentNode.classList.remove('focused');
    });
    element.addEventListener('keyup', (event) => {
        if (event.key !== " " && event.key !== "Enter") {
            return;
        }
        radioButtonSwitch(element);
    });
    element.addEventListener('click', (event) => {
        if (event.button !== 0) {
            return;
        }
        radioButtonSwitch(element);
    });
});

function radioButtonSwitch(element) {
    radioButtonName = element.getAttribute("name");
    document.querySelectorAll('input[name=' + radioButtonName + ']').forEach((element) => {
        if (element.parentNode.classList.contains('checked')) {
            element.parentNode.classList.add('unchecked', 'to-unchecked');
            element.parentNode.classList.remove('checked', 'to-checked');
        }
    });
    element.parentNode.classList.add('checked', 'to-checked');
    element.parentNode.classList.remove('unchecked', 'to-unchecked');
}


/*开关*/

let switchDragOffsetX;
let switchElement;
let swichThumbElement;
let mouseOriginX;
let thumbOriginX;

document.querySelectorAll('.switch input').forEach((element) => {
    element.addEventListener('mouseenter', () => {
        element.closest('.switch').classList.add('hovered');
    });
    element.addEventListener('mouseleave', () => {
        element.closest('.switch').classList.remove('hovered');
    });
    element.addEventListener('focus', () => {
        element.closest('.switch').classList.add('focused');
    });
    element.addEventListener('blur', () => {
        element.closest('.switch').classList.remove('focused');
    });
    element.addEventListener('keyup', (event) => {
        if (event.key !== " " && event.key !== "Enter") {
            return;
        }
        if (element.closest('.switch').classList.contains('on') == false) {
            element.closest('.switch').classList.add('on');
            element.parentNode.setAttribute("aria-checked", "true");
        } else {
            element.closest('.switch').classList.remove('on');
            element.parentNode.setAttribute("aria-checked", "false");
        }
    });
    element.addEventListener('mousedown', (event) => {
        switchElement = element.closest('.switch');
        swichThumbElement = element.parentNode;
        mouseOriginX = event.clientX;
        thumbOriginX = swichThumbElement.computedStyleMap().get('transform')[0].x.value;

        switchElement.addEventListener('mousemove', switchDrag);
    });
    element.addEventListener('mouseup', () => {
        switchElement.removeEventListener('mousemove', switchDrag);
        if (switchElement.classList.contains('dragged') == false) {
            if (switchElement.classList.contains('on')) {
                switchElement.classList.remove('on');
                swichThumbElement.setAttribute("aria-checked", "false");
            } else {
                switchElement.classList.add('on');
                swichThumbElement.setAttribute("aria-checked", "true");
            }
        }
        switchElement.classList.remove('dragged');
    });
});

function switchDrag() {
    if (switchElement.classList.contains('dragged') == false) {
        switchElement.classList.add('dragged');
    }
    switchDragOffsetX = event.clientX - mouseOriginX + thumbOriginX;
    switchElement.style.setProperty('--offset', switchDragOffsetX + 'px');
    if (switchDragOffsetX > 0) {
        switchElement.classList.add('on');
        swichThumbElement.setAttribute("aria-checked", "true");
    } else {
        switchElement.classList.remove('on');
        swichThumbElement.setAttribute("aria-checked", "false");
    }
}