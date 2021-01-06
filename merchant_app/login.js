let preloader = document.querySelector(".preloader");

let modal = document.querySelector(".Modal__Quixx");
let backdrop = document.querySelector(".backdrop");

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
}, 2500);

backdrop.addEventListener("click", function () {
    this.classList.remove("show");
    modal.classList.contains("show") ? modal.classList.remove("show") : null;
});

forgotPassword.addEventListener("click", function () {
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
    fp_restore.value = "";
    fp_step2.classList.add("show");
    fp_step2.classList.remove("hide");
    fp_step1.classList.add("hide");
    fp_step1.classList.remove("show");
    modalCloseButton.style.display = "none";
    modalNextButton.style.display = "none";
    modalDoneButton.style.display = "inline";
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
    backdrop.classList.remove("show");
    modal.classList.remove("show");
});

let modalErrorFunc = () => {
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
        localStorage.setItem('user', username);
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
                    window.location.href = "../panel.html";
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