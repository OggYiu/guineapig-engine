var GameWorld = (function(){
    function GameWorld() {
	this.parent = null;
    };
    GameWorld.prototype.setParent = function(parent) {
	this.parent = parent;
    };
})();
