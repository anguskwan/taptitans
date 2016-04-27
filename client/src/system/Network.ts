/**
 * Created by lhb on 15/9/6.
 */
declare class h5api {
    static showPayQrCode(url, title, tip);
}
declare class mqq{
    static tenpay: any;
    static invoke(type, api, params?, cb?);
}
class Network {

    private pomelo:Pomelo;
    private host:string = "42.96.145.64";
    private port:string = '13014';
    public payURL : string = "http://taptitans.hortorgames.com/pay";
    public gameUrl : string = "http://taptitans.hortorgames.com/taptitans-route/share?gameId=taptitans";
    public hostUrl : string = "http://taptitans.hortorgames.com/taptitans-route";
    public authUrl : string;
    public getOpenIdUrl: string = "http://taptitans.hortorgames.com/taptitans-route/getOpenId";
    public locateUrl: string = "http://taptitans.hortorgames.com/taptitans-route/locate";
    public areaId: string;
    public ignoreInterrupt:boolean = true;
    private isInit:boolean = false;
    public isOffline = true;
    public env = "wechat";
    private juheAppId:string;
    public ver:string;
    public playerId:number;

    public constructor() {
        if (location.host == "h5-qq.hortorgames.com") {
            this.env = "qq";
        }
        this.initAddr();
    }

    public init(playerId) {
        if (this.isInit) {return;}
        console.warn("init:", playerId);
        this.isInit = true;
        this.pomelo = new Pomelo();
        this.registerListeners();
        this.pomeloLogin(playerId);

        this.on("close", function() {

            if (gm.dataManage && !this.ignoreInterrupt) {
//                alert("网络中断，请重新连接");
//                window.location.reload();
                gm.gameUI.showLoadingLayer();
                this.isOffline = true;
                this.pomeloLogin(gm.dataManage.data.id);
//                egret.setTimeout(() => {
//                    egret.Ticker.getInstance().pause();
//                }, this, 3000);
            }
            console.log("pomelo closed.");
        }.bind(this));
        this.on("io-error", function() {
            console.log("pomelo io error.");
        });
    }

    registerListeners() {
        this.pomelo.on("broadcast", (data) => {
            alert(data.msg);
        });
        this.pomelo.on("shutdown", (data) => {
            this.ignoreInterrupt = true;
            this.pomelo.disconnect();
            alert(data.msg);
            egret.Ticker.getInstance().pause();
        });
        this.pomelo.on("kicked", (data) => {
            this.ignoreInterrupt = true;
            this.pomelo.disconnect();
            alert(data.msg);
            egret.Ticker.getInstance().pause();
        });
        this.pomelo.on("beated", (data) => {
            var result = data.result; //add pk tip
            gm.postMessage(consts.kMessageOpponentAtt);
            if (result.isWin) {
                gm.dataManage.data.protectExpire = moment().add(Conf.config.protectTimeByPK, 'h').toDate();
                gm.dataManage.costMoney(result.gold, 'gold');
                gm.dataManage.costMoney(result.relic, 'relic');
            } else {
                gm.dataManage.addMoney(result.defenderGold, 'gold');
                gm.dataManage.addMoney(result.defenderRelic, 'relic');
            }
        });
        this.pomelo.on("showPKButton", (data) => {
            var isShow = data.isShow;
            tt.Setting.isShowPKButton = isShow;
            gm.postMessage(consts.kMessageIsShowPKBtn);
        });

        this.pomelo.on("approved",(data) => {
            gm.dataManage.data.guild = data.gid;
        });

        this.pomelo.on("guildKicked",(data) => {
            gm.dataManage.data.guild = 0;
            alert("你已经被踢出工会。");
            gm.postMessage(consts.kMessageKickedGuild);
        });

        this.pomelo.on("newMail", (data) => {
            gm.postMessage(consts.kMessageNewMail);
        });
    }

