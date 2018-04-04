"use strict";

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
			message: "Let's Play!"
		};
		return _this;
	}

	_createClass(App, [{
		key: "onMessage",
		value: function onMessage(message) {

			this.setState({ message: message || "Let's Play!" });
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(Board, { messageHandler: this.onMessage.bind(this) }),
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
			win: false,
			turn: 'red',
			board: [[], [], [], [], [], [], []]
		};
		return _this2;
	}

	_createClass(Board, [{
		key: "columnClickHandler",
		value: function columnClickHandler(index) {
			if (this.state.win) {
				return;
			}
			var stackHeight = this.state.board[index].length;

			if (stackHeight === 7) {
				return this.props.messageHandler("That column is full. Choose another.");
			}
			this.props.messageHandler();
			this.state.board[index].push(this.state.turn);
			this.setState({ board: this.state.board });
			this.checkWins(index, stackHeight); //Pass in coords of the placed piece
			this.setState({ turn: this.state.turn === 'red' ? 'black' : 'red' });
		}
	}, {
		key: "checkWins",
		value: function checkWins(col, row) {
			var turn = this.state.turn;
			var checkRow = function checkRow(rowVals) {
				var inARow = 1;
				var rowIndex = col;
				while (rowVals[--rowIndex] === turn) {
					inARow++;
				}
				rowIndex = col;
				while (rowVals[++rowIndex] === turn) {
					inARow++;
				}
				return inARow >= 4 ? true : false;
			};

			var checkCol = function checkCol(colVals) {
				var inARow = 1;
				while (colVals[--row] === turn) {
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

			if (checkRow(rowArr) || checkCol(this.state.board[col]) || checkRow(majorArr) || checkRow(minorArr)) {
				this.props.messageHandler(turn + " wins!!!");
				this.setState({ win: true });
			}
		}
	}, {
		key: "render",
		value: function render() {
			var _this3 = this;

			return React.createElement(
				"div",
				{ className: "gameBoard" },
				this.state.board.map(function (col, index) {
					return React.createElement(Column, { pieces: col, key: index, index: index, onClick: _this3.columnClickHandler.bind(_this3) });
				})
			);
		}
	}]);

	return Board;
}(React.Component);

var Column = function Column(props) {
	return React.createElement(
		"div",
		{ className: "col", onClick: function onClick(e) {
				return props.onClick(props.index);
			} },
		props.pieces.map(function (piece, index) {
			return React.createElement(Piece, { color: piece, key: index });
		})
	);
};

var Piece = function Piece(props) {
	return React.createElement("div", { className: "piece " + props.color });
};

var UserNotification = function UserNotification(props) {
	return React.createElement(
		"div",
		{ className: "message" },
		props.message
	);
};

ReactDOM.render(React.createElement(App, null), document.getElementById('App'));
//# sourceMappingURL=app.js.map