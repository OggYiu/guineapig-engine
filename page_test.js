var Page_Test = (function (_super) {
    __extends(Page_Test, _super);
    function Page_Test() {
	_super.apply(this, arguments);
    }
    Page_Test.prototype.enter = function() {
	var button = new Button();
	button.createSimpleButton(200, 100, 100, 30, "click me");
	this.addChild(button);
	button.onClick = this.onClick;
    };
    Page_Test.prototype.update = function(dt){
	_super.prototype.update.call(this, dt);
    };
    Page_Test.prototype.onClick = function() {
	console.log("onclicked!");
    };
    return Page_Test;
})(Page);
