console.log("Preloader.js being read");
worldshift.Preloader = function(game) {
	this.ready = false;
};

var my_j = [];

worldshift.Preloader.prototype = {

	preload: function() {

      this.load.image('conbg', 'images/backgrounds/withoutbackground.png');
      this.load.atlas('sprite_atlas', 'bodyparts/spritesheet.png', 'bodyparts/sprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

	},

	create: function () {
	},

	update: function () {
      this.state.start('Game');

        }
	}
