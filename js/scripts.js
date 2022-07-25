const navIconOpen = document.querySelector('.nav-icon-open')
const navIconClose = document.querySelector('.nav-icon-close')
const arrItemsMenuHeader = document.querySelectorAll('.header .header__navigation li')
const navigationBlock = document.querySelector('.header__navigation')
let controller = new ScrollMagic.Controller()
const heroVideo = document.getElementById('hero-video')
const sectionHero = document.querySelector('.section-hero')
// const arrSliderAboutItems = document.querySelectorAll('.about-slider-item')
// const aboutTextNarrowInteractive = document.querySelector('.about-text-narrow-interactive')
const sectionVideoInPicture = document.querySelector('.section-video-in-picture')
const backgroundVideoPicture = document.querySelector('.background-video-picture')
const checkingAccountDescription = document.querySelector('.checking-account-description-interactive')
// const arrGalleryTrigger = document.querySelectorAll('.gallery-first-trigger')
const arrPhoneScrollInteractive = document.querySelectorAll('.phone-scroll-interactive')
// const arrGallerySellTrigger = document.querySelectorAll('.gallery-sell-trigger')

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
    // .addIndicators({name: "trigger"})
    .on("progress", function (e) {
        if(e.progress < 0.01) {
            document.body.classList.add('no-scroll')
        }
    })
    .addTo(controller)
    .reverse(false)

// for change size video in hero
let timelineSectionHero = new TimelineMax()
    .fromTo(['#hero-video'], 1, {}, {width: '600px', height: '340px', ease: Linear.easeNone})
    .fromTo(['#hero-text'], 1, {}, {top: '70vh', ease: Linear.easeNone}, '<')


new ScrollMagic.Scene({ triggerElement: "#section-hero",  triggerHook: "onLeave", duration: "100" })
    .setPin("#section-hero")
    .setTween(timelineSectionHero)
    // .addIndicators({name: `section hero`})
    .addTo(controller);

// fixed width video in hero when resize
window.addEventListener(`resize`, event => {
    const screenWidth = document.body.offsetWidth
    sectionHero.style.width = `${screenWidth}px`
}, false);

// start section about
let timelineSectionAbout = new TimelineMax()
    .fromTo(['#slider-about-track'], 1, {}, {transform: 'scale(0.593)', ease: Linear.easeNone})
    .fromTo(['#slider-about-track'], 1, {}, {y: '-20px', ease: Linear.easeNone}, '<')
    .fromTo(['#slider-about-track'], 1, {}, {x: '-800px', ease: Linear.easeNone})
    .fromTo(['#about-text-narrow-interactive'], 1, {transform: 'translateY(30vh)'}, {transform: 'translateY(-68px)', ease: Linear.easeNone})

new ScrollMagic.Scene({ triggerElement: "#slider-about",  triggerHook: "onLeave", duration: "100%" })
    .setPin("#slider-about")
    .setTween(timelineSectionAbout)
    // .addIndicators({name: `section about`})
    .addTo(controller);

    // for slide
let splideAboutSlider = new Splide( '.slider-about', {
    type   : 'loop',
    focus  : 'center',
    gap: 20,
    autoWidth: true,
    arrows: false,
    pagination: false,
    clones: 2,
    drag: false,
} );

splideAboutSlider.mount();
// end section about

// start section video in picture
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

let videoInPictureSmall = new ScrollMagic.Scene({triggerElement: "#video-in-picture-interactive", duration: '70%', triggerHook: 'onLeave'})
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
            let itemsDarkInteractive = new ScrollMagic.Scene({triggerElement: "#items-dark-interactive", duration: '30%', triggerHook: 1})
                .setTween("#items-list-dark-interactive", { transform: 'translateY(-70px)'})
                // .addIndicators({name: "items-dark-interactive"})
                .addTo(controller)
                .reverse(true)
        }
    });

// start section checking account
let timelineCheckingAccount = new TimelineMax()
    .fromTo(['#checking-account-title-interactive'], 1, {opacity: 0.3}, {opacity: 1, ease: Linear.easeNone})
    .fromTo(['#checking-account-title-interactive'], 1, {y: '50px'}, {y: '0', ease: Linear.easeNone})
    .fromTo(['.checking-account-description-interactive'], 1, {opacity: 1, transform: 'translateY(100vh)'}, {opacity: 1, transform: 'translateY(0)', ease: Linear.easeNone}, '<')

