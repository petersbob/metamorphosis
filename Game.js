console.log("Game.js is running")
worldshift.Game = function(game) {

};

var stage = 1;
var friendwalk = false;

var posx = [249, 998, 1326, 1773, 3120, 3107,3124, 104, 443, 1750, 97, 514, 620, 679, 768, 906, 612, 814, 1136, 1255, 1672, 2014, 2551, 2868, 3149, 3563, 3288, 2835, 3132, 3295, 3493, 3224, 34991]
var posy = [318, 639, 758, 895, 933, 1279, 1226, 1176, 1611, 1531, 2266, 2486, 2372, 2326, 2273, 2153, 2631, 2965, 3266, 3410, 3600, 2842, 2598, 1959, 2155, 2377, 2733, 2892, 3023, 3244, 3497, 1584, 3501]
var rscale = [4, 2, 2, 7, 5, 1, 2, 4, 5, 4, 3, 1, 1, 1, 2, 3, 4, 3, 5, 4, 4, 5, 5, 8, 3, 4, 2, 6, 2, 7, 4]

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

		//this.add.sprite(0, 0, 'conbg');	// background image
		this.physics.startSystem(Phaser.Physics.P2JS);
		this.physics.p2.world.defaultContactMaterial.friction = 0.3;
    	this.physics.p2.world.setGlobalStiffness(1e5);
    	this.physics.p2.gravity.y = 350;

    	this.buildsprites();

    	this.spriteMaterial = this.physics.p2.createMaterial('spriteMaterial', this.sprite.body);
    	this.worldMaterial = this.physics.p2.createMaterial('worldMaterial');
    	this.boxMaterial = this.physics.p2.createMaterial('worldMaterial');
		this.groundPlayerCM1 = this.physics.p2.createContactMaterial(this.spriteMaterial, this.boxMaterial, { friction: 0.0 });

		this.groundplatform = this.add.sprite(0, 3730, 'Ground');
		this.physics.p2.enable(this.groundplatform, true);
		this.groundplatform.body.clearShapes();
		this.groundplatform.body.loadPolygon('physicsdata', 'Ground');
		this.groundplatform.body.static = true;
		this.groundplatform.body.setMaterial(this.boxMaterial);

		// for (var i = 0; i < 31; i++) {
		// 	this.rock = this.add.sprite(posx[i], posy[i], 'groundplatform');
		// 	this.rock.scale.setTo(rscale[i]);
		// 	this.physics.p2.enable(this.rock);
		// 	this.rock.body.static = true;
		// 	this.rock.body.setMaterial(this.boxMaterial);
		// }

		this.groundPlayerCM = this.physics.p2.createContactMaterial(this.spriteMaterial, this.worldMaterial, { friction: 0.0 });
    	this.groundBoxesCM = this.physics.p2.createContactMaterial(this.worldMaterial, this.boxMaterial, { friction: 0.6 });

		this.cursors = this.input.keyboard.createCursorKeys();

		this.input.keyboard.addKeyCapture([
			Phaser.Keyboard.LEFT,
			Phaser.Keyboard.RIGHT,
			Phaser.Keyboard.UP,
			Phaser.Keyboard.DOWN
			]);

	},

	buildsprites: function() {
        //----Character---//
        this.sprite = this.add.sprite(400, 3000, 'r');

		this.physics.p2.enable(this.sprite, false);
		// this.sprite.body.clearShapes();
		// this.sprite.body.loadPolygon('physicsdata', 'r');
		this.sprite.body.setCircle(45);

		this.sprite.body.fixedRotation = true;
    	this.sprite.body.damping = 0.5;

    	//this.camera.follow(this.sprite);

    	console.log(my_j[0]);
    	for(var i = 0; i < my_j.length; i++) {
    		if (i != 31 && i != 1) {
    			this.platform = this.add.sprite(400, i*100+200, my_j[i]);
    			this.physics.p2.enable(this.platform, false);
				this.platform.body.clearShapes();
				this.platform.body.loadPolygon('physicsdata', my_j[i]);
				this.platform.body.static = true;
    		}
    	}

    	this.plat5_2 = this.add.sprite(400, 3500, 'platform5-2');
		this.physics.p2.enable(this.plat5_2, true);
		this.plat5_2.body.clearShapes();
		this.plat5_2.body.loadPolygon('physicsdata', 'Platform5-2');
		this.plat5_2.body.static = true;

		this.camera.follow(this.sprite);
		//-------------------//

    },

    checkOverlap: function(spriteA, spriteB) {
    	var boundsA = spriteA.getBounds();
    	var boundsB = spriteB.getBounds();

    	return Phaser.Rectangle.intersects(boundsA, boundsB);
    },

    upInputIsActive: function(duration) {
    	var isActive = false;
    	isActive = this.input.keyboard.downDuration(Phaser.Keyboard.UP, duration);
    	return isActive;
    },

	update: function() {

		// this.head.animations.play('glow');
		// this.torso.animations.play('glow');
		// this.arms.animations.play('glow');
		// this.legs.animations.play('glow');

		if (this.cursors.right.isDown) {

			this.sprite.body.moveRight(200);
			//this.plat5_2.body.x+= 5;

		}
		else if (this.cursors.left.isDown) {

			this.sprite.body.moveLeft(200);
			//this.plat5_2.body.x-= 5;

		}
		else{
			this.sprite.body.velocity.x = 0;

		}

		if (this.cursors.up.isDown) {
			this.sprite.body.moveUp(300);
			//this.plat5_2.body.y-= 5;
		}
	},

	render: function() {
		this.game.debug.body(this.sprite);
	}
}

// 


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