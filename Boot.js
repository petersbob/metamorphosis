console.log("Boot.js being read")
var worldshift = {};

worldshift.Boot = function(game) {};

worldshift.Boot.prototype = {
	preload: function() {
			this.load.image('preloaderBar', 'images/loader_bar.png');
			this.load.image('bg', 'images/forest.png');
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
		this.stage.backgroundColor = '#171642';
        
        this.state.start('Preloader');
    }
}