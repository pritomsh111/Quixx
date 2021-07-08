// console.log(document.querySelector("#recx").getTotalLength());
// console.log(document.querySelector("#circle").getTotalLength());
// console.log(document.querySelector("#text").getTotalLength());

console.log(window.screen);

document.querySelector("div").addEventListener("click", function () {
    if (document.querySelector("svg>circle").classList.contains("one")) {
        document.querySelector("svg>circle").classList.remove("one");
        document.querySelector("svg>circle").classList.add("two");
    }
    else {
        document.querySelector("svg>circle").classList.add("one");
        document.querySelector("svg>circle").classList.remove("two");
    }
});