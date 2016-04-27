/**
 * Created by lhb on 15/11/3.
 */

module tt {
    export class BattleManage {

        static findOpponent(cb,fail) {
            gm.network.request("pk.pkHandler.findOpponent", {}, (data) => {
                if (data) {
                    gm.network.sendAction("costMorale", {num:Conf.config.moralePerSearch},function(){
                        Util.invokeCallback(cb,data);
                    }.bind(this),function(){
                        Util.invokeCallback(fail);
                    }.bind(this));
                }
                else {
                    Util.invokeCallback(cb,data);
                }
            },fail)
        }

        static queryOpponent(id, cb, fail) {
            gm.network.request("pk.pkHandler.queryOpponent", {opponentId: id}, (data) => {
                Util.invokeCallback(cb, data);
            }, fail);
        }

        static fightOpponent(opponentId,cb,fail, isRevenge?) {
            var gid = gm.dataManage.data.guild;
            gm.network.request("pk.pkHandler.fightOpponent", {opponentId:opponentId,gid:gid,isRevenge: !!isRevenge}, (data) => {
                gm.dataManage.updateEquipValue(function(){
                    if (data.deadId) {
                        gm.dataManage.data.heroes[data.deadId].revivalTime = data.revivalTime;
                        gm.postMessage(consts.kMessageHeroDead);
                    }
                    Util.invokeCallback(cb,data);
                }.bind(this),function(){
                    Util.invokeCallback(fail);
                }.bind(this));
            },fail)
        }

        static updateMorale(cb) {
            gm.network.sendAction("updateMorale", {}, (data) => {
                Util.invokeCallback(cb,data);
            })
        }

        static breakProtect(cb) {
            gm.network.sendAction("breakProtect", {}, (data) => {
                Util.invokeCallback(cb,data);
            })
        }

        static buyMorale(cb) {
            gm.network.sendAction("buyMorale", {}, (data) => {
                Util.invokeCallback(cb, data);
            })
        }

        //guild gold pk
        static fightZodiacOpponent(idx,cb,fail){
            gm.network.request("pk.pkHandler.fightZodiacOpponent", {idx: idx}, (data) => {
                gm.dataManage.data.dailyEvent.zodiacTimes++;
                Util.invokeCallback(cb, data);
            }, fail);
        }

        static zodiacGuildsRankingList(start,cb,fail){
            gm.network.request("pk.pkHandler.zodiacGuildsRankingList", {start: start}, (data) => {
                Util.invokeCallback(cb, data);
            }, fail);
        }

        static zodiacMyGuildRanking(cb,fail){
            var gid = gm.dataManage.data.guild;
            if(gid == 0){
                gm.postMessage(consts.kMessageShowToastLayer,"你不在公会中");
                Util.invokeCallback(fail);
                return ;
            }
            gm.network.request("pk.pkHandler.zodiacMyGuildRanking", {gid: gid}, (data) => {
                Util.invokeCallback(cb, data);
            }, fail);
        }

        static zodiacPlayerRankingList(idx,start,cb,fail){
            gm.network.request("pk.pkHandler.zodiacPlayerRankingList", {idx: idx,start:start}, (data) => {
                Util.invokeCallback(cb, data);
            }, fail);
        }
    }
}
