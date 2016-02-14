console.log("Preloader.js being read.")
unnamed.Preloader = function(game) { 
		
};

unnamed.Preloader.prototype = {

	preload: function() {


	},

	create: function() {

	},

	update: function () {
		// if(this.cache.isSoundDecoded('journey') && this.ready == false) {
  //           this.ready = true;
  //           this.bgmusic = this.add.audio('journey')
  //           this.bgmusic.play('', 0, 1, true, true); 
  //           //--looping not working in chrome--//
  //           this.bgmusic.onLoop.add(this.playBGMusic, this);
            
  //           this.state.start('StartMenu');

        }
	},

	playBGMusic: function() {
		this.bgmusic.play('', 0, 1, true);
	}
}