/**
 *
 * @author
 *
 */
var DeadHeroPanel = (function (_super) {
    __extends(DeadHeroPanel, _super);
    function DeadHeroPanel(data) {
        _super.call(this);
        this._value = data;
        this.skinName = skins.dialog.DeadHeroPanelSkin;
    }
    var __egretProto__ = DeadHeroPanel.prototype;
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.onInitUI();
        this._timer = new egret.Timer(1000);
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.onChangeTime, this);
        this._timer.start();
        this.onChangeTime();
    };
    __egretProto__.getHeroRevivalTime = function (id) {
        var currTime = new Date().getTime();
        var revivalTime = new Date(gm.dataManage.data.heroes[id].revivalTime).getTime();
        return Util.formatTime(Math.floor((revivalTime - currTime) / 1000), true);
    };
    __egretProto__.getHeroRevivalCostDiamond = function (id) {
        return gm.dataManage.heroes.getRevivalCost(id) + "";
    };
    __egretProto__.onChangeTime = function () {
        this.timeLbl.text = this.getHeroRevivalTime(this._value.heroId);
        this.diamondLbl.text = this.getHeroRevivalCostDiamond(this._value.heroId);
    };
    __egretProto__.onInitUI = function () {
        var meta = Conf.hero[this._value.heroId];
        this.heroLbl.text = meta.name;
        this.iconImg.source = "hero" + this._value.heroId;
    };
    __egretProto__.onTouchLayer = function (event) {
        this.onTouchTarget(event.target);
    };
    __egretProto__.onTouchTarget = function (target) {
        if (target == this.closeBtn) {
            this._timer.stop();
            gm.guiLayer.removeElement(this);
        }
        if (target == this.revivalBtn) {
            gm.dataManage.heroes.revivalHero(this._value.heroId, function () {
                this._timer.stop();
                gm.guiLayer.removeElement(this);
                gm.gameUI.hideLoadingLayer();
            }.bind(this));
        }
    };
    /**
     partAdded 是皮肤部件赋值到逻辑类的入口，你可以在这里进行
     必要的初始化操作。比如需要随屏幕改变组件的尺寸，写在这里
     可以避免写在 childrenCreated 中修改造成的多次测量。


     The method "partAdded" will be called just after the
     skin parts is assigned to the property. You can make
     changes will effect to the layout or other components.
     */
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return DeadHeroPanel;
})(egret.gui.SkinnableContainer);
DeadHeroPanel.prototype.__class__ = "DeadHeroPanel";
