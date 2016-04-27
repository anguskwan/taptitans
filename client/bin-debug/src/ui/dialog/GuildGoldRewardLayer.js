/**
 *
 * @author
 *
 */
var GuildGoldRewardLayer = (function (_super) {
    __extends(GuildGoldRewardLayer, _super);
    function GuildGoldRewardLayer() {
        _super.call(this);
        this.skinName = skins.dialog.GuildGoldRewardLayerSkin;
    }
    var __egretProto__ = GuildGoldRewardLayer.prototype;
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this._item = new egret.gui.ClassFactory(uiskins.GuildGoldRewardItemRenderer);
        this.listData = [];
        this.onInitList();
        this.onInitText();
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        if (event.target == this.closeBtn) {
            gm.guiLayer.removeElement(this);
        }
    };
    __egretProto__.onInitList = function () {
        _.each(Conf.guildGoldScore, function (v) {
            this.listData.push(v);
        }.bind(this));
        var collection = this.collection = new egret.gui.ArrayCollection(this.listData);
        this.list.dataProvider = collection;
        this.list.itemRendererFunction = function (item) {
            return this.getItemRender(item);
        }.bind(this);
    };
    __egretProto__.getItemRender = function (item) {
        return this._item;
    };
    __egretProto__.onInitText = function () {
        var textDesc1 = "- 开启时间为每天上午9点到晚上9点\n" + "- 每1小时开1个宫殿，共12个宫殿\n" + "- 每人每天只可进入1个宫殿\n" + "- 每个宫殿的前30分钟为报名时间，后30分钟为PK时间\n" + "- 奖励领取时间为晚上21点-24点，有效时间3个小时\n" + "- 按公会全体成员积分之和的排名获得奖励，奖励领取地点在公会排行榜页面最下方\n" + "- 第一天新加入公会的人，无法参加12个宫殿的比赛和领取排名奖励";
        var text1 = new egret.gui.Label();
        text1.size = 16;
        text1.width = 440;
        text1.textColor = 0xFFFFFF;
        text1.fontFamily = "Arial";
        Util.setStyleText(text1, textDesc1);
        this.textGroup.addElement(text1);
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return GuildGoldRewardLayer;
})(egret.gui.SkinnableComponent);
GuildGoldRewardLayer.prototype.__class__ = "GuildGoldRewardLayer";
