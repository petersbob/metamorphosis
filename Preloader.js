console.log("Preloader.js being read");
worldshift.Preloader = function(game) {
    this.ready = false;
};

var my_j = [];

worldshift.Preloader.prototype = {

	preload: function() {

		this.add.image(0, 0, 'preloadbg');

		this.preloadBar = this.add.sprite(0, 500, 'preloaderBar');
		this.preloadBar.anchor.setTo(0, 1);
		this.load.setPreloadSprite(this.preloadBar);

		this.load.audio('song', 'Weirdsong.wav');
		
		this.load.image('startbutton', 'images/startbutton.png');

		var jqxhr = $.getJSON("images/physicsdata.json", function(json) {
		
			for (var key in json) {
				my_j.push(key);
			}
		});

		this.load.image('Ground', 'images/platforms/Ground.png');
		this.load.image('platform5-2', 'images/platforms/Platform5-2.png');

		//-----------backgrounds----------//

		this.load.image('conbg', 'images/backgrounds/withoutbackground.png');
		this.load.image('conbg2', 'images/backgrounds/withgreenbackground.png');
		this.load.image('startmenubg', 'images/backgrounds/startbg.png');

		this.load.image('Platform5-2', 'images/platforms/Platform5-2.png')
		this.load.image('Ground', 'images/platforms/Ground.png')
		this.load.image('Platform1', 'images/platforms/Platform1.png')
		this.load.image('Platform2-1', 'images/platforms/Platform2-1.png')
		this.load.image('Platform2-2', 'images/platforms/Platform2-2.png')
		this.load.image('Platform2-3', 'images/platforms/Platform2-3.png')
		this.load.image('Platform2-4', 'images/platforms/Platform2-4.png')
		this.load.image('Platform2-5', 'images/platforms/Platform2-5.png')
		this.load.image('Platform2', 'images/platforms/Platform2.png')
		this.load.image('Platform3-1', 'images/platforms/Platform3-1.png')
		this.load.image('Platform3-2', 'images/platforms/Platform3-2.png')
		this.load.image('Platform3-3', 'images/platforms/Platform3-3.png')
		this.load.image('Platform3', 'images/platforms/Platform3.png')
		this.load.image('Platform4-1', 'images/platforms/Platform4-1.png')
		this.load.image('Platform4-2', 'images/platforms/Platform4-2.png')
		this.load.image('Platform4-3', 'images/platforms/Platform4-3.png')
		this.load.image('Platform4', 'images/platforms/Platform4.png')
		this.load.image('Platform5-1', 'images/platforms/Platform5-1.png')
		this.load.image('Platform5-3', 'images/platforms/Platform5-3.png')
		this.load.image('Platform5-4', 'images/platforms/Platform5-4.png')
		this.load.image('Platform5-5', 'images/platforms/Platform5-5.png')
		this.load.image('Platform5-6', 'images/platforms/Platform5-6.png')
		this.load.image('Platform6-1', 'images/platforms/Platform6-1.png')
		this.load.image('Platform6-2', 'images/platforms/Platform6-2.png')
		this.load.image('Platform6-3', 'images/platforms/Platform6-3.png')
		this.load.image('Platform6-4', 'images/platforms/Platform6-4.png')
		this.load.image('Platform7-1', 'images/platforms/Platform7-1.png')
		this.load.image('Platform7-2', 'images/platforms/Platform7-2.png')
		this.load.image('Platform7-3', 'images/platforms/Platform7-3.png')
		this.load.image('Platform7-4', 'images/platforms/Platform7-4.png')
		this.load.image('Platform7-5', 'images/platforms/Platform7-5.png')

		// this.load.image('2ndbg', 'images/backgrounds/2ndbg.png');
		// this.load.image('3rdbg', 'images/backgrounds/3rdbg.png');
		// this.load.image('4thbg', 'images/backgrounds/4thbg.png');
		// this.load.image('5thbg', 'images/backgrounds/5thbg.png');

		// this.load.image('layer', 'images/backgrounds/layer1stkill.png');

		//------------------------------------//

		//---------dragon stuff------------------//
		this.load.image('dragon_image', 'dragon_atlas.png');
	 	this.load.json('dragon_atlas', 'dragon_atlas.json');
            // load the texture atlas again so that it's content is registered in the atlas frame cache
        this.load.atlas('atlas1', 'dragon_atlas.png', 'dragon_atlas.json');  
          // the dragonbones skeleton data
        this.load.json('dragon', 'dragon_skeleton.json');  
        //---------------------------------------//

		//this.load.image('platform', 'images/platforms/Platform3-3.png');
		//---body parts----//
		this.load.spritesheet('item', 'images/Items.png', 72, 72);
		//------------------//
		//---------------spritesheets---------------//
		this.load.spritesheet('rrrr', 'images/playersprites/rrrr.png', 112.5, 113);

		//this.load.spritesheet('head', 'images/playersprites/head.png', 866, 96);

		this.load.spritesheet('friend', 'images/playersprites/Friend.png', 150, 250);
		//------------------------------------------//
		//----------------physics------------//
		this.load.physics('physicsdata', 'images/physicsdata.json');
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
