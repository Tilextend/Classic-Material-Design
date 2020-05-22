
/*涟漪*/
let rippleTouchCalled = false;
let rippleKeyboardCalled = false;
let rippleTapTimer;

document.querySelectorAll('*[states], button').forEach((element) => {
    let div = document.createElement('div');
    div.className = 'ripples';
    element.appendChild(div);

    element.addEventListener('touchstart', (event) => {
        rippleTouchCalled = true;
        rippleTouchCanceled = false;
        rippleTapTimer = setTimeout(() => {
            rippleForeground(element, event);
            if (rippleTouchCanceled == false) {
                element.classList.add('pressed');
            }
        }, 100);
    }, { passive: true });
    element.addEventListener('touchmove', () => {
        clearTimeout(rippleTapTimer);
    }, { passive: true });
    element.addEventListener('touchend', () => {
        rippleTouchCanceled = true;
        element.classList.remove('pressed');
    }, { passive: true });
    element.addEventListener('keydown', (event) => {
        if (event.key !== " " && event.key !== "Enter" || rippleKeyboardCalled == true) {
            return;
        }
        rippleKeyboardCalled = true;
        rippleForeground(element, event);
    });
    element.addEventListener('keyup', () => {
        rippleKeyboardCalled = false;
    });
    element.addEventListener('mousedown', (event) => {
        if (event.button !== 0 || rippleTouchCalled) {
            rippleTouchCalled = false;
            return;
        }
        rippleForeground(element, event);
        event.stopPropagation();
    });
});

let containerWidth;
let containerHeight;
let containerRadius;
let rippleRadius;
let rippleExpandDuration;
let rippleMoveParameter;

function rippleForeground(element, event) {
    containerWidth = parseFloat(window.getComputedStyle(element).width);
    containerHeight = parseFloat(window.getComputedStyle(element).height);
    containerRadius = Math.hypot(containerWidth, containerHeight) / 2;

    if (element.classList.contains('unbounded')) {
        rippleExpandDuration = 400;
        rippleMoveParameter = 0;
    } else {
        rippleExpandDuration = 800;
        rippleMoveParameter = 0.7;
    }

    let div = document.createElement('div');
    div.className = 'foreground';
    let nodes = element.querySelectorAll('.ripples');
    nodes[nodes.length - 1].appendChild(div);//回滚问题
    let lastRippleForeground = nodes[nodes.length - 1].querySelector('div:last-child');

    if (event.type == "touchstart") {
        rippleOffsetX = event.changedTouches[0].clientX - element.getBoundingClientRect().left - containerWidth / 2;
        rippleOffsetY = event.changedTouches[0].clientY - element.getBoundingClientRect().top - containerHeight / 2;
    }
    if (event.type == "mousedown") {
        rippleOffsetX = event.clientX - element.getBoundingClientRect().left - containerWidth / 2;
        rippleOffsetY = event.clientY - element.getBoundingClientRect().top - containerHeight / 2;
    }

    if (element.classList.contains('unbounded') !== true) {
        rippleRadius = containerRadius * 0.9 + containerRadius * Math.random() * 0.1;
        lastRippleForeground.style.setProperty('--diameter', rippleRadius * 2 + 'px');
    }

    if (event.type !== "keydown") {
        lastRippleForeground.animate({
            transform: ['translate(' + rippleOffsetX + 'px,' + rippleOffsetY + 'px)', 'translate(' + rippleOffsetX * rippleMoveParameter + 'px,' + rippleOffsetY * rippleMoveParameter + 'px)']
        }, {
            duration: 300,
            easing: 'cubic-bezier(0.17, 0.74, 0.4, 1)',
            fill: 'both'
        });
    }

    lastRippleForeground.animate({
        transform: ['scale(0)', 'scale(1)']
    }, {
        duration: rippleExpandDuration,
        easing: 'cubic-bezier(0.17, 0.74, 0.4, 1)',
        fill: 'both',
        composite: 'add'
    });

    lastRippleForeground.addEventListener('animationend', (event) => {
        event.target.remove();
    });
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