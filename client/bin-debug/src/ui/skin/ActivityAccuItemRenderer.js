var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var ActivityAccuItemRenderer = (function (_super) {
        __extends(ActivityAccuItemRenderer, _super);
        function ActivityAccuItemRenderer() {
            _super.call(this);
            this.rewardArr = [];
            this.skinName = skins.components.ActivityAccuItemRendererSkin;
        }
        var __egretProto__ = ActivityAccuItemRenderer.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        };
        __egretProto__.onTouchLayer = function (event) {
            if (event.target == this.getRewardBtn && this.getRewardBtn.enabled) {
                this.getRewardBtn.enabled = false;
                gm.gameUI.showLoadingLayer();
                var id = this.data.id;
                tt.ActivityManage.getActivityReward(id, function (data) {
                    var rewardArr = [];
                    _.each(data, function (v, k) {
                        if (k == "id") {
                            return;
                        }
                        if (k == "rmb") {
                            return;
                        }
                        if (k == "itemNum") {
                            return;
                        }
                        if (k == "item") {
                            if (data.itemNum == 0) {
                                return;
                            }
                            rewardArr.push({ type: data.item, num: data.itemNum });
                            gm.dataManage.addItem(data.itemNum, data.item);
                        }
                        else {
                            if (v == 0) {
                                return;
                            }
                            rewardArr.push({ type: k, num: v });
                            gm.dataManage.addItem(v, k);
                        }
                    }.bind(this));
                    var ly = new MessageGetRewardPanel("领取奖励", rewardArr);
                    gm.guiLayer.addElement(ly);
                    this.getRewardLbl.text = "已领取";
                    Util.invokeCallback(this.data.updateFunction);
                    gm.gameUI.hideLoadingLayer();
                }.bind(this), function () {
                    gm.gameUI.hideLoadingLayer();
                }.bind(this));
            }
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.setTitleText();
            this.setRewardStatus();
            this.setRewardList();
        };
        __egretProto__.addItem = function (numCount, type) {
            if (numCount == 0) {
                return;
            }
            this.rewardArr.push({ type: type, num: numCount });
            var icon = gm.gameUI.getElementTypeSource(type).icon;
            var iconImg = new egret.gui.UIAsset();
            iconImg.width = 58;
            iconImg.height = 58;
            iconImg.source = icon;
            var group = new egret.gui.Group();
            group.width = 58;
            group.height = 58;
            var num = new egret.gui.Label();
            num.size = 18;
            num.fontFamily = "Arial";
            num.horizontalCenter = 0;
            num.verticalCenter = 42;
            if (type == "set") {
                num.text = _.sprintf("%d套武器", numCount);
            }
            else {
                num.text = Util.formatNumber(numCount);
            }
            group.addElement(iconImg);
            group.addElement(num);
            this.rewardGroup.addElement(group);
        };
        __egretProto__.setRewardList = function () {
            this.rewardArr = [];
            this.rewardGroup.removeAllElements();
            _.each(this.data, function (v, k) {
                if (k == "id") {
                    return;
                }
                if (k == "rmb") {
                    return;
                }
                if (k == "itemNum") {
                    return;
                }
                if (k == "updateFunction") {
                    return;
                }
                if (k == "item") {
                    this.addItem(this.data.itemNum, this.data.item);
                }
                else {
                    this.addItem(v, k);
                }
            }.bind(this));
        };
        __egretProto__.setRewardStatus = function () {
            var purchaseNum = gm.dataManage.purchaseActivity.count;
            var rmb = this.data.rmb;
            if (purchaseNum >= rmb) {
                var id = this.data.id;
                var item = gm.dataManage.purchaseActivity.got[id];
                if (item) {
                    this.getRewardLbl.text = "已领取";
                    this.getRewardBtn.enabled = false;
                }
                else {
                    this.getRewardBtn.enabled = true;
                    this.getRewardLbl.text = "领取";
                }
            }
            else {
                this.getRewardBtn.enabled = false;
                this.getRewardLbl.text = "领取";
            }
        };
        __egretProto__.setTitleText = function () {
            this.titleLbl.text = _.sprintf("累充￥%d", this.data.rmb);
        };
        return ActivityAccuItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.ActivityAccuItemRenderer = ActivityAccuItemRenderer;
    ActivityAccuItemRenderer.prototype.__class__ = "uiskins.ActivityAccuItemRenderer";
})(uiskins || (uiskins = {}));
