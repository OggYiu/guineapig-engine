var Page_Init = ( function (_super) {
    __extends(Page_Init, _super);
    function Page_Init() {
	_super.apply(this, arguments);

	this.entity = null;
	this.keydown = [];
	this.camera = new Camera(this.container);
    }
    var onKeyDown = null;
    var onKeyUp = null;
    var onKeyPress = null;
    
    Page_Init.prototype.enter = function() {
	var texture = PIXI.Texture.fromFrame("helicopter-right-1.png");
	var view = new PIXI.Sprite(texture);
	view.anchor.x = 0.5;
	view.anchor.y = 0.5;
	this.entity = new Entity();
	//	this.entity.setView(view);
	var textures = [];
	textures.push(PIXI.Texture.fromFrame("helicopter-right-1.png"));
	textures.push(PIXI.Texture.fromFrame("helicopter-right-2.png"));
	textures.push(PIXI.Texture.fromFrame("helicopter-right-3.png"));
	this.entity.addAnimation("walk-right", textures);
	this.entity.playAnimation("walk-right");
	this.entity.view.scale.x = 1;
	//	this.entity.velocity.x = 10;
	this.addChild(this.entity);
	this.camera.setFollower(this.entity);

	var button = new Button();
	//	button.createImgButton("tes");
	button.createSimpleButton(100, 100, 50, 30, "click me");
	this.addChild(button);
	button.onClick = this.onClick;

	var parent = this;
	onKeyDown = function(event) {
	    parent.keydown[event.keyCode] = true;

	    var charPressed = String.fromCharCode(event.keyCode);
	    charPressed = charPressed.toLowerCase();

	    switch(charPressed.charCodeAt()) {
	    case "d".charCodeAt():
		parent.entity.scale.x = 1;
		break;
	    case "a".charCodeAt():
		parent.entity.scale.x = -1;
		break;
	    case " ".charCodeAt():
		if (parent.entity.velocity.y >= 0) {
		    parent.entity.velocity.y = -30;
		} else {	
		    parent.entity.velocity.y -= 30;	    
		}
		event.preventDefault();
		break;
	    }
	};

	onKeyUp = function(event) {
	    parent.keydown[event.keyCode] = false;
	};

	//	onKeyPress = function(event) {
	//	    console.log("onKeyPress");
	//	};
	
	document.addEventListener("keydown", onKeyDown);
	document.addEventListener("keyup", onKeyUp);
	//	document.addEventListener("keyup", onKeyPress);
	
	//	onKeydown = function(event) {
	//	    console.log("event: " + event.keyCode);
	//	    var handled = false;
	//	    var speed = 50;
	//	    switch(event.keyCode) {
	//	    case 65:
	//		parent.entity.scale.x = -1;
	//		parent.entity.velocity.x = -speed;
	//		handled = true;
	//		console.log("65");
	//		break;
	//	    case 68:
	//		parent.entity.scale.x = 1;
	//		parent.entity.velocity.x = speed;		
	//		handled = true;
	//		console.log("68");		
	//		break;
	//	    case 32:
	//		handled = true;
	//		if (parent.entity.velocity.y >= 0) {
	//		    parent.entity.velocity.y = -30;
	//		} else {	
	//		    parent.entity.velocity.y -= 30;	    
	//		}
	//		break;
	//	    }
	//	    if (handled) {
	//  		event.preventDefault();
	//	    }
	//	};
	//
    };
    Page_Init.prototype.dispose = function() {
	_super.prototype.dispose.call(this);
	document.removeEventListener("keydown", onKeyDown);
	document.removeEventListener("keydown", onKeyUp);	
    };

    Page_Init.prototype.update = function(dt){
	_super.prototype.update.call(this, dt);
	
	if (this.keydown[65] != null && this.keydown[65] != false) {
	    this.entity.x--;
	}	
	if (this.keydown[68] != null && this.keydown[68] != false) {
	    this.entity.x++;
	}

	this.entity.velocity.y += 100 * dt;

	//	var fiction = 80 * dt;
	//	if (this.entity.velocity.x <= 0 ) {
	//  	    console.log("velocity: " + this.entity.velocity.x);
	//	    this.entity.velocity.x += fiction;
	//	    if (this.entity.velocity.x > 0) {
	//		this.entity.velocity.x = 0;
	//	    }
	//	} else {
	//	    this.entity.velocity.x -= fiction;
	//	    if (this.entity.velocity.x < 0) {
	//		this.entity.velocity.x = 0;
	//	    }
	//	}
	
	//	this.entity.x += dt / 10;

	this.camera.update(dt);
	
    };
    Page_Init.prototype.onClick = function() {
	console.log("onclicked!");
	PageMgr.getInstance().changePage(new Page_Test());
    };
    return Page_Init;
})(Page);
