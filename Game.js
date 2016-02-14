console.log("Game.js is running")
worldshift.Game = function(game) {

};

var stage = 1;
var friendwalk = false;

var posx = [700, 0, 3630, 3000, 3425, 3190, 3390, 00, 00, 2305, 1570, 1775, 3060, 1290, 985, 645, 2690, 220, 155, 745, 1165, 900, 460, 1765, 3385, 3440, 2735, 3220, 2450, 3395, 3135]
var posy = [1605, 0, 1815, 2885, 2735, 3015, 3265, 00, 00, 2860, 3385, 3600, 2250, 3305, 2980, 2690, 2595,1210, 2060, 2395, 2155, 1950, 415, 785, 975, 700, 1175, 1455, 1920, 1520, 1960]

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

		this.add.sprite(0, 0, 'conbg');	// background image
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

		this.groundPlayerCM = this.physics.p2.createContactMaterial(this.spriteMaterial, this.worldMaterial, { friction: 0.0 });
    	this.groundBoxesCM = this.physics.p2.createContactMaterial(this.worldMaterial, this.boxMaterial, { friction: 0.6 });

		this.cursors = this.input.keyboard.createCursorKeys();
		this.jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		this.input.keyboard.addKeyCapture([
			Phaser.Keyboard.LEFT,
			Phaser.Keyboard.RIGHT,
			Phaser.Keyboard.UP,
			Phaser.Keyboard.DOWN
			]);

	},

	buildsprites: function() {
        //----Character---//
        this.sprite = this.add.sprite(400, 3000, 'rrrr');

		this.physics.p2.enable(this.sprite, true);
		//this.sprite.body.clearShapes();
		//this.sprite.body.loadPolygon('physicsdata', 'r');
		this.sprite.body.setCircle(30);

		this.sprite.body.fixedRotation = true;

    	this.sprite.animations.add('rstand', [6, 7], 5, true);
		this.sprite.animations.add('cstand', [1, 2, 3], 3, true);
    	this.camera.follow(this.sprite);

    	this.head = this.add.sprite(400, 3000, 'head');
    	this.head.animations.add('rhlstand', [4, 5], 3, true);
		this.head.animations.add('rhlleft', [0, 1, 2, 3], 5, true);
		this.head.animations.add('rhlright', [6, 7, 8, 9], 5, true);

    	this.jumping = false; // if the sprite is jumping

    	this.head = this.add.sprite(400, 3000, 'head');

    	this.head.animations.add('rstand', [6, 7], 5, true);
		this.head.animations.add('cstand', [1, 2, 3], 5, true);

    	this.camera.follow(this.sprite);

    	var platformarr=[];
    	console.log(my_j[0]);
    	for(var i = 0; i < my_j.length; i++) {
    		if (i != 31 && i != 1) {
    			platformarr[i] =this.add.sprite(posx[i], posy[i], my_j[i]);
    			this.physics.p2.enable(platformarr[i], false);
				platformarr[i].body.clearShapes();
				platformarr[i].body.loadPolygon('physicsdata', my_j[i]);
				platformarr[i].body.static = true;
    		}
    	}

    	this.plat5_2 = this.add.sprite(400, 3500, 'platform5-2');
		this.physics.p2.enable(this.plat5_2, true);
		this.plat5_2.body.clearShapes();
		this.plat5_2.body.loadPolygon('physicsdata', 'Platform5-2');
		this.plat5_2.body.static = true;
		//-------------------//

    },

    checkIfCanJump: function() {

    var result = false;
    var yAxis = p2.vec2.fromValues(0, 1);

    for (var i=0; i < this.physics.p2.world.narrowphase.contactEquations.length; i++) {
        var c = this.physics.p2.world.narrowphase.contactEquations[i];

        if (c.bodyA === this.sprite.body.data || c.bodyB === this.sprite.body.data){
            var d = p2.vec2.dot(c.normalA, yAxis);
            if (c.bodyA === this.sprite.body.data){
                d *= -1;
            }
            if (d > 0.5){
                result = true;
            }
        }
    }
    return result;
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

    upInputIsReleased: function() {
    	var released = false;
    	released = this.input.keyboard.upDuration(Phaser.Keyboard.UP);
    	return released;
    },

	update: function() {
		this.head.position.set(this.sprite.position.x-60, this.sprite.position.y-70);

		// this.head.animations.play('glow');
		// this.torso.animations.play('glow');
		// this.arms.animations.play('glow');
		// this.legs.animations.play('glow');

		if (this.cursors.right.isDown) {

			this.sprite.body.moveRight(400);
			this.sprite.animations.play('rhlright');
			this.head.frame = 8;

			debugplat.body.x+= 5;

		}
		else if (this.cursors.left.isDown) {
			
			this.sprite.body.moveLeft(400);
			this.sprite.animations.play('rhlleft');

			this.head.frame = 4;
			debugplat.body.x-= 5;

		}
		else{
			this.sprite.body.velocity.x = 0;
			this.sprite.animations.play('rhlstand');
			this.head.animations.play('rstand');

		}

		var onTheGround = this.checkIfCanJump();

		if (onTheGround) {
			this.jumps = 1;
			this.jumping = false;
		}

		if (this.jumps > 0 && this.upInputIsActive(5)) {
			this.sprite.body.moveUp(400);
			this.jumping = true;
		}

		if (this.jumping && this.upInputIsReleased()) {
			this.jumps--;
			this.jumping = false;
		}

	},

	render: function() {
		// this.game.debug.body(this.sprite);
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
