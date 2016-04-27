/**
 * Created by lhb on 15/9/15.
 */
var ArtifactManage = (function (_super) {
    __extends(ArtifactManage, _super);
    function ArtifactManage(data) {
        _super.call(this);
        this.data = data;
    }
    var __egretProto__ = ArtifactManage.prototype;
    // 神器数值
    __egretProto__.getArtifactValue = function (nameOrId, level) {
        return formula.artifactValue(this.data, nameOrId, level);
    };
    __egretProto__.getArtifactValueStatic = function (nameOrId) {
        return formula.artifactValueStatic(nameOrId);
    };
    // 神器对所有攻击力加成
    __egretProto__.getAllDamageBuffByArtifacts = function () {
        return formula.damageBuffByArtifacts(this.data);
    };
    __egretProto__.getArtifactCost = function () {
        return formula.newArtifactCost(this.data);
    };
    __egretProto__.getResetCost = function (id) {
        return formula.resetArtifactCost(this.data, id);
    };
    __egretProto__.getResetRelic = function (id) {
        return formula.resetArtifactRelics(this.data, id);
    };
    __egretProto__.hasArtifact = function (id) {
        var artifact = _.find(this.data.artifacts, function (v) {
            return v["id"] == id;
        });
        if (artifact)
            return artifact;
        else
            return null;
    };
    __egretProto__.resetArtifact = function (idx, cb) {
        var _this = this;
        var artifact = this.data.artifacts[idx];
        var cost = this.getResetCost(artifact.id);
        if (!gm.dataManage.costMoney(cost, 'diamond')) {
            return false;
        }
        gm.network.sendAction("resetArtifact", { idx: idx }, function () {
            gm.dataManage.addMoney(_this.getResetRelic(artifact.id), 'relic');
            _this.data.artifacts.splice(idx, 1);
            Util.invokeCallback(cb, _this.data.artifacts);
        });
    };
    // 购买新神器
    __egretProto__.buyNewArtifact = function (cb) {
        if (this.data.artifacts.length >= _.size(Conf.artifacts)) {
            return false;
        }
        var cost = formula.newArtifactCost(this.data);
        if (!gm.dataManage.costMoney(cost, 'relic')) {
            return false;
        }
        gm.network.sendAction("buyNextArtifact", {}, function (data) {
            this.data.artifacts.push({ id: data.id, level: 1 });
            gm.dataManage.setAchievementValue(5, this.data.artifacts.length);
            this.showArtifactInfoLayer(data.id);
            Util.invokeCallback(cb, data);
        }.bind(this));
    };
    __egretProto__.upgrade = function (aid) {
        var artifact = _.find(this.data.artifacts, function (v) {
            return v["id"] == aid;
        });
        gm.network.sendAction("artifactUpgrade", { artifactId: aid }, function (data) {
            gm.dataManage.costMoney(data.cost, consts.kMoneyTypeRelic);
            artifact["level"]++;
            gm.postMessage(consts.kMessageUpgradeArtifact);
            gm.dataManage.incDailyTaskData("artifactUpgrade");
        }.bind(this));
    };
    __egretProto__.getArtifactInfo = function (aid) {
        var meta = Conf.artifacts[aid];
        var artifact = _.find(this.data.artifacts, function (v) {
            return v["id"] == aid;
        });
        var value = this.getArtifactValue(aid);
        return {
            name: meta["name"],
            effect: value["effect"],
            desc: meta["desc"],
            dmg: value["damage"],
            level: artifact["level"],
            maxLevel: meta["maxLevel"],
            cost: formula.artifactUpgradeCost(this.data, aid)
        };
    };
    __egretProto__.showArtifactInfoLayer = function (id) {
        var ly = new ArtifactInfoLayer(id);
        gm.mainLayer.addChild(ly);
    };
    return ArtifactManage;
})(egret.EventDispatcher);
ArtifactManage.prototype.__class__ = "ArtifactManage";
