/**
 *
 * @author
 *
 */
var ArtifactResetPanel = (function (_super) {
    __extends(ArtifactResetPanel, _super);
    function ArtifactResetPanel(data) {
        _super.call(this);
        this.value = data;
        this.skinName = skins.dialog.ArtifactResetPanelSkin;
    }
    var __egretProto__ = ArtifactResetPanel.prototype;
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.addBgRectColorAndCenter();
        this.initUI();
    };
    __egretProto__.initUI = function () {
        var id = this.value.id;
        var meta = Conf.artifacts[id];
        var artifact = _.find(gm.dataManage.data.artifacts, function (v) {
            return v["id"] == id;
        });
        var value = gm.dataManage.artifact.getArtifactValue(id);
        var nextLevel = artifact["level"] + 1;
        var maxLevel = meta["maxLevel"] != -1 ? (nextLevel > meta["maxLevel"] ? meta["maxLevel"] : nextLevel) : nextLevel;
        var nextValue = gm.dataManage.artifact.getArtifactValue(id, maxLevel);
        this.iconImg.source = "artifact" + id;
        this.nameLbl.text = meta["name"];
        this.lvLbl.text = artifact["level"] + "";
        if (meta["maxLevel"] != -1) {
            this.maxLvLbl.text = _.sprintf("（最高等级%d）", meta["maxLevel"]);
        }
        else {
            this.maxLvLbl.text = "";
        }
        this.currExpLbl1.text = _.sprintf(meta["desc"], value["effect"] * 100);
        this.currExpLbl2.text = _.sprintf("+%d%%总攻击力", value["damage"] * 100);
        if (meta["maxLevel"] != -1 && artifact["level"] + 1 > meta["maxLevel"]) {
            this.nextExpLbl1.text = "最高等级";
            this.nextExpLbl2.text = "最高等级";
        }
        else {
            this.nextExpLbl1.text = _.sprintf(meta["desc"], nextValue["effect"] * 100);
            this.nextExpLbl2.text = _.sprintf("+%d%%总攻击力", nextValue["damage"] * 100);
        }
        this.diamondLbl.text = gm.dataManage.artifact.getResetCost(id) + "";
        this.relicLbl.text = _.sprintf("打破神器以获得%d个", gm.dataManage.artifact.getResetRelic(id));
    };
    __egretProto__.addBgRectColorAndCenter = function () {
        var width = gm.guiLayer.width;
        var height = gm.guiLayer.height;
        this.bgRect = new egret.gui.Rect();
        this.bgRect.width = width;
        this.bgRect.height = height;
        this.bgRect.fillColor = 0x000000;
        this.bgRect.fillAlpha = 0.5;
        this.skin.addElementAt(this.bgRect, 0);
        this.width = width;
        this.height = height;
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        this.onTouchTarget(event.target);
    };
    __egretProto__.onTouchTarget = function (target) {
        if (target == this.closeBtn) {
            gm.guiLayer.removeElement(this);
        }
        if (target == this.rightBtn) {
            gm.guiLayer.removeElement(this);
            var ly = new MessagePanel("打破神器", "返还你的圣物，你可以重新抽取新的神器?", function (target) {
                gm.dataManage.artifact.resetArtifact(this.value.index, function () {
                    gm.postMessage(consts.kMessageDelArtifact, this.value.itemIndex);
                    gm.guiLayer.removeElement(target);
                }.bind(this));
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
    return ArtifactResetPanel;
})(egret.gui.SkinnableContainer);
ArtifactResetPanel.prototype.__class__ = "ArtifactResetPanel";
