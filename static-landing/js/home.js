(() => {
    if (document.location.host.includes("portal")) {
        window.location.href = "/login-panel";
    }
    window.addEventListener('storage', function (event) {
        if (event.key == 'login-event') {
            window.location.href = "panel.html";
        }
    });
    let backdrop = document.querySelector(".backdrop");
    let count = 0, imgCount = 0;
    const imgClassArray = ["animation_IMG_1", "animation_IMG_2", "animation_IMG_3", "animation_IMG_4"];
    let img = document.querySelector(".Home__Quixx__Container img");

    let orgSlide = document.querySelector(".org_span");
    let merSlide = document.querySelector(".mer_span");

    // let mousePrice = document.querySelector(".Quixx__Pricing .pricing-card:nth-child(3) .order-btn");

    // mousePrice.addEventListener("mouseover", function () {
    //     this.style.color = "#000";
    // });
    // mousePrice.addEventListener("mouseleave", function () {
    //     this.style.color = "#fff";
    // });

    let hoverProduct = document.querySelector(".Quixx__Login__Signup li:last-child");
    let hoverProductUL = document.querySelector(".Quixx__Login__Signup li:last-child ul");

    hoverProduct.addEventListener("mouseover", function () {
        hoverProductUL.style.backgroundColor = "#f2f1f7";
    });

    let ob = document.querySelectorAll('.order-btn');

    ob.forEach(item => item.addEventListener("click", function (event) {
        localStorage.setItem("price", event.target.dataset.val);
        location.hash = "#login";
    }));

    const changeImage = () => {

        let overlay2 = document.querySelector("#overlay2");
        let overlay3 = document.querySelector("#overlay3");
        let overlay4 = document.querySelector("#overlay4");

        let img1 = document.querySelector(".Top__Select img");
        let img2 = document.querySelector(".Middle__Select img");
        let img3 = document.querySelector(".Bottom__Select img");

        let p1 = document.querySelector(".Top__Select p");
        let p2 = document.querySelector(".Middle__Select p");
        let p3 = document.querySelector(".Bottom__Select p");

        if (count === 0) {
            overlay2.style.opacity = 1;
            img1.classList.add("scaleUpImage");
            p1.classList.add("scaleUpPara");
        }
        if (count === 1) {
            overlay3.style.opacity = 1;
            img2.classList.add("scaleUpImage");
            p2.classList.add("scaleUpPara");
        }
        if (count === 2) {
            overlay4.style.opacity = 1;
            img3.classList.add("scaleUpImage");
            p3.classList.add("scaleUpPara");
        }
        // console.log(imageOverlay[count % 3], count);
        count = (count + 1) % 3;
        setTimeout(() => {
            overlay2.style.opacity = 0;
            overlay3.style.opacity = 0;
            overlay4.style.opacity = 0;

            img1.classList.remove("scaleUpImage");
            img2.classList.remove("scaleUpImage");
            img3.classList.remove("scaleUpImage");

            p1.classList.remove("scaleUpPara");
            p2.classList.remove("scaleUpPara");
            p3.classList.remove("scaleUpPara");
            changeImage();
        }, 3000);
    }

    changeImage();

    const imageMove = () => {
        img.classList.add(imgClassArray[imgCount]);
        setTimeout(() => {
            img.classList.remove(imgClassArray[imgCount]);
            imgCount = ++imgCount % 4;
            imageMove();
        }, 3000);
    }

    imageMove();

    new Swiper(".merchant-app", {
        autoplay: {
            delay: 4000,
        },
        clickable: 'true',
        slidesPerGroup: 1,
        effect: "coverflow",
        loop: true,
        centeredSlides: true,
        slideToClickedSlide: true,
        allowTouchMove: true,
        grabCursor: true,
        slidesPerView: "auto",
        coverflowEffect: {
            rotate: 1,
            stretch: -10,
            depth: 70,
            modifier: 8,
            slideShadows: true
        },
        pagination: {
            el: ".swiper-pagination"
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });

    let laptopSwipper = new Swiper(".quixx-laptop", {
        spaceBetween: 80,
        centeredSlides: true,
        grabCursor: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination"
        }
    });
    laptopSwipper.on("slideChange", function (e) {
        if (e.activeIndex === 0) {
            merSlide.classList.remove("slide_active");
            orgSlide.classList.add("slide_active");
        }
        else {
            merSlide.classList.add("slide_active");
            orgSlide.classList.remove("slide_active");
        }
    });

    new Swiper('.customer-review', {
        spaceBetween: 150,
        centeredSlides: true,
        grabCursor: true,
        pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
        },
    });

    backdrop.addEventListener("click", function () {
        if (document.querySelector('.video').innerHTML.includes("iframe")) {
            document.querySelector('.video').innerHTML = "";
        }
    });
})();