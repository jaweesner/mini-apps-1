class App extends React.Component{
	constructor (props){
		super(props);
		this.state = {
			scores:[], //contains objs with first, second, total props
			round: 0,
			ball: 0  //ball 0 is before first ball, 1 after 1st ball, 2 after ball 2
		}
		for(var i = 0; i<10; i++){
			this.state.scores.push({})
		}
	}

	pinsLeft(){
		return this.state.ball===0 ? 10 : (this.state.ball === 1 ? 10-this.state.scores[this.state.round].first : 10-(this.state.scores[this.state.round].second + this.state.scores[this.state.round].first));
	}

	onBowl(){
		var pinsRemain = this.pinsLeft();
		var pinsDown;
		do {
			pinsDown = Math.floor(Math.random()*10)
		}while (pinsDown > pinsRemain)
		this.state.ball++;
		this.updateBallScore(pinsDown);
		this.calculateTotals()
		if (this.state.ball === 2 || pinsDown === 10) {
			this.state.round++;
			this.state.ball = 0;
		}
		this.setState({
			scores: this.state.scores,
			round: this.state.round,
			ball: this.state.ball
		
			})
		}
	updateBallScore(pinsDown){
		this.state.ball === 1 ? this.state.scores[this.state.round].first=pinsDown : this.state.scores[this.state.round].second=pinsDown;
	}

	calculateTotals(){
		var currFrame = this.state.scores[this.state.round];
		//set self if needed
		if (this.state.ball === 2 && (currFrame.first + currFrame.second !==10)){
			currFrame.total = currFrame.first + currFrame.second;
		}
		//set one/two back if needed
		var prevFrame = this.state.scores[this.state.round-1];
		if (prevFrame && prevFrame.total===undefined){
			//set if prev was spare
			if (prevFrame.second){
				prevFrame.total = 10 + currFrame.first;

			//set if prev was strike (aka, not set by prev if statement)	
			} else if (this.state.ball === 2){
				prevFrame.total = 10 + currFrame.total;
			} 
			//if we just set a value, check one back and set if needed
			if (prevFrame.total || currFrame.first === 10) {
				var prevPrevFrame = this.state.scores[this.state.round-2];
				if (prevPrevFrame && prevPrevFrame.total === undefined){
					if (currFrame.first === 10 && prevFrame.first === 10){
						prevPrevFrame.total = 30;
					}else if (prevFrame.first === 10){
						prevPrevFrame.total = 10 + prevFrame.total;
					}else {
						prevPrevFrame.total = 20; 
					}
				}
			
			}
		}
	}

	render(){
		return (
			<div className= 'app'>
				<Scorecard scores = {this.state.scores}/>
				<Board pinsLeft= {this.pinsLeft()}/>
				<UserInterface clickHandler = {this.onBowl.bind(this)} />
			</div>

		)
	}
}

var Scorecard = (props) => (
	<div className = 'scorecard'>
	SCORES:
		Total = {props.scores.reduce((acc, frame) => acc + (frame.total||0), 0)}
		{props.scores.map((frameScore, index) => <Frame frameScore={frameScore} key =  {index} index = {index}/>)}
	</div>
)

var Frame = (props) => (
	<div className = 'frame'>
		Frame {props.index + 1}:
		<div className='ballScore'> first:{props.frameScore.first || ""} </div>
		<div className='ballScore'> Second:{props.frameScore.second || ""} </div>
		<div className= 'total'> Total:{props.frameScore.total || ""} </div>
	</div>
)

var Board = (props) => (
	<div className = 'pins'>
		number of pins left = {props.pinsLeft}
	</div>


)

var UserInterface = (props) => (
	<div className = 'userInterface'>
		<button onClick={props.clickHandler}> Bowl! </button>
		<div className='userMessage'>Welcome to bowling</div>
	</div>
)


ReactDOM.render(<App />, document.getElementById('app'));

