/**
 * Created by tom on 15/12/22.
 */
var tt;
(function (tt) {
    var ActivityManage = (function () {
        function ActivityManage() {
        }
        var __egretProto__ = ActivityManage.prototype;
        ActivityManage.catInfo = function (cb, fail) {
            gm.network.request("activity.activityHandler.catInfo", {}, function (data) {
                Util.invokeCallback(cb, data);
            }, fail);
        };
        ActivityManage.catGo = function (cb, fail) {
            var _this = this;
            gm.network.request("activity.activityHandler.catGo", {}, function () {
                gm.dataManage.updateDiamond(function (diamond) {
                    this.catInfo(function (data) {
                        Util.invokeCallback(cb, { times: data.times, diamond: diamond });
                    }.bind(this), function () {
                        Util.invokeCallback(fail);
                    }.bind(this));
                }.bind(_this), function () {
                    Util.invokeCallback(fail);
                }.bind(_this));
            }, fail);
        };
        ActivityManage.purchaseInfo = function (cb, fail) {
            gm.network.request("activity.activityHandler.purchaseInfo", {}, function (data) {
                Util.invokeCallback(cb, data);
            }, fail);
        };
        ActivityManage.activityInfo = function (type, cb, fail) {
            gm.network.request("activity.activityHandler.activityInfo", { type: type }, function (data) {
                if (type == "diamond") {
                    gm.dataManage.costDiamondActivity = data || { count: 0, got: [] };
                }
                Util.invokeCallback(cb, data);
            }, fail);
        };
        ActivityManage.getActivityReward = function (idx, cb, fail) {
            gm.network.sendAction("getActivityReward", { idx: idx }, function (data) {
                gm.dataManage.purchaseActivity.got[idx] = true;
                Util.invokeCallback(cb, data);
            }, fail);
        };
        ActivityManage.getActivityDiamondReward = function (idx, cb, fail) {
            gm.network.sendAction("getActivityDiamondReward", { idx: idx }, function (data) {
                gm.dataManage.costDiamondActivity.got[idx] = true;
                Util.invokeCallback(cb, data);
            }, fail);
        };
        return ActivityManage;
    })();
    tt.ActivityManage = ActivityManage;
    ActivityManage.prototype.__class__ = "tt.ActivityManage";
})(tt || (tt = {}));
