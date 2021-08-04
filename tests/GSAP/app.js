gsap.to("#recx", { x: 200, rotation: 90, duration: 3, xPercent: 100 });
gsap.to("#recx", { strokeWidth: 5 });
gsap.to("#recx", { strokeDashoffset: 0, duration: 10, yoyo: true, repeat: -1 });

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

// Array.prototype.hello = 100;

// let arr = [12, 12, 12];

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