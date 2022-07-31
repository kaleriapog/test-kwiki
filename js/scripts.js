const navIconOpen = document.querySelector('.nav-icon-open')
const navIconClose = document.querySelector('.nav-icon-close')
const arrItemsMenuHeader = document.querySelectorAll('.header .header__navigation li')
const navigationBlock = document.querySelector('.header__navigation')
let controller = new ScrollMagic.Controller()
const heroVideo = document.getElementById('hero-video')
const sectionHero = document.querySelector('.section-hero')
const sectionVideoInPicture = document.querySelector('.section-video-in-picture')
const backgroundVideoPicture = document.querySelector('.background-video-picture')
const checkingAccountDescription = document.querySelector('.checking-account-description-interactive')
const arrPhoneScrollInteractive = document.querySelectorAll('.phone-scroll-interactive')
const arrFundingEveryItems = document.querySelectorAll('.section-funding-every .block-items__item')
const smarterLeftItem = document.querySelectorAll('.section-smarter__left .block-items__item')
const smarterRightItem = document.querySelectorAll('.section-smarter__right .block-items__item')
const accordion = document.querySelector('.accordion-list')

// all section
const sectionAbout = document.querySelector('.section-about')
const sectionAudio = document.querySelector('.section-audio')
const sectionFundingEvery = document.querySelector('.section-funding-every')
const sectionReliable = document.querySelector('.section-reliable')
const sectionSmarter = document.querySelector('.section-smarter')
const sectionSmartly = document.querySelector('.section-smartly')
const sectionCheckingAccount = document.querySelector('.section-checking-account')
const videoInPicture = document.querySelector('.video-in-picture')
const sectionProof = document.querySelector('.section-proof')
const sectionFaq = document.querySelector('.section-faq')
const sectionEndless = document.querySelector('.section-endless')
const sectionMaster = document.querySelector('.section-master')
const sectionLegitimizing = document.querySelector('.section-legitimizing')

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
//play video
heroVideo.addEventListener('playing', () => {
    new ScrollMagic.Scene({triggerElement: "#main", duration: '1', triggerHook: 0})
        // .addIndicators({name: "trigger"})
        .on("progress", function (e) {
            if(e.progress < 0.01) {
                document.body.classList.add('no-scroll')
            }
        })
        .addTo(controller)
        .reverse(false)
})

// for change size video in hero
let timelineSectionHero = new TimelineMax()
    .fromTo(['#hero-video'], 1, {}, {width: '600px', height: '340px', ease: Linear.easeNone})
    .fromTo(['#hero-text'], 1, {}, {opacity: '1', top: '75vh', ease: Linear.easeNone}, '<')

new ScrollMagic.Scene({ triggerElement: "#section-hero",  triggerHook: "onLeave", duration: "800px" })
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
if(sectionAbout) {
    let timelineSectionAbout = new TimelineMax()
        .fromTo(['#slider-about-track'], 1, {}, {transform: 'scale(0.593)', ease: Linear.easeNone})
        .fromTo(['#slider-about-track'], 1, {}, {y: '-20px', ease: Linear.easeNone}, '<')
        .fromTo(['#slider-about-track'], 1, {}, {x: '-1350px', ease: Linear.easeNone})
        .fromTo(['#about-text-narrow-interactive'], 1, {transform: 'translateY(130px)', opacity: '0'}, {transform: 'translateY(-68px)', opacity: '1', ease: Back.easeOut.config(1.7)}, '-=0.8')

    new ScrollMagic.Scene({ triggerElement: "#slider-about",  triggerHook: "0.8", duration: "1500px" })
        // .setPin("#slider-about")
        .setTween(timelineSectionAbout)
        // .addIndicators({name: `section about`})
        .addTo(controller);

        // for slide
        let splideAboutSlider = new Splide( '.slider-about', {
            type: 'loop',
            focus: 'center',
            gap: 20,
            autoWidth: true,
            arrows: false,
            pagination: false,
            clones: 2,
            drag: false,
        });

        splideAboutSlider.mount();

}
// end section about

