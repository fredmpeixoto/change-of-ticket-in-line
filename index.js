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
        console.log("Pocket is empty for it payment!");
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
    if (changeNecessary >= 50 && pocket.some(bill => bill == 50)) {
        let indexRemove = pocket.findIndex(bill => bill == 50);
        changeNecessary -= 50;
        pocket.splice(indexRemove, 1);
    }
    else if (changeNecessary >= 25 && pocket.some(bill => bill == 25)) {
        let indexRemove = pocket.findIndex(bill => bill == 25);
        changeNecessary -= 25;
        pocket.splice(indexRemove, 1);
    }

    if (changeNecessary === 0) {
        wasChangeOk = true;

    }
    else
        thereIsBill(changeNecessary);

    return wasChangeOk;


}