/**
 *
 * @author
 *
 */
var GuildBagGetPanel = (function (_super) {
    __extends(GuildBagGetPanel, _super);
    function GuildBagGetPanel(idx) {
        _super.call(this);
        this.idx = idx;
        this.skinName = skins.dialog.GuildBagGetPanelSkin;
    }
    var __egretProto__ = GuildBagGetPanel.prototype;
    __egretProto__.isGetDiamond = function () {
        var id = gm.dataManage.data.id;
        var meta = this.getRedEnvelope();
        if (meta.list[id]) {
            return true;
        }
        if (_.size(meta.diamond) < 1) {
            return false;
        }
    };
    __egretProto__.getRedEnvelope = function () {
        return gm.dataManage.guild.redEnvelope[this.idx];
    };
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this._getItem = new egret.gui.ClassFactory(uiskins.GuildBagGetItemRenderer);
        this.getData = [];
        this.onInitData();
        this.setIconImg();
        this.setNameText();
        this.setTitleText();
        this.setDiamondText();
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        if (event.target == this.closeBtn) {
            gm.guiLayer.removeElement(this);
        }
    };
    __egretProto__.onInitData = function () {
        var meta = this.getRedEnvelope();
        _.each(meta.list, function (v) {
            this.getData.push(v);
        }.bind(this));
        this.addList("get");
    };
    __egretProto__.addList = function (name) {
        var collection = this[name + "Collection"] = new egret.gui.ArrayCollection(this[name + "Data"]);
        this[name + "List"].dataProvider = collection;
        this[name + "List"].itemRendererFunction = function (item) {
            return this.getItemRender(item);
        }.bind(this);
    };
    __egretProto__.getItemRender = function (event) {
        return this._getItem;
    };
    __egretProto__.setIconImg = function () {
        var meta = this.getRedEnvelope();
        var avatar = meta.avatar || "";
        if (avatar != "") {
            Util.setIconImg(avatar, this.iconImg, 96);
        }
        else {
            this.iconImg.source = "icon_default";
        }
    };
    __egretProto__.setNameText = function () {
        var meta = this.getRedEnvelope();
        var name = meta.from || "英雄";
        this.nameLbl.text = name;
    };
    __egretProto__.setTitleText = function () {
        var text;
        var color;
        if (this.isGetDiamond()) {
            text = "恭喜你抢到红包";
            color = 0xFFF200;
        }
        else {
            text = "手太慢了，红包被抢光了";
            color = 0xFFFFFF;
        }
        this.titleLbl.text = text;
        this.titleLbl.textColor = color;
    };
    __egretProto__.setDiamondText = function () {
        var diamond;
        if (this.isGetDiamond()) {
            var id = gm.dataManage.data.id;
            var meta = this.getRedEnvelope();
            diamond = meta.list[id].num;
        }
        else {
            diamond = 0;
        }
        this.getDiamondLbl.text = _.sprintf("%d", diamond);
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return GuildBagGetPanel;
})(egret.gui.SkinnableComponent);
GuildBagGetPanel.prototype.__class__ = "GuildBagGetPanel";