    pomeloLogin(playerId) {
        var self = this;
        var pomelo = this.pomelo;
        this.pomelo.init({
            host: this.host,
            port: this.port
        }, function() {
            pomelo.request('gate.gateHandler.queryEntry', {
                playerId: playerId
            }, function(res) {
                console.log("[Network] gate queryEntry: " + JSON.stringify(res));
                self.ignoreInterrupt = true;
                tt.Setting.isShowPKButton = res.showPKButton;
                pomelo.disconnect();
                if (res.code != 200) {
                    console.log("[Network] gate queryEntry error.");
                    alert("网络连接失败，服务器可能开启了维护模式");
                } else {
                    self.ver = res.ver || '4.0.1';
                    var route = playerId ? "connector.entryHandler.enter" : "connector.entryHandler.create";
                    pomelo.init({host: res.host, port: res.port}, function() {
                        pomelo.request(route, {
                            playerId: playerId,
                            loginType: egret.MainContext.deviceType
                        }, function(res) {
                            console.log("[Network] connector entry: " + JSON.stringify(res));
                            if (res.code == 4004) {
                                pomelo.disconnect();
                                alert("您在服务器还没有登出，请重试");
                                egret.setTimeout(() => {
                                    self.pomeloLogin(playerId);
                                }, this, 1000);
                                return;
                            }
                            if (res.code != 200) {
                                alert(res.msg);
                                Util.delCookie("playerId");
                                if (Util.isLocalServer()) {
                                    window.location.reload();
                                } else {
                                    var scode = Util.getQueryString('scode') || "";
                                    var channel = Util.getQueryString('channel') || "";
                                    window.location.href = self.hostUrl+"/index?scode="+scode  + "&channel="+channel;
                                }
                                return;
                            }
                            if (!playerId) {
                                Util.setCookie("playerId", res.data.id);
                            }
                            self.playerId = playerId;
                            self.ignoreInterrupt = false;
                            self.isOffline = false;
                            gm.onLogin(res.data);

                            // 发送聚合日志;
                            var channelType = Util.getQueryString('channelType');
                            if (channelType == "juhe") {
                                self.juhe_login();
                            }
                        })
                    });
                }
            })
        });
    }

    private initAddr() {
        switch (Util.getQueryString('d')) {
            case '1': // local
                //this.host = "127.0.0.1";
                  this.host = "192.168.1.228";//zhu
                //this.host = "192.168.1.234";//xie
                this.port = '13014';
                break;
            case '2': // test
                this.host = "42.96.145.64";
                this.port = '13024';
                this.gameUrl = "http://a"+Util.randomInt(100,999) +".h5-api-test.secret-cn.com/auth/login?gameId=taptitans";
                this.payURL = "http://h5-api-test.secret-cn.com/pay";
                this.locateUrl = "http://h5-api-test.secret-cn.com/taptitans-route/locate";
                this.hostUrl = "http://h5-api-test.secret-cn.com/taptitans-route";
                this.juheAppId = constsLocal.kJuHeTestAppId;
                break;
            case '3': // test
                this.host = "192.168.1.228";
                this.port = '30005';
                this.gameUrl = "http://a"+Util.randomInt(100,999) +".h5-api-test.secret-cn.com/auth/login?gameId=taptitans";
                this.payURL = "http://h5-api-test.secret-cn.com/pay";
                break;
            default :

                if (this.env == "qq") {
                    this.host = "115.28.87.8";
                    this.port = "13014";
                    this.payURL = "http://qq.hortorgames.com/pay";
                    this.gameUrl = window.location.href;
                    this.hostUrl = "http://qq.hortorgames.com/taptitans";
                } else {
                    //this.host = "42.96.173.183";
                    //this.port = "13014";
                    //this.payURL = "http://wx.hortor.net/pay";
                    //this.gameUrl = "http://a"+ Util.randomInt(100,999) +".wx.hortor.net/auth/login?gameId=taptitans";
                    //this.hostUrl = "http://wx.hortor.net/taptitans";
                    this.juheAppId = constsLocal.kJuHeAppId;
                }
                break;
        }
    }

