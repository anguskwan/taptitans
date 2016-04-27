/**
 * Created by lhb on 15/10/10.
 */
var Wechat = (function () {
    function Wechat() {
    }
    var __egretProto__ = Wechat.prototype;
    __egretProto__.init = function () {
        var channelType = Util.getQueryString('channelType');
        //alert(channelType);
        console.log("channelType: ", channelType);
        if ("hortor" != channelType && "test" != channelType) {
            return;
        }
        if (gm.network.env == "qq") {
            var gcShareCode = Util.getQueryString("shareCode") || "";
            var channel = gm.dataManage.data.channel;
            var shareChannel = _.endsWith(channel + "", "_") ? channel : channel + "_";
            mqq.invoke('data', 'setShareInfo', {
                share_url: gm.network.gameUrl + "&scode=" + gm.dataManage.data.shareCode + "&channel=" + shareChannel + "&friendCode=" + gcShareCode,
                title: "疯狂打怪兽",
                desc: "疯狂打怪兽，减压神器。根本停不下来——" + gm.dataManage.data.name,
                image_url: gm.dataManage.data.avatar
            }, function () {
            });
        }
        else {
            this.getSignPackage();
        }
        this.checkIfFromWechatFriend();
    };
    __egretProto__.checkIfFromWechatFriend = function () {
        var pid = Util.getQueryString('scode');
        if (!pid) {
            return;
        }
        if (pid == gm.dataManage.data.shareCode) {
            return;
        }
        gm.network.sendAction("addFriend", { scode: pid }, function (data) {
            if (data.result) {
                gm.dataManage.setAchievementValue(14, data.num);
            }
        }, null, true);
    };
    __egretProto__.getSignPackage = function () {
        var _this = this;
        var urlloader = new egret.URLLoader();
        //alert(gm.network.hostUrl + "/get-config?url=" + encodeURIComponent(location.href.split("#")[0]));
        var req = new egret.URLRequest(gm.network.hostUrl + "/get-config?url=" + encodeURIComponent(location.href.split("#")[0]));
        urlloader.load(req);
        req.method = egret.URLRequestMethod.GET;
        urlloader.addEventListener(egret.Event.COMPLETE, function (e) {
            if (_.isEmpty(e.target.data)) {
                return;
            }
            _this.signPackage = JSON.parse(e.target.data);
            _this.getWeiXinConfig(); //下面会定义
        }, this);
    };
    __egretProto__.getWeiXinConfig = function () {
        var bodyConfig = new BodyConfig();
        _.extend(bodyConfig, this.signPackage);
        wx.config(bodyConfig);
        this.initWechatShareTimeline();
        this.initWechatShareAppMessage();
    };
    __egretProto__.initWechatShareTimeline = function () {
        var gcShareCode = Util.getQueryString("shareCode") || "";
        var channel = gm.dataManage.data.channel;
        var shareChannel = _.endsWith(channel + "", "_") ? channel : channel + "_";
        var bodyMenuShareTimeline = new BodyMenuShareTimeline();
        bodyMenuShareTimeline.title = "疯狂打怪兽，减压神器。根本停不下来——" + gm.dataManage.data.name;
        bodyMenuShareTimeline.link = gm.network.gameUrl + "&scode=" + gm.dataManage.data.shareCode + "&channel=" + shareChannel + "&friendCode=" + gcShareCode;
        bodyMenuShareTimeline.imgUrl = gm.dataManage.data.avatar;
        bodyMenuShareTimeline.trigger = function () {
            //            alert('用户点击分享到朋友圈');
        };
        bodyMenuShareTimeline.success = function () {
            //   if (!gm.dataManage.data.dailyEvent.shareTimeline) {
            gm.network.sendAction("gainShareReward", {}, function (data) {
                gm.dataManage.addMoney(data.awardVal, data.awardType);
                gm.dataManage.data.dailyEvent.shareTimeline = true;
                gm.dataManage.isNotFirstShared = true;
                gm.dataManage.shareTimes = data.shareTimes;
                gm.dataManage.lastShareTime = data.lastShareTime;
                if (gm.dataManage.shareTimes == 1)
                    gm.dataManage.timeRemain = Conf.shareReward[3].duration;
            });
            //   }
        };
        bodyMenuShareTimeline.cancel = function () {
            //            alert('已取消');
        };
        bodyMenuShareTimeline.fail = function (res) {
            alert(JSON.stringify(res));
        };
        wx.onMenuShareTimeline(bodyMenuShareTimeline);
    };
    __egretProto__.initWechatShareAppMessage = function () {
        var gcShareCode = Util.getQueryString("shareCode") || "";
        var channel = gm.dataManage.data.channel;
        var shareChannel = _.endsWith(channel + "", "_") ? channel : channel + "_";
        var bodyMenuShareAppMessage = new BodyMenuShareAppMessage();
        bodyMenuShareAppMessage.title = "疯狂打怪兽";
        bodyMenuShareAppMessage.desc = "疯狂打怪兽，减压神器。根本停不下来——" + gm.dataManage.data.name;
        bodyMenuShareAppMessage.link = gm.network.gameUrl + "&scode=" + gm.dataManage.data.shareCode + "&channel=" + shareChannel + "&friendCode=" + gcShareCode;
        bodyMenuShareAppMessage.imgUrl = gm.dataManage.data.avatar;
        bodyMenuShareAppMessage.trigger = function () {
            //            alert('用户点击发送给朋友');
        };
        bodyMenuShareAppMessage.success = function () {
            //            alert('已分享');
        };
        bodyMenuShareAppMessage.cancel = function () {
            //            alert('已取消');
        };
        bodyMenuShareAppMessage.fail = function (res) {
            alert(JSON.stringify(res));
        };
        wx.onMenuShareAppMessage(bodyMenuShareAppMessage);
    };
    return Wechat;
})();
Wechat.prototype.__class__ = "Wechat";
