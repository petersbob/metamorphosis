console.log("Game.js is running")
worldshift.Game = function(game) {

};

Bodypart = function(game, x, y, part, a_x, a_y, animation_array) {
    var new_bodypart = game.sprite.addChild(game.game.make.sprite(x, y, 'sprite_atlas', part));
    new_bodypart.anchor.set(a_x, a_y);
    new_bodypart.animations.add('walk', animation_array[0], 5, true);
    new_bodypart.animations.add('stand', animation_array[1], 5, true);
    game.sprites_array.push(new_bodypart);
    return new_bodypart;
};

Bodypart.prototype = Object.create(Phaser.Sprite.prototype);
Bodypart.prototype.constructor = Bodypart;

worldshift.Game.prototype = {

	  create: function() {

        this.right_gravity = false;

	    this.world.setBounds(0, 0, 1125, 750);

		this.bg = this.add.sprite(0, 0, 'conbg');	// background image
        this.bg.scale.setTo(0.5, 0.5);
		  this.physics.startSystem(Phaser.Physics.P2JS);

    this.physics.p2.setImpactEvents(true);

    this.physics.p2.restitution = 0.4;

    //  Create our collision groups. One for the player, one for the pandas
    this.playerCollisionGroup = this.physics.p2.createCollisionGroup();
      this.itemCollisionGroup = this.physics.p2.createCollisionGroup();

      this.physics.p2.updateBoundsCollisionGroup();

    	this.physics.p2.gravity.y = 450;

      this.sprites_array = [];
    	this.buildsprites();

		this.cursors = this.input.keyboard.createCursorKeys();
		this.jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	},

	buildsprites: function() {
		  console.log("Entered buildSprites");

      // the full sprite. will need to move this to an outside function

      this.sprite = this.add.sprite(0, 0);
	    this.physics.p2.enable(this.sprite, true);

	    this.sprite.body.setCircle(50, 0, 0);
//	    this.sprite.body.kinetic = true;
	    this.sprite.body.fixedRotation  = true;

      this.sprite.body.setCollisionGroup(this.playerCollisionGroup);
      this.sprite.body.collides(this.itemCollisionGroup, this.hitItem, this);

      this.back_leg = new Bodypart(this, 0, 10,'leg01', 0.5, 0, [['leg01', 'leg03', 'leg01', 'leg02'], ['leg01'] ]);

      this.back_arm = new Bodypart(this, 0, -10, 'arm01', 0.5, 0, [ ['arm01', 'arm03', 'arm01', 'arm02'], ['arm01']]);

      this.torso = new Bodypart(this, 0, 0, 'torso', 0.5, 0.5, [['torso'],['torso']]);

      this.head = new Bodypart(this, 0, -10, 'head', 0.5, 1.0,[['head'],['head']]);

      this.front_leg = new Bodypart(this, 0, 10,'leg01', 0.5, 0, [['leg01', 'leg02', 'leg01', 'leg03'], ['leg01'] ]);

      this.front_arm = new Bodypart(this, 0, -10, 'arm01', 0.5, 0, [ ['arm01', 'arm02', 'arm01', 'arm03'], ['arm01']]);

    	this.camera.follow(this.sprite);

      this.jumping = false; // if the sprite is jumping

    	this.camera.follow(this.sprite);
      // item
      this.item = this.game.add.sprite(600, 20, 'sprite_atlas', 'item01');
      this.item.animations.add('glow', ['item01', 'item02', 'item03', 'item02'], 5, true);
      this.physics.p2.enable(this.item, false);
      this.item.body.setCircle(35, 0, 0);

      this.item.body.setCollisionGroup(this.itemCollisionGroup);
      this.item.body.collides(this.playerCollisionGroup);


		//-------------------//

  },

    hitItem: function(body1, body2) {
        console.log('hit');
        this.back_leg.animations.add('walk', ['robot_leg01', 'robot_leg03', 'robot_leg01', 'robot_leg02'], 5, true);
        this.back_leg.animations.add('stand', ['robot_leg01'], 5, true);
        this.front_leg.animations.add('walk', ['robot_leg01', 'robot_leg02', 'robot_leg01', 'robot_leg03'], 5, true);
        this.front_leg.animations.add('stand', ['robot_leg01'], 5, true);
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
          if (this.right_gravity) {
		          this.sprite.body.moveRight(400);
          }
          else {
              this.sprite.body.moveRight(400);
          }
          this.sprite.scale.x = -1;
          for (var i = 0; i < this.sprites_array.length; i++) {
              if (this.sprites_array[i].animations.getAnimation('walk'))
                  this.sprites_array[i].animations.play('walk');
          }
		  }
		  else if (this.cursors.left.isDown) {
		      right = true;
          if (this.right_gravity) {
		          this.sprite.body.moveLeft(400);
          }
          else {
              this.sprite.body.moveLeft(400);
          }
          this.sprite.scale.x = 1;
          for (var i = 0; i < this.sprites_array.length; i++) {
              if (this.sprites_array[i].animations.getAnimation('walk'))
                  this.sprites_array[i].animations.play('walk');
          }
		  }
      else{
          if (this.right_gravity) {
              this.sprite.body.velocity.y = 0;
          }
          else {
		          this.sprite.body.velocity.x = 0;
          }
          for (var i = 0; i < this.sprites_array.length; i++) {
              if (this.sprites_array[i].animations.getAnimation('stand'))
                  this.sprites_array[i].animations.play('stand');
          }

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
      this.item.animations.play('glow');

	},

	render: function() {
		  // this.game.debug.body(this.sprite);
	}, 

}