// start section video in picture
if(videoInPicture) {

    let playVideoInPicture = new ScrollMagic.Scene({triggerElement: "#video-in-picture-interactive", triggerHook: 1})
        .on("enter", () => {
            document.getElementById('video-in-picture').play()
        })
        .on("leave", () => {
            document.getElementById('video-in-picture').pause()
        })
        // .addIndicators({name: "video start"})
        .addTo(controller)
        .reverse(true);

    let pauseVideoInPicture = new ScrollMagic.Scene({triggerElement: "#video-in-picture-interactive", triggerHook: 0})
        .on("enter", () => {
            document.getElementById('video-in-picture').pause()
        })
        .on("leave", () => {
            document.getElementById('video-in-picture').play()
        })
        // .addIndicators({name: "video start"})
        .addTo(controller)
        .reverse(true);

    let timelineVideoInPictureSmall = new TimelineMax()
        .fromTo(['.background-video-picture'], 1, {}, {visibility: 'visible', ease: Linear.easeNone})
        .fromTo(['.section-video-in-picture'], 1, {}, { backgroundColor: '#000', color: '#fff', ease: 'custom(M0,0 C0,0 0.007,0.267 0.034,0.39 0.054,0.487 0.047,0.515 0.078,0.608 0.1,0.677 0.113,0.713 0.148,0.776 0.173,0.822 0.217,0.882 0.254,0.92 0.283,0.95 0.318,0.98 0.36,0.988 0.43,1 0.448,1 0.5,1 0.566,1 0.6,1 0.66,1 0.791,1 1,1 1,1)'}, '<')
        .fromTo(['.background-video-picture'], 1, {transform: 'scale(1)'}, {transform: 'scale(0.7)', ease: Linear.easeNone})
        .fromTo(['#video-in-picture-inner-interactive'], 1, {}, {transform: 'scale(0.5)', ease: Linear.easeNone})
        .fromTo(['#items-list-dark-interactive'], 1, {}, {transform: 'translateY(calc(-70px - 25vh)', ease: Linear.easeNone})
        .fromTo(['#video-in-picture-inner-interactive'], 1, {}, {transform: 'scale(0.5) translateY(-25vh)', ease: Linear.easeNone})
        .fromTo(['#items-dark-interactive'], 1, {}, {padding: '0', ease: Linear.easeNone}, '<')

    new ScrollMagic.Scene({triggerElement: "#video-in-picture-interactive", duration: '4000px', triggerHook: 'onLeave'})
        // .addIndicators({name: "video stop and small"})
        .setPin("#video-in-picture-interactive")
        .setTween(timelineVideoInPictureSmall)
        .addTo(controller)
        .reverse(true)

    // let videoInPictureSmall = new ScrollMagic.Scene({triggerElement: "#video-in-picture-interactive", duration: '1000px', triggerHook: 'onLeave'})
    //     .setTween("#video-in-picture-inner-interactive", { height: '385px', width: '630px'}) // the tween durtion can be omitted and defaults to 1
    //     // .addIndicators({name: "video stop and small"})
    //     .setPin("#video-in-picture-interactive")
    //     .addTo(controller)
    //     .reverse(true)
    //     .on("progress", function (e) {
    //         if(e.progress <= 0) {
    //             sectionVideoInPicture.classList.remove('background-dark')
    //             backgroundVideoPicture.classList.remove('visible')
    //         } else {
    //             sectionVideoInPicture.classList.add('background-dark')
    //             backgroundVideoPicture.classList.add('visible')
    //         } if(e.progress === 1) {
    //             let itemsDarkInteractive = new ScrollMagic.Scene({triggerElement: "#items-dark-interactive", duration: '100px', triggerHook: 1})
    //                 .setTween("#items-list-dark-interactive", { transform: 'translateY(-70px)'})
    //                 // .addIndicators({name: "items-dark-interactive"})
    //                 .addTo(controller)
    //                 .reverse(true)
    //         }
    //     });
}
// end section video in picture

