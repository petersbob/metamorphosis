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

var standing = true;
var left = true;
var right = false;

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

	},

	buildsprites: function() {
		console.log("Entered buildSprites");

		this.addDragonBones();
            //start a run-loop for dragonbones, firing every 20ms
        //this.time.events.loop(20, this.update, this);
        //----Character---//

		//this.sprite.body.clearShapes();
		//this.sprite.body.loadPolygon('physicsdata', 'r');

    	this.camera.follow(this.sprite);

    	this.jumping = false; // if the sprite is jumping

    	this.camera.follow(this.sprite);

    	var platformarr=[];
    	console.log(my_j[0]);
    	for(var i = 0; i < my_j.length; i++) {
    		if (i != 31 && i != 1) {
    			platformarr[i] =this.add.sprite(posx[i], posy[i], my_j[i]);
    			this.physics.p2.enable(platformarr[i], true);
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

		if (this.cursors.right.isDown) {
		    left = true;
		    this.sprite.body.moveRight(400);
		    
		    if(left && this.armature.animation.getLastAnimationName() != "walk") {
			this.sprite.scale.x = -1;
			this.armature.animation.gotoAndPlay("walk", 0);
			left = true
		    }

		}
		else if (this.cursors.left.isDown) {
		    right = true;
		    this.sprite.body.moveLeft(400);
		    
		    if (right && this.armature.animation.getLastAnimationName() != "walk") {
			this.sprite.scale.x = 1;
			this.armature.animation.gotoAndPlay("walk", 0);
			right = true;
		    }

		}
	    else {
		this.sprite.body.velocity.x = 0;
		if (this.armature.animation.getLastAnimationName() != "stand") {
		    this.armature.animation.gotoAndPlay("stand", 0);
		}
	    }

	    var onTheGround = this.checkIfCanJump();

		if (onTheGround) {
			this.jumps = 1;
			this.jumping = false;
		}

/*		if (this.jumps > 0 && this.upInputIsActive(5)) {
		    this.sprite.body.moveUp(400);
		    this.armature.animation.gotoAndPlay("jump", 0);
			this.jumping = true;
		}

	    if (this.jumping && this.upInputIsReleased()) {
		this.armature.animation.gotoAndPlay("fall");
			this.jumps--;
			this.jumping = false;
		}*/

	    dragonBones.animation.WorldClock.clock.advanceTime(0.02);

	},

	render: function() {
		// this.game.debug.body(this.sprite);
	}, 

	addDragonBones: function() {
		console.log("Inside addDragonBones");
	    this.sprite = this.add.sprite(400, 500);
	    this.physics.p2.enable(this.sprite, true);
	    this.sprite.body.setCircle(40, 0, 0);
	    this.sprite.body.collideWorldBounds = true;
	    this.sprite.body.kinetic = true;
	    this.sprite.body.fixedRotation  = true;


	   dragonBones.game = this;
            // hardcoded ids for the dragonBones elements to target
            var armatureName = "Dragon";//PigDragonBones";
            var skeletonId = "Dragon";//piggy";
            var animationId = "walk";//run";
            // fetch the skeletonData from cache
            var skeletonJSON = this.cache.getJSON('dragon');
            // fetch the atlas data from cache
            var atlasJson = this.cache.getJSON('dragon_atlas');
            // make an array listing the names of which images to use from the atlas
            //var partsList = ["arm_front", "head_ninja", "body", "fore_leg", "rear_leg", "rear arm"];
            var partsList = [
                        "armL.png",
                        "armR.png",
                        "armUpperL.png",
                        "armUpperR.png",
                        "beardL.png",
                        "beardR.png",
                        "body.png",
                        "clothes1.png",
                        "eyeL.png",
                        "eyeR.png",
                        "hair.png",
                        "handL.png",
                        "handR.png",
                        "head.png",
                        "legL.png",
                        "legR.png",
                        "tail.png",
                        "tailTip.png"
                        ];
            // fetch the atlas image
            var texture = this.cache.getImage("dragon_image");
            // and the atlas id
            var atlasId = 'atlas1';
            // pass the variables all through to a utility method to generate the dragonBones armature

            var config = {
                armatureName: armatureName,
                skeletonId: skeletonId,
                animationId: animationId,
                atlasId: atlasId,
                partsList: partsList
            };

            this.armature = dragonBones.makeArmaturePhaser(config, skeletonJSON, atlasJson, texture);


            //var armature = dragonBones.makePhaserArmature(armatureName, skeletonId, animationId, skeletonData, atlasJson, texture, partsList, atlasId);
            // get the root display object from the armature
            this.bonesBase = this.armature.getDisplay();
	    this.bonesBase.scale.setTo(0.5, 0.5);
            // position it
            //this.bonesBase.x = 400;
            //this.bonesBase.y = 500;
            // add it to the display list
            //this.world.add(this.bonesBase);
            this.sprite.addChild(this.bonesBase);
	}
}
