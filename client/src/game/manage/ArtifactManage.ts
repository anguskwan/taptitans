/**
 * Created by lhb on 15/9/15.
 */

class ArtifactManage extends egret.EventDispatcher {

    public data:any;

    public constructor(data) {
        super();
        this.data = data;
    }

    // 神器数值
    getArtifactValue(nameOrId, level?) {
        return formula.artifactValue(this.data, nameOrId, level);
    }
    getArtifactValueStatic(nameOrId) {
        return formula.artifactValueStatic(nameOrId);
    }

    // 神器对所有攻击力加成
    getAllDamageBuffByArtifacts() {
        return formula.damageBuffByArtifacts(this.data);
    }

    getArtifactCost(){
        return formula.newArtifactCost(this.data);
    }

    getResetCost(id) {
        return formula.resetArtifactCost(this.data, id);
    }

    getResetRelic(id) {
        return formula.resetArtifactRelics(this.data, id);
    }

    hasArtifact(id){
        var artifact = _.find(this.data.artifacts, function(v) {return v["id"] == id});
        if(artifact)
            return artifact;
        else
            return null;
    }

    resetArtifact(idx, cb) {
        var artifact = this.data.artifacts[idx];
        var cost = this.getResetCost(artifact.id);
        if (!gm.dataManage.costMoney(cost, 'diamond')) {
            return false;
        }
        gm.network.sendAction("resetArtifact", {idx:idx}, ()=> {
            gm.dataManage.addMoney(this.getResetRelic(artifact.id), 'relic');
            this.data.artifacts.splice(idx, 1);
            Util.invokeCallback(cb, this.data.artifacts);
        })
    }

    // 购买新神器
    buyNewArtifact(cb) {
        if (this.data.artifacts.length >= _.size(Conf.artifacts)) {
            return false;
        }
        var cost = formula.newArtifactCost(this.data);
        if (!gm.dataManage.costMoney(cost, 'relic')) {
            return false;
        }
        gm.network.sendAction("buyNextArtifact", {}, function(data) {
            this.data.artifacts.push({id: data.id, level:1});
            gm.dataManage.setAchievementValue(5, this.data.artifacts.length);
            this.showArtifactInfoLayer(data.id);
            Util.invokeCallback(cb, data);
        }.bind(this));
    }

    upgrade(aid) {
        var artifact = _.find(this.data.artifacts, function(v) {return v["id"] == aid});
        gm.network.sendAction("artifactUpgrade", {artifactId: aid}, function(data) {
            gm.dataManage.costMoney(data.cost, consts.kMoneyTypeRelic);
            artifact["level"]++;
            gm.postMessage(consts.kMessageUpgradeArtifact);

            gm.dataManage.incDailyTaskData("artifactUpgrade")
        }.bind(this));
    }

    getArtifactInfo(aid) {
        var meta = Conf.artifacts[aid];
        var artifact = _.find(this.data.artifacts, function(v) {return v["id"] == aid});
        var value = this.getArtifactValue(aid);
        return {
            name : meta["name"],
            effect : value["effect"],
            desc: meta["desc"],
            dmg : value["damage"],
            level : artifact["level"],
            maxLevel: meta["maxLevel"],
            cost : formula.artifactUpgradeCost(this.data, aid)
        }
    }

    showArtifactInfoLayer(id) {
        var ly = new ArtifactInfoLayer(id);
        gm.mainLayer.addChild(ly);
    }
}