new ScrollMagic.Scene({ triggerElement: "#section-checking-account",  triggerHook: "0", duration: "100%" })
    .setPin("#section-checking-account")
    .setTween(timelineCheckingAccount)
    // .addIndicators({name: `section-checking-account`})
    .addTo(controller);

// new ScrollMagic.Scene({ triggerElement: "#section-checking-account",  triggerHook: "onLeave", duration: "25%" })
//     .setPin("#section-checking-account")
//     .addTo(controller);

// let sectionCheckingAccount = new ScrollMagic.Scene({triggerElement: "#section-checking-account", duration: '100%', triggerHook: 'onLeave'})
    // .setTween("#checking-account-title-interactive", { opacity: '1', transform: 'translateY(0)'})
    // // .addIndicators({name: "section-checking-account"})
    // .setPin("#section-checking-account")
    // .addTo(controller)
    // .on("progress", function (e) {
    //     if(e.progress >= 0.8) {
    //         checkingAccountDescription.classList.remove('checking-account-description-hide')
    //     } else if(e.progress <= 0.8) {
    //         checkingAccountDescription.classList.add('checking-account-description-hide')
    //     }
    // })
    // // .addIndicators({name: "Checking Account"})
    // .reverse(true)

// end section checking account

//gallery first
const arrGalleryItemsFirst = document.querySelectorAll('.section-gallery-first .gallery-item');
let wipeAnimationFirst = new TimelineMax();

for (let i = arrGalleryItemsFirst.length - 1; i >= 0; i--) {
    wipeAnimationFirst
        // .fromTo(`.gallery-first-item-${i} .gallery-item__text-inner`, 1, {transform: i === arrGalleryItemsFirst.length - 1 ? 'translateY(0)' : 'translateY(0)'}, {transform: 'translateY(20px)', ease: Expo.easeOut})
        .fromTo(`.gallery-first-item-${i} .gallery-item__text-inner`, 1, {visibility: i === arrGalleryItemsFirst.length - 1 ? 'visible' : 'hidden'}, {visibility: 'visible'})
        .fromTo(`.gallery-first-item-${i} .gallery-item__image`, 1, {}, {transform: i === 0 ? 'translateY(0)' : 'translateY(-100vh)', ease: Linear.easeNone})
        .fromTo(`.gallery-first-item-${i} .gallery-item__text-inner`, 1, {}, {transform: 'translateY(-40px)'}, '<')
        .fromTo(`.gallery-first-item-${i} .gallery-item__text-inner`, 1, {}, {visibility: i === 0 ? 'visible' : 'hidden'})
}

new ScrollMagic.Scene({ triggerElement: "#section-gallery-first",  triggerHook: "onLeave", duration: "100%" })
    .setPin("#section-gallery-first")
    .setTween(wipeAnimationFirst)
    // .addIndicators({name: `gallery First`})
    .addTo(controller);

//for section phone-scroll
let timelineSectionPhoneScroll = new TimelineMax()
    .fromTo(['#block-phone-scroll-image'], 1, {}, {y: window.outerHeight >= 890 ?'96px' : '130px', ease: Linear.easeNone})
    .fromTo(['#phone-scroll-interactive-0'], 1, {}, {y: '-10vh', ease: Linear.easeNone}, '<')

    arrPhoneScrollInteractive.forEach((item, i) => {
        let lastItem =  arrPhoneScrollInteractive.length - 1

        timelineSectionPhoneScroll
            .fromTo(`#phone-scroll-interactive-${i}`, 1, {opacity: i === 0 ? 1 : 0}, {opacity: 1, ease: Linear.easeNone})
            .fromTo(`#phone-scroll-interactive-${i}`, 1, {}, {opacity: (i === lastItem ) ? 1 : 0, ease: Linear.easeNone}, (i === lastItem ) ? '<' : '-=0')
    })

timelineSectionPhoneScroll
    .fromTo(['#block-phone-scroll-image'], 1, {}, {transform: window.outerHeight >= 890 ? 'scale(0.75)' : 'scale(0.65)', ease: Linear.easeNone}, '<')

new ScrollMagic.Scene({ triggerElement: "#section-phone-scroll",  triggerHook: "onLeave", duration: "100%" })
    .setPin("#section-phone-scroll")
    .setTween(timelineSectionPhoneScroll)
    // .addIndicators({name: `section-phone-scroll`})
    .addTo(controller);

//for section-tagline
let timelineSectionTagline = new TimelineMax()

