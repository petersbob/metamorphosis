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
		this.load.image('layer1', 'images/Layer1.png');

		this.load.image('startbutton', 'images/startbutton.png');
		this.load.image('gamebg', 'images/Background1-2.png');

		this.load.spritesheet('robot', 'images/ROBOTSPRITES.png', 112.5, 113);

		this.load.spritesheet('chomp', 'images/Chompmansprite.png', 112.73, 160);

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