    loginToMultipleServer() {
        console.log("[MultipleServer], begin to get open ID.");
        var code = "";
        //var channel = "hortor";
        var channel = Util.getQueryString('channel');
        channel = !!channel ? channel : "hortor";
        var url = this.getOpenIdUrl + `?code=${code}&channel=${channel}`;
        console.log("[MultipleServer], get open ID url:" + url);
        //alert("[MultipleServer], get open ID url:" + url);
        var openId = '';
        var token = Util.getQueryString('token');
        var locateUrl = this.locateUrl + `?openId=${openId}&channel=${channel}&token=${token}`;
        this.httpReq(locateUrl, "get", null, (locateData) => {
            this.areaId = locateData.areaId;
            this.host = locateData.areaHost;
            this.port = locateData.areaPort;
            this.payURL = locateData.payUrl;
            this.authUrl = locateData.authUrl;
            var userToken = locateData.userToken;

            console.log("[MultipleServer], locateUrl:" + `authUrl=${this.authUrl}, payUrl=${this.payURL}, areaId=${this.areaId}, areaHost=${this.host}, areaPort=${this.port}`);

            var loginUrl = this.authUrl + `?userToken=${userToken}&t=${new Date().getTime()}&channel=${channel}`;
            console.log("login url:", loginUrl);
            this.httpReq(loginUrl, "get", null, (data) => {
                console.log("data: ", data);
                this.init(data.playerId.toString());
            }, (err) => {
                alert("登陆失败，请重新登陆游戏");
                console.error("login failed.");
            });
        });
    }

    juhe_authed(callback){
        var cb_authed = function(data){
            var data = typeof data === "object" ? data : eval("("+data+")");
            if(!!data && !!data.uid && !!data.token){
                console.warn("authed success检测成功");

                //data.uid和data.token数据示例
                //token:7fe6fbb6334e599c423659748c41a935
                //uid:3

                callback(null, data);
            }else{
                callback("获取用户信息检测失败，请重新登录", data);//登录环境不对 直接中断中游戏载入给出提示即可
            }
        };

        JUHE.authed(cb_authed);
    }

    juhe_authin(callback){
        var cb_authin = function(data){
            var data = typeof data === "object" ? data : eval("("+data+")");
            if(!!data && !!data.result && data.result == "success"){
                console.warn("authin success认证成功");
                //调用步骤三
                callback(null, data);
            }else{
                callback("认证失败", data);	//appid和环境认证不对 	中断游戏载入直接给出提示即可
            }
        };
        console.warn('juhe:', this.juheAppId);
        JUHE.authin(this.juheAppId, cb_authin, this);
    }

    juhe_uinfo(callback){
        var cb_uinfo = function(data){
            var data = typeof data === "object" ? data : eval("("+data+")");
            if(!!data && !!data.err){
                callback("用户信息获取失败,请重新登录后再试", data);
            }else if(!!data && !!data.result){
                data = data.result;

                //d.name和d.sex和d.logo和和d.last_server_id数据示例
                //name:小鱼儿		//昵称,无则为空
                //sex:1			//1男 2女 3未知
                //logo:http_url_xxxx	//头像地址,无则为空
                //last_server_id:1	//最近登录服务器数字编号供参考，方便自动选中服务器
                //channel_id:1		//用户来源渠道编号,可据此做特殊的展现

                //调用步骤四
                //再等待回调期间持续载入游戏资源...
                callback(null, data);
            } else {
                callback("用户信息获取失败,请重新登录后再试", null);
            }
        };
        JUHE.uinfo(cb_uinfo, this);
    }

    juhe_login(){
        var cb_gameserverlogin = function(data){
            var data = typeof data === "object" ? data : eval("("+data+")");
            if(data && data.err){
                console.warn("登录日志发送失败");
                //开始游戏的正常进程
            }else if(data && data.result){
                data = data.result;
                console.warn("登录日志发送成功");
            }
        };
        JUHE.ulogin(1, cb_gameserverlogin, this);	//(server_id,callbackFunction,callbackObject)	//登录的服务器数字编号,如果没有多区服 给1即可
    }



