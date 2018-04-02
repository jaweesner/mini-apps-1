
//Model
var playerSymbol = "X"
//var symbols = ["X", "0"]

var board = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
];
var gameOver = false;
 
var swapPlayer = function(){
    if (playerSymbol === "X"){
        playerSymbol = "O";
    } else {
        playerSymbol = "X"
    }
}
var winAction = function(){
    console.log('win!');
    gameOver = true; 
    document.getElementById('winner').innerHTML = `Player ${playerSymbol} Wins!!!!!`;
}

var checkWin = function(coords,symbol){
    /*
    * win conditions defined as:
    * A. all vals in row array are equal to player
    * B. for each row Arr in board, col = i, Arr[i] is equal to player
    * C. if on diagonal 
    *   (only check if r ===c) || r+c === ln-1
    *   Check each 0+i, 0 +i  ||  i,n-1-i
    */
    var checkRow = function(){
        return board[coords[0]].every((val) => val === playerSymbol);
    }
    var checkCol = function(){
        return board.every(innerArr => innerArr[coords[1]] === playerSymbol);
    }
    var checkDiags = function(){
        n = board.length-1; //just for reading ease
        if (coords[0] === coords[1]){
            let i = -1;
            if (board.every(innerArr => {
                i++;
                return innerArr[i]=== playerSymbol;
            })){
                return true;
            }
        } else if (Number(coords[0]) + Number(coords[1]) === n){
            let i = -1;
            if (board.every(innerArr => {
                i++;
                return innerArr[n-i] === playerSymbol;
            })){
                return true;
            }   
        }
        return false;
    }

    if (checkRow() || checkCol() || checkDiags()){
        winAction();
    }
}

var checkTie = function(){
    if (!gameOver && board.every(innerArr => !innerArr.includes(null))){
        gameOver = true;
        document.getElementById('winner').innerHTML = `Everyone is a winner!!`;
    }
    
}
var addToBoard = function(coords){
    board[coords[0]][coords[1]] = playerSymbol;
    checkWin(coords, playerSymbol);
    checkTie();
    if (!gameOver) swapPlayer();
}
var resetGame = function(){
    document.getElementById('winner').innerHTML = '';
    playerSymbol = "X";
    gameOver = false;
    board.forEach((innerArr, i) => board[i] = [null,null,null])
    spaces = document.getElementsByClassName("space");
    Array.prototype.forEach.call(spaces, space => {
        space.innerHTML = '';
    })
}

//Controller/View
document.addEventListener('DOMContentLoaded', function() {
    spaces = document.getElementsByClassName("space");
    Array.prototype.forEach.call(spaces, space => {
        space.addEventListener('click', function(event){
            if (this.innerHTML === "" && !gameOver){
                this.innerHTML = playerSymbol;
                addToBoard(this.id.split(""));
            }
        });
    });
    document.getElementById("newGame").addEventListener('click', function(event){
        resetGame(); 
    })   
});
