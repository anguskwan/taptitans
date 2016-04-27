/**
 * Created by lhb on 15/10/10.
 */

class Wechat {

    public init() {
        var channelType = Util.getQueryString('channelType');
        //alert(channelType);
        console.log("channelType: ", channelType);

        if ("hortor" != channelType && "test" != channelType){
            return;
        }

        if (gm.network.env == "qq") {
            var gcShareCode = Util.getQueryString("shareCode") || "";
            var channel = gm.dataManage.data.channel;
            var shareChannel = _.endsWith(channel+"","_") ? channel : channel+ "_";
            mqq.invoke('data', 'setShareInfo', {
                share_url:gm.network.gameUrl + "&scode=" + gm.dataManage.data.shareCode + "&channel=" + shareChannel + "&friendCode=" + gcShareCode,
                title:"疯狂打怪兽",
                desc: "疯狂打怪兽，减压神器。根本停不下来——" + gm.dataManage.data.name,
                image_url:gm.dataManage.data.avatar
            }, function(){})
        } else {
            this.getSignPackage();
        }
        this.checkIfFromWechatFriend();
    }

    private checkIfFromWechatFriend() {
        var pid = Util.getQueryString('scode');
        if (!pid) {return;}
        if (pid == gm.dataManage.data.shareCode) {
            return;
        }
        gm.network.sendAction("addFriend", {scode: pid}, function(data) {
            if (data.result) {
                gm.dataManage.setAchievementValue(14, data.num);
            }
        }, null, true);
    }

    private signPackage:SignPackage;

    private getSignPackage() {
        var urlloader = new egret.URLLoader();
        //alert(gm.network.hostUrl + "/get-config?url=" + encodeURIComponent(location.href.split("#")[0]));
        var req = new egret.URLRequest(gm.network.hostUrl + "/get-config?url=" + encodeURIComponent(location.href.split("#")[0]));
        urlloader.load(req);
        req.method = egret.URLRequestMethod.GET;
        urlloader.addEventListener(egret.Event.COMPLETE, (e)=> {
            if (_.isEmpty(e.target.data)){return;}
            this.signPackage = <SignPackage>JSON.parse(e.target.data);
            this.getWeiXinConfig();//下面会定义
        }, this);
    }

    private getWeiXinConfig() {
        var bodyConfig = new BodyConfig();
        _.extend(bodyConfig, this.signPackage);
        wx.config(bodyConfig);
        this.initWechatShareTimeline();
        this.initWechatShareAppMessage();
    }

    private initWechatShareTimeline() {
        var gcShareCode = Util.getQueryString("shareCode") || "";
        var channel = gm.dataManage.data.channel;
        var shareChannel = _.endsWith(channel+"","_") ? channel : channel+ "_";
        var bodyMenuShareTimeline = new BodyMenuShareTimeline();
        bodyMenuShareTimeline.title = "疯狂打怪兽，减压神器。根本停不下来——" + gm.dataManage.data.name;
        bodyMenuShareTimeline.link = gm.network.gameUrl + "&scode=" + gm.dataManage.data.shareCode + "&channel=" + shareChannel + "&friendCode=" + gcShareCode;

        bodyMenuShareTimeline.imgUrl = gm.dataManage.data.avatar;
        bodyMenuShareTimeline.trigger = ()=> {
//            alert('用户点击分享到朋友圈');
        };
        bodyMenuShareTimeline.success = ()=> {
         //   if (!gm.dataManage.data.dailyEvent.shareTimeline) {

                gm.network.sendAction("gainShareReward", {}, (data) => {
                    gm.dataManage.addMoney(data.awardVal, data.awardType);
                    gm.dataManage.data.dailyEvent.shareTimeline = true;

                    gm.dataManage.isNotFirstShared=true;
                    gm.dataManage.shareTimes=data.shareTimes;
                    gm.dataManage.lastShareTime =data.lastShareTime;

                    if (gm.dataManage.shareTimes==1)
                        gm.dataManage.timeRemain= Conf.shareReward[3].duration;


                });
         //   }
        };
        bodyMenuShareTimeline.cancel = ()=> {
//            alert('已取消');
        };
        bodyMenuShareTimeline.fail = (res)=> {
            alert(JSON.stringify(res));
        };
        wx.onMenuShareTimeline(bodyMenuShareTimeline);
    }

    private initWechatShareAppMessage() {
        var gcShareCode = Util.getQueryString("shareCode") || "";
        var channel = gm.dataManage.data.channel;
        var shareChannel = _.endsWith(channel+"","_") ? channel : channel+ "_";
        var bodyMenuShareAppMessage = new BodyMenuShareAppMessage();
        bodyMenuShareAppMessage.title = "疯狂打怪兽";
        bodyMenuShareAppMessage.desc = "疯狂打怪兽，减压神器。根本停不下来——" + gm.dataManage.data.name;
        bodyMenuShareAppMessage.link = gm.network.gameUrl + "&scode=" + gm.dataManage.data.shareCode + "&channel=" + shareChannel + "&friendCode=" + gcShareCode;
        bodyMenuShareAppMessage.imgUrl = gm.dataManage.data.avatar;
        bodyMenuShareAppMessage.trigger = ()=> {
//            alert('用户点击发送给朋友');
        };
        bodyMenuShareAppMessage.success = ()=> {
//            alert('已分享');
        };
        bodyMenuShareAppMessage.cancel = ()=> {
//            alert('已取消');
        };
        bodyMenuShareAppMessage.fail = (res)=> {
            alert(JSON.stringify(res));
        };
        wx.onMenuShareAppMessage(bodyMenuShareAppMessage);
    }
}
