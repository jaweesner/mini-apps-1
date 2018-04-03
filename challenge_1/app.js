
//Model
var Player = {
    currentPlayer: this.player1,
    player1: {
        symbol: "X",
        name: "PlayerOne",
        wins: 0
    },
    player2: {
        symbol: "O",
        name: "PlayerTwo",
        wins: 0
    },
    lastWinner: null,
    swapPlayer(){
        if (this.currentPlayer === this.player1){
            this.currentPlayer = this.player2;
        } else {
            this.currentPlayer = this.player1
        }
        document.getElementById('playerTurn').innerHTML = `${this.currentPlayer.name}'s Turn`
    }
}

var Game = {
    board: [
        [null,null,null],
        [null,null,null],
        [null,null,null]
    ],
    gameOver: false
}
Game.resetGame = function(){   
        document.getElementById('winner').innerHTML = '';
        Player.currentPlayer = Player.lastWinner
        Player.swapPlayer();
        document.getElementById('playerTurn').innerHTML = `${Player.currentPlayer.name}'s Turn`
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
        document.getElementById('xwins').innerHTML = `${Player.player1.symbol}: ${Player.player1.wins}`
        document.getElementById('owins').innerHTML = `${Player.player2.symbol}: ${Player.player2.wins}`
        this.render();
    }
    Game.addToBoard = function(coords){
        if (this.board[coords[0]][coords[1]]===null && !this.gameOver){
            this.board[coords[0]][coords[1]] = Player.currentPlayer.symbol;
            document.getElementById(""+coords[0]+coords[1]).innerHTML = Player.currentPlayer.symbol;
            this.rotateBoard();
            this.gravity();
            this.checkWin();
            this.checkTie();
            this.render();
            if (!this.gameOver) Player.swapPlayer();
        }    
    }
    Game.winAction = function(winner){
        if (!winner) return;
        this.gameOver = true; 
        Player.lastWinner = winner;
        winner.wins++;
        document.getElementById('winner').innerHTML = `${winner.name} Wins!!!!!`;

    }
    Game.rotateBoard = function(){
        var newBoard = [
            [null,null,null],
            [null,null,null],
            [null,null,null]
        ];
        var n = this.board.length-1;
        for (var i = 0; i < this.board.length; i++){
            for(var j = 0; j<this.board.length; j++){
                newBoard[j][n-i] = this.board[i][j];
            }
        }
        this.board = newBoard;
    }
    Game.gravity= function(){
        var n = this.board.length-1;
        for (var j = n-1 ; j >= 0 ; j--){
            for(var i = 0; i<=n; i++){
                if (this.board[j+1][i] === null){
                    this.board[j+1][i] = this.board[j][i];
                    this.board[j][i] = null;
                    if(j+2<=n && this.board[j+2][i] === null){
                        this.board[j+2][i]  = this.board[j+1][i]; 
                        this.board[j+1][i] =null;
                    }
                }
            }     
            
        }
    }
    Game.checkWin= function(){
    /*
    * win conditions defined as:
    * A. all vals in row array are equal to player
    * B. for each row Arr in board, col = i, Arr[i] is equal to player
    * C. if on diagonal 
    *   (only check if r ===c) || r+c === ln-1
    *   Check each 0+i, 0 +i  ||  i,n-1-i
    */
        var checkRow = function(){
            if (Game.board.some(row => row.every((val) => val === Player.player1.symbol))){
                return Player.player1;
            }else if(Game.board.some(row => row.every((val) => val === Player.player2.symbol))){
                return Player.player2;
            }return false;
        }
        var checkCol = function(){
            if(checkColTruth(Player.player1)){
                return Player.player1;
            }else if(checkColTruth(Player.player2)){
                return Player.player2;
            } return false;     
        }

        var checkColTruth = function(player){
            for (var i = 0; i<Game.board.length; i++){
                if((Game.board[0][i] === Game.board[1][i])&&(Game.board[2][i] === player.symbol) && (Game.board[0][i] === player.symbol)){
                    return true;
                }
            }
            return false;
        }
        var checkDiagsTruth = function(player){
            n = Game.board.length-1; //just for reading ease
            var i = j = -1;
            return Game.board.every(innerArr => {
                    i++;
                    return innerArr[i]=== player.symbol;
                }) || Game.board.every(innerArr => {
                    j++;
                    return innerArr[n-j] === player.symbol;
                })   
        }
        var checkDiags = function(){
            if (checkDiagsTruth(Player.player1)){
                return Player.player1;
            }
            if (checkDiagsTruth(Player.player2)){
                return Player.player2;
            }
            return false;
        }

            this.winAction(checkRow() || checkCol() || checkDiags());

    }

Game.checkTie = function(){
        if (!this.gameOver && this.board.every(innerArr => !innerArr.includes(null))){
            this.gameOver = true;
            document.getElementById('winner').innerHTML = `Everyone is a winner!!`;
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


Game.render = function(){
    var rowIndex = 0;
    document.getElementById('xwins').innerHTML = `${Player.player1.symbol}: ${Player.player1.wins}`
    document.getElementById('owins').innerHTML = `${Player.player2.symbol}: ${Player.player2.wins}`
    document.getElementById("innerBoard").innerHTML = "";
    Game.board.forEach(innerArr => {
        $div = document.createElement("div");
        $div.className = "row";
        document.getElementById("innerBoard").appendChild($div);
        var colIndex = 0;
        innerArr.forEach(space => {
            $span = document.createElement("div");
            $span.className = "space";
            $span.innerHTML = this.board[rowIndex][colIndex] || "";
            $span.id = "" + rowIndex + colIndex;
            $div.appendChild($span);
            // $span.addEventListener('click', function(event){
            //     if (!this.innerHTML && !win){
            //         this.innerHTML = playerSymbol;
            //         addToBoard(this.id.split(""));
            //     }
            // });
            colIndex++;
        });
        rowIndex++;
    });   
}
Game.resetGame();