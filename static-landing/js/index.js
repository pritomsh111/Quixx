//Navigation
let activeNav = document.querySelectorAll(".Quixx__Login__Signup li a");
let smt;
//Selectors
let home_container_quixx = document.querySelector(".Home__Quixx__Container");
let backdrop = document.querySelector(".backdrop");
let quixx_sections = document.querySelector(".Quixx__Login__Signup");
let quixx_navigation_toggler = document.querySelector(".Quixx__Navigation__Toggler");
let quixx_logo = document.querySelector(".Quixx__Logo");
let home_cta = document.querySelector(".Home__CTA");
let modal = document.querySelector(".Modal__Quixx");
// Preloader
let preloader = document.querySelector(".preloader");
setTimeout(() => {
    preloader.style.opacity = 0;
    preloader.style.visibility = "hidden";
}, 2500);
// Backdrop click

backdrop.addEventListener("click", function () {
    this.classList.remove("show");
    quixx_sections.classList.contains("toggle") ? quixx_sections.classList.remove("toggle") : null;
    quixx_navigation_toggler.classList.contains("toggle_nav") ? quixx_navigation_toggler.classList.remove("toggle_nav") : null;
    modal.classList.contains("show") ? modal.classList.remove("show") : null;

    if (document.querySelector('.Footer__R ul:first-child li:last-child div').innerHTML.includes("iframe")) {
        document.querySelector('.Footer__R ul:first-child li:last-child div').innerHTML = "";
    }
});

// Signup redirect

home_cta.addEventListener("click", function () {
    localStorage.setItem("home_cta", "home_cta");
    location.hash = "#login";
});

//To close [opened things]
document.addEventListener("click", function (event) {
    if (quixx_sections.contains(event.target)) {
    }
    else if (quixx_navigation_toggler.contains(event.target)) {
    }
    else {
        quixx_sections.classList.remove("toggle");
        quixx_navigation_toggler.classList.remove("toggle_nav");
    }
});

activeNav.forEach(item => item.addEventListener("click", function (event) {
    //Navbar Hide
    if (item.classList.contains("dropdown")) {
        return;
    }
    quixx_sections.classList.remove("toggle");
    quixx_navigation_toggler.classList.remove("toggle_nav");
    backdrop.classList.remove("show");
}));

//Navigation Toggle Button
quixx_navigation_toggler.addEventListener("click", function (event) {
    quixx_sections.classList.toggle("toggle");
    this.classList.toggle("toggle_nav");
    if (backdrop.classList.contains("show")) {
        backdrop.classList.remove("show");
    }
    else {
        backdrop.classList.add("show");
    }
});

const initNav = () => {
    location.hash = "#home";
}

let topScroll = document.querySelector(".Top__Scroll");
window.addEventListener("scroll", function (e) {

    if (this.scrollY > 850) {
        topScroll.classList.add("topScroll_visible");
    }
    else {
        if(window.innerWidth>1250){
            smt = 0 + (this.scrollY / 16);
        }
        else{
            smt = 0 + (this.scrollY / 7);
        }
        home_container_quixx.style.top = smt + "px";
        topScroll.classList.remove("topScroll_visible");
    }
});

// $(document).scroll(function () {
//     var scroll = $(window).scrollTop();
//     $(".Home__R img").css("top", "0" + (scroll / 1.8) + "px");
// });

topScroll.addEventListener("click", function (event) {
    window.scrollTo(0, 0);
    topScroll.classList.add("topScroll_animation");
});

// The function
let background_image_parallax = function ($object, multiplier) {
    multiplier = typeof multiplier !== 'undefined' ? multiplier : 0.5;
    multiplier = 1 - multiplier;
    let $doc = $(document);
    $object.css({ "background-attatchment": "fixed" });
    $(window).scroll(function () {
        let from_top = $doc.scrollTop(), bg_css = '0px ' + (multiplier * from_top) + 'px';
        if (multiplier * from_top > 400) {
            return;
        }
        $object.css({ "background-position": bg_css });
    });
};
background_image_parallax($(".Main__Page"), 0.50);

// document.querySelector(".Main__Page").addEventListener('mousemove', ev => {
//     console.log("Hello");
//     const force = 100;
//     const dx = -ev.clientX / window.innerWidth * force;
//     const dy = -ev.clientY / window.innerHeight * force;
//     document.querySelector(".Main__Page").style.backgroundPositionX = dx + 'px';
//     document.querySelector(".Main__Page").style.backgroundPositionY = dy + 'px';
// });
function play() {
    backdrop.classList.add("show");
    document.querySelector('.video').innerHTML = '<iframe src="https://www.youtube.com/embed/yUb31CFKN-g?autoplay=1" allowFullScreen="allowFullScreen" frameborder="0"></iframe>';
}
function showMap() {
    window.open("https://www.google.com/maps/place/23%C2%B043'20.9%22N+90%C2%B023'57.0%22E/@23.7225515,90.399207,19z/data=!4m5!3m4!1s0x0:0x0!8m2!3d23.7224703!4d90.3991549?hl=en", "_blank");
}