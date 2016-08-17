console.log("Game.js is running")
worldshift.Game = function(game) {

};

var part = ["torso", "back_arm", "front_arm", "back_leg", "front_leg", "head"];

var left = true;
var right = false;

var posx = [700, 0, 3630, 3000, 3425, 3190, 3390, 00, 00, 2305, 1570, 1775, 3060, 1290, 985, 645, 2690, 220, 155, 745, 1165, 900, 460, 1765, 3385, 3440, 2735, 3220, 2450, 3395, 3135]
var posy = [1605, 0, 1815, 2885, 2735, 3015, 3265, 00, 00, 2860, 3385, 3600, 2250, 3305, 2980, 2690, 2595,1210, 2060, 2395, 2155, 1950, 415, 785, 975, 700, 1175, 1455, 1920, 1520, 1960]


worldshift.Game.prototype = {

    create: function() {

	this.world.setBounds(0, 0, 1875, 1875);

	this.bg = this.add.sprite(0, 0, 'conbg');	// background image
        this.bg.scale.setTo(0.5, 0.5);
	this.physics.startSystem(Phaser.Physics.P2JS);
	this.physics.p2.world.defaultContactMaterial.friction = 0.3;
    	this.physics.p2.world.setGlobalStiffness(1e5);
    	this.physics.p2.gravity.y = 350;

    	this.buildsprites();

    	this.playerMaterial = this.physics.p2.createMaterial('playerMaterial', this.player.body);
    	this.worldMaterial = this.physics.p2.createMaterial('worldMaterial');
    	this.boxMaterial = this.physics.p2.createMaterial('worldMaterial');
	this.groundPlayerCM1 = this.physics.p2.createContactMaterial(this.playerMaterial, this.boxMaterial, { friction: 0.0 });

	this.groundplatform = this.add.sprite(0, 3730, 'Ground');
	this.physics.p2.enable(this.groundplatform, true);
	this.groundplatform.body.clearShapes();
	this.groundplatform.body.loadPolygon('physicsdata', 'Ground');
	this.groundplatform.body.static = true;
	this.groundplatform.body.setMaterial(this.boxMaterial);

	this.groundPlayerCM = this.physics.p2.createContactMaterial(this.playerMaterial, this.worldMaterial, { friction: 0.0 });
    	this.groundBoxesCM = this.physics.p2.createContactMaterial(this.worldMaterial, this.boxMaterial, { friction: 0.6 });

	this.cursors = this.input.keyboard.createCursorKeys();
	this.jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    },

    buildsprites: function() {

	this.buildPlayer();

    	this.camera.follow(this.player);

    	this.jumping = false; // if the player is jumping

       	var platformarr=[];
    	console.log(my_j[0]);
    	for(var i = 0; i < my_j.length; i++) {
    	    if (i != 31 && i != 1) {
    		platformarr[i] =this.add.sprite(posx[i], posy[i], my_j[i]);
    		this.physics.p2.enable(platformarr[i], true);
		platformarr[i].body.clearShapes();
		platformarr[i].body.loadPolygon('physicsdata', my_j[i]);
		platformarr[i].body.static = true;
                platformarr[i].scale.setTo(0.5, 0.5);
    	    }
    	}

    	this.plat5_2 = this.add.sprite(400, 3500, 'platform5-2');
        this.plat5_2.scale.setTo(0.5, 0.5);
	this.physics.p2.enable(this.plat5_2, true);
	this.plat5_2.body.clearShapes();
	this.plat5_2.body.loadPolygon('physicsdata', 'Platform5-2');
	this.plat5_2.body.static = true;
	//-------------------//

    },

    buildPlayer: function() {
	this.player = this.add.sprite(800, 200, 'torso');
	this.physics.p2.enable(this.player, true);
	this.player.body.fixedRotation = true;

	this.back_arm = this.player.addChild(this.add.sprite(-11, 0, 'back_arm'));
	
	this.back_leg = this.player.addChild(this.add.sprite(-20, 15, 'back_leg'));
	
	this.head = this.player.addChild(this.add.sprite(-50, -100, 'head'));
	this.head.animations.add('walk', [0], 10, true);
	this.head.animations.add('stand', [1, 2, 3], 10, true);

	this.front_leg = this.player.addChild(this.add.sprite(-20, 15, 'front_leg'));
	
	this.front_arm = this.player.addChild(this.add.sprite(-11, 0, 'front_arm'));

    },

    checkIfCanJump: function() {

	var result = false;
	var yAxis = p2.vec2.fromValues(0, 1);

	for (var i=0; i < this.physics.p2.world.narrowphase.contactEquations.length; i++) {
            var c = this.physics.p2.world.narrowphase.contactEquations[i];

            if (c.bodyA === this.player.body.data || c.bodyB === this.player.body.data){
		var d = p2.vec2.dot(c.normalA, yAxis);
		if (c.bodyA === this.player.body.data){
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
	    this.player.body.moveRight(200);
	    
	    if(left) {
		this.player.scale.x = -1;
		left = true;
	    }
	    this.head.animations.play("walk");

	}
	else if (this.cursors.left.isDown) {
	    right = true;
	    this.player.body.moveLeft(200);
	    
	    if (right) {
		this.player.scale.x = 1;
		right = true;
	    }
    	    this.head.animations.play("walk");

	}
	else {
	    this.player.body.velocity.x = 0;
	    this.head.animations.play('stand');
	}

	var onTheGround = this.checkIfCanJump();

	if (onTheGround) {
	    this.jumps = 1;
	    this.jumping = false;
	}

	if (this.jumps > 0 && this.upInputIsActive(5)) {
	    this.player.body.moveUp(400);
	    this.jumping = true;
	}

	if (this.jumping && this.upInputIsReleased()) {
	    this.jumps--;
	    this.jumping = false;
	}
	
    },

    render: function() {
	// this.game.debug.body(this.player);
    }
}
