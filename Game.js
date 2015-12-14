console.log("Game.js is running")
worldshift.Game = function(game) {

};

var spriteparts = {
      "head": false,
      "torso": false,
      "arms": false,
      "legs": false
    }

worldshift.Game.prototype = {

	create: function() {
		this.world.setBounds(0, 0, 3750, 3750);

		this.bg = this.add.image(0, 0, 'gamebg');
		//this.layer = this.add.image(0, 0, 'layer1');

		this.physics.startSystem(Phaser.Physics.ARCADE);

		this.buildsprite();

		this.platforms = this.add.group();
		this.groundplatform = this.platforms.create(0, 3694, 'groundplatform');
		this.groundplatform.scale.setTo(47, 1);
		this.physics.enable(this.platforms, Phaser.Physics.ARCADE);
		this.groundplatform.body.immovable = true;

		this.cursors = this.input.keyboard.createCursorKeys();

	},

	buildsprite: function() {
        //----Character---//
        this.sprite = this.add.sprite(0, 3500, 'rrrr');
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
		//-------------------//

		//------------body parts-------//
		this.bodyparts = this.add.group();
		this.head = this.bodyparts.create(300, 3500, 'head');
		this.physics.enable(this.head, Phaser.Physics.ARCADE);
		this.head.body.bounce.y = 0.2;
		this.head.body.gravity.y = 80;

		this.torso = this.bodyparts.create(400, 3500, 'torso');
		this.physics.enable(this.torso, Phaser.Physics.ARCADE);
		this.torso.body.bounce.y = 0.2;
		this.torso.body.gravity.y = 80;

		this.arms = this.bodyparts.create(500, 3500, 'arms');
		this.physics.enable(this.arms, Phaser.Physics.ARCADE);
		this.arms.body.bounce.y = 0.2;
		this.arms.body.gravity.y = 80;

		this.legs = this.bodyparts.create(600, 3500, 'legs');
		this.physics.enable(this.legs, Phaser.Physics.ARCADE);
		this.legs.body.bounce.y = 0.2;
		this.legs.body.gravity.y = 80;
		//-----------------------------//

    },

    checkOverlap: function(spriteA, spriteB) {
    	var boundsA = spriteA.getBounds();
    	var boundsB = spriteB.getBounds();

    	return Phaser.Rectangle.intersects(boundsA, boundsB);
    },

	update: function() {

		this.physics.arcade.collide(this.sprite, this.platforms);
		this.physics.arcade.collide(this.bodyparts, this.platforms);

		if (this.checkOverlap(this.sprite, this.head)&&this.head.alive) {
			console.log("Hit head");
			this.head.kill();
			spriteparts["head"] = true;
			changeBody();
			// this.sprite.loadTexture('crrr');
			// this.sprite.body.setSize(112.5, 150);
		}
		if (this.checkOverlap(this.sprite, this.torso)&&this.torso.alive) {
			console.log("Hit torso");
			this.torso.kill();
			spriteparts["torso"] = true;
			changeBody();
		}
		if (this.checkOverlap(this.sprite, this.arms)&&this.arms.alive) {
			console.log("Hit arms");
			this.arms.kill();
			spriteparts["arms"]= true;
			changeBody();
		}
		if (this.checkOverlap(this.sprite, this.legs)&&this.legs.alive) {
			console.log("Hit legs");
			this.legs.kill();
			spriteparts["legs"] = true;
			changeBody();
		}


		if (this.cursors.right.isDown) {
			this.sprite.animations.play('chompright');
			this.sprite.x+=5;
		}
		else if (this.cursors.left.isDown) {
			this.sprite.animations.play('chompleft');
			this.sprite.x-=5;
		}
		else{
			this.sprite.animations.play('chompstand');
		}

	}

	// render: function() {
	// 	this.debug.spriteInfo(this.sprite, 40, 100);
 //        this.debug.pointer(this.input.activePointer);
	// }
}


function changeBody() {
	if ( spriteparts["head"]) {
		if (spriteparts["torso"]) {

			if (spriteparts["arms"]) {
				if (spriteparts["legs"]) {
					//cccc
				}
				else {
					//cccr
				}
			}
			else {
				if (spriteparts["legs"]) {
					//ccrc
				}
				else {
					//ccrr
				}
			}
		}
		else {
			if (spriteparts["arms"]) {
				if (spriteparts["legs"]) {
					//crcc
				}
				else {
					//crcr
				}
			}
			else {
				if (spriteparts["legs"]) {
					//crrc
				}
				else {
					console.log("crrr");
					//crrr
				}
			}
		}
	}
	else {
		if (spriteparts["torso"]) {

			if (spriteparts["arms"]) {
				if (spriteparts["legs"]) {
					//rccc
				}
				else {
					//rccr
				}
			}
			else {
				if (spriteparts["legs"]) {
					//rcrc
				}
				else {
					//rcrr
				}
			}
		}
		else {
			if (spriteparts["arms"]) {
				if (spriteparts["legs"]) {
					//rrcc
				}
				else {
					//rrcr
				}
			}
			else {
				if (spriteparts["legs"]) {
					//rrrc
				}
				else {
					//rrrr
				}
			}
		}
	}
	// console.log("Hit");
}