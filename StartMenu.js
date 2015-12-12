console.log("StartMenu.js is being read.")
worldshift.StartMenu = function(game) {
	
}

worldshift.StartMenu.prototype = {

	create: function () {

		this.world.setBounds(0, 0, this.game.width, this.game.height);

		startBG = this.add.image(0, 0, 'forestbg');
		this.add.image(this.world.centerX, this.world.centerY, 'star');

		this.levelbutton = this.add.button(this.world.centerX - 250, 400, 'button', this.startGame, this);
		this.levelbutton.anchor.setTo(0.5, 0.5);
		
	},

	startGame: function (pointer) {
		this.state.start('Game');
	},

	render: function() {
		this.game.debug.pointer(this.game.input.activePointer);
	}
};