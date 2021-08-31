
function $_32() {
    console.log("HEllo");
}
const aa = 1;
// let a;
$_32();
{
    let map = new Map();
    map.set("a", 2);
}

let a = Object.create({}, { one: { value: 3, enumerable: true }, two: { value: 4 } });


function* gen() {
    let i = 0;
    while (true) {
        yield ++i;
    }
}

let genx = gen();
console.log(genx.next());
console.log(genx.next());
console.log(genx.next());
console.log(genx.next());
// console.log(a);

// for (const key in a) {
//     console.log(key);
// }
// console.log(b);

// function Person() {
//     this.name = "Hello"
// }

// let a = new Person();

// Person.prototype.age = 10;

// let b = Object.create(a);


let arr = [12, 12, 12];
for (let i = 0; i < 3; i++) {
    if (i === 1)
        break;
    console.log(i);
}
// class Hello {
//     omg = "Hello";
// }

// Hello.prototype.ass = () => {
//     console.log(this);
// }

// let h = new Hello();

// class pelllo extends Hello {

// }

// let p = new pelllo();


let timeLine = gsap.timeline();

timeLine
    .to("#Letter", { y: -40, duration: 1, ease: "back(6)" })
    .to("#Letter", { y: 60, ease: "linear" }, "-=.5")
    .to("#triangle1", { display: "none" })
    .to("#triangle2", { visibility: "visible", attr: { d: "M540.966 146H58.476C52.0861 146 50.1237 154.659 55.8894 157.414L299.389 273.753C301.039 274.541 302.958 274.534 304.602 273.733L543.592 157.395C549.316 154.608 547.332 146 540.966 146Z" } })