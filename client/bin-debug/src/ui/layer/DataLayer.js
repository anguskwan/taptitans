/**
 *
 * @author
 *
 */
var DataLayer = (function (_super) {
    __extends(DataLayer, _super);
    function DataLayer() {
        _super.call(this);
        this.skinName = skins.dialog.DataLayerSkin;
    }
    var __egretProto__ = DataLayer.prototype;
    __egretProto__.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.onInitCurrGroup();
        this.onInitAddGroup();
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        if (event.target == this.closeBtn) {
            gm.guiLayer.removeElement(this);
        }
    };
    __egretProto__.getCurrNumByIndex = function (index) {
        var num = "";
        switch (index) {
            case 0:
                num = gm.dataManage.data.diamond + "";
                break;
            case 1:
                num = Util.formatNumber(gm.dataManage.data.relic);
                break;
            case 2:
                num = Util.formatNumber(gm.dataManage.data.gold);
                break;
            case 3:
                num = Util.formatNumber(gm.dataManage.data.crystal);
                break;
            case 4:
                num = Math.floor(gm.dataManage.getRelicsByHeroes() * 1000) + "";
                break;
            case 5:
                num = Util.formatNumber(formula.criticalChance(gm.dataManage.data) * 100) + "%";
                break;
            case 6:
                num = Util.formatNumber(formula.heroDPSRatio(gm.dataManage.data));
                break;
            case 7:
                num = Util.formatNumber(formula.criticalMultiplier(gm.dataManage.data));
                break;
            case 8:
                num = gm.network.areaId + "";
                break;
            case 9:
                num = gm.dataManage.data.serverId + "";
                break;
            case 10:
                num = gm.network.playerId + "";
                break;
            case 11:
                num = Util.getQueryString('channel') + "";
                break;
            case 12:
                var version = gm.network.ver;
                num = !!version ? version : '';
                break;
        }
        return num;
    };
    __egretProto__.getAddNumByIndex = function (index) {
        var num = "";
        switch (index) {
            case 0:
                num = Util.formatNumber(gm.dataManage.data.achievements[2].value);
                break;
            case 1:
                num = Util.formatNumber(gm.dataManage.data.achievements[8].value);
                break;
            case 2:
                num = Util.formatNumber(gm.dataManage.data.achievements[1].value);
                break;
            case 3:
                num = Util.formatNumber(gm.dataManage.data.achievements[7].value);
                break;
            case 4:
                num = Math.max(gm.dataManage.data.highestStage, gm.dataManage.data.stage) + "";
                break;
            case 5:
                num = Util.formatNumber(gm.dataManage.data.achievements[9].value);
                break;
            case 6:
                num = this.getCreatTimeToCurrTime() + "";
                break;
        }
        return num;
    };
    __egretProto__.getCreatTimeToCurrTime = function () {
        var createTime = new Date(gm.dataManage.data.createTime).getTime();
        var currTime = new Date().getTime();
        var time = currTime - createTime;
        return Math.floor(time / (1000 * 60 * 60 * 24));
    };
    __egretProto__.onInitCurrGroup = function () {
        for (var i = 0; i < this.currGroup.numElements; i++) {
            var numLbl = this.currGroup.getElementAt(i);
            numLbl.text = this.getCurrNumByIndex(i);
        }
    };
    __egretProto__.onInitAddGroup = function () {
        for (var i = 0; i < this.addGroup.numElements; i++) {
            var numLbl = this.addGroup.getElementAt(i);
            numLbl.text = this.getAddNumByIndex(i);
        }
    };
    return DataLayer;
})(egret.gui.SkinnableComponent);
DataLayer.prototype.__class__ = "DataLayer";
