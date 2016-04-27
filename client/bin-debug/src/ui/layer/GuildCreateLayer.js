/**
 *
 * @author
 *
 */
var GuildCreateLayer = (function (_super) {
    __extends(GuildCreateLayer, _super);
    function GuildCreateLayer() {
        _super.call(this);
        this.isInitJoinGroup = true;
        this.isInitCreateGroup = true;
        this.isInitSearchGroup = true;
        this.toggleBtns = [];
        this.skinName = skins.dialog.GuildCreateLayerSkin;
    }
    var __egretProto__ = GuildCreateLayer.prototype;
    __egretProto__.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.initToggleBtn();
    };
    __egretProto__.initToggleBtn = function () {
        this.joinToggleBtn.addEventListener(egret.Event.CHANGE, this.toggleChangeHandler, this);
        this.createToggleBtn.addEventListener(egret.Event.CHANGE, this.toggleChangeHandler, this);
        this.searchToggleBtn.addEventListener(egret.Event.CHANGE, this.toggleChangeHandler, this);
        this.toggleBtns.push(this.joinToggleBtn);
        this.toggleBtns.push(this.createToggleBtn);
        this.toggleBtns.push(this.searchToggleBtn);
        this.changeRankList("join", true);
        this.changeRankList("create", false);
        this.changeRankList("search", false);
    };
    __egretProto__.toggleChangeHandler = function (evt) {
        var arr = ["join", "create", "search"];
        for (var i = 0; i < this.toggleBtns.length; i++) {
            this.changeRankList(arr[i], (this.toggleBtns[i] == evt.target));
        }
    };
    __egretProto__.changeRankList = function (name, isShow) {
        this[name + "Group"].visible = isShow;
        this[name + "ToggleBtn"].selected = isShow;
        if (isShow) {
            this[name + "InitGroup"]();
        }
    };
    __egretProto__.joinInitGroup = function () {
        if (!this.isInitJoinGroup) {
            return;
        }
        var group = new uiskins.GuildJoinGroup(function () {
            gm.guiLayer.removeElement(this);
            this.showGuildLayer();
        }.bind(this));
        this.joinGroup.addElement(group);
        this.isInitJoinGroup = false;
    };
    __egretProto__.createInitGroup = function () {
        if (!this.isInitCreateGroup) {
            return;
        }
        var group = new uiskins.GuildCreateGroup(function () {
            gm.guiLayer.removeElement(this);
            this.showGuildLayer();
        }.bind(this));
        this.createGroup.addElement(group);
        this.isInitCreateGroup = false;
    };
    __egretProto__.searchInitGroup = function () {
        if (!this.isInitSearchGroup) {
            return;
        }
        var group = new uiskins.GuildSearchGroup(function () {
            gm.guiLayer.removeElement(this);
            this.showGuildLayer();
        }.bind(this));
        this.searchGroup.addElement(group);
        this.isInitSearchGroup = false;
    };
    __egretProto__.showGuildLayer = function () {
        var ly = new GuildLayer();
        gm.guiLayer.addElement(ly);
    };
    __egretProto__.onTouchLayer = function (event) {
        var _this = this;
        event.stopPropagation();
        if (event.target == this.backBtn) {
            gm.guiLayer.removeElement(this);
        }
        else if (event.target == this.autoEnterBtn) {
            console.log("Guild: touch the auto enter btn");
            tt.GuildManage.autoEnterGuild(function (data) {
                console.log("Guild: auto enter guild success, guildId=" + data.id);
                gm.dataManage.data.guild = data.id;
                gm.guiLayer.removeElement(_this);
                _this.showGuildLayer();
            }, function (fail) {
                console.log("auto enter failed.");
            });
        }
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return GuildCreateLayer;
})(egret.gui.SkinnableComponent);
GuildCreateLayer.prototype.__class__ = "GuildCreateLayer";
