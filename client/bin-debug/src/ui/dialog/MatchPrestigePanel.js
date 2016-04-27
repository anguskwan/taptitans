/**
 *
 * @author
 *
 */
var MatchPrestigePanel = (function (_super) {
    __extends(MatchPrestigePanel, _super);
    function MatchPrestigePanel(isHard) {
        _super.call(this);
        this.isHard = isHard;
        this.skinName = skins.dialog.MatchPrestigePanelSkin;
    }
    var __egretProto__ = MatchPrestigePanel.prototype;
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.initPrestige();
    };
    __egretProto__.initPrestige = function () {
        var prestige = Math.floor(gm.dataManage.getRelicsByPrestige());
        var stage = gm.dataManage.getRelicsByStage();
        var heroes = gm.dataManage.getRelicsByHeroes();
        if (formula.isAllHeroesAlive(gm.dataManage.data)) {
            this.bonusLbl.text = Util.formatNumber(heroes + stage);
        }
        else {
            this.bonusLbl.text = "0";
        }
        this.stageLbl.text = Util.formatNumber(stage);
        this.heroLbl.text = Util.formatNumber(heroes);
        this.allLbl.text = Util.formatNumber(prestige);
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        this.onTouchTarget(event.target);
    };
    __egretProto__.onTouchTarget = function (target) {
        if (target == this.closeBtn) {
            gm.guiLayer.removeElement(this);
        }
        if (target == this.prestigeBtn) {
            var ly = new MessagePanel("你确定蜕变么？", "蜕变将会重置游戏，主角及英雄的个数和等级\n都不保留，金币也会清空。\n\n仅保留：\n钻石、圣物、神器及武器", function (target) {
                gm.guiLayer.removeElement(this);
                gm.guiLayer.removeElement(target);
                if (this.isHard) {
                    gm.dataManage.joinHardContest(function () {
                        gm.postMessage(consts.kMessageMatchBtnStatus);
                    }.bind(this));
                }
                else {
                    gm.dataManage.joinContest(function () {
                        gm.postMessage(consts.kMessageMatchBtnStatus);
                    }.bind(this));
                }
            }.bind(this));
            gm.guiLayer.addElement(ly);
        }
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return MatchPrestigePanel;
})(egret.gui.SkinnableComponent);
MatchPrestigePanel.prototype.__class__ = "MatchPrestigePanel";
