import * as base from "./modules/base.mjs";
import * as buttons from "./modules/buttons.mjs";
import * as selectionControls from "./modules/selection-controls.mjs";
import * as states from "./modules/states.mjs";
import * as tabs from "./modules/tabs.mjs";
import * as textFields from "./modules/text-fields.mjs";



/*导航抽屉*/

const CMDnavigationDrawerContainer = document.querySelector('body>.drawer-container');
const formerUnfoldedElements = [];
const formerFoldedElements = [];

CMDnavigationDrawerContainer.querySelectorAll('.drawer span+ul').forEach((element) => {
    if (element.classList.contains('on')) {
        formerUnfoldedElements.push(element);
    } else {
        formerFoldedElements.push(element);
    }
});

document.querySelector('#drawer-trigger').addEventListener('click', () => {
    CMDnavigationDrawerContainer.classList.add('on', 'entered');
});

CMDnavigationDrawerContainer.querySelectorAll('span').forEach((element) => {
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
    let targetElement = element.parentNode.querySelector('ul');
    let stateOn = targetElement.classList.contains('on') ? true : false;
    let stateUnfolded = targetElement.classList.contains('unfolded') ? true : false;
    let isFormerUnfoldedElements = formerUnfoldedElements.includes(targetElement);
    let isFormerFoldedElements = formerFoldedElements.includes(targetElement);

    targetElement.getAnimations().forEach((animation) => {
        animation.onfinish = null;
    });

    let secondaryLevelHeight = targetElement.querySelector('li').getBoundingClientRect().height;
    let unfoldHeight =  targetElement.querySelectorAll('li').length * secondaryLevelHeight;

    let animationEffect;
    if (isFormerUnfoldedElements || isFormerFoldedElements) {
        animationEffect = [
            { height: isFormerUnfoldedElements ? CSS.px(unfoldHeight) : isFormerFoldedElements ? CSS.px(0) : null },
            { height: stateUnfolded ? CSS.px(0) : CSS.px(unfoldHeight) }
        ];
    } else {
        animationEffect = { height: stateUnfolded ? CSS.px(0) : CSS.px(unfoldHeight) };
    }

    targetElement.animate(animationEffect, {
        duration: stateUnfolded ? 250 : 300,
        easing: base.STANDARD_CURVE,
        fill: 'both'
    }).onfinish = () => {
        stateUnfolded ? null : targetElement.classList.remove('on');
    };

    stateOn ? null : targetElement.classList.add('on');
    stateUnfolded ? targetElement.classList.remove('unfolded') : targetElement.classList.add('unfolded');
    stateOn = !stateOn;
    stateUnfolded = !stateUnfolded;

    let formerUnfoldedElementIndex = formerUnfoldedElements.indexOf(targetElement);
    let formerFoldedElementIndex = formerFoldedElements.indexOf(targetElement);
    if (formerUnfoldedElementIndex !== -1) {
        formerUnfoldedElements.splice(formerUnfoldedElementIndex, 1);
    } else if (formerFoldedElementIndex !== -1) {
        formerFoldedElements.splice(formerFoldedElementIndex, 1);
    }
}

CMDnavigationDrawerContainer.querySelector('.drawer-container .scrim').addEventListener('click', () => {
    CMDnavigationDrawerContainer.classList.remove('entered');
});

CMDnavigationDrawerContainer.querySelector('.drawer').addEventListener('transitionend', (event) => {
    if (event.currentTarget !== event.target || CMDnavigationDrawerContainer.classList.contains('entered')) {
        return
    }
    CMDnavigationDrawerContainer.classList.remove('on');
});



window.onresize = () => {
    if (window.innerWidth > 1576) {
        CMDnavigationDrawerContainer.classList.remove('on', 'entered');
    }
};



/*章节地址自动填充*/
/*
const intersectionObservercallback = (entries) => {
    if (entries[0].isIntersecting == false) return;
    window.location.hash = entries[0].target.id;
}

let intersectionObserverCenter = new IntersectionObserver(intersectionObservercallback, {
    rootMargin: "-60% 0% -40% 0%"
});

let intersectionObserverTop = new IntersectionObserver(intersectionObservercallback, {
    rootMargin: "0% 0% -40% 0%",
    threshold: 1
});

let intersectionObserverBottom = new IntersectionObserver(intersectionObservercallback, {
    rootMargin: "-60% 0% 0% 0%",
    threshold: 1
});

document.querySelectorAll('.content-body>article').forEach(
    (element) => {
        intersectionObserverCenter.observe(element);
        intersectionObserverBottom.observe(element);
    });

intersectionObserverTop.observe(document.querySelector('.chapter-catalogue'));
*/


/*模拟器*/

let simulatorAnimationLoop;

document.querySelectorAll('.simulator[class~=animated], .diagram[class~=animated]').forEach((element) => {
    element.addEventListener('click', (event) => {

        if (element.querySelector('video')) {
            if (element.querySelector('video').paused) {
                element.querySelector('video').play();
                element.classList.add('on', 'playing');
            } else {
                element.querySelector('video').pause();
                element.classList.remove('on', 'playing');
            }
            return;
        }
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
    if (event.target !== event.currentTarget || event.target.querySelector('video')) {
        return
    }
    let element = event.target;
    element.classList.remove('playing');
    simulatorAnimationLoop = setTimeout(() => {
        element.classList.add('playing');
    }, 1000);
}