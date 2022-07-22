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
const checkingAccountDescription = document.querySelector('.checking-account-description-interactive')
const arrGalleryTrigger = document.querySelectorAll('.gallery-trigger')
// const arrGalleryItemsTrigger = document.querySelectorAll('.block-items')
const arrPhoneScrollInteractive = document.querySelectorAll('.phone-scroll-interactive')
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

// not scroll when the screen refreshes and the video is not fully intersecting with the view port
new ScrollMagic.Scene({triggerElement: "#main", duration: '1', triggerHook: 0})
    .addIndicators({name: "trigger"})
    .on("progress", function (e) {
        if(e.progress < 0.01) {
            document.body.classList.add('no-scroll')
        }
    })
    .addTo(controller)
    .reverse(false)

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
        } if(e.progress === 1) {
            let itemsDarkInteractive = new ScrollMagic.Scene({triggerElement: "#items-dark-interactive", duration: '150', triggerHook: 1})
                .setTween("#items-list-dark-interactive", { transform: 'translateY(-70px)'})
                // .addIndicators({name: "items-dark-interactive"})
                .addTo(controller)
                .reverse(true)
        }
    });

//gallery
let sectionCheckingAccount = new ScrollMagic.Scene({triggerElement: "#section-checking-account", duration: '500', triggerHook: 'onLeave'})
    .setTween("#checking-account-title-interactive", { opacity: '1', transform: 'translateY(0)'})
    // .addIndicators({name: "section-checking-account"})
    .setPin("#section-checking-account")
    .addTo(controller)
    .on("progress", function (e) {
        if(e.progress >= 0.8) {
            checkingAccountDescription.classList.remove('checking-account-description-hide')
        } else if(e.progress <= 0.8) {
            checkingAccountDescription.classList.add('checking-account-description-hide')
        }
    })
    .reverse(true)

const arrGalleryItems = document.querySelectorAll('.gallery__items .block-items');
let wipeAnimation = new TimelineMax();

for (let i = arrGalleryTrigger.length - 1; i >= 0; i--) {
    wipeAnimation
        .fromTo(`#gallery-trigger-${i}`, 1, {y: 0}, {y: i === 0 ? '0' : '-100vh', ease: Linear.easeNone})
        .call(function (idx) {
            const nextTextEl = document.getElementById(`gallery-items-trigger-${idx}`);
            arrGalleryItems.forEach(function (item) {
                item.removeAttribute('style')
            });
            nextTextEl.setAttribute('style', 'opacity: 1;');
        }, [i], '<')
        .to(`#gallery-items-trigger-${i} .block-items__list`, 1, {y: '-20px', ease: Linear.easeNone,})
}

// create scene to pin and link animation
new ScrollMagic.Scene({ triggerElement: "#section-gallery",  triggerHook: "onLeave", duration: "100%" })
    .setPin("#section-gallery")
    .setTween(wipeAnimation)
    // .addIndicators({name: `gallery-items`})
    .addTo(controller);


// let wipeAnimation1 = new TimelineMax();
let timelineSectionPhoneScroll = new TimelineMax()
    .fromTo(['#block-phone-scroll-image'], 1, {}, {y: window.outerHeight >= 890 ?'96px' : '130px', ease: Linear.easeNone})
    .fromTo(['#phone-scroll-interactive-0'], 1, {}, {y: '-10vh', ease: Linear.easeNone}, '<')

    arrPhoneScrollInteractive.forEach((item, i) => {
        let lastItem =  arrPhoneScrollInteractive.length - 1

        timelineSectionPhoneScroll
            .fromTo(`#phone-scroll-interactive-${i}`, 1, {opacity: i === 0 ? 1 : 0}, {opacity: 1, ease: Linear.easeNone})
            .fromTo(`#phone-scroll-interactive-${i}`, 1, {}, {opacity: (i === lastItem ) ? 1 : 0, ease: Linear.easeNone}, (i === lastItem ) ? '<' : '-=0')
    })

console.log(window.outerHeight)

timelineSectionPhoneScroll
    .fromTo(['#block-phone-scroll-image'], 1, {}, {transform: window.outerHeight >= 890 ? 'scale(0.75)' : 'scale(0.65)', ease: Linear.easeNone}, '<')

new ScrollMagic.Scene({ triggerElement: "#section-phone-scroll",  triggerHook: "onLeave", duration: "100%" })
    .setPin("#section-phone-scroll")
    .setTween(timelineSectionPhoneScroll)
    // .addIndicators({name: `section-phone-scroll`})
    .addTo(controller);









// let sectionCheckingDescription = new ScrollMagic.Scene({triggerElement: "#checking-account-description-trigger", duration: '50', triggerHook: 0.45})
//     .setTween("#checking-account-description-interactive", { opacity: '1', transform: 'translateY(0)'})
//     .addIndicators({name: "checking-account-description-trigger"})
//     .addTo(controller)
//     .reverse(true)

// checking-account-description-interactive

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





