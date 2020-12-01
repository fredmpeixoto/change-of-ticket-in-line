var ticketValue = 25;

var linePayment = [25, 25, 50, 100];

var pocket = [];

var thereIsChange = false;

for (let index = 0; index < linePayment.length; index++) {
    let payment = linePayment[index];

    let isNeededChange = payment > ticketValue;

    if (isNeededChange) {
        thereIsChange = checkThereIsChange(payment);
        console.log(payment, 'thereIsChange', thereIsChange);
    }
    else {
        //console.log("is some value, Don´t need change");
        thereIsChange = true;
    }

    if (!thereIsChange) {
        console.log(pocket, "Pocket is empty for it payment!");
        break;
    }

    pocket.push(payment);
    // console.log(pocket);

}

console.log("thereIsChange", thereIsChange);
console.log("pocket", pocket);

function checkThereIsChange(payment) {
    let changeNecessary = payment - ticketValue;

    let howMuchAtPocket = pocket.reduce((accumulator, payment) => accumulator += payment, 0);

    return (howMuchAtPocket >= changeNecessary) ? thereIsBill(changeNecessary) : false;
}

function thereIsBill(changeNecessary) {
    let wasChangeOk = false;
    console.log('changeNecessary', changeNecessary);
    console.log('pocket now', pocket);
    if (changeNecessary >= 50)
        changeNecessary = removeFromPocket(changeNecessary, 50);
    else if (changeNecessary == 25)
        changeNecessary = removeFromPocket(changeNecessary, 25);

    if (changeNecessary === 0) {
        wasChangeOk = true;
    }
    else if (pocket.length === 0)
        wasChangeOk = false;
    else{
        thereIsBill(changeNecessary);
        break;
    }

    return wasChangeOk;
}

function removeFromPocket(changeNecessary, bill) {
    if (changeNecessary >= bill && pocket.some(_bill => _bill == bill)) {
        let indexRemove = pocket.findIndex(_bill => _bill == bill);
        changeNecessary -= bill;
        pocket.splice(indexRemove, 1);
    }
    return changeNecessary;
}