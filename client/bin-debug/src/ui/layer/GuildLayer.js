/**
 *
 * @author
 *
 */
var GuildLayer = (function (_super) {
    __extends(GuildLayer, _super);
    function GuildLayer() {
        _super.call(this);
        this.toggleBtns = [];
        this.mainIsInit = true;
        this.memberIsInit = true;
        this.shopIsInit = true;
        this.rankIsInit = true;
        this.manageIsInit = true;
        this.skinName = skins.dialog.GuildLayerSkin;
    }
    var __egretProto__ = GuildLayer.prototype;
    __egretProto__.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        gm.registerMessage(consts.kMessageKickedGuild, this.onKickedGuild, this);
        this.initToggleBtn();
        this.onUpdateGuildWarStart();
    };
    __egretProto__.onKickedGuild = function () {
        this.onCloseLayer();
    };
    __egretProto__.initToggleBtn = function () {
        var arr = ["main", "member", "shop", "rank", "manage"];
        _.each(arr, function (name) {
            this[name + "ToggleBtn"].addEventListener(egret.Event.CHANGE, this.toggleChangeHandler, this);
            this.toggleBtns.push(this[name + "ToggleBtn"]);
            this.changeRankList(name, name == "main");
        }.bind(this));
    };
    __egretProto__.toggleChangeHandler = function (evt) {
        var arr = ["main", "member", "shop", "rank", "manage"];
        for (var i = 0; i < this.toggleBtns.length; i++) {
            this.changeRankList(arr[i], (this.toggleBtns[i] == evt.target));
        }
    };
    __egretProto__.onUpdateGuildWarStart = function () {
        var currTime = new Date();
        var nextTime9 = new Date();
        var nextTime24 = new Date();
        nextTime9.setHours(9, 0, 0, 0);
        nextTime24.setHours(24, 0, 0, 0);
        var setoffTime9 = nextTime9.getTime() - currTime.getTime();
        var setoffTime24 = nextTime24.getTime() - currTime.getTime();
        if (setoffTime9 >= 0) {
            egret.setTimeout(function () {
                this.onUpdateMainGroup();
            }.bind(this), this, setoffTime9);
        }
        if (setoffTime24 >= 0) {
            egret.setTimeout(function () {
                this.onUpdateMainGroup();
            }.bind(this), this, setoffTime24);
        }
    };
    __egretProto__.changeRankList = function (name, isShow) {
        this[name + "Group"].visible = isShow;
        this[name + "ToggleBtn"].selected = isShow;
        if (isShow) {
            this.currName = name;
            this.onUpdateGroup(name);
        }
    };
    __egretProto__.onUpdateMainGroup = function () {
        if (this.currName == "main") {
            this.onUpdateGroup(this.currName);
        }
    };
    __egretProto__.onUpdateGroup = function (name) {
        if (this[name + "IsInit"]) {
            this[name + "Init"]();
            this[name + "IsInit"] = false;
        }
        else {
            this[name + "Update"]();
        }
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        if (event.target == this.closeBtn) {
            this.onCloseLayer();
        }
    };
    __egretProto__.mainInit = function () {
        var group = new uiskins.GuildMainGroup(function () {
            this.onCloseLayer();
        }.bind(this));
        this.mainGroup.addElement(group);
    };
    __egretProto__.mainUpdate = function () {
        var group = this.mainGroup.getElementAt(0);
        group.updateMain();
    };
    __egretProto__.memberInit = function () {
        var group = new uiskins.GuildMemberGroup();
        this.memberGroup.addElement(group);
    };
    __egretProto__.memberUpdate = function () {
        var group = this.memberGroup.getElementAt(0);
        group.updateMemberList();
    };
    __egretProto__.shopInit = function () {
        var group = new uiskins.GuildShopGroup();
        this.shopGroup.addElement(group);
    };
    __egretProto__.shopUpdate = function () {
    };
    __egretProto__.rankInit = function () {
        var group = new uiskins.GuildRankGroup();
        this.rankGroup.addElement(group);
    };
    __egretProto__.rankUpdate = function () {
    };
    __egretProto__.manageInit = function () {
        var group = new uiskins.GuildManageGroup(function () {
            this.onCloseLayer();
        }.bind(this));
        this.manageGroup.addElement(group);
    };
    __egretProto__.manageUpdate = function () {
        var group = this.manageGroup.getElementAt(0);
        group.updateMemberList();
    };
    __egretProto__.onCloseLayer = function () {
        gm.removeMessage(consts.kMessageKickedGuild, this.onKickedGuild, this);
        gm.guiLayer.removeElement(this);
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return GuildLayer;
})(egret.gui.SkinnableComponent);
GuildLayer.prototype.__class__ = "GuildLayer";
