// deposit amount 
// line to bet
// collect bet amount
//spin the slot machine
// if user won 
//show thei winings
//play again

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
   "A":2,
   "B":4,
   "C":5,
   "D":7
}

const SYMBOL_VALUES=  //values multilply with given values
{
   "A":5,
   "B":4,
   "C":3,
   "D":2
}
const deposit =  ()=>{
     while(true){
        const depositAmount = prompt("Enter a deposit amount: ");
     const numberDepositAmount = parseFloat(depositAmount)   //converting the string to number
     if(isNaN(numberDepositAmount) || numberDepositAmount < 100){   
        console.log("Invalid deposit amount, try again.");
     }
     else{
        return numberDepositAmount;
     }
     }
};


//lines to bet on
const linesToBet =  ()=>{
    while(true){
       const numberOfLines = prompt("Enter a Number of lines to bet(1-3): ");
       const numberOfLinesInNumber = parseInt(numberOfLines)   //converting the string to number
    if(isNaN(numberOfLinesInNumber) || numberOfLinesInNumber > 3 || numberOfLines <= 0){   
       console.log("Invalid bet line, try number between 1 - 3.");
    }
    else{
      return numberOfLinesInNumber;
    }
    }
};

//getting amount
const getBet = (balance,numberOfLinesInNumber) =>
{
   while(true){
      const bet = prompt("Enter a bet per line: ");
      const numberBet = parseFloat(bet);
      
      if(isNaN(numberBet) || numberBet <=0 || numberBet > balance/numberOfLinesInNumber){
         console.log("Insufficient bet Amount, try again");
      }
      else{
         return numberBet;
      }
   }
}; 

const spin = () =>
{
   const symbols = [];
   for(const[symbol, count] of Object.entries(SYMBOLS_COUNT))
   {
      for(let i = 0; i < count; i++)
      {
         symbols.push(symbol);
      }
   }

   const reels  = [];
  for(let i = 0; i < COLS; i++){
   reels.push([]);
   const reelSymbols = [...symbols];
  for(let j = 0; j < ROWS; j++){
   const randomIndex = Math.floor(Math.random() * reelSymbols.length);
   const selectedSymbol = reelSymbols[randomIndex];
   reels[i].push(selectedSymbol);
   reelSymbols.splice(randomIndex,1);
}
}

return reels;
};

const transpose = (reels) =>
{
   const rows = [];
   for(let i = 0;i<ROWS; i++)
   {
      rows.push([]);
      for(let j = 0;j<COLS; j++)
      {
         rows[i].push(reels[j][i]);
      }
   }
   return rows;
};

const printRows = (rows)=>{
    for(const row of rows) {
      let rowString = "";
      for(const[i,symbol] of row.entries()){
         rowString += symbol
         if(i!= row.length - 1){
            rowString += " | "
         }
      }
       console.log(rowString);
   }
};

const getWinnings = (rows, bet, betLines)=>{
   let winnings = 0;
   for(let row = 0; row<betLines; row++){
      const symbols = rows[row];
      let allSame = true;

      for(const symbol of symbols){
        if(symbol != symbols[0]){
         allSame = false;
         break;
        }
      }

      if(allSame){
         winnings += bet*SYMBOL_VALUES[symbols[0]];     //(SYMBOL_VALUES['A']) -- this value is taken as string here;
      }
   }
    return winnings;
};

const game = ()=>{
   let balance = deposit();
   let totalWinnnings = 0;
   
   while(balance > 0){
      const betLines = linesToBet();
      const bet = getBet(balance,betLines);
      const reels = spin();
      const rows = transpose(reels);
      printRows(rows);
      const winnings = getWinnings(rows,bet, betLines);  
      if(winnings > 0)
      {
         console.log("you won, Rs."+ winnings.toString() + ".");
         totalWinnnings += winnings;
         balance += totalWinnnings;
      }
      else
      {
         let totalLoss = 0;
         totalLoss += bet * betLines;
         console.log("You lost Rs."+ totalLoss +"."); 
         balance -= totalLoss;
      }
      
      console.log("You have a balance of Rs." +  balance + ".");
     
      if(balance <= 0)
      {
         console.log("You don't had minimum amount to play!");
         break;
      }
      const play  = prompt("Do you wanna play again (y/n)?:");
      if(play!= 'y')
      {
         break;
      }
   }  
};
game();
