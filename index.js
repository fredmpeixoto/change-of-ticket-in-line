var ticketValue = 25;

var linePayment = [25, 25, 25, 50, 25, 50, 50, 25, 25, 50, 225];

var pocket = [];

var thereIsChange = false;

for (let index = 0; index < linePayment.length; index++) {
    let payment = linePayment[index];

    let isNeededChange = payment > ticketValue;

    if (isNeededChange)
        thereIsChange = checkThereIsChange(payment);
    else
        thereIsChange = true;


    if (!thereIsChange) {
        console.log(pocket, "Pocket is empty for it payment!");
        break;
    }

    pocket.push(payment);
    // console.log(pocket);

}

console.log("pocket", pocket, "total pocket", totalPocket());

function checkThereIsChange(payment) {

    let changeNecessary = payment - ticketValue;

    return (totalPocket() >= changeNecessary) ? thereIsBill(changeNecessary) : false;
}

function totalPocket() {
    return pocket.reduce((accumulator, payment) => accumulator += payment, 0);
}

function thereIsBill(changeNecessary) {

    let notaVinteCinco = changeNecessary % 50;

    if (notaVinteCinco === 25 && !thereIsNotCoin(25))
        changeNecessary = removeFromPocket(changeNecessary, 25);

    changeNecessary = getBillsFifty(changeNecessary);

    return (changeNecessary === 0);
}


function getBillsFifty(changeNecessary) {
    let notaCinquenta = changeNecessary / 50;
    if (notaCinquenta > 0) {
        do {
            changeNecessary = removeFromPocket(changeNecessary, 50);
        } while (changeNecessary > 0 && !thereIsNotCoin(50));
    }
    return changeNecessary;
}

function thereIsNotCoin(changeNecessary) {
    return getIndexAtPocketMoney(changeNecessary) === -1;
}

function removeFromPocket(changeNecessary, bill) {
    if (changeNecessary >= bill) {
        let indexRemove = getIndexAtPocketMoney(bill);
        changeNecessary -= bill;
        pocket.splice(indexRemove, 1);
    }
    return changeNecessary;
}

function getIndexAtPocketMoney(bill) {
    return pocket.findIndex(_bill => _bill == bill);
}
