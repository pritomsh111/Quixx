(() => {
    // if (!document.location.host.includes("portal")) {
    //     window.location.href = "/";
    // }

    // Storage Event
    window.addEventListener('storage', function (event) {
        if (event.key == 'login-event') {
            window.location.href = "panel.html";
        }
    });
    let phone;

    // DOM manipulation
    let preloader = document.querySelector(".preloader");
    setTimeout(() => {
        preloader.style.opacity = 0;
        preloader.style.visibility = "hidden";
    }, 1000);

    document.querySelector(".Company>div").style.cursor = "pointer";
    document.querySelector(".Company>div").addEventListener('click', function (e) {
        e.preventDefault();
        location.reload();
    });

    // ClientWho
    let cw = document.location.host.split(".");
    cw = cw[1];
    cw = "tcexpressbd";

    // Logo
    let lg = document.querySelector(".Company>div");

    // Favicon
    let fc = document.querySelector("link[rel='shortcut icon']");

    // CompanyName
    let cn = document.querySelector(".Company>h2");

    //Footer
    let fooot = document.querySelector(".Quixx__Footer");
    let fooot2 = document.querySelector(".Quixx__Copyright__Issue");

    // Footer Left
    let footLogo = document.querySelector(".Quixx__Logo>div")
    let aboutCompany = document.querySelector(".aboutCompany");
    let fb_company = document.querySelector(".fb_company");
    let i_company = document.querySelector(".i_company");
    let li_company = document.querySelector(".li_company");

    // Footer Right
    let addressL = Array.from(document.querySelector(".Footer__R>ul:first-child").children);
    let addressR = Array.from(document.querySelector(".Footer__R>ul:nth-child(2)").children);
    let whichCompany = document.querySelector(".whichCompany");

    let encKey;
    let deliveries;
    function parcelboat() {
        cn.innerHTML = "<strong style=color:#B74046>Delivering</strong> Happiness <i class='fa fa-play' style='color:#B74046;font-size:0.9rem;vertical-align:middle'></i>";
        // cn.style.display = "none";
        document.title = "Parcel Boat";
        lg.style.backgroundImage = "url(static-landing/img/clients/parcelboat.png)";
        encKey = "$2a$10$32GGf.bY5lUyawFN4SQId.b6dI8M66kBEf0zniZfvaNgFeRIlNefW";
        fc.href = "static-landing/img/clients/parcelboat.png";
        // Change width/height of Logo
        lg.style.height = "115px";

        //Footer Left
        footLogo.style.backgroundImage = "url(static-landing/img/clients/parcelboat-2.png)";
        footLogo.style.height = "100px";
        aboutCompany.innerHTML = "A Service - Safe &amp; Affordable";
        aboutCompany.style.fontWeight = "500";
        aboutCompany.style.width = "90%";

        Array.from(document.querySelectorAll(".Footer__R ul li")).map(item => item.style.opacity = ".95");

        fb_company.href = "https://www.facebook.com/parcelboatdeliveries";
        // i_company.style.display = "none";
        li_company.style.display = "none";
        i_company.href = "https://www.instagram.com/parcelboatdeliveries/";
        // li_company.href = "https://www.linkedin.com";

        // fooot.style.backgroundColor = "#B74046";
        // fooot2.style.backgroundColor = "rgb(121 27 32)";

        // Footer Right
        addressL[1].innerHTML = "2B, 20 Pallabi, Mirpur 11.5";
        addressL[2].innerHTML = "Dhaka 1216";

        // Footer Right 2
        addressR[1].innerHTML = "<a href='mailto:parcelboat@gmail.com'>parcelboat@gmail.com</a>";
        addressR[2].innerHTML = "<a href='tel:01323578062'>01323578062</a>";

        // Footer Copyright Name
        whichCompany.innerHTML = "ParcelBoat";

        //Per Delivery Cost
        deliveries = "0";
    }
    function tcexpressbd() {
        cn.innerHTML = "<strong style=color:#B74046>Send products </strong>to anyone on time.";
        // cn.style.display = "none";
        document.title = "Take Care Express";
        lg.style.backgroundImage = "url(static-landing/img/clients/takecare.png)";
        encKey = "$2a$10$4jjUQJoDz.od780DzZQHRe.K.CDQzEtr70Btxme4cjdFrncl6vUaq";
        fc.href = "static-landing/img/clients/takecare.png";
        // Change width/height of Logo
        lg.style.height = "115px";

        //Footer Left
        footLogo.style.backgroundImage = "url(static-landing/img/clients/takecare.png)";
        footLogo.style.height = "100px";
        aboutCompany.innerHTML = "A doorstep courier service for all over Bangladesh";
        aboutCompany.style.fontWeight = "500";
        aboutCompany.style.width = "90%";

        Array.from(document.querySelectorAll(".Footer__R ul li")).map(item => item.style.opacity = ".95");

        fb_company.href = "https://www.facebook.com/takecareexpressbd";
        // i_company.style.display = "none";
        li_company.style.display = "none";
        i_company.href = "https://www.instagram.com/takecareexpress/";
        // li_company.href = "https://www.linkedin.com";

        // fooot.style.backgroundColor = "#B74046";
        // fooot2.style.backgroundColor = "rgb(121 27 32)";

        // Footer Right
        addressL[1].innerHTML = "1/4-A North Pirerbag, Mirpur-2 (Behind the Yamaha Show Room, 60 feet Road)";
        addressL[2].innerHTML = "Dhaka-1216";

        // Footer Right 2
        addressR[1].innerHTML = "<a href='mailto:contact@tcexpressbd.com'>contact@tcexpressbd.com</a>";
        addressR[2].innerHTML = "<a href='tel:01323578062'>01323578062</a>";

        // Footer Copyright Name
        whichCompany.innerHTML = "Take Care Express";

        //Per Delivery Cost
        deliveries = "0";
    }
    function nogorbondhu() {
        cn.innerHTML = "Nogor Bondhu";
        document.title = "Nogor Bondhu";
        lg.style.backgroundImage = "url(static-landing/img/clients/nogorbondhu.png)";
        encKey = "$2a$10$d4t/FMRC53KruxaEkBrite9xzKXFeF3g7MbOatsdATM73udza6P5G";
        fc.href = "static-landing/img/clients/nogorbondhu.png";

        lg.style.width = "160px";
        lg.style.height = "100px";
        // document.querySelector(".Company").style.cssText = 'position: relative;left: -38%;top: -55%;';
        // document.body.style.background = "url('./static-landing/img/clients/nogonbondhu-bg.png') no-repeat left bottom/138vh";
        if (window.innerWidth < 961) {
            document.querySelector(".Company").style.cssText = 'position: relative;top: -1.6rem;';
        }
        cn.style.display = "none";

        //Footer Left
        footLogo.style.backgroundImage = "url(static-landing/img/clients/nogorbondhu.png)";
        footLogo.style.width = "150px";
        footLogo.style.height = "90px";

        aboutCompany.innerHTML = "The fastest and the most dedicated courier service provider anyone can trust.";

        fb_company.href = "https://www.facebook.com";
        i_company.href = "https://www.instagram.com";
        li_company.href = "https://www.linkedin.com";

        // Footer Right
        addressL[1].innerHTML = "Gulshan 2";
        addressL[2].innerHTML = "Dhaka, Bangladesh";

        // Footer Right 2
        addressR[1].innerHTML = "<a href='mailto:your-company@domain.com'>your-company@domain.com</a>";
        addressR[2].innerHTML = "<a href='tel:019XXXXXXXX'>019XXXXXXXX</a>";

        // Footer Copyright Name
        whichCompany.innerHTML = "NogorBondhu";

        //Per Delivery Cost
        deliveries = "0";
    }
    function quixxprojects() {
        cn.innerHTML = "Quixx Projects";
        cn.style.display = "none";
        document.title = "Quixx Projects";
        lg.style.backgroundImage = "url(static-landing/img/clients/quixxprojects.png)";
        encKey = "$2a$10$kfCg3y4byGpITW80BFEs6.qUXnM/6a4BpqkLuX2xJSrVHUXiHw2a2";
        fc.href = "static-landing/img/clients/quixxprojects.png";
        // Footer Left
        footLogo.style.backgroundImage = "url(static-landing/img/clients/quixxprojects.png)";
        footLogo.style.height = "105px";
        aboutCompany.innerHTML = "We believe in excellence, NOT";

        fb_company.href = "https://www.facebook.com";
        i_company.href = "https://www.instagram.com";
        li_company.href = "https://www.linkedin.com";

        // Footer Right
        addressL[1].innerHTML = "Dhanmondi 27, Lake Road";
        addressL[2].innerHTML = "Dhaka, Bangladesh";

        // Footer Right 2
        addressR[1].innerHTML = "<a href='mailto:your-company@domain.com'>your-company@domain.com</a>";
        addressR[2].innerHTML = "<a href='tel:019XXXXXXXX'>019XXXXXXXX</a>";

        // Footer Copyright Name
        whichCompany.innerHTML = "Quixx Projects";

        //Per Delivery Cost
        deliveries = "0";
    }
    function quixx() {
        cn.innerHTML = "Quixx";
        cn.style.display = "none";
        document.title = "Quixx";
        lg.style.backgroundImage = "url(static-landing/img/clients/quixx.png)";
        encKey = "$2a$10$E1RXLYHC7rXnF1QNS3r7HenwCGvtu/almg4qp6Q.hjs8w3eRRf6eS";
        fc.href = "static-landing/img/clients/quixx.png";

        //Footer Left
        footLogo.style.backgroundImage = "url(static-landing/img/clients/quixx.png)";
        aboutCompany.innerHTML = "*Something about your company*";

        fb_company.href = "https://www.facebook.com";
        i_company.href = "https://www.instagram.com";
        li_company.href = "https://www.linkedin.com";

        // Footer Right
        addressL[1].innerHTML = "Dhanmondi 27, Lake Road";
        addressL[2].innerHTML = "Dhaka, Bangladesh";

        // Footer Right 2
        addressR[1].innerHTML = "<a href='mailto:your-company@domain.com'>your-company@domain.com</a>";
        addressR[2].innerHTML = "<a href='tel:019XXXXXXXX'>019XXXXXXXX</a>";

        // Footer Copyright Name
        whichCompany.innerHTML = "Quixx";

        //Per Delivery Cost
        deliveries = "80";
    }

    // Selection!!
    if (cw === "parcelboat") {
        parcelboat();
    }
    else if (cw === "tcexpressbd") {
        tcexpressbd();
    }
    else if (cw === "nogorbondhu") {
        nogorbondhu();
    }
    else if (cw === "quixxprojects") {
        quixxprojects();
    }
    else if (cw === "quixx") {
        quixx();
    }

    // Defaults
    let inputAll = document.querySelectorAll(".Quixx__Form__Main input");
    Array.from(inputAll).map(item => item.addEventListener("keyup", function () {
        clearError();
        clearError2();
    }));

    let body = document.body;
    let modal = document.querySelector(".Modal__Quixx");
    let backdrop = document.querySelector(".backdrop");
    let loaderDiv = document.querySelector(".Signup__Loader");
    let modalErr = document.querySelector(".Signup__Loader>h2");
    let loader = document.querySelector(".circle-loader");
    let checkmark = document.querySelector(".checkmark");

    let modalCloseButton = document.querySelector(".close-button");
    let modalNextButton = document.querySelector(".next-button");
    let modalDoneButton = document.querySelector(".done-button");
    let forgotPassword = document.querySelector(".forgot_pass");
    let modal_header = document.querySelector(".modal-header");
    let forgotPass = document.querySelector(".forgot-pass");
    let modalError = document.querySelector(".modal-error");
    let modalFooter = document.querySelector(".Modal__Quixx .modal-footer");

    let phone_number = document.querySelector("#phone_number");
    let fp_restore = document.querySelector("#fp-restore");
    let fp_step1 = document.querySelector(".FP-step-1");
    let fp_step2 = document.querySelector(".FP-step-2");

    let quixxFormMain = document.querySelector(".Quixx__Form__Main");
    let signInButtonTop = document.querySelector(".signInButton");
    let signUpButtonTop = document.querySelector(".signUpButton");
    let signInDiv = document.querySelector(".Quixx__Login");
    let signUpDiv = document.querySelector(".Quixx__Signup");
    signInButtonTop.addEventListener("click", function () {
        this.classList.add("active-btn");
        signUpButtonTop.classList.remove("active-btn");
        signInDiv.classList.add("Show");
        signInDiv.classList.remove("HideOut");
        signUpDiv.classList.add("HideOut");
        signUpDiv.classList.remove("Show");
        quixxFormMain.classList.add("height_login");
        quixxFormMain.classList.remove("height_signup");
        quixxFormMain.classList.remove("heightForBank");
        quixxFormMain.classList.remove("heightForBank1");
        quixxFormMain.classList.remove("heightForMob");
    });
    signUpButtonTop.addEventListener("click", function () {
        this.classList.add("active-btn");
        signInButtonTop.classList.remove("active-btn");
        signUpDiv.classList.add("Show");
        signUpDiv.classList.remove("HideOut");
        signInDiv.classList.add("HideOut");
        signInDiv.classList.remove("Show");
        quixxFormMain.classList.remove("height_login");
        if (document.querySelector("#phyBank2").checked && document.querySelector("#mobileSelect2").checked) {
            quixxFormMain.classList.add("heightForBank1");
        }
        else if (document.querySelector("#phyBank2").checked) {
            quixxFormMain.classList.add("heightForBank");
        }
        else if (document.querySelector("#mobileSelect2").checked) {
            quixxFormMain.classList.add("heightForMob");
        }
        else {
            quixxFormMain.classList.add("height_signup");
        }

    });

    //Banks and Mobile Banks    

    document.querySelector("#mobileSelect2").addEventListener("click", function () {
        document.querySelector(".bankCheck").classList.toggle("mbx");
        if (document.querySelector("#phyBank2").checked && document.querySelector("#mobileSelect2").checked) {
            quixxFormMain.classList.add("heightForBank1");
            quixxFormMain.classList.remove("heightForBank");
        }
        else if (document.querySelector("#phyBank2").checked) {
            quixxFormMain.classList.add("heightForBank");
            quixxFormMain.classList.remove("heightForBank1");
        }
        else if (document.querySelector("#mobileSelect2").checked) {
            quixxFormMain.classList.add("heightForMob");
        }
        else {
            quixxFormMain.classList.remove("heightForMob");
            quixxFormMain.classList.add("height_signup");
        }
    });
    document.querySelector("#phyBank2").addEventListener("click", function () {
        document.querySelector(".bankCheck").classList.toggle("bbx");
        if (document.querySelector("#mobileSelect2").checked && document.querySelector("#phyBank2").checked) {
            quixxFormMain.classList.add("heightForBank1");
        }
        else if (document.querySelector("#phyBank2").checked) {
            quixxFormMain.classList.add("heightForBank");
        }
        else if (document.querySelector("#mobileSelect2").checked) {
            quixxFormMain.classList.add("heightForMob");
            quixxFormMain.classList.remove("heightForBank1");
            quixxFormMain.classList.remove("heightForBank");
        }
        else {
            quixxFormMain.classList.add("height_signup");
            quixxFormMain.classList.remove("heightForBank1");
            quixxFormMain.classList.remove("heightForBank");
        }
    });

    if (localStorage.getItem("home_cta")) {
        localStorage.removeItem("home_cta");
        signUpButtonTop.click();
    }
    if (localStorage.getItem("price")) {
        document.querySelector("#deliveries").value = localStorage.getItem("price");
        localStorage.removeItem("price");
        signUpButtonTop.click();
        document.querySelector(".active-btn").focus();
    }

    forgotPassword.addEventListener("click", function () {
        loaderDiv.style.display = "none";
        modalError.style.display = "none";
        forgotPass.style.display = "block";
        modalFooter.style.marginTop = "7rem";
        modal_header.innerHTML = "<h2>Forgot Password?</h2>";
        backdrop.classList.add("show");
        modal.classList.add("show");
        modalCloseButton.style.display = "inline";
        modalNextButton.style.display = "inline";
        modalNextButton.disabled = true;
        modalDoneButton.style.display = "none";
        fp_step1.classList.add("show");
        fp_step1.classList.remove("hide");
        fp_step2.classList.add("hide");
        fp_step2.classList.remove("show");
        phone_number.value = "";
    });
    modalCloseButton.addEventListener("click", function () {
        backdrop.classList.remove("show");
        modal.classList.remove("show");
    });
    modalNextButton.addEventListener("click", function () {
        phone = document.querySelector("#phone_number").value;
        ////console.log(phone);
        $.ajax
            ({
                type: "POST",
                url: api + "forget/password/get/vCode/" + phone,
                success: function (data) {
                    //console.log(data);
                    fp_restore.value = "";
                    fp_step2.classList.add("show");
                    fp_step2.classList.remove("hide");
                    fp_step1.classList.add("hide");
                    fp_step1.classList.remove("show");
                    modalCloseButton.style.display = "none";
                    modalNextButton.style.display = "none";
                    modalDoneButton.style.display = "inline";
                },
                error: function (data) {
                    let ob = Object.keys(data);
                    let modalErr = document.querySelector('.modal-error>h2');
                    modalErr.style.color = "#e22b2b";
                    if (ob[17] === "responseJSON") {
                        modalErr.innerHTML = data.responseJSON.errorMessage;
                    }
                    else {
                        modalErr.innerHTML = "Please Wait! We are working!";
                    }
                    modalErrorFunc();
                }
            });
    });

    // For Forget Pass
    phone_number.addEventListener("keyup", function (event) {
        if (/^\d{11}$/.test(event.target.value) && event.target.value.match(/\d/g).length === 11) {
            modalNextButton.disabled = false;
        }
        else {
            modalNextButton.disabled = true;
        }
    });
    fp_restore.addEventListener("keyup", function (event) {
        if (/^\d{4}$/.test(event.target.value) && event.target.value.match(/\d/g).length === 4) {
            modalDoneButton.disabled = false;
        }
        else {
            modalDoneButton.disabled = true;
        }
    });
    modalDoneButton.addEventListener("click", function () {
        loaderDiv.style.display = "block";
        forgotPass.style.display = "none";
        modalError.style.display = "none";
        modalErr.innerHTML = "";
        modalFooter.style.marginTop = "-2.2rem";
        loader.classList.remove("load-complete");
        checkmark.style.display = "none";
        loader.style.display = "inline-block";
        modalDoneButton.style.display = "none";
        modalCloseButton.style.display = "inline";
        modalCloseButton.disabled = true;
        let code = document.querySelector("#fp-restore").value;
        $.ajax
            ({
                type: "GET",
                url: api + "forget/password/submit/vCode/" + phone + "/" + code,
                success: function (data) {
                    //console.log(data);
                    if (data.data === true) {
                        setTimeout(function () {
                            loader.classList.remove("load-complete");
                            setTimeout(function () {
                                body.style.pointerEvents = "auto";
                                loader.classList.add("load-complete");
                                checkmark.style.display = "block";
                                modalErr.innerHTML = "You will receive an SMS!";
                                modalErr.style.color = "#000";
                                modalCloseButton.disabled = false;
                            }, 1000);
                        }, 2000);
                    }
                    else {
                        loader.style.display = "none";
                        modalCloseButton.disabled = false;
                        let modalErr = document.querySelector('.modal-error>h2');
                        modalErr.innerHTML = "Wrong Code!";
                        modalErr.style.color = "#e22b2b";
                        modalErrorFunc();
                    }
                },
                error: function (data) {
                    let ob = Object.keys(data);
                    let modalErr = document.querySelector('.modal-error>h2');
                    modalErr.style.color = "#e22b2b";
                    if (ob[17] == "responseJSON") {
                        modalErr.innerHTML = data.responseJSON.errorMessage;
                    }
                    else {
                        modalErr.innerHTML = "Please Wait! We are working!";
                    }
                    modalErrorFunc();
                }
            });
    });

    let modalErrorFunc = () => {
        loaderDiv.style.display = "none";
        forgotPass.style.display = "none";
        modalError.style.display = "block";
        modalFooter.style.marginTop = "-2.2rem";
        modalCloseButton.style.display = "inline";
        modalNextButton.style.display = "none";
        modalDoneButton.style.display = "none";
        modal_header.innerHTML = "";
        backdrop.classList.add("show");
        modal.classList.add("show");
    }

    let modalSignupFunc = () => {
        loaderDiv.style.display = "block";
        forgotPass.style.display = "none";
        modalError.style.display = "none";
        modalErr.innerHTML = "";
        loader.classList.remove("load-complete");
        checkmark.style.display = "none";
        loader.style.display = "inline-block";
        modalFooter.style.marginTop = "-2.2rem";
        modalCloseButton.style.display = "inline";
        modalCloseButton.disabled = true;
        modalNextButton.style.display = "none";
        modalDoneButton.style.display = "none";
        modal_header.innerHTML = "";
        backdrop.classList.add("show");
        modal.classList.add("show");
    }

    let passIcon = document.querySelector(".password i");
    let password = document.querySelector("#password");
    passIcon.addEventListener("click", function () {
        if (passIcon.classList.contains("fa-eye-slash")) {
            passIcon.setAttribute("class", "fa fa fa-eye");
            password.setAttribute("type", "text");
        }
        else {
            passIcon.setAttribute("class", "fa fa fa-eye-slash");
            password.setAttribute("type", "password");
        }
    });

    function clearError() {
        document.querySelectorAll("p.error").forEach(item => item.innerHTML = "");
    }
    function clearError2() {
        document.querySelectorAll(".bankCheck p").forEach(item => item.innerHTML = "");
    }
    function createError(errorMessage, fragmentID) {
        clearError();
        if (fragmentID === "password") {
            document.querySelector(`.${fragmentID}+p`).innerHTML = errorMessage;
            document.querySelector(`#${fragmentID}`).focus();
            return;
        }
        document.querySelector(`.${fragmentID}>p`).innerHTML = errorMessage;
        document.querySelector(`#${fragmentID}`).focus();
    }
    function createError2(errorMessage, fragmentID) {
        console.log(errorMessage, fragmentID);
        clearError2();
        document.querySelector(`#${fragmentID}+p`).innerHTML = errorMessage;
        document.querySelector(`#${fragmentID}`).focus();
    }

    document.querySelector("#login").addEventListener("click", function () {
        let username = document.querySelector("#username").value;
        let password = document.querySelector("#password").value;
        let v1 = () => {
            if (username === "") {
                createError("Username cannot be empty!", "username");
                return 0;
            }
            else {
                return 1;
            }
        }
        let v2 = () => {
            if (password === "") {
                createError("Password cannot be empty!", "password");
                return 0;
            }
            else {
                return 1;
            }
        }
        if (v1() && v2()) {
            clearError();
            localStorage.setItem('user', username);
            localStorage.setItem('pass', password);
            localStorage.setItem('wh-user', "/");
            $.ajax
                ({
                    async: true,
                    type: "POST",
                    url: api + "login",
                    headers:
                    {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify
                        ({
                            "username": username,
                            "password": password
                        }),
                    success: function (data) {
                        localStorage.setItem('login-event', 'login' + Math.random());
                        localStorage.setItem('main-token', data.data);
                        localStorage.setItem('time', new Date(Date.now() + 86400000));
                        window.location.href = "panel.html";
                    },
                    error: function (data) {
                        let ob = Object.keys(data);
                        let modalErr = document.querySelector('.modal-error>h2');
                        modalErr.style.color = "#e22b2b";
                        if (ob[17] == "responseJSON") {
                            modalErr.innerHTML = data.responseJSON.errorMessage;
                        }
                        else {
                            modalErr.innerHTML = "Please Wait! We are working!";
                        }
                        modalErrorFunc();
                    }
                });
        }
    });

    document.querySelector("#signup").addEventListener("click", function () {
        let org = document.querySelector("#org").value;
        let email = document.querySelector("#email").value;
        let contact = document.querySelector("#contact").value;
        let owner = document.querySelector("#owner").value;
        let business = document.querySelector("#business").value;
        let v1 = () => {
            // if (parseInt(deliveries) < 0) {
            //     createError("Delivery Cost must be greater than or equal to 0!", "deliveries");
            //     return 0;
            // }
            // else if (isNaN(deliveries) === true || deliveries === "" || !/\D/.test(deliveries) === false) {
            //     createError("Delivery Cost must be a number!", "deliveries");
            //     return 0;
            // }
            // else if (!/\D/.test(deliveries) === true) {
            //     return 1;
            // }
            return 1;
        }
        let v2 = () => {
            if (business === "") {
                createError("Business Category cannot be empty!", "business");
                return 0;
            }
            else {
                return 1;
            }
        }
        let v3 = () => {
            if (contact === "") {
                createError("Phone Number cannot be empty!", "contact");
                return 0;
            }
            else if ((contact.length < 11 || contact.length > 11) || /\D/.test(contact) === true) {
                createError("Phone Number must be of 11 digits!", "contact");
                return 0;
            }
            else if (contact.match(/\d/g).length === 11 && !/\D/.test(contact) === true) {
                return 1;
            }
            else {
                createError("Phone Number not valid!", "contact");
                return 0;
            }
        }
        let v4 = () => {
            if (email === "" || email === null) {
                createError("Email cannot be empty!", "email");
                return 0;
            }
            else if (email !== "" || email !== null) {
                if (/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
                    email
                )) {
                    return 1;
                }
                else {
                    createError("Please give a valid email!", "email");
                    return 0;
                }
            }

        }
        let v5 = () => {
            if (owner === "") {
                createError("Owner Name cannot be empty!", "owner");
                return 0;
            }
            else {
                return 1;
            }
        }
        let v6 = () => {
            if (org === "") {
                createError("Organization Name cannot be empty!", "org");
                return 0;
            }
            else {
                return 1;
            }
        }
        var mbank = document.querySelector("#mobileSelect2").checked;
        var bbank = document.querySelector("#phyBank2").checked;
        var mselect, minput;
        var v7 = () => {
            if (mbank) {
                mselect = document.querySelector("#brb2").value;
                minput = document.querySelector("#brbInput2").value;
                if (minput == "" || minput == null) {
                    createError2(`<strong>${mselect}</strong>: Phone Number cannot be empty!`, "brbInput2");
                    return 0;
                }
                else if ((minput.length < 11 || minput.length > 11) || /\D/.test(minput) == true) {
                    createError2(`<strong>${mselect}</strong>: Phone Number must be of 11 digits!`, "brbInput2");
                    return 0;
                }
                else if (minput.match(/\d/g).length === 11 && !/\D/.test(minput) == true) {
                    clearError2();
                    return 1;
                }
                else {
                    createError2(`<strong>${mselect}</strong>: Phone Number not valid!`, "brbInput2");
                    return 0;
                }
            }
            else {
                mselect = "";
                minput = "";
                return 1;
            }
        }
        var bselect, bName, branchName, accountNo;
        var v8 = () => {
            if (bbank) {
                bselect = "yes";
                bName = document.querySelector("#bName2").value;
                branchName = document.querySelector("#branchName2").value;
                accountNo = document.querySelector("#accountNo2").value;
                if (bName == "" || bName == null) {
                    createError2(`<strong>Bank Name</strong> cannot be empty!`, "bName2");
                    return 0;
                }
                else if (branchName == "" || branchName == null) {
                    createError2(`<strong>Branch Name</strong> cannot be empty!`, "branchName2");
                    return 0;
                }
                else if (accountNo == "" || accountNo == null) {
                    createError2(`<strong>Account No</strong> cannot be empty!`, "accountNo2");
                    return 0;
                }
                else {
                    clearError2();
                    return 1
                }
            }
            else {
                bselect = "no";
                bName = branchName = accountNo = "";
                return 1;
            }
        }
        if (v7() && v8() && v6() && v5() && v4() && v3() && v2() && v1()) {
            clearError();
            clearError2();
            body.style.pointerEvents = "none";
            loader.classList.remove("load-complete");
            modalSignupFunc();
            let data = JSON.stringify
                ({
                    "encrypted_user_id": encKey,
                    "org_name": org,
                    "person_name": owner,
                    "phone_number": contact,
                    "email": email,
                    "business_filed": business,
                    "per_delivery_cost": deliveries,
                    "payment_method_mobile_number": minput,
                    "payment_method_mobile": mselect,
                    "payment_method_bank": bselect,
                    "payment_method_bank_name": bName,
                    "payment_method_bank_branch": branchName,
                    "payment_method_bank_account": accountNo
                })
            console.log(data);
            $.ajax
                ({
                    type: "PUT",
                    url: api + "dhaka/bd/merchant/create",
                    data: JSON.stringify
                        ({
                            "encrypted_user_id": encKey,
                            "org_name": org,
                            "person_name": owner,
                            "phone_number": contact,
                            "email": email,
                            "business_filed": business,
                            "per_delivery_cost": deliveries,
                            "payment_method_mobile_number": minput,
                            "payment_method_mobile": mselect,
                            "payment_method_bank": bselect,
                            "payment_method_bank_name": bName,
                            "payment_method_bank_branch": branchName,
                            "payment_method_bank_account": accountNo
                        }),
                    headers:
                    {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    success: function (data) {
                        setTimeout(function () {
                            body.style.pointerEvents = "auto";
                            loader.classList.add("load-complete");
                            checkmark.style.display = "block";
                            modalErr.innerHTML = "Congratulations! You Have Registered!";
                            modalErr.style.color = "#000";
                            modalCloseButton.disabled = false;
                        }, 1200);
                    },
                    error: function (data) {
                        body.style.pointerEvents = "auto";
                        loader.style.display = "none";
                        modalCloseButton.disabled = false;
                        modalErr.style.color = "#e22b2b";
                        if (data.responseJSON.errorMessage.includes("Phone")) {
                            modalErr.innerHTML = data.responseJSON.errorMessage + 's';
                            createError("Contact Number Exists!", "contact");
                        }
                        else if (data.responseJSON.errorMessage.includes("Email")) {
                            createError("Email Exists!", "email");
                            modalErr.innerHTML = data.responseJSON.errorMessage + 's';
                        }
                        else {
                            modalErr.innerHTML = data.responseJSON.errorMessage;
                        }
                    }
                })
        }
    });
})();