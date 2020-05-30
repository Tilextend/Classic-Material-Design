document.querySelectorAll('.CMD-drawer nav span').forEach((element) => {
    element.addEventListener('click', () => {
        navigationDrawerItemAction(element);
    });
    element.addEventListener('keyup', (event) => {
        if (event.key !== " " && event.key !== "Enter") {
            return;
        }
        navigationDrawerItemAction(element);
    });
});

function navigationDrawerItemAction(element) {
    parentItem = element.parentNode;
    parentItem.classList.toggle('unfolded');
    parentItem.removeEventListener('transitionend', navigationDrawerItemHidden);

    if (parentItem.classList.contains('on') == false) {
        parentItem.style.setProperty('--navigation-drawer-rows', parentItem.querySelectorAll('a').length);
        parentItem.classList.add('on');
    } else if (parentItem.classList.contains('unfolded') == false) {
        parentItem.addEventListener('transitionend', navigationDrawerItemHidden);
    }
}

function navigationDrawerItemHidden() {
    if (event.target !== event.currentTarget) {
        return;
    }
    event.target.classList.remove('on');
}



document.querySelector('#drawer-trigger').addEventListener('click', () => {
    document.querySelector('.CMD-drawer-wrapper').classList.add('on', 'enter');
});

document.querySelector('.CMD-drawer-wrapper').addEventListener('click', (event) => {
    if (event.currentTarget == event.target) {
        event.target.classList.remove('enter');
    }
});

document.querySelector('.CMD-drawer').addEventListener('transitionend', (event) => {
    if (event.currentTarget == event.target && event.target.parentNode.classList.contains('enter') == false) {
        event.target.parentNode.classList.remove('on');
    }
});

if (document.querySelector('main>.app-bar').classList.contains('prominent')) {
    document.querySelector('main>.app-bar').style.setProperty('--scroll-Y', window.scrollY);
    window.addEventListener('scroll', () => {
        document.querySelector('main>.app-bar').style.setProperty('--scroll-Y', window.scrollY);
    });
}

/*
let Observer = new IntersectionObserver((entries) => {
    if (entries[0].intersectionRatio > 0) {
        console.log('a');
    }
    console.log('a');
});

document.querySelectorAll('h5').forEach(
    (element) => { element.Observer.observe(element)}
);*/

let simulatorAnimationLoop;

document.querySelectorAll('.simulator[class~=animated]').forEach((element) => {
    element.addEventListener('click', (event) => {
        if (event.target.classList.contains('on')) {
            event.target.classList.remove('on', 'playing');
            clearTimeout(simulatorAnimationLoop);
        } else {
            event.target.classList.remove('on', 'playing');
            event.target.classList.add('on', 'playing');
        }
    });
    element.addEventListener('animationend', simulatorAnimationEnd);
});

function simulatorAnimationEnd() {
    if (event.target !== event.currentTarget) {
        return
    }
    let element = event.target;
    element.classList.remove('playing');
    simulatorAnimationLoop = setTimeout(() => {
        element.classList.add('playing');
    }, 1000)
}