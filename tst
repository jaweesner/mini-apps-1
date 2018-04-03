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