    loginToAllyServer() {
        //var cb_authed=function(data){
        //    var data = typeof data === "object" ? data : eval("("+data+")")
        //    if(data && data.uid && data.token){
        //        alert("authed success检测成功");

        //        console.log(`[LOGIN]: Ally server: data.uid=${data.uid}, data.token=${data.token}.`);

        //    } else {
        //        alert("authed fail获取用户信息检测失败，请重新登录");    //登录环境不对 直接中断中游戏载入给出提示即可
        //    }

        //}
        //JUHE.authed(cb_authed)        //(callbackFunction,callbackObject)
        var self = this;
        self.juhe_authin(function(err, data){
            if (!!err){
                alert(err);
                return;
            }
            var openId = Util.getQueryString('uid');
            var channelToken = Util.getQueryString('token');
            var channelType = Util.getQueryString('channelType');
            var channel = Util.getQueryString('channel');

            var locateUrl = self.locateUrl + `?openId=${openId}&channel=${channel}&channelToken=${channelToken}`;
            console.log("locate url=", locateUrl);
            self.httpReq(locateUrl, "get", null, (locateData) => {
                self.areaId = locateData.areaId;
                self.host = locateData.areaHost;
                self.port = locateData.areaPort;
                self.payURL = locateData.payUrl;
                self.authUrl = locateData.authUrl;
                var userToken = locateData.userToken;

                console.log("[MultipleServer], locateUrl:" + `authUrl=${self.authUrl}, payUrl=${self.payURL}, areaId=${self.areaId}, areaHost=${self.host}, areaPort=${self.port}`);

                var loginUrl = self.authUrl + `?userToken=${userToken}&t=${new Date().getTime()}&channel=${channel}`;
                console.log("login url:", loginUrl);
                self.httpReq(loginUrl, "get", null, (data) => {
                    console.log("data: ", data);
                    self.init(data.playerId.toString());
                }, (err) => {
                    console.error("login failed.");
                });
            });
        });
    }

    login() {
        console.log("begin to login");
        var channelType = Util.getQueryString('channelType');
        console.log("[LOGIN]: channelType=", channelType);

        if (Util.isLocalServer()){
            this.init(Util.getCookie("playerId"));
            return;
        }

        if (channelType == "juhe") {
            this.loginToAllyServer();
        }
        else {
            this.loginToMultipleServer();
        }
        //
        //if (Util.isLocalServer()) {
        //    this.init(Util.getCookie("playerId"));
        //} else {
        //    var token = Util.getQueryString('openId');
        //    var url = this.hostUrl + "/login?openId=" + token + "&t=" + new Date().getTime();
        //    this.httpReq(url, "get", null, (data) => {
        //        this.init(data.toString());
        //    }, (err) => {
        //        var scode = Util.getQueryString('scode');
        //        var channel = Util.getQueryString('channel');
        //        var gcShareCode = Util.getQueryString('shareCode');
        //        window.location.href = this.hostUrl + "/index" + "?t=" + Date.now() + (scode ? "&scode="+scode : "") + (channel? "&channel="+channel : "") + (gcShareCode ? "&shareCode="+gcShareCode : "");
        //    });
        //}
    }

    on(event, fn) {
        this.pomelo.on(event, fn);
    }

    notify(route, msg) {
        if (this.isOffline) {return;}
        this.pomelo.notify(route, msg);
    }

    request(route, msg, cb?, fail?, noRefresh?) {
        this.pomelo.request(route, msg, function(res) {
            if (res.code != 200) {
                console.log("[Network] error route: " + JSON.stringify(msg) + " msg: " + JSON.stringify(res));
//                if (res.refresh || !noRefresh) {
                if (res.show || res.refresh) {
                    alert(res.msg);
                }
                if (res.refresh) {
                    window.location.reload();
                } else {
                    Util.invokeCallback(fail, res.msg);
                }
            } else {
                Util.invokeCallback(cb, res.data);
            }
        });
    }

    sendAction(actionName, msg?, cb?, fail?, noRefresh?) {
        var route = "player.playerHandler.gameAction";
        msg = msg || {};
        msg.__action = actionName;
        this.request(route, msg, cb, fail, noRefresh);
    }

    getRankList(cb) {
        this.request("rank.rankHandler.getRankList", {}, cb);
    }

    getFriendsRankList(cb) {
        this.request("rank.rankHandler.getFriendsRankList", {}, cb);
    }

