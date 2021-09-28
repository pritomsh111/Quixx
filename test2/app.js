document.querySelector(".button").addEventListener("click", function () {
    this.classList.add("active");
    setTimeout(() => {
        this.classList.remove("active");
    }, 6000);
});