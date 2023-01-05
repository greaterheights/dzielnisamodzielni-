document.getElementById("btn").addEventListener("click", function () {
    let button = document.getElementById("btn")
    let menu = document.getElementById("menuMobile")
    if(button.classList.contains("active")) {
        button.classList.add("not-active");
        button.classList.remove("active")
        fadeOut(menu)
    } else {
        button.classList.add("active");
        button.classList.remove("not-active")
        fadeIn(menu)
    }
})

window.addEventListener('resize', function () {
    let menu = document.getElementById("menuMobile")
    let button = document.getElementById("btn")
    if(window.innerWidth > 630) {
        menu.style.display = "none"
        button.classList.add("not-active");
        button.classList.remove("active")
    }
});

document.querySelectorAll("span").forEach((span) => {
    let tekst = span.innerHTML;
    tekst = tekst.replace(/(\s)([\S])[\s]+/g,"$1$2&nbsp;"); //jednoznakowe
    tekst = tekst.replace(/(\s)([^<][\S]{1})[\s]+/g,"$1$2&nbsp;"); //dwuznakowe
    span.innerHTML = tekst ;
});

document.querySelectorAll("a").forEach((span) => {
    let tekst = span.innerHTML;
    tekst = tekst.replace(/(\s)([\S])[\s]+/g,"$1$2&nbsp;"); //jednoznakowe
    tekst = tekst.replace(/(\s)([^<][\S]{1})[\s]+/g,"$1$2&nbsp;"); //dwuznakowe
    span.innerHTML = tekst ;
});

function fadeIn(el) {
    el.style.opacity = 0;
    el.style.display = "flex"
    let last = +new Date();
    let tick = function() {
        el.style.opacity = +el.style.opacity + (new Date() - last) / 100;
        last = +new Date();

        if (+el.style.opacity < 1) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 1);
        }
    };

    tick();
}

function fadeOut(el) {
    el.style.opacity = 1;

    let last = +new Date();
    let tick = function() {
        el.style.opacity = +el.style.opacity - (new Date() - last) / 100;
        last = +new Date();

        if (+el.style.opacity > 0) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 1);
        }

        if (el.style.opacity < 0){
            setTimeout(() => { el.style.display = "none" }, 200)
        }

    };
    tick();
}

function addSlideDownAndUp (buttonClass) {
    document.addEventListener( 'DOMContentLoaded', function () {
        const buttons = document.getElementsByClassName(buttonClass)
        Array.from(buttons).forEach(function (button) {
            let container = button.parentElement.children[1]
            buttonEventOnOffers(button,container)
        })
    })
}

function buttonEventOnOffers (button, container) {
    button.addEventListener('click', () => {
        if( button.classList.contains("active")) {
            button.classList.remove("active")
            button.children[1].classList.remove("active")
        } else {
            button.classList.add("active")
            button.children[1].classList.add("active")
        }

        /** Slide down. */
        if(!container.classList.contains('active')) {
            container.classList.add('active')
            container.style.height = "auto"

            let height = container.clientHeight + "px"

            container.style.height = "0px"

            setTimeout(() => {
                container.style.height = height
            }, 0)
            /** Slide up. */
        } else {
            container.style.height = container.clientHeight + "px"
            container.style.height = "0px"

            container.addEventListener('transitionend', () => {
                container.classList.remove('active')
            }, {once: true})
        }
    })
}