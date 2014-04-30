var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
	_super.apply(this, arguments);
    }

    Button.prototype.createSimpleButton = function(x, y, width, height, text) {
	var gNormal = new PIXI.Graphics();
	var gPressed = new PIXI.Graphics();
	var gHover = new PIXI.Graphics();

	var thickness = height / 4;
	
	// set normal texture
	gNormal.beginFill(0xAAAAAA);
	gNormal.lineStyle(1, 0x000000, 1);
	gNormal.moveTo(0, 0);
	gNormal.lineTo(width, 0);
	gNormal.lineTo(width, height);
	gNormal.lineTo(0, height);
	gNormal.lineTo(0, 0);

	// draw thickness
	gNormal.moveTo(0, height-thickness);
	gNormal.lineTo(width, height-thickness);
	
	gNormal.endFill();

	// set pressed texture
	gPressed.beginFill(0xAAAAAA);
	gPressed.lineStyle(1, 0x000000, 0);
	gPressed.moveTo(0, 0);
	gPressed.lineTo(width, 0);
	gPressed.lineStyle(1, 0x000000, 1);
	gPressed.moveTo(0, thickness/2);
	gPressed.lineTo(width, thickness/2);
	gPressed.lineTo(width, height);
	gPressed.lineTo(0, height);
	gPressed.lineTo(0, thickness/2);

	// draw thickness
	gPressed.moveTo(0, height-thickness/2);
	gPressed.lineTo(width, height-thickness/2);
	
	gPressed.endFill();

	// set hover texture
	gHover.beginFill(0xAAAAAA);
	gHover.lineStyle(1, 0x000000, 1);
	gHover.moveTo(0, 0);
	gHover.lineTo(width, 0);
	gHover.lineTo(width, height);
	gHover.lineTo(0, height);
	gHover.lineTo(0, 0);

	// draw thickness
	gHover.moveTo(0, height-thickness);
	gHover.lineTo(width, height-thickness);
	
	gHover.endFill();

	var texNormal = gNormal.generateTexture();
	var texPressed = gPressed.generateTexture();
	var texHover = gHover.generateTexture();
	
	this._setup(texNormal, texPressed, texHover);
	
	this.x = x;
	this.y = y;

//	var bitmapFontText = new PIXI.Text(text, {font: "10px Desyrel", align: "center"});
//	bitmapFontText.anchor.x = 0.5;
//	bitmapFontText.anchor.y = 0.5;
//	bitmapFontText.x = 0;
//	bitmapFontText.y = 0;
//	this.view.addChild(bitmapFontText);
    };
    
    Button.prototype.createImgButton = function(name) {
	var paths = [name+"-normal.png", name+"-pressed.png",name+"-hover.png"];
	var texNormal = PIXI.Texture.fromImage(paths[0]);
	var texPressed = PIXI.Texture.fromImage(paths[1]);
	var texHover = PIXI.Texture.fromImage(paths[2]);
	this._setup(texNormal,texPressed, texHover);
    };

    Button.prototype._setup = function(texNormal, texPressed, texHover) {
	this.view = new PIXI.Sprite(texNormal);

	this.view.anchor.x = 0.5;
	this.view.anchor.y = 0.5;
	this.view.setInteractive(true);
	this.view.mousedown = this.view.touchstart = function(data) {
	    this.isdown = true;
	    this.setTexture(texPressed);
	    this.alpha = 1;
	};

	this.view.mouseup = this.view.touchend = function(data) {
	    this.isdown = false;

	    if(this.isOver) {
		this.setTexture(texHover);
	    } else {
		this.setTexture(texNormal);
	    }
	};

	this.view.mouseover = function(data) {
	    this.isOver = true;
	    if(this.isdown) return;
	    this.setTexture(texHover);
	};

	this.view.mouseout = function(data) {
	    this.isOver = false;
	    if(this.isdown) return;
	    this.setTexture(texNormal);
	};

	this.view.click = this.view.tap = function(data) {
	    // click!
	    console.log("CLICK!");
	};

	// add it to the stage
	
	this._redraw();
    };
    Button.prototype._redraw = function() {
	this._dirty = true;
    };
    Object.defineProperty(Entity.prototype, "onClick", {
        get: function () {
            return this.view.click;
        },
        set: function (v) {
            this.view.click = this.view.tap = v;
        },
        enumerable: true,
        configurable: true
    });

    return Button;
})(Entity);
