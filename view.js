var View = (function(){
    function View() {
	this.entities = [];
	this.entityAry = [];
	this.container = new PIXI.DisplayObjectContainer();
    }
    View.prototype.addChild = function(entity) {
	this.entities[entity.id] = entity;
	this.entityAry.push(entity);

	if (entity.view != null && this.container != null) {
	    this.container.addChild(entity.view);
	}
    };
    View.prototype.setStage = function(stage) {
	assert(stage != null, "invalid stage");
	if (this.stage != null) {
	    this.stage.removeChild(this.container);
	}
	this.stage = stage;
	this.stage.addChild(this.container);
    };
    View.prototype.dispose = function() {
	if(this.container != null && this.stage != null) {
	    this.stage.removeChild(this.container);
	}
    };
    View.prototype.update = function(dt) {
	for (var i = 0; i < this.entityAry.length; ++i ) {
	    this.entityAry[i].update(dt);
	}
    };
    return View;
})();
