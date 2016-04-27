/**
 *
 * @author
 *
 */
var CouponPanel = (function (_super) {
    __extends(CouponPanel, _super);
    function CouponPanel() {
        _super.call(this);
        this.skinName = skins.dialog.CouponPanelSkin;
    }
    var __egretProto__ = CouponPanel.prototype;
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.addBgRectColorAndCenter();
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
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        this.onTouchTarget(event.target);
    };
    __egretProto__.onTouchTarget = function (target) {
        var _this = this;
        if (target == this.closeBtn) {
            gm.guiLayer.removeElement(this);
        }
        if (target == this.rightBtn) {
            if (this.isRegExpCode(this.textInput.text)) {
                var codeText = this.textInput.text.toLocaleLowerCase();
                gm.guiLayer.removeElement(this);
                gm.gameUI.showLoadingLayer();
                gm.network.sendAction("useCoupon", { code: codeText }, function (obj) {
                    var data = JSON.parse(obj);
                    if (data && data["data"] && data["errcode"] == 0) {
                        var couponValue = JSON.parse(data["data"]["couponValue"]);
                        var value = [];
                        var item;
                        if (couponValue["gold"]) {
                            item = {
                                type: "gold",
                                num: couponValue["gold"]
                            };
                            value.push(item);
                            gm.dataManage.addMoney(couponValue["gold"], "gold");
                        }
                        if (couponValue["diamond"]) {
                            item = {
                                type: "diamond",
                                num: couponValue["diamond"]
                            };
                            value.push(item);
                            gm.dataManage.addMoney(couponValue["diamond"], "diamond");
                        }
                        if (couponValue["relic"]) {
                            item = {
                                type: "relic",
                                num: couponValue["relic"]
                            };
                            value.push(item);
                            gm.dataManage.addMoney(couponValue["relic"], "relic");
                        }
                        if (couponValue["crystal"]) {
                            item = {
                                type: "crystal",
                                num: couponValue["crystal"]
                            };
                            value.push(item);
                            gm.dataManage.addMoney(couponValue["crystal"], "crystal");
                        }
                        _this.textInput.text = "";
                        //gm.guiLayer.removeElement(this);
                        gm.gameUI.hideLoadingLayer();
                        var ly = new MessageGetRewardPanel("获得物品", value);
                        gm.guiLayer.addElement(ly);
                    }
                    else {
                        gm.postMessage(consts.kMessageShowToastLayer, data["errmsg"]);
                        gm.gameUI.hideLoadingLayer();
                    }
                }, function () {
                    _this.wrongAni();
                }, true);
            }
            else {
                this.wrongAni();
            }
        }
    };
    //
    __egretProto__.wrongAni = function () {
        this.wrongLbl.visible = true;
        egret.Tween.removeTweens(this.wrongLbl);
        egret.Tween.get(this.wrongLbl).wait(3000).call(function () {
            this.wrongLbl.visible = false;
        }, this);
    };
    __egretProto__.isRegExpCode = function (str) {
        var re = new RegExp("^[A-Za-z0-9]{8,8}$");
        return (str.search(re) != -1);
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return CouponPanel;
})(egret.gui.SkinnableContainer);
CouponPanel.prototype.__class__ = "CouponPanel";
