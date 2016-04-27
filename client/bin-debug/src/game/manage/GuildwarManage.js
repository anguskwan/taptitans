/**
 * Created by tom on 15/12/8.
 */
var tt;
(function (tt) {
    var GuildWarManage = (function () {
        function GuildWarManage() {
        }
        var __egretProto__ = GuildWarManage.prototype;
        GuildWarManage.warInfo = function (wid, cb, fail) {
            gm.network.request("guild.guildWarHandler.warInfo", { wid: wid }, function (data) {
                Util.invokeCallback(cb, data);
            }, fail);
        };
        GuildWarManage.warPlayerInfo = function (pid, cb, fail) {
            gm.network.request("guild.guildWarHandler.warPlayerInfo", { pid: pid }, function (data) {
                Util.invokeCallback(cb, data);
            }, fail);
        };
        GuildWarManage.fightEnemy = function (gid, eid, cb, fail) {
            gm.network.request("guild.guildWarHandler.fightEnemy", { gid: gid, eid: eid }, function (data) {
                Util.invokeCallback(cb, data);
            }, fail);
        };
        GuildWarManage.getWarRewardNum = function (wid, gid, level, cb, fail) {
            gm.network.sendAction("getWarRewardNum", { wid: wid, gid: gid, level: level }, function (data) {
                Util.invokeCallback(cb, data);
            }.bind(this), fail);
        };
        GuildWarManage.getGuildWarReward = function (wid, gid, cb, fail) {
            gm.network.sendAction("getGuildWarReward", { wid: wid, gid: gid }, function (data) {
                gm.dataManage.addMoney(data.crystal, "crystal");
                Util.invokeCallback(cb, data);
            }.bind(this), fail);
        };
        return GuildWarManage;
    })();
    tt.GuildWarManage = GuildWarManage;
    GuildWarManage.prototype.__class__ = "tt.GuildWarManage";
})(tt || (tt = {}));
