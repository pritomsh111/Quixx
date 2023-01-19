const generateUppercase = () => {
    return process.env.REACT_APP_CHARACTERS_UPPERCASE.charAt(Math.random() * process.env.REACT_APP_CHARACTERS_UPPERCASE.length);
}
const generateLowercase = () => {
    return process.env.REACT_APP_CHARACTERS_LOWERCASE.charAt(Math.random() * process.env.REACT_APP_CHARACTERS_LOWERCASE.length);
}
const generateNumber = () => {
    return process.env.REACT_APP_CHARACTERS_NUMBER.charAt(Math.random() * process.env.REACT_APP_CHARACTERS_NUMBER.length);
}
const generateSpecial = () => {
    return process.env.REACT_APP_SPECIAL_CHARACTERS.charAt(Math.random() * process.env.REACT_APP_SPECIAL_CHARACTERS.length);
}
export const randPassGenerator = (length) => {
    let password = [], count = 0;
    while (password.length <= 12) {
        password.push(generateUppercase());
    }
    while (count++ < 3) {
        let dummy = Math.floor(Math.random() * 12);
        if (/[A-Z]/.test(password[dummy])) {
            password[dummy] = generateSpecial();
        }
        else {
            count--;
        }
    }
    count = Math.floor(Math.random() * 4) + 2;
    while (count-- >= 0) {
        let dummy = Math.floor(Math.random() * 12);
        if (/[A-Z]/.test(password[dummy])) {
            password[dummy] = generateLowercase();
        }
        else {
            count++;
        }
    }
    count = Math.floor(Math.random() * 2) + 1;
    while (count-- >= 0) {
        let dummy = Math.floor(Math.random() * 12);
        if (/[A-Z]/.test(password[dummy])) {
            password[dummy] = generateNumber();
        }
        else {
            count++;
        }
    }
    return password;
}