timelineSectionTagline
    .fromTo(['#tagline-video-wrapp'], 1, {}, {top: 0, ease: Linear.easeNone})
    .fromTo(['#tagline'], 1, {}, {opacity: 0, ease: Linear.easeNone}, '<')
    .fromTo(['#tagline-video'], 1, {}, {maxWidth: '100%', ease: Linear.easeNone})

new ScrollMagic.Scene({ triggerElement: "#section-tagline",  triggerHook: "onLeave", duration: "100%" })
    // .setClassToggle(".header", "header-dark")
    .setPin("#section-tagline")
    .setTween(timelineSectionTagline)
    // .addIndicators({name: `section-tagline`})
    .addTo(controller);

    //for play video in section-tagline
new ScrollMagic.Scene({ triggerElement: "#tagline-video",  triggerHook: "onLeave" })
    .on("enter", () => {
        document.getElementById('tagline-video').play()
    })
    .addTo(controller);

    // header dark in section-tagline
let timelineHeaderDark = new TimelineMax()

timelineHeaderDark
    .fromTo([".logo"], 1, {}, { opacity: '0', ease: Linear.easeNone})
    .fromTo([".logo-white"], 1, {}, { opacity: '1', ease: Linear.easeNone}, '<')
    .fromTo([".header"], 1, {}, { backgroundColor: '#000', ease: Linear.easeNone}, '<')
    .fromTo([".header .button"], 1, {}, { backgroundColor: '#fff', color: '#000', ease: Linear.easeNone}, '<')

new ScrollMagic.Scene({ triggerElement: "#section-tagline",  triggerHook: "onLeave", duration: "20" })
    .setTween(timelineHeaderDark)
    // .addIndicators({name: `header`})
    .addTo(controller);

// header white
let timelineHeaderWhite = new TimelineMax()

timelineHeaderWhite
    .fromTo([".logo"], 1, {}, { opacity: '1', ease: Linear.easeNone})
    .fromTo([".logo-white"], 1, {}, { opacity: '0', ease: Linear.easeNone}, '<')
    .fromTo([".header"], 1, {}, { backgroundColor: '#fff', ease: Linear.easeNone}, '<')
    .fromTo([".header .button"], 1, {}, { backgroundColor: '#1D1D1F', color: '#fff', ease: Linear.easeNone}, '<')

new ScrollMagic.Scene({ triggerElement: ".header-white-trigger", triggerHook: "onLeave", duration: "20" })
    .setTween(timelineHeaderWhite)
    .on("enter leave", function (e) {
        console.log(e.type)
    })
    // .addIndicators({name: `header`})
    .addTo(controller);

// start section gallery sell
const arrGalleryItemsSell = document.querySelectorAll('.section-gallery-sell .gallery-item');
let wipeAnimationSell = new TimelineMax();

for (let i = arrGalleryItemsSell.length - 1; i >= 0; i--) {
    wipeAnimationSell
        .fromTo(`.gallery-sell-item-${i} .gallery-item__text-inner`, 1, {transform: i === arrGalleryItemsSell.length - 1 ? 'translateY(0)' : 'translateY(150%)'}, {transform: 'translateY(0)', ease: Expo.easeOut})
        .fromTo(`.gallery-sell-item-${i} .gallery-item__image`, 1, {}, {transform: i === 0 ? 'translateY(0)' : 'translateY(-70vh)', ease: Linear.easeNone})
        .fromTo(`.gallery-sell-item-${i} .gallery-item__text-inner`, 1, {}, {transform: i === 0 ? 'translateY(0)' : 'translateY(-120%)', ease: Linear.easeNone}, '<')
}

new ScrollMagic.Scene({ triggerElement: "#section-gallery-sell",  triggerHook: "onLeave", duration: "150%" })
    .setPin("#section-gallery-sell")
    .setTween(wipeAnimationSell)
    // .addIndicators({name: `gallery-sell-items`})
    .addTo(controller);

// end section gallery sell

// start section-enabled
let timelineEnabled = new TimelineMax();

timelineEnabled
    .fromTo(`.enabled-image-0`, 1, {}, {transform: 'translateY(-20vh)', ease: "slow(0.3, 0.4)"})
    .fromTo(`.enabled-image-2`, 1, {}, {transform: 'translateY(-20vh)', ease: "slow(0.3, 0.4)"}, '<')

new ScrollMagic.Scene({ triggerElement: "#section-enabled",  triggerHook: "0.4", duration: "200%" })
    .setTween(timelineEnabled)
    // .addIndicators({name: `section-enabled`})
    .addTo(controller);

