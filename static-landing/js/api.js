const api = "https://api-new.quixx.xyz/api/quixx/v1/";

// function Hell() {
//     this.hello = "ds";

//     // this.b = () => {
//     //     console.log(this.hello);
//     // }
//     this.f = function () {
//         this.y = function () {
//             this.z = function () {
//                 console.log(this);
//             }
//             this.z();
//         }
//         this.y();
//     }
// }

// const aa = new Hell();

// aa.f();


class Hell {
    hello = "ds";

    // this.b = () => {
    //     console.log(this.hello);
    // }
    f = function () {
        y = function () {
            z = function () {
                console.log(this);
            }
            z();
        }
        this.y();
    }
}

const aa = new Hell();

aa.f();