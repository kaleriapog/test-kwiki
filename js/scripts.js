const navIconOpen = document.querySelector('.nav-icon-open')
const navIconClose = document.querySelector('.nav-icon-close')
const arrItemsMenuHeader = document.querySelectorAll('.header .header__navigation li')
const navigationBlock = document.querySelector('.header__navigation')
let controller = new ScrollMagic.Controller()
const heroVideo = document.getElementById('hero-video')
const sectionHero = document.querySelector('.section-hero')
const arrSliderAboutItems = document.querySelectorAll('.about-slider-item')
const aboutTextNarrowInteractive = document.querySelector('.about-text-narrow-interactive')
const sectionVideoInPicture = document.querySelector('.section-video-in-picture')
const backgroundVideoPicture = document.querySelector('.background-video-picture')

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

let sectionHeroChangeSize = new ScrollMagic.Scene({triggerElement: "#section-hero", duration: '100', triggerHook: 0.07})
    .setTween("#hero-video", { transform: 'scale(0.41)'})
    // .addIndicators({name: "block-hero"})
    .addTo(controller)
    .reverse(true)

//fixed width video in hero when resize
window.addEventListener(`resize`, event => {
    const screenWidth = document.body.offsetWidth
    sectionHero.style.width = `${screenWidth}px`
}, false);


let sliderAboutChangeSize = new ScrollMagic.Scene({triggerElement: "#slider-about", duration: '400', triggerHook: 'onLeave'})
    .setTween("#slider-about-track", { transform: 'scale(0.593)'})
    // .addIndicators({name: "block-slider-size"})
    .setPin("#slider-about")
    .addTo(controller)
    .reverse(true)

let sliderAboutChangePosition = new ScrollMagic.Scene({triggerElement: "#slider-about-pin", duration: '600', triggerHook: window.screen.width <= 1024 ? 0 : 0.02})
    .setTween("#about-slider-list", { transform: 'translateX(-800px)'})
    // .addIndicators({name: "block-slider-position"})
    .on("progress", function (e) {
        if(e.progress > window.screen.height < 1366 ? 0.2 : 0.1) {
            aboutTextNarrowInteractive.classList.remove('about-text-narrow-hide')
        }
    })
    .addTo(controller)
    .reverse(true)

let playVideoInPicture = new ScrollMagic.Scene({triggerElement: "#video-in-picture-interactive", triggerHook: 1})
    .on("enter", () => {
        document.getElementById('video-in-picture').play()
    })
    // .addIndicators({name: "video start"})
    .addTo(controller)
    .reverse(true);

let pauseVideoInPicture = new ScrollMagic.Scene({triggerElement: "#video-in-picture-interactive", triggerHook: 0})
    .on("enter", () => {
        document.getElementById('video-in-picture').pause()
    })
    // .addIndicators({name: "video start"})
    .addTo(controller)
    .reverse(true);

let videoInPictureSmall = new ScrollMagic.Scene({triggerElement: "#video-in-picture-interactive", duration: '50', triggerHook: 'onLeave'})
    .setTween("#video-in-picture-inner-interactive", { height: '385px', width: '630px'}) // the tween durtion can be omitted and defaults to 1
    // .addIndicators({name: "video stop and small"})
    .setPin("#video-in-picture-interactive")
    .addTo(controller)
    .reverse(true)
    .on("progress", function (e) {
        if(e.progress <= 0) {
            sectionVideoInPicture.classList.remove('background-dark')
            backgroundVideoPicture.classList.remove('visible')
        } else {
            sectionVideoInPicture.classList.add('background-dark')
            backgroundVideoPicture.classList.add('visible')
        }
    });

// let heroLottie = LottieInteractivity.create({
//     player:'#video-logo',
//     mode:"chain",
//     actions: [
//         {
//             state: 'autoplay'
//         }
//     ]
// })

// let heroLottie = lottie.loadAnimation({
//     container: document.getElementById('hero-video'),
//     renderer: 'svg',
//     loop: false,
//     autoplay: true,
//     path: '../video/hero-5s60f-24c-46s.json'
// });

// heroLottie.addEventListener("data_ready", function() {
//     document.body.classList.remove('no-scroll')
//     document.querySelector('#hero-video svg').setAttribute("preserveAspectRatio","xMaxYMax slice");
// })
//
// heroLottie.addEventListener("complete", function() {
//     document.body.classList.remove('no-scroll')
// })





