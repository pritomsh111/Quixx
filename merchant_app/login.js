if (document.location.host.includes("portal")) {
    // Clear Background Image
    document.body.style.background = "white";

    // ClientWho
    let cw = document.location.host.split(".");

    // Logo
    let lg = document.querySelector(".Company>div");
    lg.style.backgroundImage = "url(../static-landing/img/clients/" + cw[1] + ".png)";

    // Change width/height of Logo
    if (cw[1] === "parcelboat") {
        lg.style.height = "105px";
    }

    // Favicon
    let fc = document.querySelector("link[rel='shortcut icon']");
    fc.href = "../static-landing/img/clients/" + cw[1] + ".png";

    // CompanyName
    let cn = document.querySelector(".Company>h1");

    let vl = cw[1] === "easyparcel" ? "Easy Parcel" : cw[1] === "quixx" ? "Quixx" : cw[1] === "quixxprojects" ? "Quixx Projects" : cw[1] === "parcelboat" ? "Parcel Boat" : "";

    cn.innerHTML = vl;

    document.title = vl;
}
else {
    document.querySelector(".Company").style.display = "none";
}

let preloader = document.querySelector(".preloader");

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

setTimeout(() => {
    preloader.style.opacity = 0;
    preloader.style.visibility = "hidden";
}, 1000);

backdrop.addEventListener("click", function () {
    this.classList.remove("show");
    modal.classList.contains("show") ? modal.classList.remove("show") : null;
});
forgotPassword.addEventListener("click", function () {
    loaderDiv.style.display = "none";
    modalError.style.display = "none";
    forgotPass.style.display = "block";
    modalFooter.style.marginTop = "10rem";
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
                modalErrorFunc();
            }
        });
});

// For Forget Pass
phone_number.addEventListener("keyup", function (event) {
    if (event.target.value.match(/\d/g).length === 11) {
        modalNextButton.disabled = false;
    }
    else {
        modalNextButton.disabled = true;
    }
});
fp_restore.addEventListener("keyup", function (event) {
    if (event.target.value.match(/\d/g).length === 4) {
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
    modalFooter.style.marginTop = "0rem";
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
                            loader.classList.add("load-complete");
                            checkmark.style.display = "block";
                            modalErr.innerHTML = "You will receive an SMS!";
                            modalErr.style.color = "#0066b3";
                            modalCloseButton.disabled = false;
                        }, 1000);
                    }, 2000);
                }
                else {
                    loader.style.display = "none";
                    modalCloseButton.disabled = false;
                    let modalErr = document.querySelector('.modal-error>h2');
                    modalErr.innerHTML = "Wrong Code!";
                    modalErrorFunc();
                }
            },
            error: function (data) {
                let ob = Object.keys(data);
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
    modalFooter.style.marginTop = "0rem";
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
    modalFooter.style.marginTop = "0rem";
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
        localStorage.setItem('username', username);
        localStorage.setItem('pass', password);
        localStorage.setItem('wh-user', document.location.pathname);
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
                    window.location.href = "../panel-merchant.html";
                },
                error: function (data) {
                    let ob = Object.keys(data);
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
    }
});
