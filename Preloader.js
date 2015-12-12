console.log("Preloader.js being read");
worldshift.Preloader = function(game) {
	this.ready = false;
};

worldshift.Preloader.prototype = {

	preload: function() {


	},

	create: function () {
		this.preloadBar.cropEnable = false;
	},

	update: function () {
		if(this.cache.isSoundDecoded('journey') && this.ready == false) {
            this.ready = true;
            this.bgmusic = this.add.audio('journey')
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