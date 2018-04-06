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
			scores: [], //contains objs with first, second, total props
			round: 0,
			ball: 0 //ball 0 is before first ball, 1 after 1st ball, 2 after ball 2
		};
		for (var i = 0; i < 10; i++) {
			_this.state.scores.push({});
		}
		return _this;
	}

	_createClass(App, [{
		key: 'pinsLeft',
		value: function pinsLeft() {
			return this.state.ball === 0 ? 10 : this.state.ball === 1 ? 10 - this.state.scores[this.state.round].first : 10 - (this.state.scores[this.state.round].second + this.state.scores[this.state.round].first);
		}
	}, {
		key: 'onBowl',
		value: function onBowl() {
			var pinsRemain = this.pinsLeft();
			var pinsDown;
			do {
				pinsDown = Math.floor(Math.random() * 10);
			} while (pinsDown > pinsRemain);
			this.state.ball++;
			this.updateBallScore(pinsDown);
			this.calculateTotals();
			if (this.state.ball === 2 || pinsDown === 10) {
				this.state.round++;
				this.state.ball = 0;
			}
			this.setState({
				scores: this.state.scores,
				round: this.state.round,
				ball: this.state.ball

			});
		}
	}, {
		key: 'updateBallScore',
		value: function updateBallScore(pinsDown) {
			this.state.ball === 1 ? this.state.scores[this.state.round].first = pinsDown : this.state.scores[this.state.round].second = pinsDown;
		}
	}, {
		key: 'calculateTotals',
		value: function calculateTotals() {
			var currFrame = this.state.scores[this.state.round];
			//set self if needed
			if (this.state.ball === 2 && currFrame.first + currFrame.second !== 10) {
				currFrame.total = currFrame.first + currFrame.second;
			}
			//set one/two back if needed
			var prevFrame = this.state.scores[this.state.round - 1];
			if (prevFrame && prevFrame.total === undefined) {
				//set if prev was spare
				if (prevFrame.second) {
					prevFrame.total = 10 + currFrame.first;

					//set if prev was strike (aka, not set by prev if statement)	
				} else if (this.state.ball === 2) {
					prevFrame.total = 10 + currFrame.total;
				}
				//if we just set a value, check one back and set if needed
				if (prevFrame.total || currFrame.first === 10) {
					var prevPrevFrame = this.state.scores[this.state.round - 2];
					if (prevPrevFrame && prevPrevFrame.total === undefined) {
						if (currFrame.first === 10 && prevFrame.first === 10) {
							prevPrevFrame.total = 30;
						} else if (prevFrame.first === 10) {
							prevPrevFrame.total = 10 + prevFrame.total;
						} else {
							prevPrevFrame.total = 20;
						}
					}
				}
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ className: 'app' },
				React.createElement(Scorecard, { scores: this.state.scores }),
				React.createElement(Board, { pinsLeft: this.pinsLeft() }),
				React.createElement(UserInterface, { clickHandler: this.onBowl.bind(this) })
			);
		}
	}]);

	return App;
}(React.Component);

var Scorecard = function Scorecard(props) {
	return React.createElement(
		'div',
		{ className: 'scorecard' },
		'SCORES: Total = ',
		props.scores.reduce(function (acc, frame) {
			return acc + (frame.total || 0);
		}, 0),
		props.scores.map(function (frameScore, index) {
			return React.createElement(Frame, { frameScore: frameScore, key: index, index: index });
		})
	);
};

var Frame = function Frame(props) {
	return React.createElement(
		'div',
		{ className: 'frame' },
		'Frame ',
		props.index + 1,
		':',
		React.createElement(
			'div',
			{ className: 'ballScore' },
			' first:',
			props.frameScore.first || "",
			' '
		),
		React.createElement(
			'div',
			{ className: 'ballScore' },
			' Second:',
			props.frameScore.second || "",
			' '
		),
		React.createElement(
			'div',
			{ className: 'total' },
			' Total:',
			props.frameScore.total || "",
			' '
		)
	);
};

var Board = function Board(props) {
	return React.createElement(
		'div',
		{ className: 'pins' },
		'number of pins left = ',
		props.pinsLeft
	);
};

var UserInterface = function UserInterface(props) {
	return React.createElement(
		'div',
		{ className: 'userInterface' },
		React.createElement(
			'button',
			{ onClick: props.clickHandler },
			' Bowl! '
		),
		React.createElement(
			'div',
			{ className: 'userMessage' },
			'Welcome to bowling'
		)
	);
};

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
//# sourceMappingURL=app.js.map