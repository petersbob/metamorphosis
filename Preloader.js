console.log("Preloader.js being read");
worldshift.Preloader = function(game) {
	this.ready = false;
};

worldshift.Preloader.prototype = {

	preload: function() {

		this.add.image(0, 0, 'preloadbg');

		this.preloadBar = this.add.sprite(0, 500, 'preloaderBar');
		this.preloadBar.anchor.setTo(0, 1);
		this.load.setPreloadSprite(this.preloadBar);

		this.load.audio('song', 'Weirdsong.wav');
		
		this.load.image('startbutton', 'images/startbutton.png');
		
		this.load.image('groundplatform', 'images/platforms/groundplatform.png');

		//-----------backgrounds----------//
		this.load.image('conbg', 'images/backgrounds/conbackground.png');
		this.load.image('startmenubg', 'images/backgrounds/startbg.png');
		// this.load.image('2ndbg', 'images/backgrounds/2ndbg.png');
		// this.load.image('3rdbg', 'images/backgrounds/3rdbg.png');
		// this.load.image('4thbg', 'images/backgrounds/4thbg.png');
		// this.load.image('5thbg', 'images/backgrounds/5thbg.png');

		// this.load.image('layer', 'images/backgrounds/layer1stkill.png');

		//------------------------------------//

		//this.load.image('platform', 'images/platforms/Platform3-3.png');
		//---body parts----//
		this.load.spritesheet('item', 'images/Items.png', 72, 72);
		//------------------//

		//---------------spritesheets---------------//
		this.load.spritesheet('rrrr', 'images/playersprites/rrrr.png', 112.5, 113);
		this.load.spritesheet('rrrc', 'images/playersprites/rrrc.png', 110.17, 138);
		this.load.spritesheet('rrcr', 'images/playersprites/rrcr.png', 110.17, 138);
		this.load.spritesheet('rrcc', 'images/playersprites/rrcc.png', 110.17, 138);
		this.load.spritesheet('rcrr', 'images/playersprites/rcrr.png', 96.500, 110);
		this.load.spritesheet('rcrc', 'images/playersprites/rcrc.png', 118.00, 125);
		this.load.spritesheet('rccr', 'images/playersprites/rccr.png', 110.19, 136);
		this.load.spritesheet('rccc', 'images/playersprites/rccc.png', 112.56, 108);
		this.load.spritesheet('crrr', 'images/playersprites/crrr.png', 112.56, 144);
		this.load.spritesheet('crrc', 'images/playersprites/crrc.png', 110.12, 139);
		this.load.spritesheet('crcr', 'images/playersprites/crcr.png', 110.18, 138);
		this.load.spritesheet('crcc', 'images/playersprites/crcc.png', 110.21, 144);
		this.load.spritesheet('ccrr', 'images/playersprites/ccrr.png', 110.18, 159);
		this.load.spritesheet('ccrc', 'images/playersprites/ccrc.png', 110.21, 151);
		this.load.spritesheet('cccr', 'images/playersprites/cccr.png', 110.36, 135);
		this.load.spritesheet('cccc', 'images/playersprites/cccc.png', 112.73, 154);

		this.load.spritesheet('friend', 'images/playersprites/Friend.png', 150, 250);
		//------------------------------------------//

	},

	create: function () {
		this.preloadBar.cropEnable = false;
	},

	update: function () {
		if(this.cache.isSoundDecoded('song') && this.ready == false) {
            this.ready = true;
            this.bgmusic = this.add.audio('song')
            this.bgmusic.play('', 0, 1, true, true); 
            //--looping not working in chrome--//
            this.bgmusic.onLoop.add(this.playBGMusic, this);
            
            this.state.start('StartMenu');

        }
	},
    playBGMusic: function() {
        this.bgmusic.play('', 0, 1, true);
    }
}