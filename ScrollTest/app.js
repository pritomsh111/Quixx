console.log("HE");
let a = document.querySelector('.a');
let b = document.querySelector('.b');
window.addEventListener('scroll', function (e) {
    // console.log(e.target.scrollHeight);
    // console.log(e.target.scrollTop);
    // console.log(e.target.clientHeight);
    console.log('%cScroll Y : ' + this.scrollY, 'font-size: 2rem');
    console.log(a.getBoundingClientRect());
    console.log('%cInner Height : ' + this.innerHeight, 'font-size: 2rem');
    a.getBoundingClientRect().bottom <= this.innerHeight + 100 ? b.style.display = "block" : null;
});

b.addEventListener('scroll', (e) => {
    console.log('ScrollTop : ' + e.target.scrollTop);
    console.log('Scroll Height : ' + e.target.scrollHeight);
    console.log('Client Height : ' + e.target.clientHeight);
});

for (let i = 0; i < 101; i++) {
    setTimeout(() => {
        console.log(i);
    }, i * 1000);
}