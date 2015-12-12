console.log("Boot.js being read")
var unnamed = {};

unnamed.Boot = function(game) {};

unnamed.Boot.prototype = {
	preload: function() {

	},

	create: function() {
		this.input.maxPointers = 1;
		this.stage.disableVisibilityChange = false;
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.scale.forceLandscape = true;
		this.scale.setScreenSize(true);

		this.input.addPointer();
		this.stage.backgroundColor = '#171942';

		this.state.start('Preloader');
	}
}