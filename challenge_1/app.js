
//Model
var Player = {
    currentPlayer: "X",
    playerWins: {
        X:0,
        O:0
    },
    lastWinner: null,
    swapPlayer(){
        if (this.currentPlayer === "X"){
            this.currentPlayer = "O";
        } else {
            this.currentPlayer = "X"
        }
        document.getElementById('playerTurn').innerHTML = `Player ${this.currentPlayer}'s Turn`
    }
}

var Game = {
    board: [
        [null,null,null],
        [null,null,null],
        [null,null,null]
    ],
    gameOver: false,
    resetGame(){   
        document.getElementById('winner').innerHTML = '';
        Player.currentPlayer = Player.lastWinner
        Player.swapPlayer();
        document.getElementById('playerTurn').innerHTML = `Player ${Player.currentPlayer}'s Turn`
        this.gameOver = false;
        this.board = [
            [null,null,null],
            [null,null,null],
            [null,null,null]
        ] 
        spaces = document.getElementsByClassName("space");
        Array.prototype.forEach.call(spaces, space => {
            space.innerHTML = '';
        })
        document.getElementById('xwins').innerHTML = `X: ${Player.playerWins.X}`
        document.getElementById('owins').innerHTML = `O: ${Player.playerWins.O}`
    },
    addToBoard(coords){
        if (this.board[coords[0]][coords[1]]===null && !this.gameOver){
            this.board[coords[0]][coords[1]] = Player.currentPlayer;
            document.getElementById(""+coords[0]+coords[1]).innerHTML = Player.currentPlayer;
            this.checkWin(coords, Player.currentPlayer);
            this.checkTie();
            if (!this.gameOver) Player.swapPlayer();
        }    
    },
    winAction(){
        this.gameOver = true; 
        Player.lastWinner = Player.currentPlayer;
        Player.playerWins[Player.currentPlayer] = (Player.playerWins[Player.currentPlayer]) ?  ++(Player.playerWins[Player.currentPlayer]) : 1; 
        document.getElementById('winner').innerHTML = `Player ${Player.currentPlayer} Wins!!!!!`;

    },

    checkWin(coords){
    /*
    * win conditions defined as:
    * A. all vals in row array are equal to player
    * B. for each row Arr in board, col = i, Arr[i] is equal to player
    * C. if on diagonal 
    *   (only check if r ===c) || r+c === ln-1
    *   Check each 0+i, 0 +i  ||  i,n-1-i
    */
        var checkRow = function(){
            return Game.board[coords[0]].every((val) => val === Player.currentPlayer);
        }
        var checkCol = function(){
            return Game.board.every(innerArr => innerArr[coords[1]] === Player.currentPlayer);
        }
        var checkDiags = function(){
            n = Game.board.length-1; //just for reading ease
            if (coords[0] === coords[1]){
                let i = -1;
                if (Game.board.every(innerArr => {
                    i++;
                    return innerArr[i]=== Player.currentPlayer;
                })){
                    return true;
                }
            } else if (Number(coords[0]) + Number(coords[1]) === n){
                let i = -1;
                if (Game.board.every(innerArr => {
                    i++;
                    return innerArr[n-i] === Player.currentPlayer;
                })){
                    return true;
                }   
            }
            return false;
        }

        if (checkRow() || checkCol() || checkDiags()){
            this.winAction();
        }
    },

    checkTie(){
        if (!this.gameOver && this.board.every(innerArr => !innerArr.includes(null))){
            this.gameOver = true;
            document.getElementById('winner').innerHTML = `Everyone is a winner!!`;
        }
        
    }
}
//Controller/View
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(event){
        if (event.target.classList[0] === "space" ){
            Game.addToBoard(event.target.id.split(""));
        }
    });
    document.getElementById("newGame").addEventListener('click', function(event){
        Game.resetGame(); 
    })   
});
Game.resetGame();