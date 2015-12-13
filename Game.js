console.log("Game.js is running")
worldshift.Game = function(game) {

};

var spriteparts = {
      "head": false,
      "body": false,
      "arms": false,
      "legs": true
    }

worldshift.Game.prototype = {

	create: function() {
		this.world.setBounds(0, 0, 5000, 5000);

		this.bg = this.add.image(0, 0, 'gamebg');

		this.physics.startSystem(Phaser.Physics.ARCADE);

		this.sprite = this.add.sprite(0, this.world.centerY, 'chomp');
		// this.sprite.loadTexture('robot');
		this.buildsprite();

		this.cursors = this.input.keyboard.createCursorKeys();


	},

	buildsprite: function() {
        
        this.sprite.animations.add('chompstand', [ 9, 10, 9, 8], 3, true);
		this.sprite.animations.add('chompleft', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
		this.sprite.animations.add('chompright', [11, 12, 13, 14, 15, 16, 17, 18], 10, true);

		this.sprite.animations.add('robotstand', [4, 5], 3, true);
		this.sprite.animations.add('robotleft', [0, 1, 2, 3], 5, true);
		this.sprite.animations.add('robotright', [6, 7, 8, 9], 5, true);

		this.camera.follow(this.sprite);

		this.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.body.collideWorldBounds = true;
		this.sprite.body.bounce.y = 0.2;
		this.sprite.body.gravity.y = 80;

    },

	update: function() {

		if (spriteparts["legs"]) {
			if (this.cursors.right.isDown) {
				this.sprite.animations.play('chompright');
				this.sprite.x+=2;
			}
			else if (this.cursors.left.isDown) {
				this.sprite.animations.play('chompleft');
				this.sprite.x-=2;
			}
			else{
				this.sprite.animations.play('chompstand');
			}
		}
		else {
			if (this.cursors.right.isDown) {
				this.sprite.animations.play('robotright');
				this.sprite.x+=2;
			}
			else if (this.cursors.left.isDown) {
				this.sprite.animations.play('robotleft');
				this.sprite.x-=2;
			}
			else {
				this.sprite.animations.play('robotstand');
			}
		}

	}

	// render: function() {
	// 	this.debug.spriteInfo(this.sprite, 40, 100);
 //        this.debug.pointer(this.input.activePointer);
	// }
}