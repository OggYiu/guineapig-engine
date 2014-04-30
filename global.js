var Global = (function(){
    function Global() {
	assert(Global._canInit, "you cannot init the instance by yourself");
	this.stage = null;
	this.renderer = null;
    }
    Global._canInit = false;
    Global._instance = null;
    Global.getInstance = function() {
	if (Global._instance == null) {
	    Global._canInit = true;
	    Global._instance = new Global();
	    Global._canInit = false;
	}
	return Global._instance;
    };
    Object.defineProperty(Global, "stage", {
	get: function() {
	    return Global.getInstance().stage;
	},
	set: function(v) {
	    Global.getInstance().stage = v;
	},
	enumerable: true,
	configurable: true
    });
    Object.defineProperty(Global, "renderer", {
	get: function() {
	    return Global.getInstance().renderer;
	},
	set: function(v) {
	    Global.getInstance().renderer = v;
	},
	enumerable: true,
	configurable: true
    });


    return Global;
})();
