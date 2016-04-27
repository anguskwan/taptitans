/**
 * Created by lhb on 15/11/3.
 */
var tt;
(function (tt) {
    var BattleManage = (function () {
        function BattleManage() {
        }
        var __egretProto__ = BattleManage.prototype;
        BattleManage.findOpponent = function (cb, fail) {
            var _this = this;
            gm.network.request("pk.pkHandler.findOpponent", {}, function (data) {
                if (data) {
                    gm.network.sendAction("costMorale", { num: Conf.config.moralePerSearch }, function () {
                        Util.invokeCallback(cb, data);
                    }.bind(_this), function () {
                        Util.invokeCallback(fail);
                    }.bind(_this));
                }
                else {
                    Util.invokeCallback(cb, data);
                }
            }, fail);
        };
        BattleManage.queryOpponent = function (id, cb, fail) {
            gm.network.request("pk.pkHandler.queryOpponent", { opponentId: id }, function (data) {
                Util.invokeCallback(cb, data);
            }, fail);
        };
        BattleManage.fightOpponent = function (opponentId, cb, fail, isRevenge) {
            var _this = this;
            var gid = gm.dataManage.data.guild;
            gm.network.request("pk.pkHandler.fightOpponent", { opponentId: opponentId, gid: gid, isRevenge: !!isRevenge }, function (data) {
                gm.dataManage.updateEquipValue(function () {
                    if (data.deadId) {
                        gm.dataManage.data.heroes[data.deadId].revivalTime = data.revivalTime;
                        gm.postMessage(consts.kMessageHeroDead);
                    }
                    Util.invokeCallback(cb, data);
                }.bind(_this), function () {
                    Util.invokeCallback(fail);
                }.bind(_this));
            }, fail);
        };
        BattleManage.updateMorale = function (cb) {
            gm.network.sendAction("updateMorale", {}, function (data) {
                Util.invokeCallback(cb, data);
            });
        };
        BattleManage.breakProtect = function (cb) {
            gm.network.sendAction("breakProtect", {}, function (data) {
                Util.invokeCallback(cb, data);
            });
        };
        BattleManage.buyMorale = function (cb) {
            gm.network.sendAction("buyMorale", {}, function (data) {
                Util.invokeCallback(cb, data);
            });
        };
        //guild gold pk
        BattleManage.fightZodiacOpponent = function (idx, cb, fail) {
            gm.network.request("pk.pkHandler.fightZodiacOpponent", { idx: idx }, function (data) {
                gm.dataManage.data.dailyEvent.zodiacTimes++;
                Util.invokeCallback(cb, data);
            }, fail);
        };
        BattleManage.zodiacGuildsRankingList = function (start, cb, fail) {
            gm.network.request("pk.pkHandler.zodiacGuildsRankingList", { start: start }, function (data) {
                Util.invokeCallback(cb, data);
            }, fail);
        };
        BattleManage.zodiacMyGuildRanking = function (cb, fail) {
            var gid = gm.dataManage.data.guild;
            if (gid == 0) {
                gm.postMessage(consts.kMessageShowToastLayer, "你不在公会中");
                Util.invokeCallback(fail);
                return;
            }
            gm.network.request("pk.pkHandler.zodiacMyGuildRanking", { gid: gid }, function (data) {
                Util.invokeCallback(cb, data);
            }, fail);
        };
        BattleManage.zodiacPlayerRankingList = function (idx, start, cb, fail) {
            gm.network.request("pk.pkHandler.zodiacPlayerRankingList", { idx: idx, start: start }, function (data) {
                Util.invokeCallback(cb, data);
            }, fail);
        };
        return BattleManage;
    })();
    tt.BattleManage = BattleManage;
    BattleManage.prototype.__class__ = "tt.BattleManage";
})(tt || (tt = {}));
