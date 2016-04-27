/**
 * Created by lhb on 15/9/1.
 */
var GM = (function () {
    function GM() {
        this.winSize = { width: 480, height: 756 };
        this.eventManage = new egret.EventDispatcher();
        this.messagesNeedPost = {};
        this.firstInit = true;
    }
    var __egretProto__ = GM.prototype;
    __egretProto__.registerMessage = function (name, selector, target) {
        this.eventManage.addEventListener(name, selector, target);
    };
    __egretProto__.removeMessage = function (name, selector, target) {
        this.eventManage.removeEventListener(name, selector, target);
    };
    __egretProto__.postMessage = function (name, data) {
        var evt = new egret.Event(name);
        evt.data = data;
        this.eventManage.dispatchEvent(evt);
    };
    __egretProto__.postMessageNextTick = function (name, data, once) {
        var _this = this;
        if (once === void 0) { once = true; }
        if (once && this.messagesNeedPost[name]) {
            return;
        }
        if (_.isEmpty(this.messagesNeedPost)) {
            egret.callLater(function () {
                _.each(_this.messagesNeedPost, function (v, k) {
                    _this.postMessage(k, v);
                });
                _this.messagesNeedPost = {};
            }, this);
        }
        this.messagesNeedPost[name] = data;
    };
    __egretProto__.init = function (mainLayer) {
        this.mainLayer = mainLayer;
        this.network = new Network();
        this.network.login();
    };
    __egretProto__.onTapScreen = function (pos) {
        if (this.dataManage.data.dailyEvent.clicks < 0) {
            if (!this.showClickError) {
                this.showClickError = true;
                alert("今日点击次数已达上限，请注意休息。");
            }
            return;
        }
        this.dataManage.onTapDamage(pos);
    };
    __egretProto__.onLogin = function (player) {
        if (!this.firstInit) {
            gm.gameUI.hideLoadingLayer();
            //            egret.Ticker.getInstance().resume();
            if (!this.dataManage.hasMonster) {
                if (player.mission == this.dataManage.data.mission) {
                    this.dataManage.monsterDead(false);
                }
                else {
                    this.dataManage.nextMission();
                }
            }
        }
        else {
            this.cacheData = player;
            this.drawScene();
        }
    };
    __egretProto__.drawScene = function () {
        if (this.cacheData && this.resReady) {
            this.dataManage = new DataManage(this.cacheData);
            this.timeManage = new TimeManage(this.cacheData, this.dataManage.getServerTime);
            if (this.firstInit) {
                this.firstInit = false;
                myDCAgent.init();
                var wechat = new Wechat();
                wechat.init();
                this.channel_1758 = new Channel_1758();
            }
            this.mainLayer.removeChildren();
            this.gameScene = new GameScene();
            this.mainLayer.addChild(this.gameScene);
            this.guiLayer = new egret.gui.UIStage();
            this.mainLayer.addChild(this.guiLayer);
            this.gameUI = new GameUI();
            this.guiLayer.addElement(this.gameUI);
            if (!!this.cacheData.isNewbiePackageBought && !this.cacheData.hasGainedNewGiftBag) {
                gm.network.sendAction("gainNewPlayerGiftBag", {}, function () {
                });
                this.cacheData.hasGainedNewGiftBag = true;
                this.dataManage.addShopSkill(2, "goldRain");
            }
        }
    };
    __egretProto__.pause = function () {
    };
    __egretProto__.resume = function () {
    };
    return GM;
})();
GM.prototype.__class__ = "GM";
var gm = new GM();
