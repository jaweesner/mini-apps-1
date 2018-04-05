'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
	_inherits(App, _React$Component);

	function App(props) {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

		_this.state = {
			message: "Let's Play!",
			win: false,
			turn: 0,
			players: ['purple', 'teal'],
			potentialPlayers: ['grey', 'green', 'black']
		};
		return _this;
	}

	_createClass(App, [{
		key: 'onMessage',
		value: function onMessage(message) {
			this.setState({ message: message || "Let's Play!" });
		}
	}, {
		key: 'toggleWin',
		value: function toggleWin() {
			this.setState({ win: !this.state.win });
		}
	}, {
		key: 'incrementTurn',
		value: function incrementTurn() {
			var newTurn = this.state.players.length - 1 === this.state.turn ? 0 : ++this.state.turn;
			this.setState({ turn: newTurn });
		}
	}, {
		key: 'reset',
		value: function reset() {
			this.setState({
				message: "Let's Play!",
				win: false,
				turn: 0,
				players: ['purple', 'teal'],
				potentialPlayers: ['grey', 'green', 'black']
			});
		}
	}, {
		key: 'playerChange',
		value: function playerChange(num) {
			if (num > 0) {
				if (this.state.potentialPlayers.length === 0) {
					return;
				}
				this.state.players.push(this.state.potentialPlayers.pop());
				this.setState({ players: this.state.players });
			}if (num < 0) {
				if (this.state.players.length <= 2) {
					return;
				}
				this.state.potentialPlayers.push(this.state.players.pop());
				this.setState({ players: this.state.players });
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(Nav, {
					players: this.state.players,
					turn: this.state.turn,
					playerChange: this.playerChange.bind(this),
					reset: this.reset.bind(this)
				}),
				React.createElement(Board, {
					messageHandler: this.onMessage.bind(this),
					win: this.state.win,
					turn: this.state.turn,
					onWin: this.toggleWin.bind(this),
					players: this.state.players,
					onTurn: this.incrementTurn.bind(this)
				}),
				React.createElement(UserNotification, { message: this.state.message })
			);
		}
	}]);

	return App;
}(React.Component);

//board state should look like [red, black, red]


var Board = function (_React$Component2) {
	_inherits(Board, _React$Component2);

	function Board(props) {
		_classCallCheck(this, Board);

		var _this2 = _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).call(this, props));

		_this2.state = {
			board: []
		};
		while (_this2.state.board.length < props.players.length * 4) {
			_this2.state.board.push([]);
		}
		return _this2;
	}

	_createClass(Board, [{
		key: 'columnClickHandler',
		value: function columnClickHandler(index) {
			if (this.props.win) {
				return;
			}
			var stackHeight = this.state.board[index].length;

			if (stackHeight === this.state.board.length) {
				return this.props.messageHandler("That column is full. Choose another.");
			}
			this.props.messageHandler();
			this.state.board[index].push(this.props.players[this.props.turn]);
			this.setState({ board: this.state.board });
			this.checkWins(index, stackHeight); //Pass in coords of the placed piece
			this.checkTie();
			this.props.onTurn();
		}
	}, {
		key: 'checkTie',
		value: function checkTie() {
			var _this3 = this;

			if (this.state.board.every(function (col) {
				return col.length === _this3.state.board.length;
			})) {
				this.props.messageHandler("Oh no, a tie...");
				this.props.onWin();
			}
		}
	}, {
		key: 'checkWins',
		value: function checkWins(col, row) {
			var turnAlias = this.props.players[this.props.turn];
			var checkRowDiag = function checkRowDiag(rowVals) {
				var inARow = 1;
				var rowIndex = col;
				while (rowVals[--rowIndex] === turnAlias) {
					inARow++;
				}
				rowIndex = col;
				while (rowVals[++rowIndex] === turnAlias) {
					inARow++;
				}
				return inARow >= 4 ? true : false;
			};

			var checkCol = function checkCol(colVals) {
				var inARow = 1;
				while (colVals[--row] === turnAlias) {
					inARow++;
				}
				return inARow >= 4 ? true : false;
			};

			var rowArr = this.state.board.map(function (column) {
				return column[row] || null;
			});
			var majorFirst = -(col - row);
			var minorFirst = col + row;
			var majorArr = this.state.board.map(function (column) {
				return column[majorFirst++] || null;
			});
			var minorArr = this.state.board.map(function (column) {
				return column[minorFirst--] || null;
			});

			if (checkRowDiag(rowArr) || checkCol(this.state.board[col]) || checkRowDiag(majorArr) || checkRowDiag(minorArr)) {
				this.props.messageHandler(turnAlias + " wins!!!");
				this.props.onWin();
			}
		}
	}, {
		key: 'componentWillUpdate',
		value: function componentWillUpdate() {
			if (this.state.board.length !== this.props.players.length * 4) {
				this.state.board = [];
				while (this.state.board.length < this.props.players.length * 4) {
					this.state.board.push([]);
				}
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			return React.createElement(
				'div',
				{ className: 'gameBoard' },
				this.state.board.map(function (col, index) {
					return React.createElement(Column, {
						pieces: col,
						key: index,
						index: index,
						onClick: _this4.columnClickHandler.bind(_this4),
						playerNum: _this4.props.players.length
					});
				})
			);
		}
	}]);

	return Board;
}(React.Component);

var Column = function Column(props) {
	return React.createElement(
		'div',
		{ className: 'col', onClick: function onClick(e) {
				return props.onClick(props.index);
			} },
		props.pieces.map(function (piece, index) {
			return React.createElement(Piece, { color: piece, key: index, playerNum: props.playerNum });
		})
	);
};

var Piece = function Piece(props) {
	var style = {
		"width": 430 / (props.playerNum * 4),
		"height": 430 / (props.playerNum * 4),
		"backgroundColor": props.color

	};
	return React.createElement('div', { style: style, className: 'piece' });
};

var UserNotification = function UserNotification(props) {
	return React.createElement(
		'h1',
		{ className: 'message' },
		props.message
	);
};

var Nav = function Nav(props) {
	return React.createElement(
		'div',
		null,
		React.createElement(
			'button',
			{ onClick: function onClick() {
					return props.playerChange(1);
				} },
			'Add Player'
		),
		React.createElement(
			'button',
			{ onClick: function onClick() {
					return props.playerChange(-1);
				} },
			'Remove Player'
		),
		React.createElement(
			'button',
			{ onClick: props.reset },
			'Reset Game'
		),
		React.createElement(
			'div',
			null,
			' Players: ',
			props.players.toString(),
			' '
		),
		React.createElement(
			'div',
			null,
			' ',
			props.players[props.turn],
			'\'s turn '
		)
	);
};
ReactDOM.render(React.createElement(App, null), document.getElementById('App'));
//# sourceMappingURL=app.js.map