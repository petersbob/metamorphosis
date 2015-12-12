console.log("Game.js is running")
worldshift.Game = function(game) {

};

worldshift.Game.prototype = {

	create: function() {
		this.bg = this.add.image(0, 0, 'gamebg');

		this.physics.startSystem(Phaser.Physics.ARCADE);

		this.sprite = this.add.sprite(0, this.world.centerY, 'sprite');
		this.sprite.animations.add('right', [6, 7, 8, 7], 10, true);
		this.sprite.animations.add('left', [3, 4, 5, 4], 10, true);

		this.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.body.collideWorldBounds = true;
		this.sprite.body.bounce.y = 0.2;
		this.sprite.body.gravity.y = 800;


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
		else {
			this.sprite.animations.stop();
			this.sprite.frame = 1;
		}

	},

	render: function() {

	}
}