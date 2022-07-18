const navIconOpen = document.querySelector('.nav-icon-open')
const navIconClose = document.querySelector('.nav-icon-close')
const arrItemsMenuHeader = document.querySelectorAll('.header .header__navigation li')
const navigationBlock = document.querySelector('.header__navigation')
let controller = new ScrollMagic.Controller()
const heroVideo = document.getElementById('hero-video')
const sectionHero = document.querySelector('.section-hero')
const arrSliderAboutItems = document.querySelectorAll('.about-slider-item')

// for open menu mobile
if(navIconOpen) {
    navIconOpen.addEventListener('click', () => {
        navigationBlock.classList.add('open-menu-mobile')
        document.body.classList.add('no-scroll')
    })
}

// for close menu mobile
if(navIconClose) {
    navIconClose.addEventListener('click', () => {
        navigationBlock.classList.remove('open-menu-mobile')
        document.body.classList.remove('no-scroll')
    })
}

// close menu mobile for click on item navigation
if (window.matchMedia("(max-width: 1024px)")) {
    arrItemsMenuHeader.forEach((itemMenu) => {
        itemMenu.addEventListener('click', () => {
            navigationBlock.classList.remove('open-menu-mobile')
            document.body.classList.remove('no-scroll')
        })
    })
}

// for hero
    //not scroll when video play
heroVideo.addEventListener('ended', (event) => {
    document.body.classList.remove('no-scroll')
})

let sectionHeroChangeSize = new ScrollMagic.Scene({triggerElement: "#section-hero", duration: '200', triggerHook: 0.07})
    .setTween("#hero-video", { transform: 'scale(0.41)'})
    // .addIndicators({name: "block-hero"})
    .addTo(controller)
    .reverse(true)

//fixed width video in hero when resize
window.addEventListener(`resize`, event => {
    const screenWidth = document.body.offsetWidth
    sectionHero.style.width = `${screenWidth}px`
}, false);

let sectionAboutChangePosition = new ScrollMagic.Scene({triggerElement: "#section-about-text", duration: '400', triggerHook: 0.9})
    .setTween("#section-about", { marginTop: '-200px'})
    .addIndicators({name: "block-about"})
    .addTo(controller)
    .on("start", () => {
        document.body.classList.remove('no-scroll')
        heroVideo.removeAttribute('autoplay')
    })
    .reverse(true)

let sliderAboutChangeSize = new ScrollMagic.Scene({triggerElement: "#slider-about", duration: '400', triggerHook: 'onLeave'})
    .setTween("#slider-about-track", { transform: 'scale(0.593)'})
    // .addIndicators({name: "block-slider-size"})
    .setPin("#slider-about")
    .addTo(controller)
    .reverse(true)

let sliderAboutChangePosition = new ScrollMagic.Scene({triggerElement: "#slider-about-pin", duration: '600', triggerHook: 0.02})
    .setTween("#about-slider-list", { marginLeft: '-800px'})
    // .addIndicators({name: "block-slider-position"})
    .addTo(controller)
    .reverse(true)





