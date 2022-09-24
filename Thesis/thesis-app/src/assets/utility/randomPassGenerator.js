export const randPassGenerator = (length) => {
    let password = [], specialCount = 0;
    length < 10 ? specialCount = 2 : specialCount = 3;
    while (length--) {
        password.push(process.env.REACT_APP_CHARACTERS.charAt(Math.floor(Math.random() * process.env.REACT_APP_CHARACTERS.length)));
    }
    while (specialCount--) {
        password[Math.floor(Math.random() * password.length)] = process.env.REACT_APP_SPECIAL_CHARACTERS.charAt(Math.floor(Math.random() * process.env.REACT_APP_SPECIAL_CHARACTERS.length));
    }
    return password;
}