// start section checking account
if(sectionCheckingAccount) {
    let timelineCheckingAccount = new TimelineMax()
        .fromTo(['#checking-account-title-interactive'], 1, {y: '50px'}, {y: '0', ease: Linear.easeNone})
        .fromTo(['.checking-account-description-interactive'], 1, {opacity: 1, transform: 'translateY(100vh)'}, {opacity: 1, transform: 'translateY(0)', ease: Linear.easeNone}, '<')

    new ScrollMagic.Scene({ triggerElement: "#section-checking-account",  triggerHook: "0", duration: "1000px" })
        .setPin("#section-checking-account")
        .setTween(timelineCheckingAccount)
        // .addIndicators({name: `section-checking-account`})
        .addTo(controller);

    new ScrollMagic.Scene({ triggerElement: "#checking-account-title-interactive",  triggerHook: "1", duration: "500px" })
        // .addIndicators({name: `checking-account-title-interactive`})
        .setTween("#checking-account-title-interactive", {opacity: 1})
        .addTo(controller);

    // new ScrollMagic.Scene({ triggerElement: "#checking-account-title-interactive",  triggerHook: "0.1", duration: "200px" })
    //     // .addIndicators({name: `section-checking-account-inner`})
    //     .setTween("#checking-account-title-interactive", {opacity: 0})
    //     .addTo(controller);

    new ScrollMagic.Scene({ triggerElement: "#checking-account-description-interactive",  triggerHook: "0.1", duration: "200px" })
        // .addIndicators({name: `checking-account-description-interactive`})
        .setTween("#checking-account-description-interactive", {opacity: 0})
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
}
// end section checking account

// start gallery first
const arrGalleryItemsFirst = document.querySelectorAll('.section-gallery-first .gallery-item');
let wipeAnimationFirst = new TimelineMax();

for (let i = arrGalleryItemsFirst.length - 1; i >= 0; i--) {
    wipeAnimationFirst
        .fromTo(`.gallery-first-item-${i} .gallery-item__image`, {}, {transform: i === 0 ? 'translateY(0)' : 'translateY(-70vh)', ease: Linear.easeNone})
        .fromTo(`.gallery-first-item-${i} .gallery-item__text-inner`, {opacity: i === arrGalleryItemsFirst.length - 1 ? '1' : '0'}, {visibility: '1'}, '<')
        .fromTo(`.gallery-first-item-${i} .gallery-item__text-inner`, {}, {transform: 'translateY(-40px)'}, '<')
        .fromTo(`.gallery-first-item-${i} .gallery-item__text-inner`, {}, {opacity: i === 0 ? '1' : '0', ease: "custom(M0,0 C0,0 0,0.141 0,0.242 0,0.354 0,0.395 0,0.486 0,0.596 0,0.837 0,0.918 0,1.02 0.357,1 0.436,1 0.536,1 0.531,1 0.6,1 0.674,1 0.696,1 0.75,1 0.808,1 0.822,1 0.87,1 0.924,1 1,1 1,1 )"}, '<')
}

new ScrollMagic.Scene({ triggerElement: "#section-gallery-first",  triggerHook: "onLeave", duration: "1000px" })
    .setPin("#section-gallery-first")
    .setTween(wipeAnimationFirst)
    // .addIndicators({name: `gallery First`})
    .addTo(controller);

// end gallery first

//for section phone-scroll
let timelineSectionPhoneScroll = new TimelineMax()
    .fromTo(['#block-phone-scroll-image'], 1, {}, {y: window.outerHeight >= 890 ?'96px' : '130px', ease: Linear.easeNone})
    .fromTo(['#phone-scroll-interactive-0'], 1, {}, {y: '-10vh', ease: Linear.easeNone}, '<')

    arrPhoneScrollInteractive.forEach((item, i) => {
        let lastItem =  arrPhoneScrollInteractive.length - 1

        timelineSectionPhoneScroll
            .fromTo(`#phone-scroll-interactive-${i}`, 1, {opacity: i === 0 ? 1 : 0}, {opacity: 1, zIndex: '1', ease: Linear.easeNone})
            .fromTo(`#phone-scroll-interactive-${i}`, 1, {}, {opacity: (i === lastItem ) ? 1 : 0, ease: Linear.easeNone}, (i === lastItem ) ? '<' : '-=0')
    })

timelineSectionPhoneScroll
    .fromTo(['#block-phone-scroll-image'], 1, {}, {transform: window.outerHeight >= 890 ? 'scale(0.75)' : 'scale(0.55)', ease: Linear.easeNone}, '<')

new ScrollMagic.Scene({ triggerElement: "#section-phone-scroll",  triggerHook: "onLeave", duration: "2000px" })
    .setPin("#section-phone-scroll")
    .setTween(timelineSectionPhoneScroll)
    // .addIndicators({name: `section-phone-scroll`})
    .addTo(controller);

// start section-tagline
let timelineSectionTagline = new TimelineMax()

timelineSectionTagline
    .fromTo(['#tagline-video-wrapp'], 1, {}, {top: 0, ease: Linear.easeNone})
    .fromTo(['#tagline'], 1, {}, {opacity: 0, ease: Linear.easeNone}, '<')
    .fromTo(['#tagline-video'], 1, {}, {maxWidth: '100%', height: '100vh', ease: Linear.easeNone})

