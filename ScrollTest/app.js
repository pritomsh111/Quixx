console.log("HE");
let a = document.querySelector('.a');
let b = document.querySelector('.b');
window.addEventListener('scroll', function (e) {
    // console.log(e.target.scrollHeight);
    // console.log(e.target.scrollTop);
    // console.log(e.target.clientHeight);
    console.log(this.scrollY);
    console.log(a.getBoundingClientRect());
    console.log(this.innerHeight);
    a.getBoundingClientRect().bottom <= this.innerHeight + 100 ? b.style.display = "block" : null;
});

b.addEventListener('scroll', (e) => { console.log(e.target); });