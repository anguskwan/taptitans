/**
 * Created by tmp on 16/4/15.
 */
var uiskins;
(function (uiskins) {
    var Status_Fund;
    (function (Status_Fund) {
        Status_Fund[Status_Fund["NOT_PASS"] = 0] = "NOT_PASS";
        Status_Fund[Status_Fund["VALID"] = 1] = "VALID";
        Status_Fund[Status_Fund["OBTAINED"] = 2] = "OBTAINED";
    })(Status_Fund || (Status_Fund = {}));
    var ActivityGrowthFund = (function (_super) {
        __extends(ActivityGrowthFund, _super);
        function ActivityGrowthFund() {
            _super.call(this);
            this.skinName = skins.components.ActivityGrowthFundSkin;
        }
        var __egretProto__ = ActivityGrowthFund.prototype;
        /** 是否达到RMB充值条件 */
        __egretProto__.isMeetRMBDemand = function () {
            return this.fundData && this.fundData.purchase >= Conf.config.growthFundMinRMBLimit;
        };
        /** 基金状态 */
        __egretProto__.getFundItemStatus = function (id) {
            if (!this.fundData) {
                return 0 /* NOT_PASS */;
            }
            for (var entry in this.fundData.statusArr) {
                var item = this.fundData.statusArr[entry];
                if (item.id == id) {
                    return item.status;
                }
            }
            return 0 /* NOT_PASS */;
        };
        __egretProto__.childrenCreated = function () {
            var _this = this;
            gm.gameUI.showLoadingLayer();
            tt.ActivityManage.activityInfo("growth_fund", function (data) {
                console.log("数据拉取成功");
                _this.fundData = data;
                _this.initView();
                gm.gameUI.hideLoadingLayer();
            }, function () {
                gm.gameUI.hideLoadingLayer();
            });
        };
        __egretProto__.initView = function () {
            var _this = this;
            var meta = Conf.activityGrowthFund;
            for (var i = 1; i <= ActivityGrowthFund.ITEM_NUM; i++) {
                var itemInfo = meta[i];
                this.updateLabel(i, itemInfo.level);
                var btn = this.getObtainBtn(i);
                btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickObtainBtn, this);
                btn.id = itemInfo.id;
                this.updateFundBtnStatus(i, this.getFundItemStatus(itemInfo.id));
            }
            //倒计时，
            var activityInfo = ActivityUtil.getActivityInfo(11 /* GROWTH_FUND */);
            var curTime = gm.timeManage.getCurrentTime();
            var endTime = activityInfo.endTime;
            this.updateClockCountDown(Util.formatTime(Math.floor((endTime - curTime) / 1000), true));
            var intervalEntry = egret.setInterval(function () {
                var curTime = gm.timeManage.getCurrentTime();
                this.updateClockCountDown(Util.formatTime(Math.floor((endTime - curTime) / 1000), true));
            }, this, 1000);
            egret.setTimeout(function () {
                _this.updateClockCountDown("活动已结束", 0x00ff00);
                egret.clearInterval(intervalEntry);
            }, this, endTime - curTime);
        };
        __egretProto__.updateLabel = function (index, level) {
            var lbl = this.getLevleLabel(index);
            lbl.text = level.toString();
        };
        __egretProto__.updateFundBtnStatus = function (index, status) {
            var btn = this.getObtainBtn(index);
            var not_pass = this.getNotPassImg(index);
            var has_obtain = this.getHasObtainedImg(index);
            btn.visible = not_pass.visible = has_obtain.visible = false;
            if (!this.isMeetRMBDemand()) {
                return;
            }
            switch (status) {
                case 1 /* VALID */:
                    btn.visible = true;
                    break;
                case 0 /* NOT_PASS */:
                    not_pass.visible = true;
                    break;
                case 2 /* OBTAINED */:
                    has_obtain.visible = true;
                    break;
            }
        };
        __egretProto__.getItemGroup = function (index) {
            return this["gf_item_" + index];
        };
        __egretProto__.getLevleLabel = function (index) {
            return this["gf_label_level_" + index];
        };
        __egretProto__.getObtainBtn = function (index) {
            return this["gf_bt_obtain_" + index];
        };
        __egretProto__.getNotPassImg = function (index) {
            return this["gf_not_pass_" + index];
        };
        __egretProto__.getHasObtainedImg = function (index) {
            return this["gf_has_obtained_" + index];
        };
        __egretProto__.updateClockCountDown = function (timeStr, color) {
            if (color === void 0) { color = 0xffffff; }
            this.clock_label.text = timeStr;
            this.clock_label.textColor = color;
        };
        __egretProto__.onClickObtainBtn = function (event) {
            var _this = this;
            var id = event.target.id;
            gm.network.sendAction("gainGrowthFundAward", { growthId: id }, function (data) {
                var meta = Conf.activityGrowthFund;
                var itemInfo = meta[id];
                gm.dataManage.addItem(itemInfo.diamond, "diamond");
                _this.updateFundBtnStatus(id, 2 /* OBTAINED */);
            });
        };
        ActivityGrowthFund.ITEM_NUM = 7;
        return ActivityGrowthFund;
    })(egret.gui.SkinnableComponent);
    uiskins.ActivityGrowthFund = ActivityGrowthFund;
    ActivityGrowthFund.prototype.__class__ = "uiskins.ActivityGrowthFund";
})(uiskins || (uiskins = {}));