new ScrollMagic.Scene({ triggerElement: "#section-tagline",  triggerHook: "onLeave", duration: "1500px" })
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

// end section-tagline

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
    })
    // .addIndicators({name: `header`})
    .addTo(controller);

// start section gallery sell
const arrGalleryItemsSell = document.querySelectorAll('.section-gallery-sell .gallery-item');
let wipeAnimationSell = new TimelineMax();

for (let i = arrGalleryItemsSell.length - 1; i >= 0; i--) {
    wipeAnimationSell
        .fromTo(`.gallery-sell-item-${i} .gallery-item__text-inner`, 1, {transform: i === arrGalleryItemsSell.length - 1 ? 'translateY(0)' : 'translateY(105%)'}, {transform: 'translateY(0)'}, '-=0.4')
        .fromTo(`.gallery-sell-item-${i} .gallery-item__image`, 1, {}, {transform: i === 0 ? 'translateY(0)' : 'translateY(-70vh)', ease: "slow(0.3, 0.4)"})
        .fromTo(`.gallery-sell-item-${i} .gallery-item__text-inner`, 1, {}, {transform: i === 0 ? 'translateY(0)' : 'translateY(-105%)'}, '<')
}

new ScrollMagic.Scene({ triggerElement: "#section-gallery-sell",  triggerHook: "onLeave", duration: "3500px" })
    .setPin("#section-gallery-sell")
    .setTween(wipeAnimationSell)
    // .addIndicators({name: `gallery-sell-items`})
    .addTo(controller);

// end section gallery sell

// start section-enabled
let timelineEnabled = new TimelineMax();

timelineEnabled
    .fromTo(`.enabled-image-0`, 1, {transform: 'translateY(20vh)'}, {transform: 'translateY(-20vh)', ease: Linear.easeNone})
    .fromTo(`.enabled-image-2`, 1, {transform: 'translateY(20vh)'}, {transform: 'translateY(-20vh)', ease: Linear.easeNone}, '<')

new ScrollMagic.Scene({ triggerElement: "#section-enabled",  triggerHook: "0.4", duration: "2000px" })
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
    .fromTo(`#enabled-link-top`, 1, {y: '-100vh'}, {y: '0', ease: Expo.easeOuteaseOut}, '<')
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

// start section-audio
if (sectionAudio) {
    //for play video in section-audio
    new ScrollMagic.Scene({ triggerElement: "#block-audio-video",  triggerHook: "0.5" })
        .on("progress", (e) => {
            if(e.progress > 0) {
                document.getElementById('block-audio-video').play()
            }
        })
        // .addIndicators({name: `section Audio`})
        .addTo(controller)
        .reverse(true);

    new ScrollMagic.Scene({ triggerElement: "#main-items-block-audio",  triggerHook: "0.4" })
        .on("enter", () => {
            document.getElementById('block-audio-video').pause()
        })
        .setTween("#main-items-list-audio", { transform: 'translateY(0)', opacity: 1})
        // .addIndicators({name: `section Audio`})
        .addTo(controller)
        .reverse(true);
}
// end section-audio

