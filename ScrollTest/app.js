console.log("HE");
let a = document.querySelector('.a');
document.querySelector('.a').addEventListener('scroll', function (e) {
    console.log(e.target.scrollHeight);
    console.log(e.target.scrollTop);
    console.log(e.target.clientHeight);
});
