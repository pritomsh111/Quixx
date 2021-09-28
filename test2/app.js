// document.querySelector(".button").addEventListener("click", function () {
//     this.classList.add("active");
//     setTimeout(() => {
//         this.classList.remove("active");
//     }, 4250);
// });

let tl = gsap.timeline();

tl.to(".button", { padding: "2rem" })
