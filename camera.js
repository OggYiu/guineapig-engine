var Camera = (function(){
    function Camera(view) {
	this.view = view;
	this.follower = null;
	this.position = new Vector2();
	this._dirty = false;
    }
    Camera.prototype.setFollower = function(target) {
	this.follower = target;
    };
    Camera.prototype._redraw = function() {
	this._dirty = true;
    };
    Camera.prototype.update = function(dt) {
	if (this.follower != null) {
	    this.x = this.follower.x;
	    this.y = this.follower.y;
	}
	
	if (this._dirty) {
//	    this.view.x = -this.x - Global.renderer.view.width / 2;
//	    this.view.y = -this.y - Global.renderer.view.height / 2;
	    this.view.x = -this.x + Global.renderer.view.width/2;
	    this.view.y = -this.y + Global.renderer.view.height/2;	    
	    this._dirty = false;
	}
    };
    Object.defineProperty(Camera.prototype, "x", {
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
    Object.defineProperty(Camera.prototype, "y", {
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
    return Camera;
})();
