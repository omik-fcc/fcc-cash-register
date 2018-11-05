const denom = [
  ['PENNY', 0.01],
  ['NICKEL', 0.05],
  ['DIME', 0.1],
  ['QUARTER', 0.25],
  ['ONE', 1],
  ['FIVE', 5],
  ['TEN', 10],
  ['TWENTY', 20],
  ['ONE HUNDRED', 100]
]

function checkCashRegister(price, cash, cid) {

  var toReturn = {
    status: "",
    change: []
  };

  //var change = (cash - price).toFixed(2);
  var change = Math.round((cash - price) * 100) / 100;

  var inDrawer = cid.reduce(function (acc, curr) {
    return acc + curr[1];
  }, 0);
  //inDrawer = inDrawer.toFixed(2);
  inDrawer = Math.round((inDrawer) * 100) / 100;

  //CONTROL
  //console.log("denom: " + denom);
  //console.log("cid :" + cid);
  console.log("price: " + price);
  console.log("cash: " + cash);
  console.log("change: " + change);
  console.log("inDrawer: " + inDrawer);


  if (inDrawer < change) {

    toReturn.status = "INSUFFICIENT_FUNDS";
    toReturn.change = [];

  } else if (inDrawer == change) {

    toReturn.status = "CLOSED";
    toReturn.change = cid;

  } else if (inDrawer > change) {

    for (var i = cid.length - 1; i > -1; i--) {
      /*
        Need to store:
        value of each denom (tempVal)
        name of the coin (coinName)
        value of the coin denom (coinValue)
        how much we have of current denom (isAvail)
      */
      let tempVal = 0;
      let coinValue = denom[i][1];
      let coinName = denom[i][0];
      let isAvail = cid[i][1];
      //CONTROL
      console.log(tempVal);
      console.log(isAvail);
      console.log(coinValue);
      console.log(coinName);

      while (change > 0 && isAvail > 0) {

        if (change >= coinValue) {

          tempVal += coinValue;
          // tried with toFixed, didnt work :/
          isAvail = Math.round((isAvail - coinValue) * 100) / 100;
          change = Math.round((change - coinValue) * 100) / 100;
        } else {
          break;
        }
      }

      if (tempVal > 0) {
        toReturn.change.push([coinName, tempVal]);
      }
    }

    if (change !== 0) {
      toReturn.status = 'INSUFFICIENT_FUNDS';
      toReturn.change = [];


    } else {
      toReturn.status = 'OPEN';
    }

  }

  console.log(toReturn)
  return toReturn;
}

checkCashRegister(3.26, 100, [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]);
