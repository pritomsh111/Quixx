(() => {
    if (document.location.host.includes("portal")) {
        window.location.href = "/login-panel";
    }
    else if (document.location.pathname !== "/") {
        window.location.href = "/";
    }
    // Storage Event
    window.addEventListener('storage', function (event) {
        if (event.key == 'login-event') {
            window.location.href = "panel.html";
        }
    });
    let phone, timer;

    // Typewritter Effect
    try {
        let type = "Grow Your Business"
        let ctn = 0;
        let parag = document.querySelector(".Quixx__Q>h1");
        const typeWritter = () => {
            if (ctn === type.length) {
                try {
                    document.querySelector(".Q__Us").classList.add("show");
                }
                catch (e) { }
                return;
            }
            parag.innerHTML += type[ctn];
            clearTimeout(timer);
            timer = setTimeout(() => {
                ctn = ctn + 1;
                typeWritter();
            }, 150);
        }
        setTimeout(() => {
            typeWritter();
        }, 500);
    } catch (e) { }
    // DOM manipulation

    let hoverProduct = document.querySelector(".Quixx__Login__Signup li:last-child");
    let hoverProductUL = document.querySelector(".Quixx__Login__Signup li:last-child ul");

    hoverProduct.addEventListener("mouseover", function () {
        hoverProductUL.style.backgroundColor = "#fff";
    });
    let quixxMain = document.querySelector("#Quixx__Main");

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
    });
    signUpButtonTop.addEventListener("click", function () {
        this.classList.add("active-btn");
        signInButtonTop.classList.remove("active-btn");
        signUpDiv.classList.add("Show");
        signUpDiv.classList.remove("HideOut");
        signInDiv.classList.add("HideOut");
        signInDiv.classList.remove("Show");
        quixxFormMain.classList.add("height_signup");
        quixxFormMain.classList.remove("height_login");
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
                    if (ob[17] === "responseJSON") {
                        modalErr.innerHTML = data.responseJSON.errorMessage;
                    }
                    else {
                        modalErr.innerHTML = "Please Wait! We are working!";
                    }
                    modalErr.style.color = "#e22b2b";
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
                            quixxMain.style.pointerEvents = "auto";
                            loader.classList.add("load-complete");
                            checkmark.style.display = "block";
                            modalErr.innerHTML = "You will receive an SMS!";
                            modalErr.style.color = "#000";
                            modalCloseButton.disabled = false;
                        }, 1200);
                    }
                    else {
                        loader.style.display = "none";
                        loader.classList.remove("load-complete");
                        modalCloseButton.disabled = false;
                        let modalErr = document.querySelector('.modal-error>h2');
                        modalErr.innerHTML = "Wrong Code!";
                        modalErr.style.color = "#e22b2b";
                        modalErrorFunc();
                    }
                },
                error: function (data) {
                    let ob = Object.keys(data);
                    modalErr.style.color = "#e22b2b";
                    let modalErr = document.querySelector('.modal-error>h2');
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
            localStorage.clear();
            localStorage.setItem('user', username);
            localStorage.setItem('pass', password);
            localStorage.setItem('wh-user', "main");
            $.ajax
                ({
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
        let business = document.querySelector("#business").value;
        let deliveries = document.querySelector("#deliveries").value;
        let trade = document.querySelector("#trade").value;
        let fb = document.querySelector("#fb").value;
        let web = document.querySelector("#web").value;
        let v1 = () => {
            if (trade === "") {
                createError("Trade License cannot be empty!", "trade");
                return 0;
            }
            else {
                return 1;
            }
        }
        let v2 = () => {
            if (parseInt(deliveries) <= 0 || deliveries.charAt(0) == 0) {
                createError("Delivery Range must be greater than 0!", "deliveries");
                return 0;
            }
            else if (isNaN(deliveries) === true || deliveries === "" || !/\D/.test(deliveries) === false) {
                createError("Delivery Range must be a number!", "deliveries");
                return 0;
            }
            else if (!/\D/.test(deliveries) === true) {
                return 1;
            }
        }
        let v3 = () => {
            if (business === "") {
                createError("Business Field cannot be empty!", "business");
                return 0;
            }
            else {
                return 1;
            }
        }
        let v4 = () => {
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
        let v5 = () => {
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
        let v6 = () => {
            if (org === "") {
                createError("Organization Name cannot be empty!", "org");
                return 0;
            }
            else {
                return 1;
            }
        }
        ////console.log(org, email, business, trade, contact, deliveries);
        if (v6() && v5() && v4() && v3() && v2() && v1()) {
            clearError();
            quixxMain.style.pointerEvents = "none";
            modalSignupFunc();
            loader.classList.remove("load-complete");
            $.ajax
                ({
                    type: "POST",
                    url: api + "initUser/create",
                    data: JSON.stringify
                        ({
                            "organizationName": org,
                            "tradeLicence": trade,
                            "businessField": business,
                            "contactNumber": contact,
                            "emailId": email,
                            "deliveryRange": deliveries,
                            "organizationalFaceBookLink": fb,
                            "organizationWebsite": web
                        }),
                    headers:
                    {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    success: function (data) {
                        setTimeout(function () {
                            quixxMain.style.pointerEvents = "auto";
                            loader.classList.add("load-complete");
                            checkmark.style.display = "block";
                            modalErr.innerHTML = "Congratulations! You Have Registered!";
                            modalErr.style.color = "#000";
                            modalCloseButton.disabled = false;
                        }, 1200);
                    },
                    error: function (data) {
                        quixxMain.style.pointerEvents = "auto";
                        loader.style.display = "none";
                        loader.classList.remove("load-complete");
                        modalCloseButton.disabled = false;
                        modalErr.innerHTML = data.responseJSON.errorMessage + 's';
                        modalErr.style.color = "#e22b2b";
                        if (data.responseJSON.errorMessage.includes("Contact")) {
                            createError("Contact Number Exists!", "contact");
                        }
                        else if (data.responseJSON.errorMessage.includes("Email")) {
                            createError("Email Exists!", "email");
                        }
                        else if (data.responseJSON.errorMessage.includes("Organization")) {
                            createError("Organisation Exists!", "org");
                            modalErr.innerHTML = "Organisation Exists!";
                        }
                        else if (data.responseJSON.errorMessage.includes("Trade")) {
                            createError("Trade License Exists!", "trade");
                            modalErr.innerHTML = "Trade License Exists!";
                        }
                    }
                })
        }
    });
})();