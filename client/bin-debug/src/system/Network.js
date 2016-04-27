var Network = (function () {
    function Network() {
        this.host = "42.96.145.64";
        this.port = '13014';
        this.payURL = "http://taptitans.hortorgames.com/pay";
        this.gameUrl = "http://taptitans.hortorgames.com/taptitans-route/share?gameId=taptitans";
        this.hostUrl = "http://taptitans.hortorgames.com/taptitans-route";
        this.getOpenIdUrl = "http://taptitans.hortorgames.com/taptitans-route/getOpenId";
        this.locateUrl = "http://taptitans.hortorgames.com/taptitans-route/locate";
        this.ignoreInterrupt = true;
        this.isInit = false;
        this.isOffline = true;
        this.env = "wechat";
        if (location.host == "h5-qq.hortorgames.com") {
            this.env = "qq";
        }
        this.initAddr();
    }
    var __egretProto__ = Network.prototype;
    __egretProto__.init = function (playerId) {
        if (this.isInit) {
            return;
        }
        console.warn("init:", playerId);
        this.isInit = true;
        this.pomelo = new Pomelo();
        this.registerListeners();
        this.pomeloLogin(playerId);
        this.on("close", function () {
            if (gm.dataManage && !this.ignoreInterrupt) {
                //                alert("网络中断，请重新连接");
                //                window.location.reload();
                gm.gameUI.showLoadingLayer();
                this.isOffline = true;
                this.pomeloLogin(gm.dataManage.data.id);
            }
            console.log("pomelo closed.");
        }.bind(this));
        this.on("io-error", function () {
            console.log("pomelo io error.");
        });
    };
    __egretProto__.registerListeners = function () {
        var _this = this;
        this.pomelo.on("broadcast", function (data) {
            alert(data.msg);
        });
        this.pomelo.on("shutdown", function (data) {
            _this.ignoreInterrupt = true;
            _this.pomelo.disconnect();
            alert(data.msg);
            egret.Ticker.getInstance().pause();
        });
        this.pomelo.on("kicked", function (data) {
            _this.ignoreInterrupt = true;
            _this.pomelo.disconnect();
            alert(data.msg);
            egret.Ticker.getInstance().pause();
        });
        this.pomelo.on("beated", function (data) {
            var result = data.result; //add pk tip
            gm.postMessage(consts.kMessageOpponentAtt);
            if (result.isWin) {
                gm.dataManage.data.protectExpire = moment().add(Conf.config.protectTimeByPK, 'h').toDate();
                gm.dataManage.costMoney(result.gold, 'gold');
                gm.dataManage.costMoney(result.relic, 'relic');
            }
            else {
                gm.dataManage.addMoney(result.defenderGold, 'gold');
                gm.dataManage.addMoney(result.defenderRelic, 'relic');
            }
        });
        this.pomelo.on("showPKButton", function (data) {
            var isShow = data.isShow;
            tt.Setting.isShowPKButton = isShow;
            gm.postMessage(consts.kMessageIsShowPKBtn);
        });
        this.pomelo.on("approved", function (data) {
            gm.dataManage.data.guild = data.gid;
        });
        this.pomelo.on("guildKicked", function (data) {
            gm.dataManage.data.guild = 0;
            alert("你已经被踢出工会。");
            gm.postMessage(consts.kMessageKickedGuild);
        });
        this.pomelo.on("newMail", function (data) {
            gm.postMessage(consts.kMessageNewMail);
        });
    };
    __egretProto__.pomeloLogin = function (playerId) {
        var self = this;
        var pomelo = this.pomelo;
        this.pomelo.init({
            host: this.host,
            port: this.port
        }, function () {
            pomelo.request('gate.gateHandler.queryEntry', {
                playerId: playerId
            }, function (res) {
                console.log("[Network] gate queryEntry: " + JSON.stringify(res));
                self.ignoreInterrupt = true;
                tt.Setting.isShowPKButton = res.showPKButton;
                pomelo.disconnect();
                if (res.code != 200) {
                    console.log("[Network] gate queryEntry error.");
                    alert("网络连接失败，服务器可能开启了维护模式");
                }
                else {
                    self.ver = res.ver || '4.0.1';
                    var route = playerId ? "connector.entryHandler.enter" : "connector.entryHandler.create";
                    pomelo.init({ host: res.host, port: res.port }, function () {
                        pomelo.request(route, {
                            playerId: playerId,
                            loginType: egret.MainContext.deviceType
                        }, function (res) {
                            console.log("[Network] connector entry: " + JSON.stringify(res));
                            if (res.code == 4004) {
                                pomelo.disconnect();
                                alert("您在服务器还没有登出，请重试");
                                egret.setTimeout(function () {
                                    self.pomeloLogin(playerId);
                                }, this, 1000);
                                return;
                            }
                            if (res.code != 200) {
                                alert(res.msg);
                                Util.delCookie("playerId");
                                if (Util.isLocalServer()) {
                                    window.location.reload();
                                }
                                else {
                                    var scode = Util.getQueryString('scode') || "";
                                    var channel = Util.getQueryString('channel') || "";
                                    window.location.href = self.hostUrl + "/index?scode=" + scode + "&channel=" + channel;
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
                        });
                    });
                }
            });
        });
    };
    __egretProto__.initAddr = function () {
        switch (Util.getQueryString('d')) {
            case '1':
                //this.host = "127.0.0.1";
                this.host = "192.168.1.228"; //zhu
                //this.host = "192.168.1.234";//xie
                this.port = '13014';
                break;
            case '2':
                this.host = "42.96.145.64";
                this.port = '13024';
                this.gameUrl = "http://a" + Util.randomInt(100, 999) + ".h5-api-test.secret-cn.com/auth/login?gameId=taptitans";
                this.payURL = "http://h5-api-test.secret-cn.com/pay";
                this.locateUrl = "http://h5-api-test.secret-cn.com/taptitans-route/locate";
                this.hostUrl = "http://h5-api-test.secret-cn.com/taptitans-route";
                this.juheAppId = constsLocal.kJuHeTestAppId;
                break;
            case '3':
                this.host = "192.168.1.228";
                this.port = '30005';
                this.gameUrl = "http://a" + Util.randomInt(100, 999) + ".h5-api-test.secret-cn.com/auth/login?gameId=taptitans";
                this.payURL = "http://h5-api-test.secret-cn.com/pay";
                break;
            default:
                if (this.env == "qq") {
                    this.host = "115.28.87.8";
                    this.port = "13014";
                    this.payURL = "http://qq.hortorgames.com/pay";
                    this.gameUrl = window.location.href;
                    this.hostUrl = "http://qq.hortorgames.com/taptitans";
                }
                else {
                    //this.host = "42.96.173.183";
                    //this.port = "13014";
                    //this.payURL = "http://wx.hortor.net/pay";
                    //this.gameUrl = "http://a"+ Util.randomInt(100,999) +".wx.hortor.net/auth/login?gameId=taptitans";
                    //this.hostUrl = "http://wx.hortor.net/taptitans";
                    this.juheAppId = constsLocal.kJuHeAppId;
                }
                break;
        }
    };
    __egretProto__.loginToMultipleServer = function () {
        var _this = this;
        console.log("[MultipleServer], begin to get open ID.");
        var code = "";
        //var channel = "hortor";
        var channel = Util.getQueryString('channel');
        channel = !!channel ? channel : "hortor";
        var url = this.getOpenIdUrl + ("?code=" + code + "&channel=" + channel);
        console.log("[MultipleServer], get open ID url:" + url);
        //alert("[MultipleServer], get open ID url:" + url);
        var openId = '';
        var token = Util.getQueryString('token');
        var locateUrl = this.locateUrl + ("?openId=" + openId + "&channel=" + channel + "&token=" + token);
        this.httpReq(locateUrl, "get", null, function (locateData) {
            _this.areaId = locateData.areaId;
            _this.host = locateData.areaHost;
            _this.port = locateData.areaPort;
            _this.payURL = locateData.payUrl;
            _this.authUrl = locateData.authUrl;
            var userToken = locateData.userToken;
            console.log("[MultipleServer], locateUrl:" + ("authUrl=" + _this.authUrl + ", payUrl=" + _this.payURL + ", areaId=" + _this.areaId + ", areaHost=" + _this.host + ", areaPort=" + _this.port));
            var loginUrl = _this.authUrl + ("?userToken=" + userToken + "&t=" + new Date().getTime() + "&channel=" + channel);
            console.log("login url:", loginUrl);
            _this.httpReq(loginUrl, "get", null, function (data) {
                console.log("data: ", data);
                _this.init(data.playerId.toString());
            }, function (err) {
                alert("登陆失败，请重新登陆游戏");
                console.error("login failed.");
            });
        });
    };
    __egretProto__.juhe_authed = function (callback) {
        var cb_authed = function (data) {
            var data = typeof data === "object" ? data : eval("(" + data + ")");
            if (!!data && !!data.uid && !!data.token) {
                console.warn("authed success检测成功");
                //data.uid和data.token数据示例
                //token:7fe6fbb6334e599c423659748c41a935
                //uid:3
                callback(null, data);
            }
            else {
                callback("获取用户信息检测失败，请重新登录", data); //登录环境不对 直接中断中游戏载入给出提示即可
            }
        };
        JUHE.authed(cb_authed);
    };
    __egretProto__.juhe_authin = function (callback) {
        var cb_authin = function (data) {
            var data = typeof data === "object" ? data : eval("(" + data + ")");
            if (!!data && !!data.result && data.result == "success") {
                console.warn("authin success认证成功");
                //调用步骤三
                callback(null, data);
            }
            else {
                callback("认证失败", data); //appid和环境认证不对 	中断游戏载入直接给出提示即可
            }
        };
        console.warn('juhe:', this.juheAppId);
        JUHE.authin(this.juheAppId, cb_authin, this);
    };
    __egretProto__.juhe_uinfo = function (callback) {
        var cb_uinfo = function (data) {
            var data = typeof data === "object" ? data : eval("(" + data + ")");
            if (!!data && !!data.err) {
                callback("用户信息获取失败,请重新登录后再试", data);
            }
            else if (!!data && !!data.result) {
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
            }
            else {
                callback("用户信息获取失败,请重新登录后再试", null);
            }
        };
        JUHE.uinfo(cb_uinfo, this);
    };
    __egretProto__.juhe_login = function () {
        var cb_gameserverlogin = function (data) {
            var data = typeof data === "object" ? data : eval("(" + data + ")");
            if (data && data.err) {
                console.warn("登录日志发送失败");
            }
            else if (data && data.result) {
                data = data.result;
                console.warn("登录日志发送成功");
            }
        };
        JUHE.ulogin(1, cb_gameserverlogin, this); //(server_id,callbackFunction,callbackObject)	//登录的服务器数字编号,如果没有多区服 给1即可
    };
    __egretProto__.loginToAllyServer = function () {
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
        self.juhe_authin(function (err, data) {
            if (!!err) {
                alert(err);
                return;
            }
            var openId = Util.getQueryString('uid');
            var channelToken = Util.getQueryString('token');
            var channelType = Util.getQueryString('channelType');
            var channel = Util.getQueryString('channel');
            var locateUrl = self.locateUrl + ("?openId=" + openId + "&channel=" + channel + "&channelToken=" + channelToken);
            console.log("locate url=", locateUrl);
            self.httpReq(locateUrl, "get", null, function (locateData) {
                self.areaId = locateData.areaId;
                self.host = locateData.areaHost;
                self.port = locateData.areaPort;
                self.payURL = locateData.payUrl;
                self.authUrl = locateData.authUrl;
                var userToken = locateData.userToken;
                console.log("[MultipleServer], locateUrl:" + ("authUrl=" + self.authUrl + ", payUrl=" + self.payURL + ", areaId=" + self.areaId + ", areaHost=" + self.host + ", areaPort=" + self.port));
                var loginUrl = self.authUrl + ("?userToken=" + userToken + "&t=" + new Date().getTime() + "&channel=" + channel);
                console.log("login url:", loginUrl);
                self.httpReq(loginUrl, "get", null, function (data) {
                    console.log("data: ", data);
                    self.init(data.playerId.toString());
                }, function (err) {
                    console.error("login failed.");
                });
            });
        });
    };
    __egretProto__.login = function () {
        console.log("begin to login");
        var channelType = Util.getQueryString('channelType');
        console.log("[LOGIN]: channelType=", channelType);
        if (Util.isLocalServer()) {
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
    };
    __egretProto__.on = function (event, fn) {
        this.pomelo.on(event, fn);
    };
    __egretProto__.notify = function (route, msg) {
        if (this.isOffline) {
            return;
        }
        this.pomelo.notify(route, msg);
    };
    __egretProto__.request = function (route, msg, cb, fail, noRefresh) {
        this.pomelo.request(route, msg, function (res) {
            if (res.code != 200) {
                console.log("[Network] error route: " + JSON.stringify(msg) + " msg: " + JSON.stringify(res));
                //                if (res.refresh || !noRefresh) {
                if (res.show || res.refresh) {
                    alert(res.msg);
                }
                if (res.refresh) {
                    window.location.reload();
                }
                else {
                    Util.invokeCallback(fail, res.msg);
                }
            }
            else {
                Util.invokeCallback(cb, res.data);
            }
        });
    };
    __egretProto__.sendAction = function (actionName, msg, cb, fail, noRefresh) {
        var route = "player.playerHandler.gameAction";
        msg = msg || {};
        msg.__action = actionName;
        this.request(route, msg, cb, fail, noRefresh);
    };
    __egretProto__.getRankList = function (cb) {
        this.request("rank.rankHandler.getRankList", {}, cb);
    };
    __egretProto__.getFriendsRankList = function (cb) {
        this.request("rank.rankHandler.getFriendsRankList", {}, cb);
    };
    __egretProto__.getContestRankList = function (cb) {
        this.request("rank.rankHandler.getContestRankList", { contestId: gm.dataManage.data.contestId }, cb);
    };
    __egretProto__.getBattlePointRankList = function (cb) {
        this.request("rank.rankHandler.getBattlePointRankList", {}, cb);
    };
    __egretProto__.getGlobalBPList = function (start, cb, fail) {
        this.request("rank.rankHandler.getGlobalBPList", { start: start }, cb, fail);
    };
    __egretProto__.purchaseForQQ = function (data, cb, fail) {
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
        }, function (result) {
            if (!result.resultCode) {
                Util.invokeCallback(cb);
            }
            else {
                Util.invokeCallback(fail);
            }
        });
    };
    __egretProto__.purchaseForJuhe = function (id, cb, fail) {
        var ext = JSON.stringify({
            uid: gm.dataManage.data.uniqueId,
            areaId: this.areaId
        });
        var game_od = {
            appid: this.juheAppId,
            uid: gm.dataManage.data.uniqueId,
            ext: ext,
            server_id: 1,
            item_id: id,
            item_amount: 1,
            order_id: null,
        };
        //alert(JSON.stringify(game_od));
        JUHE.pay(game_od, function (r) {
            var rs = typeof r === "object" ? r : eval("(" + r + ")");
            if (!!rs && rs.result) {
                if (rs.result == "success") {
                    //alert("pay success支付成功");	//成功
                    Util.invokeCallback(cb);
                }
                else if (rs.result == "fail") {
                    //alert("pay fail支付失败");	//失败
                    Util.invokeCallback(fail, consts.kWechatPayStatusFail);
                }
                else if (rs.result == "cancel") {
                    //alert("pay cancel支付取消");	//取消
                    Util.invokeCallback(fail, consts.kWechatPayStatusCancel);
                }
            }
            else {
                //alert("pay cancel支付取消");
                Util.invokeCallback(fail, consts.kWechatPayStatusFail);
            }
        }, this);
    };
    __egretProto__.purchase = function (id, cb, fail) {
        var channelType = Util.getQueryString('channelType');
        if (channelType == "juhe") {
            this.purchaseForJuhe(id, cb, fail);
            return;
        }
        var self = this;
        var orderInfo = {
            goodsId: id,
            userId: gm.dataManage.data.uniqueId,
            gameId: "taptitans",
            ext: this.areaId
        };
        //alert(JSON.stringify(orderInfo));
        this.httpReq(this.payURL + "/create-order", "post", orderInfo, function (data) {
            if (self.env == "qq") {
                self.purchaseForQQ(data, cb, fail);
            }
            else {
                wx.chooseWXPay({
                    timestamp: data.timestamp,
                    nonceStr: data.nonce_str,
                    package: data.package,
                    signType: data.sign_type,
                    paySign: data.pay_sign,
                    success: function (res) {
                        if (Util.isOnlineServer()) {
                            var meta = Conf.payment[id];
                        }
                        gm.dataManage.data.dailyEvent.purchase = true;
                        gm.postMessage(consts.kMessageIsGetActivityGiftBag);
                        Util.invokeCallback(cb);
                    },
                    cancel: function () {
                        Util.invokeCallback(fail, consts.kWechatPayStatusCancel);
                    },
                    fail: function () {
                        //alert("如果您遇到无法支付，请关注疯狂游乐场！从疯狂游乐场入口进入");
                        self.httpReq(self.payURL + "/order/qrcode", "post", {
                            orderId: data.order_id
                        }, function (data) {
                            var code_url = "http://wx.hortor.net/auth/qrcode?qr=" + encodeURIComponent(data.code_url);
                            h5api.showPayQrCode(code_url, "支付失败了？", "长按识别二维码支付");
                        });
                        Util.invokeCallback(fail, consts.kWechatPayStatusFail);
                    }
                });
            }
        });
    };
    __egretProto__.buyDiamond = function (id, cb, fail) {
        this.purchase(id, function () {
            var count = gm.dataManage.data.purchaseCount;
            count[id] = count[id] || 0;
            count[id]++;
            gm.network.updateDiamond(id, cb);
        }, fail);
    };
    __egretProto__.updateDiamond = function (id, cb) {
        gm.network.sendAction("updateDiamond", { goodsId: id }, function (data) {
            if (data.added == 0) {
                egret.setTimeout(function () {
                    gm.network.updateDiamond(id, cb);
                }, this, 1000);
            }
            else {
                Util.invokeCallback(cb, data);
            }
        });
    };
    __egretProto__.buyMonthCard = function (cb, fail) {
        this.purchase("311", function () {
            gm.network.sendAction("getMonthCardTime", {}, cb);
            if (Util.isOpenMonth()) {
                gm.dataManage.addMoney(188, "diamond");
            }
        }, fail);
    };
    __egretProto__.buySupMonthCard = function (cb, fail) {
        this.purchase("313", function () {
            gm.network.sendAction("getSupMonthCardTime", {}, cb);
            if (Util.isOpenMonth()) {
                gm.dataManage.addMoney(888, "diamond");
            }
        }, fail);
    };
    __egretProto__.buyLifeCard = function (cb, fail) {
        this.purchase("314", function () {
            gm.network.sendAction("getIsBoughtLifeCard", {}, cb);
            if (Util.isOpenLifeCardActivity() || Util.isOpenMonth()) {
                gm.dataManage.addMoney(1888, "diamond");
            }
        }, fail);
    };
    __egretProto__.buyThreeDiamond = function (cb, fail) {
        this.purchase("315", function () {
            gm.network.sendAction("refreshActivityFirstPurchaseGift", {}, cb);
        }, fail);
    };
    __egretProto__.getMails = function (cb) {
        this.sendAction("getMails", {}, cb);
    };
    __egretProto__.readMail = function (idx, cb) {
        this.sendAction("readMail", { idx: idx }, cb);
    };
    __egretProto__.getMailAttachments = function (idx, cb) {
        this.sendAction("getMailAttachments", { idx: idx }, cb);
    };
    __egretProto__.delMail = function (id, getGoods, read, cb, fail) {
        this.sendAction("delMail", { id: id, getGoods: getGoods, read: read }, function () {
            Util.invokeCallback(cb);
        }, fail);
    };
    __egretProto__.httpReq = function (url, type, msg, cb, fail) {
        var loader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, function (e) {
            Util.invokeCallback(cb, JSON.parse(e.target.data));
        }, this);
        loader.addEventListener(egret.IOErrorEvent.IO_ERROR, function (e) {
            Util.invokeCallback(fail, JSON.parse(e.target.data));
        }, this);
        var request = new egret.URLRequest(url);
        request.method = type == "post" ? egret.URLRequestMethod.POST : egret.URLRequestMethod.GET;
        if (type == "post") {
            request.data = new egret.URLVariables();
            request.data.variables = msg;
        }
        loader.load(request);
    };
    __egretProto__.getBoardText = function (cb) {
        var url = '';
        var areaId = this.areaId;
        console.warn("areaId:" + areaId);
        if (!areaId) {
            url = Util.getResourceUrl("board.txt");
        }
        else {
            url = Util.getResourceUrl(areaId + "/board.txt");
        }
        url += "?v=" + this.ver;
        console.log("[BOARD]: get board url:", url);
        RES.getResByUrl(url, function (data) {
            if (data) {
                console.log("get text: ", data);
                Util.invokeCallback(cb, data);
                return;
            }
            Util.invokeCallback(cb, "");
        }, this, RES.ResourceItem.TYPE_TEXT);
    };
    return Network;
})();
Network.prototype.__class__ = "Network";
