/**
 * Created by tom on 15/12/1.
 */
var tt;
(function (tt) {
    var GuildManage = (function () {
        function GuildManage() {
        }
        var __egretProto__ = GuildManage.prototype;
        GuildManage.listGuilds = function (start, cb, fail) {
            gm.network.request("guild.guildHandler.listGuilds", { start: start }, function (data) {
                Util.invokeCallback(cb, data);
            }, fail);
        };
        GuildManage.createGuild = function (name, icon, needReq, bpLimit, cb, fail) {
            var _this = this;
            gm.network.request("guild.guildHandler.createGuild", { name: name, icon: icon, needReq: needReq, bpLimit: bpLimit }, function (data) {
                if (data) {
                    gm.network.sendAction("createGuild", { gid: data.id }, function (obj) {
                        gm.dataManage.data.guild = data.id;
                        Util.invokeCallback(cb);
                    }.bind(_this), fail);
                }
            }, fail);
        };
        GuildManage.findGuild = function (name, cb, fail) {
            gm.network.request("guild.guildHandler.findGuild", { name: name }, function (data) {
                Util.invokeCallback(cb, data);
            }, fail);
        };
        GuildManage.joinGuild = function (id, cb, fail) {
            gm.network.request("guild.guildHandler.joinGuild", { gid: id }, function (data) {
                Util.invokeCallback(cb, data);
            }, fail);
        };
        GuildManage.autoEnterGuild = function (cb, fail) {
            gm.network.request("guild.guildHandler.fasterJoinGuild", {}, function (data) {
                if (data) {
                    cb(data);
                }
            }, fail);
        };
        GuildManage.joinGuildWithoutReq = function (gid, cb, fail) {
            gm.network.request("guild.guildHandler.joinGuildWithoutReq", { gid: gid }, function (data) {
                gm.dataManage.data.guild = gid;
                Util.invokeCallback(cb, data);
            }, fail);
        };
        GuildManage.randomTenGuild = function (cb, fail) {
            gm.network.request("guild.guildHandler.randomTenGuild", {}, function (data) {
                Util.invokeCallback(cb, data);
            }, fail);
        };
        GuildManage.queryById = function (id, cb, fail) {
            gm.network.request("guild.guildHandler.queryById", { gid: id }, function (data) {
                Util.invokeCallback(cb, data);
            }, fail);
        };
        GuildManage.modifyNotice = function (id, text, cb, fail) {
            gm.network.request("guild.guildHandler.modifyNotice", { gid: id, text: text }, function (data) {
                Util.invokeCallback(cb, data);
            }, fail);
        };
        GuildManage.approve = function (id, reqId, cb, fail) {
            gm.network.request("guild.guildHandler.approve", { gid: id, reqId: reqId }, function (data) {
                var idx = gm.dataManage.guild.joinReq.indexOf(reqId);
                gm.dataManage.guild.joinReq.splice(idx, 1);
                gm.dataManage.guild.members.push(reqId);
                Util.invokeCallback(cb, data);
            }, fail);
        };
        GuildManage.reject = function (id, reqId, cb, fail) {
            gm.network.request("guild.guildHandler.reject", { gid: id, reqId: reqId }, function (data) {
                var idx = gm.dataManage.guild.joinReq.indexOf(reqId);
                gm.dataManage.guild.joinReq.splice(idx, 1);
                Util.invokeCallback(cb, data);
            }, fail);
        };
        GuildManage.playerList = function (ids, cb, fail) {
            gm.network.request("guild.guildHandler.playerList", { playerIds: ids }, function (data) {
                Util.invokeCallback(cb, data);
            }, fail);
        };
        GuildManage.quit = function (cb, fail) {
            gm.network.request("guild.guildHandler.quit", {}, function (data) {
                gm.dataManage.data.guild = 0;
                Util.invokeCallback(cb, data);
            }, fail);
        };
        GuildManage.kick = function (id, memberId, cb, fail) {
            gm.network.request("guild.guildHandler.kick", { gid: id, memberId: memberId }, function (data) {
                var idx = gm.dataManage.guild.members.indexOf(memberId);
                gm.dataManage.guild.members.splice(idx, 1);
                Util.invokeCallback(cb, data);
            }, fail);
        };
        GuildManage.setPresident = function (id, pid, name, cb, fail) {
            gm.network.request("guild.guildHandler.setPresident", { gid: id, pid: pid, name: name }, function (data) {
                gm.dataManage.guild.president = pid;
                gm.dataManage.guild.presidentName = name;
                Util.invokeCallback(cb, data);
            }, fail);
        };
        GuildManage.buyGuildGold = function (cb, fail) {
            var cost = gm.gameUI.getGuildTypeSource(consts.kGuildItemGoldRain).cost;
            if (!gm.dataManage.costMoney(cost, "crystal")) {
                Util.invokeCallback(fail);
                return false;
            }
            gm.network.sendAction("buyGuildGold", {}, function () {
                var gold = formula.goldRain(gm.dataManage.data);
                gm.dataManage.addMoney(gold, "gold");
                gm.postMessage(consts.kMessageGoldRain);
                Util.invokeCallback(cb, gold);
            }.bind(this), fail);
        };
        GuildManage.buyGuildWeapon = function (cb, fail) {
            var cost = gm.gameUI.getGuildTypeSource(consts.kGuildItemBox1).cost;
            if (!gm.dataManage.costMoney(cost, "crystal")) {
                Util.invokeCallback(fail);
                return false;
            }
            gm.network.sendAction("buyGuildWeapon", {}, function (data) {
                if (data.isWeapon) {
                    gm.dataManage.addWeaponItem(1);
                }
                else {
                    gm.dataManage.addShopSkill(1, consts.kShopItemRefreshSkill);
                }
                Util.invokeCallback(cb, data.isWeapon);
            }.bind(this), fail);
        };
        GuildManage.clearJoinReq = function (gid, cb, fail) {
            gm.network.request("guild.guildHandler.clearJoinReq", { gid: gid }, function (data) {
                gm.dataManage.guild.joinReq = [];
                Util.invokeCallback(cb, data);
            }, fail);
        };
        GuildManage.setting = function (gid, icon, needReq, bpLimit, cb, fail) {
            gm.network.request("guild.guildHandler.setting", { gid: gid, icon: icon, needReq: needReq, bpLimit: bpLimit }, function () {
                Util.invokeCallback(cb);
            }, fail);
        };
        GuildManage.envelopeList = function (gid, cb, fail) {
            gm.network.request("guild.guildHandler.envelopeList", { gid: gid }, function (data) {
                gm.dataManage.guild.redEnvelope = data;
                Util.invokeCallback(cb, data);
            }, fail);
        };
        GuildManage.redEnvelope = function (type, cb, fail) {
            var cost = Conf.redEnvelope[type].cost;
            if (!gm.dataManage.costMoney(cost, "diamond")) {
                Util.invokeCallback(fail);
                return;
            }
            gm.network.sendAction("redEnvelope", { type: type }, function (data) {
                gm.dataManage.data.dailyEvent.envelope++;
                gm.dataManage.addItem(data.num, "crystal");
                Util.invokeCallback(cb, data);
            }.bind(this), fail);
        };
        GuildManage.getEnvelope = function (idx, cb, fail) {
            gm.network.sendAction("getEnvelope", { idx: idx }, function (data) {
                //var id = gm.dataManage.data.id;
                //var name = gm.dataManage.data.name || "英雄";
                //var avatar = gm.dataManage.data.avatar || "";
                //gm.dataManage.guild.redEnvelope[idx].list[id] = {name:name,avatar:avatar, num:data.diamond};
                gm.dataManage.addItem(data.diamond, "diamond");
                Util.invokeCallback(cb, data);
            }.bind(this), fail);
        };
        return GuildManage;
    })();
    tt.GuildManage = GuildManage;
    GuildManage.prototype.__class__ = "tt.GuildManage";
})(tt || (tt = {}));
