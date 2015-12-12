console.log("Game.js is running")
worldshift.Game = function(game) {

};

worldshift.Game.prototype = {

	create: function() {
		this.world.setBounds(0, 0, 5000, 5000);

		this.bg = this.add.image(0, 0, 'gamebg');

		this.physics.startSystem(Phaser.Physics.ARCADE);

		this.sprite = this.add.sprite(0, this.world.centerY, 'sprite');
		this.sprite.animations.add('stand', [ 9, 10, 9, 8], 3, true);
		this.sprite.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
		this.sprite.animations.add('right', [11, 12, 13, 14, 15, 16, 17, 18], 10, true);

		this.camera.follow(this.sprite);



		//this.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		// this.sprite.body.collideWorldBounds = true;
		// this.sprite.body.bounce.y = 0.2;
		// this.sprite.body.gravity.y = 800;


	},

	update: function() {

		if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
			this.sprite.animations.play('right');
			this.sprite.x+=2;
		}
		else if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
			this.sprite.animations.play('left');
			this.sprite.x-=2;
		}
		// else if (this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
		// 	this.world.angle++;
		// }
		else {
			this.sprite.animations.play('stand');
		}

	}

	// render: function() {
	// 	this.debug.spriteInfo(this.sprite, 40, 100);
 //        this.debug.pointer(this.input.activePointer);
	// }
}