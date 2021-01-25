const api = "https://api-new.quixx.xyz/api/quixx/v1/";
const obj = {
    a: 5,
    b: function () {
        let ass = () => { console.log(this.a); }
        ass();
    }
}

obj.b();