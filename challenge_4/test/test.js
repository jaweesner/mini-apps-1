describe('Pins Remaining', function(){
	var app = new App();
	it('should accurately give the number of pins remaining on ball 0', ()=>{
		expect (app.pinsLeft()).to.equal(10);
	})
	it('should accurately give the number of pins remaining on ball 1', () =>{
		app.state.scores[0].first = 5;
		app.state.ball = 1;
		expect (app.pinsLeft()).to.equal(5);
	})
	it('should accurately give the number of pins remaining on ball 2', ()=>{
		app.state.scores[0].second = 2;
		app.state.ball = 2;
		expect (app.pinsLeft()).to.equal(3);
	})

})

describe('Update Ball Scores', function(){
	var app = new App();
	it('should update the first property on ball 1', () => {
		app.state.ball = 1;
		app.updateBallScore(5);
		expect(app.state.scores[0].first).to.equal(5);
	})
	it('should update the second property on ball 2', () => {
		app.state.ball = 2;
		app.updateBallScore(4);
		expect(app.state.scores[0].second).to.equal(4);
	})
	it ('should update the correct frame', ()=>{
		app.state.round = 2
		app.updateBallScore(3);
		expect(app.state.scores[2].second).to.equal(3);

	})
})

describe('Update Totals', function(){
	var app = new App();
	it('should not update current frame total on ball 1', () =>{
		app.state.ball = 1;
		app.updateBallScore(5);
		app.calculateTotals();
		expect(app.state.scores[0].total).to.not.exist;
	})
	it('should not update current frame total if total pins down is 10', () =>{
		app.state.ball = 2;
		app.updateBallScore(5);
		app.calculateTotals()
		expect(app.state.scores[0].total).to.not.exist;
	})
	it('should update current frame total if ball 2 and pins <10', () =>{
		app.updateBallScore(3);
		app.calculateTotals();
		expect(app.state.scores[0].total).to.equal(8);
	})
	it('should check previous frame for strike update total if needed', () =>{
		var app = new App();
		app.state.ball = 1;
		app.updateBallScore(10)
		app.calculateTotals();
		app.state.round = 1;
		app.updateBallScore(3);
		app.calculateTotals();
		expect(app.state.scores[0].total).to.not.exist
		expect(app.state.scores[1].total).to.not.exist
		app.state.ball = 2;
		app.updateBallScore(4);
		app.calculateTotals();
		expect(app.state.scores[0].total).to.equal(17);
		expect(app.state.scores[1].total).to.equal(7);

	})

	it('should check previous frame for spare and update total if needed', () =>{
		var app = new App();
		app.state.ball = 1;
		app.updateBallScore(5);
		app.state.ball = 2;
		app.updateBallScore(5);
		app.calculateTotals();
		app.state.round = 1;
		app.state.ball = 1;
		app.updateBallScore(3);
		app.calculateTotals();
		expect(app.state.scores[0].total).to.equal(13)
		expect(app.state.scores[1].total).to.not.exist
		app.state.ball = 2;
		app.updateBallScore(4);
		app.calculateTotals();
		expect(app.state.scores[0].total).to.equal(13);
		expect(app.state.scores[1].total).to.equal(7);

	})
		
	it('should update two frames back on sequential strikes -strike, strike, strike ', () =>{
		var app = new App();
		app.state.scores = [
			{first:10},
			{first:10},
			{first:10},
		]
		app.state.ball = 1;
		app.state.round = 2;
		app.calculateTotals()
		expect(app.state.scores[0].total).to.equal(30);
		expect(app.state.scores[1].total).to.not.exist;
		expect(app.state.scores[2].total).to.not.exist;


	})
	it('should update two frames back on sequential strikes -strike, spare, strike ', () =>{
		var app = new App();
		app.state.scores = [
			{first:10},
			{first:5, second:5},
			{first:10}
		]
				app.state.ball = 1;
		app.state.round = 2;
		app.calculateTotals()
		expect(app.state.scores[0].total).to.equal(20);
		expect(app.state.scores[1].total).to.equal(20);
		expect(app.state.scores[2].total).to.not.exist;

	})
	it('should update two frames back on sequential strikes -strike, spare, 5 ', () =>{
		var app = new App();
		app.state.scores = [
			{first:10},
			{first:5, second:5},
			{first:5, second:1}
		]
				app.state.ball = 2;
		app.state.round = 2;
		app.calculateTotals()
		expect(app.state.scores[0].total).to.equal(20);
		expect(app.state.scores[1].total).to.equal(15);
		expect(app.state.scores[2].total).to.equal(6);

	})
	it('should update two frames back on sequential strikes -strike, strike, 5 ', () =>{
		var app = new App();
		app.state.scores = [
			{first:10},
			{first:10},
			{first:5, second:1}
		]
				app.state.ball = 2;
		app.state.round = 2;
		app.calculateTotals()
		expect(app.state.scores[0].total).to.equal(26);
		expect(app.state.scores[1].total).to.equal(16);
		expect(app.state.scores[2].total).to.equal(6);

	})
})

describe('Reset Frame', () => {
	it('should not change round if pinsdown < 10 && ball<2', () => {

	})
	it('should change round if pinsdown === 10', () => {

	})
})