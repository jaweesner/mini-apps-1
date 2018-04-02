
//Model
var playerSymbol = "X"
//var symbols = ["X", "0"]

var board = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
];
var win = false;

var swapPlayer = function(){
    if (playerSymbol === "X"){
        playerSymbol = "0";
    } else {
        playerSymbol = "X"
    }
}
var winAction = function(){
    console.log('win!');
    win = true; 
    document.getElementsByTagName
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
        return true; 
    }
    return false;

}
var addToBoard = function(coords){
    board[coords[0]][coords[1]] = playerSymbol;
    checkWin(coords, playerSymbol);
    if (!win) swapPlayer();
}


/* <section class = "board">
            <div class = "row r1" style="padding:20px;">
                <span style="border:1px solid black;padding:20px;" class = "space" id = "00"></span>
                <span style="border:1px solid black;padding:20px;" class = "space" id = "01"></span> 
                <span style="border:1px solid black;padding:20px;" class = "space" id = "02"></span>
            </div> */
var render = function(){
    var rowIndex = 0;
    board.forEach(innerArr => {
        $div = document.createElement("div");
        $div.style = "padding:20px;";
        document.getElementById("board").appendChild($div);
        var colIndex = 0;
        innerArr.forEach(space => {
            $span = document.createElement("span");
            $span.innerHTML = board[rowIndex][colIndex] || "";
            $span.id = "" + rowIndex + colIndex;
            $span.style =  "border:1px solid black;padding:20px;";
            $div.appendChild($span);
            $span.addEventListener('click', function(event){
                if (!this.innerHTML && !win){
                    this.innerHTML = playerSymbol;
                    addToBoard(this.id.split(""));
                }
            });
            colIndex++;
        });
        rowIndex++;
    });   
}

//Controller/View
document.addEventListener('DOMContentLoaded', function() {
    render();
    
});
