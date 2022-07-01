console.log("HE");
let a = document.querySelector('.a');
window.addEventListener('scroll', function (e) {
    // console.log(e.target.scrollHeight);
    // console.log(e.target.scrollTop);
    // console.log(e.target.clientHeight);
    console.log(this.scrollY);
    console.log(a.getBoundingClientRect());
    console.log(this.innerHeight);
    a.getBoundingClientRect().bottom <= this.innerHeight + 100 ? console.log("Orre mAma!") : null;
});
