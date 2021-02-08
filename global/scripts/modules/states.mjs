
/*涟漪*/
let rippleTouchCalled = false;
let rippleKeyboardCalled = false;

document.querySelectorAll('*[states], button').forEach((element) => {
    let div = document.createElement('div');
    div.className = 'ripples';
    element.appendChild(div);

    element.addEventListener('touchstart', (event) => {
        rippleTouchCalled = true;
        rippleForeground(element, event);
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

function rippleForeground(element, event) {
    let unboundedCondition = element.classList.contains('unbounded') ? true : false;

    let rippleExpandDuration = unboundedCondition ? 400 : 800;
    let rippleMoveParameter = unboundedCondition ? 0 : 0.7;

    let containerWidth = element.getBoundingClientRect().width;
    let containerHeight = element.getBoundingClientRect().height;
    let containerRadius = Math.hypot(containerWidth, containerHeight) / 2;

    const rippleForegroundObject = document.createElement('div');
    rippleForegroundObject.className = 'foreground';
    let nodes = element.querySelectorAll('.ripples');
    nodes[nodes.length - 1].appendChild(rippleForegroundObject);
    let lastRippleForeground = nodes[nodes.length - 1].querySelector('div:last-child');
    
    let rippleRadius;
    if (unboundedCondition == false) {
        rippleRadius = containerRadius * 0.9 + containerRadius * Math.random() * 0.1;
        lastRippleForeground.attributeStyleMap.set('width', CSS.px(Math.min(rippleRadius * 2, 700)));
    }

    if (event.type !== "keydown") {
        let inputPointX = event.type == "touchstart" ? event.changedTouches[0].clientX : event.clientX;
        let inputPointY = event.type == "touchstart" ? event.changedTouches[0].clientY : event.clientY;

        let rippleOffsetX = inputPointX - element.getBoundingClientRect().left - containerWidth / 2;
        let rippleOffsetY = inputPointY - element.getBoundingClientRect().top - containerHeight / 2;
        lastRippleForeground.animate([
            { transform: new CSSTranslate(CSS.px(rippleOffsetX), CSS.px(rippleOffsetY)) },
            { transform: new CSSTranslate(CSS.px(rippleOffsetX * rippleMoveParameter), CSS.px(rippleOffsetY * rippleMoveParameter)) }
        ], {
            duration: 300,
            easing: 'cubic-bezier(0.17, 0.74, 0.4, 1)',
            fill: 'both',
            composite: 'add'
        });
    }

    lastRippleForeground.animate({
        transform: ['scale(0)', 'scale(1)']
    }, {
        duration: rippleExpandDuration,
        easing: 'cubic-bezier(0.17, 0.74, 0.4, 1)',
        fill: 'both',
        composite: 'add'
    }).onfinish = () => {
        lastRippleForeground.remove();
    };
}