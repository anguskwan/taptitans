/**
 *
 * @author
 *
 */
var PrevenancePanel = (function (_super) {
    __extends(PrevenancePanel, _super);
    function PrevenancePanel(btn, cb) {
        _super.call(this);
        this._cb = cb;
        this.btn = btn;
        this.skinName = skins.dialog.PrevenancePanelSkin;
    }
    var __egretProto__ = PrevenancePanel.prototype;
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.addBgRectColorAndCenter();
        this.setContent();
    };
    __egretProto__.addBgRectColorAndCenter = function () {
        var width = gm.guiLayer.width;
        var height = gm.guiLayer.height;
        this.bgRect = new egret.gui.Rect();
        this.bgRect.width = width;
        this.bgRect.height = height;
        this.bgRect.fillColor = 0x000000;
        this.bgRect.fillAlpha = 0.5;
        this.skin.addElementAt(this.bgRect, 0);
        this.width = width;
        this.height = height;
    };
    __egretProto__.setContent = function () {
        if (gm.network.env != "qq") {
            var channel = gm.dataManage.data.channel;
            if (channel == "1758") {
                this.title.text = "关注《1758微游戏》公众号";
                this.content.text = "关注我们的公众号，可以玩更多好玩的游戏。\n更可获得" + Conf.config.subscribedReward + "钻石~";
                return;
            }
        }
        this.title.text = "关注《疯狂游乐场》公众号";
        this.content.text = "关注我们的公众号，可以玩更多好玩的游戏。\n更可获得" + Conf.config.subscribedReward + "钻石~";
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        this.onTouchTarget(event.target);
    };
    __egretProto__.onTouchTarget = function (target) {
        var _this = this;
        if (target == this.closeBtn) {
            gm.guiLayer.removeElement(this);
            gm.network.sendAction("gainSubscribeReward", {}, function (data) {
                if (!data.ret) {
                    // 未关注
                    var url;
                    if (gm.network.env == "qq") {
                        url = "http://article.mp.qq.com/index.php/preview/show?p=72d3bfdc062b7cb8d52d98eec1c51440&m=1452062339332537&i=0&t=a7ec449b4c248bc0ad2b6184576804d1&_wv=134217729&v=3&env=10003&mpu=33313633393734383030";
                        window.location.href = url;
                    }
                    else {
                        var channel = gm.dataManage.data.channel;
                        if (channel == '1758') {
                            url = "http://mp.weixin.qq.com/s?__biz=MjM5MjQyOTg3MA==&mid=207867528&idx=1&sn=19c7b9fb2c23871ab7a189dfe86834ef#rd";
                            window.location.href = url;
                        }
                        else {
                            url = "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=" + encodeURIComponent("gQGm8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL1lVd2NrdXZsQWZWNGw1WDJZV1J4AAIEQJqXVgMEAAAAAA==");
                            h5api.showPayQrCode(url, "关注公众号", "长按识别二维码关注");
                        }
                    }
                }
                else {
                    gm.dataManage.addMoney(Conf.config.subscribedReward, "diamond");
                    Util.invokeCallback(_this._cb, data.ret);
                }
            }, function () {
            });
        }
    };
    /**
     partAdded 是皮肤部件赋值到逻辑类的入口，你可以在这里进行
     必要的初始化操作。比如需要随屏幕改变组件的尺寸，写在这里
     可以避免写在 childrenCreated 中修改造成的多次测量。


     The method "partAdded" will be called just after the
     skin parts is assigned to the property. You can make
     changes will effect to the layout or other components.
     */
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return PrevenancePanel;
})(egret.gui.SkinnableContainer);
PrevenancePanel.prototype.__class__ = "PrevenancePanel";
