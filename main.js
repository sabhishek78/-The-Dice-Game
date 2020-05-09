// The Dice Game 


// Four friends are playing a simple dice game (players are denoted p1, p2, p3, and p4). In each round, all players roll a 
// pair of six-sided dice. The player with the lowest total score is removed. If the lowest score is shared by two or more players, the player in that group with the lowest score from their first die is removed. If the lowest score is still shared (i.e. two or more players have the same rolls in the same order), then all players roll again. This process continues until one player remains. Given an array of scores only (given in player order for each round), return the winning player.
// diceGame([[6, 2], [4, 3], [3, 4], [5, 4], [3, 5], [1, 5], [4, 3], [1, 5], [1, 5], [5, 6], [2, 2]]) ➞ "p1"

// //              p1      p2      p3      p4
// // Round 1 -> [6, 2], [4, 3], [3, 4], [5, 4]  Player 3 removed.
// // Round 2 -> [3, 5], [1, 5],         [4, 3]  Player 2 removed.
// // Round 3 -> [1, 5],                 [1, 5]  No lowest score, players roll again.
// // Round 4 -> [5, 6],                 [2, 2]  Player 1 wins!


// diceGame([[6, 2], [4, 3], [3, 4], [5, 4], [1, 5], [1, 5], [4, 3],[3, 6], [1, 2], [3, 6], [1, 5], [1, 5], [1, 6], [4, 5]]) ➞ "p4"

// //              p1      p2      p3      p4
// // Round 1 -> [6, 2], [4, 3], [3, 4], [5, 4]  Player 3 removed.
// // Round 2 -> [1, 5], [1, 5],         [4, 3]  Lowest score tie, players roll again.
// // Round 2 -> [3, 6], [1, 2],         [3, 6]  Player 2 removed.
// // Round 3 -> [1, 5],                 [1, 5]  No lowest score, players roll again.
// // Round 4 -> [1, 6],                 [4, 5]  Player 4 wins!
function diceGame(moves){
  let playerArray=["p1","p2","p3","p4"];//create an array of players
  return iterate(moves,playerArray);;
}
function iterate(moves,playerArray){
 return playerArray.length===1? playerArray[0]:iterate(moves,removePlayer(moves.splice(0,playerArray.length),playerArray));
 }
function removePlayer(currentMove,playerArray){
  let sumArray=[];
  for(let i=0;i<currentMove.length;i++){
    sumArray.push(currentMove[i][0]+currentMove[i][1]);
  }
  // console.log('sumArray='+sumArray);
  let min = Math.min(...sumArray);
  // console.log('min='+min);
  let indexOfMinValues=[];
  for(let i=0;i<sumArray.length;i++){
    if(min===sumArray[i]){
      indexOfMinValues.push(i);
    }
  }
  // console.log("index Of min Values="+indexOfMinValues);
  let filteredMoves=[];
  for(let i=0;i<indexOfMinValues.length;i++){
    filteredMoves.push(currentMove[indexOfMinValues[i]]);
  }
// console.log('filtered Moves='+filteredMoves);
filteredMoves = filteredMoves.sort(function(a,b) {
    return a[0] - b[0];
});
// console.log('filtered Moves after sort='+filteredMoves);
let minFirstValueArray=[];
let minFirstValue=filteredMoves[0][0];
for(let i=0;i<filteredMoves.length;i++){
  if(minFirstValue===filteredMoves[i][0]){
    minFirstValueArray.push(filteredMoves[i]);
  }
}
// console.log('minFirstValueArray='+minFirstValueArray);
if(minFirstValueArray.length===1){
  let indexOfPlayerToBeRemoved;
  for(let i=0;i<currentMove.length;i++){
    if(currentMove[i]===minFirstValueArray[0]){
      indexOfPlayerToBeRemoved=i;
    }
  }
  // console.log('indexOfPlayerToBeRemoved='+indexOfPlayerToBeRemoved);
  // console.log('PlayerArray before removing player='+playerArray);
playerArray.splice(indexOfPlayerToBeRemoved,1);
// console.log('PlayerArray after removing player='+playerArray);
}
return playerArray;
}

console.log(diceGame([[6, 2], [4, 3], [3, 4], [5, 4], [3, 5], [1, 5], [4, 3], [1, 5], [1, 5], [5, 6], [2, 2]])==="p1");
console.log(diceGame([[6, 2], [4, 3], [3, 4], [5, 4], [1, 5], [1, 5], [4, 3],[3, 6], [1, 2], [3, 6], [1, 5], [1, 5], [1, 6], [4, 5]])==='p4');