// start section-funding-every
if(sectionFundingEvery) {
    // background color dark
    let timelineSectionFundingEvery = new TimelineMax();

    timelineSectionFundingEvery
        .fromTo(`.section-funding-every`, 1, {}, {backgroundColor: '#000', ease: Linear.easeNone})
        .fromTo(`.section-funding-every .title-regular`, 1, {}, {color: '#fff', ease: Linear.easeNone}, '<')

    new ScrollMagic.Scene({ triggerElement: "#section-funding-every",  triggerHook: "0.4", duration: "50px"})
        // .setClassToggle(".section-funding-every", "section-inversion-dark")
        // .addIndicators({name: `section-enabled`})
        .setTween(timelineSectionFundingEvery)
        .addTo(controller);

    let timelineSectionFundingEveryContent = new TimelineMax();

    timelineSectionFundingEveryContent
        .fromTo(`.section-funding-every__items`, 1, {}, {opacity: '1', ease: Linear.easeNone})
        .fromTo(`.section-funding-every .block-items__title`, 1, {}, {color: '#fff', ease: Linear.easeNone}, '<')
        .fromTo(`#funding-every-items-list`, 1, {}, {transform: 'translateY(calc(-100% + 110px))', ease: Linear.easeNone})

    new ScrollMagic.Scene({triggerElement: "#section-funding-every", triggerHook: "onLeave", duration: "1000px"})
        .setPin("#section-funding-every")
        // .addIndicators({name: `section-FundingEvery`})
        .setTween(timelineSectionFundingEveryContent)
        .addTo(controller);


    // let timelineFundingEvery = new TimelineMax()
    //
    // arrFundingEveryItems.forEach((item, idx) => {
    //     timelineFundingEvery
    //     .fromTo(`#funding-every-item-${idx}`, 1, {y: idx === 0 ? '-100px' : '0'}, {y: '-120vh', ease: Linear.easeNone})
    //     .fromTo(`#funding-every-item-${idx+1}`, 1, {opacity:  idx === 0 ? '0.1' : '0'}, {y: '0', opacity: '1', ease: Linear.easeNone}, '<')
    //
    // })
    //
    // new ScrollMagic.Scene({ triggerElement: "#section-funding-every",  triggerHook: "onLeave", duration: "200%" })
    //     .setTween(timelineFundingEvery)
    //     .setPin("#section-funding-every")
    //     .addIndicators({name: `section-FundingEvery`})
    //     .addTo(controller);
}
// end section-funding-every

// start section-reliable
if(sectionReliable) {
    // for slide section-reliable
    const reliableSliderLeft = new Swiper('.reliable-slider-left', {
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 20,
        autoplay: {
            delay: 1,
        },
        speed: 4000,
        breakpoints: {
            320: {
                direction: 'horizontal',
                spaceBetween: 15,
            },
            1024: {
                direction: 'vertical',
            },
        },
    });

    const reliableSliderRight = new Swiper('.reliable-slider-right', {
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 20,
        autoplay: {
            delay: 1,
            reverseDirection: true,
        },
        speed: 4000,
        breakpoints: {
            320: {
                direction: 'horizontal',
            },
            1024: {
                direction: 'vertical',
            },
        },
    });

}
// end section-reliable

// start section-smarter
if(sectionSmarter) {
    let timelineSectionSmarter = new TimelineMax();

    new ScrollMagic.Scene({ triggerElement: "#section-smarter-interactive",  triggerHook: "onLeave", duration: "100%" })
        // .setTween(timelineSectionSmarter)
        .setPin("#section-smarter-interactive")
        .on('progress', (e) => {
            let sumSmarterRightItem = smarterRightItem.length
            let sumSmarterLeftItem = smarterLeftItem.length
            let interval = 1 / (sumSmarterRightItem > sumSmarterLeftItem ? sumSmarterRightItem : sumSmarterLeftItem)
            let currentInterval = 0;
            let arrBigSmarterItem = sumSmarterRightItem > sumSmarterLeftItem ? smarterRightItem : smarterLeftItem

            arrBigSmarterItem.forEach((item, idx) => {
                if(e.progress > currentInterval && e.progress < currentInterval + interval) {
                    if(document.getElementById(`smarter-left-item-${idx}`)) {
                        document.getElementById(`smarter-left-item-${idx}`).classList.add('smarter-item-start-interactive')
                    }
                    if(document.getElementById(`smarter-right-item-${idx}`)) {
                        document.getElementById(`smarter-right-item-${idx}`).classList.add('smarter-item-start-interactive')
                    }
                }
                currentInterval = currentInterval + interval

            })
        })
        // .addIndicators({name: ` Section Smarter`})
        .addTo(controller);
}
// end section-smarter

// start section-smartly
if(sectionSmartly) {
    // for slider
    let splideSectionSmartly = new Splide( '.slider-smartly', {
        type: 'loop',
        focus: 'center',
        gap: 20,
        autoWidth: true,
        arrows: false,
        pagination: false,
        clones: 2,
        drag: false,
    } );

    splideSectionSmartly.mount();

    new ScrollMagic.Scene({ triggerElement: "#section-smartly",  triggerHook: "0.9", duration: "2000px" })
        .setTween("#slider-smartly-track", {transform: 'translateX(-173%)'})
        // .setPin("#slider-smartly")
        .addTo(controller);
}
// end section-smartly

