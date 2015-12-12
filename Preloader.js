console.log("Preloader.js being read");
worldshift.Preloader = function(game) {
	this.ready = false;
};

worldshift.Preloader.prototype = {

	preload: function() {

		this.add.image(0, 0, 'preloadbg');

		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');
		this.preloadBar.anchor.setTo(0.5, 0.5);
		this.load.setPreloadSprite(this.preloadBar);

		this.load.image('startbg', 'images/startbg.png');
		this.load.image('startbutton', 'images/startbutton.png');
		this.load.image('gamebg', 'images/gamebg.png');

		this.load.spritesheet('')

		this.load.spritesheet('sprite', 'images/sprite.png', 65, 75);

	},

	create: function () {
		this.preloadBar.cropEnable = false;
	},

	update: function () {
		// if(this.cache.isSoundDecoded('journey') && this.ready == false) {
  //           this.ready = true;
  //           this.bgmusic = this.add.audio('journey')
  //           this.bgmusic.play('', 0, 1, true, true); 
  //           //--looping not working in chrome--//
  //           this.bgmusic.onLoop.add(this.playBGMusic, this);
            
            this.state.start('StartMenu');

        //}
	},
    playBGMusic: function() {
        this.bgmusic.play('', 0, 1, true);
    }
}