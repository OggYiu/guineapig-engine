var Entity = (function(){
    function Entity() {
	this.id = ++Entity.nextId;

	this.position = [];
	this.position.x = 0;
	this.position.y = 0;

	this.velocity = new Vector2();

	this.animations = [];

	this.parent = null;
	this.view = null;
	this._dirty = false;

	this.view = new PIXI.DisplayObjectContainer();
    }
    Entity.prototype.dispose = function() {
	if (this.parent != null) {
	    this.parent.removeChild(this.view);
	}
    };
    Entity.prototype.update = function(dt) {
	if (this.velocity.x != 0) {
	    this.x += this.velocity.x * dt;
	}
	if (this.velocity.y != 0) {
	    this.y += this.velocity.y * dt;	
	}
	if(this._dirty == true) {
	    if(this.view != null) {
		this.view.position.x = this.position.x;
		this.view.position.y = this.position.y;
	    }
	    this._dirty = false;
	}
    };
    Entity.prototype.addAnimation = function(name, frames) {
	var movieclip = new PIXI.MovieClip(frames);
	movieclip.anchor.x = 0.5;
	movieclip.anchor.y = 0.5;
	this.animations[name] = movieclip;
	this.animations[name].visible = false;
	this.animations[name].animationSpeed = 0.1;
	this.view.addChild(this.animations[name]);
    };
    Entity.prototype.playAnimation = function(name) {
	assert(this.animations[name] != null);
	this.animations[name].visible = true;
	this.animations[name].play();
    };
    Entity.prototype.setParent = function(parent){
	assert(this.parent != null, "invalid parent!");
	assert(this.parent != parent, "you dont set the same parent twice");
	this.parent = parent;
	if (this.view != null) {
	    this.parent.addChild(this.view);
	}
    };
    //    Entity.prototype.setView = function(view) {
    //	this.view = view;
    //    };
    Entity.prototype._redraw = function() {
	this._dirty = true;
    };
    Entity.prototype._detact = function() {
	if (this.parent != null && this.view != null) {
	    this.parent.removeChild(this.view);
	    this.parent = null;
	}
    };
    Object.defineProperty(Entity.prototype, "x", {
	get: function () {
	    return this.position.x;
	},
	set: function (v) {
	    this.position.x = v;
	    this._redraw();
	},
	enumerable: true,
	configurable: true
    });
    Object.defineProperty(Entity.prototype, "y", {
	get: function () {
	    return this.position.y;
	},
	set: function (v) {
	    this.position.y = v;
	    this._redraw();
	},
	enumerable: true,
	configurable: true
    });
    Object.defineProperty(Entity.prototype, "scale", {
	get: function () {
	    return this.view.scale;
	},
	enumerable: true,
	configurable: true
    });

    Entity.nextId = 0;
    return Entity;
})();
