class App extends React.Component{
	constructor (props){
		super(props);
		this.state = {
			message: "Let's Play!"
		}
	}

	onMessage(message){

		this.setState({message: message||"Let's Play!"});
	}

	render(){
		return <div>
				<Board messageHandler={this.onMessage.bind(this)}/>
				<UserNotification message={this.state.message} />
		</div>
	}
}


//board state should look like [red, black, red]
class Board extends React.Component {
	constructor (props){
		super(props);
		this.state = {
			win: false,
			turn: 'red',
			board : [[],[],[],[],[],[],[]],
		}
	}
	columnClickHandler(index){
		if (this.state.win){ return } 
		var stackHeight = this.state.board[index].length

		if (stackHeight===7) {
			return this.props.messageHandler("That column is full. Choose another.")
		}
		this.props.messageHandler();
		this.state.board[index].push(this.state.turn)
		this.setState({board: this.state.board})
		this.checkWins(index, stackHeight); //Pass in coords of the placed piece
		this.setState({turn: this.state.turn === 'red' ? 'black' : 'red'})

	}

	checkWins(col, row){
		var turn = this.state.turn;
		var checkRow = function(rowVals){
			var inARow = 1;
			var rowIndex = col;
			while(rowVals[--rowIndex] === turn){
				inARow++;
			}
			rowIndex = col;
			while(rowVals[++rowIndex] === turn){
				inARow++;
			}
			return inARow>=4 ? true : false;
		}

		var checkCol = function(colVals){
			var inARow = 1;
			while(colVals[--row] === turn){
				inARow++;
			}
			return inARow>=4 ? true : false;
		}

		var rowArr = this.state.board.map(column => column[row]|| null)
		var majorFirst = -(col-row);
		var minorFirst = col+row;
		var majorArr = this.state.board.map(column => column[majorFirst++]||null);
		var minorArr = this.state.board.map(column => column[minorFirst--]||null);


		if (checkRow(rowArr)||checkCol(this.state.board[col])||checkRow(majorArr)||checkRow(minorArr)){
			this.props.messageHandler(turn + " wins!!!")
			this.setState({win: true});
		}
	}

	render(){
		return <div className= "gameBoard">
			{this.state.board.map( (col, index) => 
				<Column pieces={col} key = {index} index = {index} onClick = {this.columnClickHandler.bind(this)}/> )}
		</div>
	}
}

var Column = (props) => (
	<div className = "col" onClick = {(e)=>props.onClick(props.index)}>
		{props.pieces.map((piece, index) => <Piece color = {piece} key = {index}/>)}
	</div>
	);

var Piece = (props) => (
	<div className = {"piece " + props.color}>
	</div>
);

var UserNotification = (props) => (
	<div className = "message">
		{props.message}
	</div>
);

ReactDOM.render(<App/>, document.getElementById('App'));
