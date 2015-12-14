console.log("Game.js is running")
worldshift.Game = function(game) {

};

var spriteparts = {
      "head": false,
      "torso": false,
      "arms": false,
      "legs": false
    }
var rheadlegs = true; // 10 frames
var rheadclegs = false;	//18 frames
var cheadrlegs = false;	// 11 frames
var cheadclegs = false;	// 19 frames

worldshift.Game.prototype = {

	create: function() {
		this.world.setBounds(0, 0, 3750, 3750);

		this.bg = this.add.image(0, 0, 'gamebg');
		
		this.physics.startSystem(Phaser.Physics.ARCADE);

		this.buildsprites();

		this.platforms = this.add.group();
		this.groundplatform = this.platforms.create(0, 3694, 'groundplatform');
		this.groundplatform.scale.setTo(47, 1);
		this.physics.enable(this.platforms, Phaser.Physics.ARCADE);
		this.groundplatform.body.immovable = true;

		//this.layer = this.add.image(0, 0, 'layer1');

		this.cursors = this.input.keyboard.createCursorKeys();

	},

	buildsprites: function() {
        //----Character---//
        this.sprite = this.add.sprite(0, 3500, 'rrrr');
        this.sprite.anchor.x = 0;
        this.sprite.anchor.y = 1;

        this.sprite.animations.add('chlstand', [ 9, 10, 9, 8], 3, true);
		this.sprite.animations.add('chlleft', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
		this.sprite.animations.add('chlright', [11, 12, 13, 14, 15, 16, 17, 18], 10, true);

		this.sprite.animations.add('rhclstand', [8, 9], 3, true);
		this.sprite.animations.add('rhclleft', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
		this.sprite.animations.add('rhclright', [10, 11, 12, 13, 14, 15, 16, 17], 10, true);

		this.sprite.animations.add('chrlstand', [4, 5, 6, 5], 3, true);
		this.sprite.animations.add('chrlleft', [0, 1, 2, 3], 5, true);
		this.sprite.animations.add('chrlright', [7, 8, 9, 10], 5, true);

		this.sprite.animations.add('rhlstand', [4, 5], 3, true);
		this.sprite.animations.add('rhlleft', [0, 1, 2, 3], 5, true);
		this.sprite.animations.add('rhlright', [6, 7, 8, 9], 5, true);

		this.camera.follow(this.sprite);

		this.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.body.collideWorldBounds = true;
		this.sprite.body.bounce.y = 0.2;
		this.sprite.body.gravity.y = 200;
		//-------------------//

		//------------body parts-------//
		this.bodyparts = this.add.group();
		this.head = this.bodyparts.create(300, 3500, 'head');
		this.physics.enable(this.head, Phaser.Physics.ARCADE);
		this.head.body.bounce.y = 0.2;
		this.head.body.gravity.y = 80;

		this.torso = this.bodyparts.create(500, 3500, 'torso');
		this.physics.enable(this.torso, Phaser.Physics.ARCADE);
		this.torso.body.bounce.y = 0.2;
		this.torso.body.gravity.y = 80;

		this.arms = this.bodyparts.create(700, 3500, 'arms');
		this.physics.enable(this.arms, Phaser.Physics.ARCADE);
		this.arms.body.bounce.y = 0.2;
		this.arms.body.gravity.y = 80;

		this.legs = this.bodyparts.create(1000, 3500, 'legs');
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
			changeBody(this.sprite);
			// this.sprite.loadTexture('crrr');
			// this.sprite.body.setSize(112.5, 150);
		}
		if (this.checkOverlap(this.sprite, this.torso)&&this.torso.alive) {
			console.log("Hit torso");
			this.torso.kill();
			spriteparts["torso"] = true;
			changeBody(this.sprite);
		}
		if (this.checkOverlap(this.sprite, this.arms)&&this.arms.alive) {
			console.log("Hit arms");
			this.arms.kill();
			spriteparts["arms"]= true;
			changeBody(this.sprite);
		}
		if (this.checkOverlap(this.sprite, this.legs)&&this.legs.alive) {
			console.log("Hit legs");
			this.legs.kill();
			spriteparts["legs"] = true;
			changeBody(this.sprite);
		}

		//----------------------movement----------------//
		if (this.cursors.right.isDown) {
			if (this.cursors.up.isDown) {
				this.sprite.frame = 10;
				this.sprite.y-=5;
			}
			else {
				if (rheadlegs) {
				this.sprite.animations.play('rhlright');
				}
				if (rheadclegs) {
					this.sprite.animations.play('rhclright');
				}
				if (cheadrlegs) {
					this.sprite.animations.play('chrlright');
				}
				if (cheadclegs) {
					this.sprite.animations.play('chlright');

				}
				this.sprite.x+=5;
			}
		}
		else if (this.cursors.left.isDown) {
			if (this.cursors.up.isDown) {
				this.sprite.frame = 4;
				this.sprite.y-=5;
			}
			else {
				if (rheadlegs) {
					this.sprite.animations.play('rhlleft');
				}
				if (rheadclegs) {
					this.sprite.animations.play('rhclleft');
				}
				if (cheadrlegs) {
					this.sprite.animations.play('chrlleft');
				}
				if (cheadclegs) {
					this.sprite.animations.play('chlleft');
				}
				this.sprite.x-=5;
			}
		}
		else{
			if (this.cursors.up.isDown) {
				this.sprite.frame = 8;
				this.sprite.y-=5;
			}
			else {
				if (rheadlegs) {
					this.sprite.animations.play('rhlstand');
				}
				if (rheadclegs) {
					this.sprite.animations.play('rhclstand');
				}
				if (cheadrlegs) {
					this.sprite.animations.play('chrlstand');
				}
				if (cheadclegs) {
					this.sprite.animations.play('chlstand');
				}
			}
		}
		//-------------------------------------------------//

	}

	// render: function() {
	// 	this.debug.spriteInfo(this.sprite, 40, 100);
 //        this.debug.pointer(this.input.activePointer);
	// }
}


function changeBody(sprite) {
	if ( spriteparts["head"]) {
		if (spriteparts["torso"]) {

			if (spriteparts["arms"]) {
				if (spriteparts["legs"]) {
					//cccc
					sprite.loadTexture("cccc");
					//sprite.y-=25;
    				sprite.body.setSize(112.73, 154);
    				rheadlegs = false;
					rheadclegs = false;
					cheadrlegs = false;
					cheadclegs = true;
				}
				else {
					//cccr
					sprite.loadTexture("cccr");
					//sprite.y-=25;
    				sprite.body.setSize(110.36, 135);
    				rheadlegs = false;
					rheadclegs = false;
					cheadrlegs = true;
					cheadclegs = false;
				}
			}
			else {
				if (spriteparts["legs"]) {
					//ccrc
					sprite.loadTexture("ccrc");
					//sprite.y-=25;
    				sprite.body.setSize(110.21, 151);
    				rheadlegs = false;
					rheadclegs = false;
					cheadrlegs = false;
					cheadclegs = true;
				}
				else {
					//ccrr
					sprite.loadTexture("ccrr");
					//sprite.y-=25;
    				sprite.body.setSize(110.18, 159);
    				rheadlegs = false;
					rheadclegs = false;
					cheadrlegs = true;
					cheadclegs = false;
				}
			}
		}
		else {
			if (spriteparts["arms"]) {
				if (spriteparts["legs"]) {
					//crcc
					sprite.loadTexture("crcc");
					//sprite.y-=25;
    				sprite.body.setSize(110.21, 144);
    				rheadlegs = false;
					rheadclegs = false;
					cheadrlegs = false;
					cheadclegs = true;
				}
				else {
					//crcr
					sprite.loadTexture("crcr");
					//sprite.y-=25;
    				sprite.body.setSize(110.18, 138);
    				rheadlegs = false;
					rheadclegs = false;
					cheadrlegs = true;
					cheadclegs = false;
				}
			}
			else {
				if (spriteparts["legs"]) {
					//crrc
					sprite.loadTexture("crrc");
					//sprite.y-=25;
    				sprite.body.setSize(110.12, 139);
    				rheadlegs = false;
					rheadclegs = false;
					cheadrlegs = false;
					cheadclegs = true;

				}
				else {
					//crrr
					sprite.loadTexture("crrr");
					//sprite.y-=25;
    				sprite.body.setSize(112.56, 144);
    				rheadlegs = false;
					rheadclegs = false;
					cheadrlegs = true;
					cheadclegs = false;
				}
			}
		}

	}
	else {
		if (spriteparts["torso"]) {

			if (spriteparts["arms"]) {
				if (spriteparts["legs"]) {
					//rccc
					sprite.loadTexture("rccc");
					//sprite.y-=25;
    				sprite.body.setSize(112.56, 108);
    				rheadlegs = false;
					rheadclegs = true;
					cheadrlegs = false;
					cheadclegs = false;
				}
				else {
					//rccr
					sprite.loadTexture("rccr");
					//sprite.y-=25;
    				sprite.body.setSize(110.19, 136);
    				rheadlegs = true;
					rheadclegs = false;
					cheadrlegs = false;
					cheadclegs = false;
				}
			}
			else {
				if (spriteparts["legs"]) {
					//rcrc
					sprite.loadTexture("rcrc");
					//sprite.y-=25;
    				sprite.body.setSize(118.00, 125);
    				rheadlegs = false;
					rheadclegs = true;
					cheadrlegs = false;
					cheadclegs = false;
				}
				else {
					//rcrr
					sprite.loadTexture("rcrr");
					//sprite.y-=25;
    				sprite.body.setSize(96.50, 110);
    				rheadlegs = true;
					rheadclegs = false;
					cheadrlegs = false;
					cheadclegs = false;
				}
			}
		}
		else {
			if (spriteparts["arms"]) {
				if (spriteparts["legs"]) {
					//rrcc
					sprite.loadTexture("rrcc");
					//sprite.y-=25;
    				sprite.body.setSize(110.1666, 138);
    				rheadlegs = true;
					rheadclegs = false;
					cheadrlegs = false;
					cheadclegs = false;
				}
				else {
					//rrcr
					sprite.loadTexture("rrcr");
					//sprite.y-=25;
    				sprite.body.setSize(110.17, 138);
    				rheadlegs = false;
					rheadclegs = true;
					cheadrlegs = false;
					cheadclegs = false;
				}
			}
			else {
				if (spriteparts["legs"]) {
					//rrrc
					sprite.loadTexture("rrrc");
					//sprite.y-=25;
    				sprite.body.setSize(110.17, 138);
    				rheadlegs = false;
					rheadclegs = true;
					cheadrlegs = false;
					cheadclegs = false;
				}
				else {
					//rrrr
					sprite.loadTexture("rrrr");
					//sprite.y-=25;
    				sprite.body.setSize(112.5, 113);
    				rheadlegs = true;
					rheadclegs = false;
					cheadrlegs = false;
					cheadclegs = false;
				}
			}
		}
	}
}