// start section-endless
if(sectionEndless) {
    let timelineSectionEndless = new TimelineMax();

    timelineSectionEndless
        .fromTo(`#title-regular-mark-0`, 1, {}, {opacity: '0', ease: Linear.easeNone})
        .fromTo(`#title-regular-mark-1`, 1, {opacity: '0'}, {opacity: '1', ease: Linear.easeNone})
        .fromTo(`#endless-image-0`, 1, {}, {opacity: '0', ease: Linear.easeNone})
        .fromTo(`#endless-item-0`, 1, {}, {opacity: '0', ease: Linear.easeNone}, '<')
        .fromTo(`#endless-image-1`, 1, {opacity: '0'}, {opacity: '1', ease: Linear.easeNone})
        .fromTo(`#endless-item-1`, 1, {opacity: '0'}, {opacity: '1', ease: Linear.easeNone}, '<')

    new ScrollMagic.Scene({ triggerElement: "#section-endless",  triggerHook: "onLeave", duration: "2000px"})
        .setPin("#section-endless")
        // .addIndicators({name: `section-endless`})
        .setTween(timelineSectionEndless)
        .addTo(controller);
}
// end section-endless

// start section-proof
if(sectionProof) {
    // background color dark
    let timelineSectionProof = new TimelineMax();

    timelineSectionProof
        .fromTo(`.section-proof`, 1, {}, {backgroundColor: '#000', ease: Linear.easeNone})
        .fromTo(`.section-proof .title-regular`, 1, {}, {color: '#fff', ease: Linear.easeNone}, '<')
        .fromTo(`.section-proof .block-items__title`, 1, {}, {color: '#fff', ease: Linear.easeNone}, '<')

    new ScrollMagic.Scene({ triggerElement: "#section-proof",  triggerHook: "0.6", duration: "50px"})
        // .addIndicators({name: `section-enabled`})
        .setTween(timelineSectionProof)
        .addTo(controller);

    new ScrollMagic.Scene({ triggerElement: "#proof-photo-window",  triggerHook: "0.98", duration: "2000px" })
        .setTween("#proof-photo-interactive", {transform: 'translateX(-20%)'})
        // .addIndicators({name: `section proof`})
        .addTo(controller);
}
// end section proof

// start section faq
if(sectionFaq) {
    if(accordion) {
        const items = accordion.querySelectorAll('.accordion-list-item')

        function toggleAccordion() {
            let thisItem = this.closest('.accordion-list-item');

            items.forEach(item => {
                if (thisItem === item) {
                    thisItem.classList.toggle('open-accordion-item');
                    return;
                }

                item.classList.remove('open-accordion-item');

            });
        }

        items.forEach(question => question.addEventListener('click', toggleAccordion))
    }
}
// end section faq

// start section master
if(sectionMaster) {

    // background color dark
    let timelineSectionFundingEvery = new TimelineMax();

    timelineSectionFundingEvery
        .fromTo(`.section-master`, 1, {}, {backgroundColor: '#000', ease: Linear.easeNone})
        .fromTo(`.section-master .title-regular`, 1, {}, {color: '#fff', ease: Linear.easeNone}, '<')
        .fromTo(`.section-master .block-items__title`, 1, {}, {color: '#fff', ease: Linear.easeNone}, '<')

    new ScrollMagic.Scene({ triggerElement: "#section-master",  triggerHook: "0.6", duration: "50px"})
        // .addIndicators({name: `section-enabled`})
        .setTween(timelineSectionFundingEvery)
        .addTo(controller);

    new ScrollMagic.Scene({ triggerElement: "#section-master",  triggerHook: "0.3", duration: "300px"})
        .setTween(`#master-items`, {y: '0', ease: Linear.easeNone})
        .addTo(controller);
}
// end section master

// start section legitimizing
if(sectionLegitimizing) {

    // background color dark
    let timelineSectionLegitimizing = new TimelineMax();

    timelineSectionLegitimizing
        .fromTo(`#image-blur`, 1, {}, {opacity: '0', ease: Linear.easeNone})
        .fromTo(`#legitimizing-headline`, 1, {opacity: '1'}, {opacity: '0', ease: Linear.easeNone}, '<')
        .fromTo(`#legitimizing-items`, 1, {opacity: '0'}, {opacity: '1', ease: Linear.easeNone})

    new ScrollMagic.Scene({ triggerElement: "#section-legitimizing",  triggerHook: "onLeave", duration: "1500px"})
        // .addIndicators({name: `section-legitimizing`})
        .setTween(timelineSectionLegitimizing)
        .setPin("#section-legitimizing")
        .addTo(controller);
}
// end section legitimizing
