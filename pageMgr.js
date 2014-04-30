var PageMgr = (function(){
    function PageMgr() {
	if(PageMgr.s_canInit != true) {
	    assert(PageMgr.s_canInit, "you cannot new a singleton");
	}
	this.stage = null;
	this.curPage = null;
	this.targetPage = null;
    }
    PageMgr.prototype.setStage = function(stage) {
	assert(stage != null, "invalid stage");
	this.stage = stage;
    };
    PageMgr.prototype.changePage = function(page) {
	assert(page, "invalid page");
	this.targetPage = page;
    };
    PageMgr.prototype.update = function(dt) {
	if (this.targetPage != null) {
	    if (this.curPage != null ) {
		this.curPage.dispose();
	    }
	    this.curPage = this.targetPage;
	    this.targetPage = null;
	    if(this.stage != null) {
		this.curPage.setStage(this.stage);
	    }
	    this.curPage.enter();

	}
	if(this.curPage!= null) {
	    this.curPage.update(dt);
	}
    };

    PageMgr.getInstance = function() {
	if(PageMgr.s_instance == null){
	    PageMgr.s_canInit = true;
	    PageMgr.s_instance = new PageMgr();
	    PageMgr.s_canInit = false;
	}
	return PageMgr.s_instance;
    };
    return PageMgr;
})();
