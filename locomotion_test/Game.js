console.log("Game.js is running")
worldshift.Game = function(game) {

};

worldshift.Game.prototype = {

	create: function() {

	    this.world.setBounds(0, 0, 1125, 750);

		this.bg = this.add.sprite(0, 0, 'conbg');	// background image
        this.bg.scale.setTo(0.5, 0.5);
		this.physics.startSystem(Phaser.Physics.P2JS);
		this.physics.p2.world.defaultContactMaterial.friction = 0.3;
    	this.physics.p2.world.setGlobalStiffness(1e5);
    	this.physics.p2.gravity.y = 350;

      this.sprites_array = [];
    	this.buildsprites();

		this.cursors = this.input.keyboard.createCursorKeys();
		this.jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	},

	buildsprites: function() {
		  console.log("Entered buildSprites");

      this.sprite = this.add.sprite(0, 0);
	    this.physics.p2.enable(this.sprite, true);
	    this.sprite.body.setCircle(60, 0, 0);
	    this.sprite.body.collideWorldBounds = true;
	    this.sprite.body.kinetic = true;
	    this.sprite.body.fixedRotation  = true;

      this.back_leg = this.sprite.addChild(this.game.make.sprite(0, 10, 'sprite_atlas', 'leg01'));
      this.back_leg.anchor.set(0.5, 0);
      this.back_leg.animations.add('walk', ['leg01', 'leg02', 'leg01', 'leg03'], 5, true);
      this.sprites_array.push(this.back_leg);

      this.back_arm = this.sprite.addChild(this.game.make.sprite(0, -10, 'sprite_atlas', 'arm01'));
      this.back_arm.anchor.set(0.5, 0);
      this.back_arm.scale.x = -1 ;
      this.back_arm.animations.add('walk', ['arm01', 'arm02', 'arm01', 'arm03'], 5, true);
      this.sprites_array.push(this.back_arm);

      this.torso = this.sprite.addChild(this.game.make.sprite(0, 0,'sprite_atlas', 'torso'));
      this.torso.anchor.set(0.5, 0.5);
      this.sprites_array.push(this.torso);

      this.head = this.sprite.addChild(this.game.add.sprite(0, -10, 'sprite_atlas', 'head'));
      this.head.anchor.set(0.5, 1.0);
      this.sprites_array.push(this.head);

      this.front_leg = this.sprite.addChild(this.game.make.sprite(0, 10, 'sprite_atlas', 'leg01'));
      this.front_leg.anchor.set(0.5, 0);
      this.front_leg.animations.add('walk', ['leg01', 'leg02', 'leg01', 'leg03'], 5, true);
      this.sprites_array.push(this.front_leg);

      this.front_arm = this.sprite.addChild(this.game.make.sprite(0, -10, 'sprite_atlas', 'arm01'));
      this.front_arm.anchor.set(0.5, 0);
      this.front_arm.animations.add('walk', ['arm01', 'arm02', 'arm01', 'arm03'], 5, true);
      this.sprites_array.push(this.front_arm);

      // this.sprite.animations.add('stuff');
      // this.sprite.frame = 8;

    	this.camera.follow(this.sprite);

      this.jumping = false; // if the sprite is jumping

    	this.camera.follow(this.sprite);

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
          this.sprite.scale.x = -1;
          for (var i = 0; i < this.sprites_array.length; i++) {
              if (this.sprites_array[i].animations.getAnimation('walk'))
                  this.sprites_array[i].animations.play('walk');
          }
		  }
		  else if (this.cursors.left.isDown) {
		      right = true;
		      this.sprite.body.moveLeft(400);
          this.sprite.scale.x = 1;
		  }
      else{
		      this.sprite.body.velocity.x = 0;
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
	}, 

}