    getContestRankList(cb) {
        this.request("rank.rankHandler.getContestRankList", {contestId:gm.dataManage.data.contestId}, cb);
    }

    getBattlePointRankList(cb) {
        this.request("rank.rankHandler.getBattlePointRankList", {}, cb);
    }

    getGlobalBPList(start,cb,fail){
        this.request("rank.rankHandler.getGlobalBPList", {start:start}, cb,fail);
    }

    purchaseForQQ(data, cb, fail) {
        var url;
//        if (egret.SystemOSType.ADNROID == egret.Html5Capatibility._System_OS) {
//            url = "mqqapi://tenpay/pay?src_type=web&token_id="+data.token_id+"&version=1&callback_name=gm.network.qqPurchaseCB&callback_type=javascript"
//        } else {
//            url = "mqqapiwallet://wallet/pay?src_type=web&order_no="+data.token_id+"&version=1&callback_name=gm.network.qqPurchaseCB&callback_type=javascript"
//        }
//        window.open(url, '_self');
        mqq.tenpay.pay({
            tokenId: data.token_id,
            pubAcc: "3163974800",
            pubAccHint: "欢迎关注【疯狂游乐场】，给你好玩的社交娱乐产品"
        }, (result) => {
            if (!result.resultCode) {
                Util.invokeCallback(cb);
            } else {
                Util.invokeCallback(fail);
            }
        })
    }

    purchaseForJuhe(id, cb, fail){
        var ext = JSON.stringify({
            uid: gm.dataManage.data.uniqueId,
            areaId:this.areaId
        });
        var game_od = {			                    //支付订单信息orderObject
            appid : this.juheAppId,			        //游戏分配得到的id填充一下
            uid : gm.dataManage.data.uniqueId,		//登录用户
            ext : ext,		                        //游戏方发起支付时的透传参数，没有给空
            server_id : 1,			                //游戏服务器id
            item_id : id,			                //游戏内充值档id
            item_amount : 1,			            //游戏内充值档对应充值数量
            order_id : null,	                    //游戏内充值发起时的生成的游戏内支付订单号,有则给出，没有给空
        };
        //alert(JSON.stringify(game_od));
        JUHE.pay(game_od, function(r){
            var rs = typeof r === "object" ? r : eval("("+r+")");
            if(!!rs && rs.result) {
                if(rs.result=="success"){
                    //alert("pay success支付成功");	//成功
                    Util.invokeCallback(cb);
                }else if(rs.result=="fail"){
                    //alert("pay fail支付失败");	//失败
                    Util.invokeCallback(fail, consts.kWechatPayStatusFail);
                }else if(rs.result=="cancel"){
                    //alert("pay cancel支付取消");	//取消
                    Util.invokeCallback(fail, consts.kWechatPayStatusCancel);
                }
            } else {
                //alert("pay cancel支付取消");
                Util.invokeCallback(fail, consts.kWechatPayStatusFail);
            }
        }, this);
    }

    purchase(id, cb, fail) {
        var channelType = Util.getQueryString('channelType');
        if (channelType == "juhe") {
            this.purchaseForJuhe(id, cb, fail);
            return;
        }
        var self = this;
        var orderInfo = {
            goodsId : id,
            userId : gm.dataManage.data.uniqueId,
            gameId: "taptitans",
            ext : this.areaId
        };
        //alert(JSON.stringify(orderInfo));
        this.httpReq(this.payURL+"/create-order", "post", orderInfo, function(data) {
            if (self.env == "qq") {
                self.purchaseForQQ(data, cb, fail);
            } else {
                wx.chooseWXPay({
                    timestamp: data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: data.nonce_str, // 支付签名随机串，不长于 32 位
                    package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                    signType: data.sign_type, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: data.pay_sign, // 支付签名
                    success: function (res) {
                        if (Util.isOnlineServer()) {
                            var meta = Conf.payment[id];
                        }
                        gm.dataManage.data.dailyEvent.purchase = true;
                        gm.postMessage(consts.kMessageIsGetActivityGiftBag);
                        Util.invokeCallback(cb);
                    },
                    cancel : function() {
                        Util.invokeCallback(fail, consts.kWechatPayStatusCancel);
                    },
                    fail : function() {
                        //alert("如果您遇到无法支付，请关注疯狂游乐场！从疯狂游乐场入口进入");
                        self.httpReq(self.payURL+"/order/qrcode", "post", {
                            orderId: data.order_id
                        }, function(data) {
                            var code_url = "http://wx.hortor.net/auth/qrcode?qr=" + encodeURIComponent(data.code_url)
                            h5api.showPayQrCode(code_url,"支付失败了？","长按识别二维码支付");
                        });
                        Util.invokeCallback(fail, consts.kWechatPayStatusFail);
                    }
                })
            }
        });
    }

