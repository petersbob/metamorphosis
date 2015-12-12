console.log("StartMenu.js is being read")
unnameed.StartMenu = function(game) {

}

unnamed.StartMenu.prototype = {

	create: function() {
		this.world.setBounds(0, 0, this.game.width, this.game.height);

	},

	startGame1: function (pointer) {
		this.state.start('Game1');
	}
}