
	it('should not return a win for null board', function(){
		var board = new Board({
					messageHandler: console.log,
					win: false,
					turn: 0,
					onWin: console.log,
					players: ['red','blue'],
					onTurn: console.log
		})
		expect(board.checkTie).to.be.a('function');
	})

