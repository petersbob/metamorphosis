console.log("StartMenu.js is being read.")
worldshift.StartMenu = function(game) {
	
}

worldshift.StartMenu.prototype = {

	create: function () {

		this.world.setBounds(0, 0, this.game.width, this.game.height);

		startBG = this.add.sprite(0, 0, 'startmenubg');
		
		this.startbutton = this.add.button(this.world.centerX, 330, 'startbutton', this.startGame, this);
		this.startbutton.anchor.setTo(0.5, 0.5);
	},

	startGame: function (pointer) {
		this.state.start('Game');
	}

	// render: function() {
	// 	this.game.debug.pointer(this.game.input.activePointer);
	// }
};