// background color dark
new ScrollMagic.Scene({ triggerElement: "#section-enabled",  triggerHook: "0.4" })
    .setClassToggle(".section-enabled", "section-inversion-dark")
    // .addIndicators({name: `section-enabled`})
    .addTo(controller);

    //for block mask
let timelineEnabledMask = new TimelineMax();

timelineEnabledMask
    .fromTo(`.mask-inner`, 1, {}, {maxWidth: '1100px', opacity: '0', ease: Linear.easeNone})
    .fromTo(`#enabled-link-left-top`, 1, {x: '-100vh', y: '-100vh'}, {x: '0', y: '0', ease: Expo.easeOuteaseOut})
    .fromTo(`#enabled-link-left-top`, 1, {opacity: '0'}, {opacity: '1', ease: Expo.easeOuteaseOut}, '<')
    .fromTo(`#enabled-link-top`, 1, {y: '-70vh'}, {y: '0', ease: Expo.easeOuteaseOut}, '<')
    .fromTo(`#enabled-link-top`, 1, {opacity: '0'}, {opacity: '1', ease: Expo.easeOuteaseOut}, '<')
    .fromTo(`#enabled-link-right-top`, 1, {x: '100vh', y: '-100vh'}, {x: '0', y: '0', ease: Expo.easeOuteaseOut}, '<')
    .fromTo(`#enabled-link-right-top`, 1, {opacity: '0'}, {opacity: '1', ease: Expo.easeOuteaseOut}, '<')
    .fromTo(`#enabled-link-left-bottom`, 1, {x: '-100vh', y: '100vh'}, {x: '0', y: '0', ease: Expo.easeOuteaseOut}, '<')
    .fromTo(`#enabled-link-left-bottom`, 1, {opacity: '0'}, {opacity: '1', ease: Expo.easeOuteaseOut}, '<')
    .fromTo(`#enabled-link-bottom`, 1, {y: '100vh'}, {y: '0', ease: Expo.easeOuteaseOut}, '<')
    .fromTo(`#enabled-link-bottom`, 1, {opacity: '0'}, {opacity: '1', ease: Expo.easeOuteaseOut}, '<')
    .fromTo(`#enabled-link-right-bottom`, 1, {x: '100vh', y: '100vh'}, {x: '0', y: '0', ease: Expo.easeOuteaseOut}, '<')
    .fromTo(`#enabled-link-right-bottom`, 1, {opacity: '0'}, {opacity: '1', ease: Expo.easeOuteaseOut}, '<')

new ScrollMagic.Scene({ triggerElement: "#section-enabled-mask",  triggerHook: "onLeave", duration: "200%" })
    // .setClassToggle(".section-enabled__links", "links-visible")
    .setPin("#section-enabled-mask")
    .setTween(timelineEnabledMask)
    .on("progress", function (e) {
        if(e.progress <= 0.333) {
            document.querySelector('.section-enabled__links').style.zIndex = '-1'
        } if(e.progress >= 0.3) {
            document.querySelector('.section-enabled__links').style.zIndex = '1'
        }
    })
    // .addIndicators({name: `section-enabled-mask`})
    .addTo(controller);
// end section-enabled



// const arrGallerySellItems = document.querySelectorAll('.section-gallery-sell .gallery-sell__items .block-items');
// let wipeAnimationSell = new TimelineMax();
//
// for (let i = arrGallerySellTrigger.length - 1; i >= 0; i--) {
//     wipeAnimationSell
//         .fromTo(`#gallery-sell-trigger-${i}`, 1, {y: 0}, {y: i === 0 ? '0' : '-100vh', ease: Linear.easeNone})
//         .call(function (idx) {
//             const nextTextEl = document.getElementById(`gallery-sell-items-trigger-${idx}`);
//             arrGallerySellItems.forEach(function (item) {
//                 item.removeAttribute('style')
//             });
//             nextTextEl.setAttribute('style', 'opacity: 1;');
//         }, [i], '<')
//         .to(`#gallery-sell-items-trigger-${i} .block-sell-items-list`, 1, {y: '-100%', ease: Linear.easeNone,})
// }
//
// new ScrollMagic.Scene({ triggerElement: "#section-gallery-sell",  triggerHook: "onLeave", duration: "100%" })
//     .setPin("#section-gallery-sell")
//     .setTween(wipeAnimationSell)
//     .addIndicators({name: `gallery-sell-items`})
//     .addTo(controller);




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





