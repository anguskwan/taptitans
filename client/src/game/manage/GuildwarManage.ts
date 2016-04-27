/**
 * Created by tom on 15/12/8.
 */
module tt {
    export class GuildWarManage {
        static warInfo(wid,cb,fail){
            gm.network.request("guild.guildWarHandler.warInfo", {wid:wid}, (data) => {
                Util.invokeCallback(cb,data);
            },fail)
        }

        static warPlayerInfo(pid,cb,fail){
            gm.network.request("guild.guildWarHandler.warPlayerInfo", {pid:pid}, (data) => {
                Util.invokeCallback(cb,data);
            },fail)
        }

        static fightEnemy(gid,eid,cb,fail){
            gm.network.request("guild.guildWarHandler.fightEnemy", {gid:gid,eid:eid}, (data) => {
                Util.invokeCallback(cb,data);
            },fail)
        }

        static getWarRewardNum(wid,gid,level,cb,fail){
            gm.network.sendAction("getWarRewardNum", {wid:wid,gid:gid,level:level}, function(data) {
                Util.invokeCallback(cb,data);
            }.bind(this),fail);
        }

        static getGuildWarReward(wid,gid,cb,fail){
            gm.network.sendAction("getGuildWarReward", {wid:wid,gid:gid}, function(data) {
                gm.dataManage.addMoney(data.crystal,"crystal");
                Util.invokeCallback(cb,data);
            }.bind(this),fail);
        }
    }
}