    buyDiamond(id, cb, fail) {
        this.purchase(id, function() {
            var count = gm.dataManage.data.purchaseCount;
            count[id] = count[id] || 0;
            count[id] ++;
            gm.network.updateDiamond(id, cb);
        }, fail)
    }

    updateDiamond(id, cb) {
        gm.network.sendAction("updateDiamond", {goodsId:id}, function(data) {
            if (data.added == 0) {
                egret.setTimeout(() => {
                    gm.network.updateDiamond(id,cb);
                }, this, 1000);
            } else {
                Util.invokeCallback(cb, data);
            }
        });
    }

    buyMonthCard(cb, fail) {
        this.purchase("311", function() {
            gm.network.sendAction("getMonthCardTime", {}, cb);
            if(Util.isOpenMonth()) {
                gm.dataManage.addMoney(188, "diamond");
            }
        }, fail)
    }

    buySupMonthCard(cb, fail) {
        this.purchase("313", function() {
            gm.network.sendAction("getSupMonthCardTime", {}, cb);
            if(Util.isOpenMonth()) {
                gm.dataManage.addMoney(888, "diamond");
            }
        }, fail)
    }

    buyLifeCard(cb, fail) {
        this.purchase("314", function() {
            gm.network.sendAction("getIsBoughtLifeCard", {}, cb);
            if(Util.isOpenLifeCardActivity() || Util.isOpenMonth()) {
               gm.dataManage.addMoney(1888, "diamond");
            }
        }, fail)
    }

    buyThreeDiamond(cb, fail) {
        this.purchase("315", function() {
            gm.network.sendAction("refreshActivityFirstPurchaseGift", {}, cb);
        }, fail)
    }

    getMails(cb) {
        this.sendAction("getMails", {}, cb);
    }

    readMail(idx,cb) {
        this.sendAction("readMail", {idx: idx},cb)
    }

    getMailAttachments(idx, cb) {
        this.sendAction("getMailAttachments", {idx : idx}, cb);
    }

    delMail(id,getGoods,read,cb,fail){
        this.sendAction("delMail", {id :id,getGoods:getGoods,read:read}, () =>{

            Util.invokeCallback(cb);
        },fail);
    }

    httpReq(url, type, msg, cb, fail?) {
        var loader:egret.URLLoader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, (e) => {
            Util.invokeCallback(cb, JSON.parse(e.target.data));
        }, this);
        loader.addEventListener(egret.IOErrorEvent.IO_ERROR, (e) => {
            Util.invokeCallback(fail, JSON.parse(e.target.data));
        }, this);
        var request:egret.URLRequest = new egret.URLRequest(url);
        request.method = type == "post" ? egret.URLRequestMethod.POST : egret.URLRequestMethod.GET;
        if (type == "post") {
            request.data = new egret.URLVariables();
            request.data.variables = msg;
        }
        loader.load(request);
    }

    getBoardText(cb) {
        var url = '';
        var areaId = this.areaId;
        console.warn("areaId:" + areaId);
        if (!areaId){
            url = Util.getResourceUrl("board.txt");
        } else {
            url = Util.getResourceUrl(areaId + "/board.txt");
        }
        url += "?v=" + this.ver;
        console.log("[BOARD]: get board url:", url);
        RES.getResByUrl(url, function(data:any) {
            if(data) {
                console.log("get text: ", data);
                Util.invokeCallback(cb, data);
                return;
            }

            Util.invokeCallback(cb, "");
        }, this, RES.ResourceItem.TYPE_TEXT);
    }
}
