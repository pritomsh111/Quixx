const api = "https://api-new.quixx.xyz/api/quixx/v1/";

function Hell() {
    this.hello = "ds";

    // this.b = () => {
    //     console.log(this.hello);
    // }
    // this.f = function b() {
    //     console.log(this.hello);
    // }
}

const aa = new Hell();

aa.f();