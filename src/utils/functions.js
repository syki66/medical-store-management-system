const findBankIndex = (bankName, bankList) => {
    let index = 0;
    bankList.map((bank, idx) => {
        if (bankName == bank[idx + 1]){
            index = idx;
        }
    })
    return index
}

const generateDate = () => {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();

    return `${year}-${month < 10 ? `0${month}` : month}-${date < 10 ? `0${date}` : date}`
}

const checkPasswordValidation = (str) => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const uppercaseChars = /[A-Z]/;
    const lowercaseChars = /[a-z]/;
    const numbers = /[0-9]/;

    return (
        specialChars.test(str) &&
        uppercaseChars.test(str) &&
        lowercaseChars.test(str) &&
        numbers.test(str) &&
        str.length >= 8 &&
        str.length <= 64
    );
}

export {
    findBankIndex,
    generateDate,
    checkPasswordValidation,
}