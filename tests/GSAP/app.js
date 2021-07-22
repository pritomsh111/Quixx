gsap.to("#recx", { x: 400, scale: 1.2, rotation: 60, duration: 3, xPercent: -300 });


let a = Object.create({}, { one: { value: 3, enumerable: true }, two: { value: 4 } });

console.log(a);

for (const key in a) {
    console.log(key);
}