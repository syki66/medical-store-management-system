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

    return (year + '-' + month + '-' + date);
}

export {
    findBankIndex,
    generateDate,
}