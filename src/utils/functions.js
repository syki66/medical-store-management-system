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

const checkValidation = (id, value) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,64}$/;
    const regex = id === "user_email" ? emailRegex : passwordRegex;

    return regex.test(value);
}

const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export {
    findBankIndex,
    generateDate,
    checkValidation,
    numberWithCommas,
}