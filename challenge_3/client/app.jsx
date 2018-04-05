class App extends React.Component{
	constructor (props){
		super(props);
		this.state = {
			message: "Let's Play!",
			win: false,
			turn: 0,
			players: ['purple', 'teal'],
			potentialPlayers: ['grey','green','black']
		}
	}

	onMessage(message){
		this.setState({message: message||"Let's Play!"});
	}

	toggleWin(){
		this.setState({win: !this.state.win});
	}

	incrementTurn(){
		let newTurn = this.state.players.length-1 === this.state.turn ? 0 : ++this.state.turn;
		this.setState({turn: newTurn});
	}
	reset(){
		this.setState({
			message: "Let's Play!",
			win: false,
			turn: 0,
			players: ['purple', 'teal'],
			potentialPlayers: ['grey','green','black']
		})
	}

	playerChange(num){
		if (num>0) {
			if(this.state.potentialPlayers.length === 0){return}
			this.state.players.push(this.state.potentialPlayers.pop())
			this.setState({players:this.state.players});
		}if(num<0){
			if(this.state.players.length <=2){return}
			this.state.potentialPlayers.push(this.state.players.pop());
			this.setState({players:this.state.players})
		} 
	}

	render(){
		return <div>
				<Nav 
					players = {this.state.players} 
					turn = {this.state.turn} 
					playerChange = {this.playerChange.bind(this)}
					reset = {this.reset.bind(this)}
				/>
				<Board 
					messageHandler={this.onMessage.bind(this)} 
					win = {this.state.win} 
					turn = {this.state.turn}
					onWin = {this.toggleWin.bind(this)}
					players = {this.state.players}
					onTurn = {this.incrementTurn.bind(this)}
				/>
				<UserNotification message={this.state.message} />
		</div>
	}
}


//board state should look like [red, black, red]
class Board extends React.Component {
	constructor (props){
		super(props);
		this.state = {
			board : [],
		}
		while(this.state.board.length<props.players.length*4){
			this.state.board.push([])
		}
	}

	columnClickHandler(index){
		if (this.props.win){ return } 
		var stackHeight = this.state.board[index].length

		if (stackHeight===this.state.board.length) {
			return this.props.messageHandler("That column is full. Choose another.")
		}
		this.props.messageHandler();
		this.state.board[index].push(this.props.players[this.props.turn])
		this.setState({board: this.state.board})
		this.checkWins(index, stackHeight); //Pass in coords of the placed piece
		this.checkTie();
		this.props.onTurn();

	}

	checkTie(){
		if(this.state.board.every((col) => col.length === this.state.board.length)){ 
			this.props.messageHandler("Oh no, a tie...")
			this.props.onWin();

		}
	}

	checkWins(col, row){
		var turnAlias = this.props.players[this.props.turn];
		var checkRowDiag = function(rowVals){
			var inARow = 1;
			var rowIndex = col;
			while(rowVals[--rowIndex] === turnAlias){
				inARow++;
			}
			rowIndex = col;
			while(rowVals[++rowIndex] === turnAlias){
				inARow++;
			}
			return inARow>=4 ? true : false;
		}

		var checkCol = function(colVals){
			var inARow = 1;
			while(colVals[--row] === turnAlias){
				inARow++;
			}
			return inARow>=4 ? true : false;
		}

		var rowArr = this.state.board.map(column => column[row]|| null)
		var majorFirst = -(col-row);
		var minorFirst = col+row;
		var majorArr = this.state.board.map(column => column[majorFirst++]||null);
		var minorArr = this.state.board.map(column => column[minorFirst--]||null);


		if (checkRowDiag(rowArr)||checkCol(this.state.board[col])||checkRowDiag(majorArr)||checkRowDiag(minorArr)){
			this.props.messageHandler(turnAlias + " wins!!!")
			this.props.onWin();
		}
	}
	componentWillUpdate(){
		if(this.state.board.length!==this.props.players.length*4){
			this.state.board = [];
			while(this.state.board.length<this.props.players.length*4){
				this.state.board.push([])
			}
		}

	}

	render(){
		return <div className= "gameBoard">
			{this.state.board.map( (col, index) => 
				<Column 
					pieces={col} 
					key = {index} 
					index = {index} 
					onClick = {this.columnClickHandler.bind(this)} 
					playerNum = {this.props.players.length} 
				/> )}
		</div>
	}
}

var Column = (props) => (
	<div className = "col" onClick = {(e)=>props.onClick(props.index)}>
		{props.pieces.map((piece, index) => <Piece color = {piece} key = {index} playerNum = {props.playerNum}/>)}
	</div>
	);

var Piece = (props) => {
	var style = {
		"width" : 430/(props.playerNum*4),
		"height": 430/(props.playerNum*4),
		"backgroundColor": props.color

	}
	return <div style= {style} className = "piece"  >
	</div>
};

var UserNotification = (props) => (
	<h1 className = "message">
		{props.message}
	</h1>
);

var Nav = (props) => (
	<div>
		<button onClick= {()=>props.playerChange(1)}>Add Player</button>
		<button onClick= {()=>props.playerChange(-1)}>Remove Player</button>
		<button onClick= {props.reset}>Reset Game</button>
		<div> Players: {props.players.toString()} </div>
		<div> {props.players[props.turn]}'s turn </div> 
	</div>
);
ReactDOM.render(<App/>, document.getElementById('App'));
