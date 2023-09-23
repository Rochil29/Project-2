//The Ham Project

const prompt = require("prompt-sync")();                   //imported library

const ROWS = 3;
const COLS = 3;

const SYMBOL_COUNT = {

    A : 2,
    B : 3, 
    C : 4,
    D : 5
};

const SYMBOL_VALUES = {

    A : 5,
    B : 4, 
    C : 3,
    D : 2
};



const deposit = () =>{

    while (true){
        
        const depositAmount = prompt("Enter the amont of money:$ ");
    const numberDepositAmount = parseFloat(depositAmount);          //Parsefloat function - 17.2 -> 17.2 or in case of string "hello" -> NaN
                                                                                                        
    if( isNaN(numberDepositAmount) || numberDepositAmount <=0){
        console.log("Invalid Amount");
    }
    else{
        return numberDepositAmount;
    };
}
    
};

const getNumberOfLines = () =>{

    while (true){
        
        const lines = prompt("Enter the number of lines (1-3): ");
    const numberOfLines = parseFloat(lines);

    if( isNaN(numberOfLines) || numberOfLines <=0 || numberOfLines >3){
        console.log("Invalid number of Lines");
    }
    else{
        return numberOfLines;
    };
}

};

const getBet = (balance, lines) =>{

    while (true){
        
        const bet = prompt("Enter the bet per Line: ");
    const numberOfBets = parseFloat(bet);

    if( isNaN(numberOfBets) || numberOfBets <=0 || numberOfBets >balance/lines){
        console.log("Invalid bet");
    }
    else{
        return numberOfBets;
    };
}

};

const spin = () =>{

    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOL_COUNT)){                     //symbol(A,B,C,D), count(2,4,6,8) is used with .etries to iterate through the values of symbol_count
        for(i=0 ; i<count; i++){
            symbols.push(symbol);
        }
    }

    const reels = [[],[],[]];
    for (i=0 ; i<COLS ; i++){
        const symbols2 = [...symbols];              //here a copy of symbols is created as once used alphapets has to be removed once displayed(Eg. once 2 A's are used in one reel they shoild be removed)
        for(j=0 ; j<ROWS ; j++){
            const randomIndex = Math.floor(Math.random() * symbols2.length);         //math random is used to generate a random number between 0 and (lenth-1) ,and math floor for rounding to nearest whole number
            const selectedSymbol = symbols2[randomIndex];
            reels[i].push(selectedSymbol);
            symbols2.splice(randomIndex,1)                     //splice is used to remove element and 1 is used to denote to remove one element

        }
    }
    return reels;
};

const transpose = (reels) => {
    const rows = [];
  
    for (let i = 0; i < ROWS; i++) {
      rows.push([]);
      for (let j = 0; j < COLS; j++) {
        rows[i].push(reels[j][i]);
      }
    }
  
    return rows;
  };
  
const printRows = (rows) => {
    for (const row of rows) {
      let rowString = "";
      for (const [i, symbol] of row.entries()) {
        rowString += symbol;
        if (i != row.length - 1) {
          rowString += " | ";
        }
      }
      console.log(rowString);
    }
  };

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
  
    for (let row = 0; row < lines; row++) {
      const symbols = rows[row];
      let allSame = true;
  
      for (const symbol of symbols) {
        if (symbol != symbols[0]) {
          allSame = false;
          break;
        }
      }
  
      if (allSame) {
        winnings += bet * SYMBOL_VALUES[symbols[0]];            //SYMBOL_VALUES is the multiplier//We are multplying the bet by multplier//And we using "symbols" for dtermining the symbol we got
      }
    }
  
    return winnings;
  };

let balance = deposit();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance,numberOfLines);
const reels = spin();
const rows = transpose(reels);
printRows(rows);
const winnings = getWinnings(rows, bet, numberOfLines);
console.log("You won $" + winnings);

