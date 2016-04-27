var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var PKMoraleProgressGroup = (function (_super) {
        __extends(PKMoraleProgressGroup, _super);
        function PKMoraleProgressGroup() {
            _super.call(this);
            this.skinName = skins.components.PKMoraleProgressGroupSkin;
        }
        var __egretProto__ = PKMoraleProgressGroup.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
            gm.registerMessage(consts.kMessageBuyMorale, this.updateMorale, this);
            this._timer = new egret.Timer(1000);
            this._timer.addEventListener(egret.TimerEvent.TIMER, function () {
                var maxMorale = gm.dataManage.maxMorale();
                var currTime = new Date();
                var lastTime = gm.dataManage.data.willRemainTime;
                var currRemain = Math.floor((lastTime - currTime.getTime()) / 1000);
                var lastMorale = maxMorale - gm.dataManage.data.morale - 1;
                var currShow = lastMorale * Conf.config["minutesPerMorale"] * 60 + currRemain;
                if (currShow < 0) {
                    currShow = 0;
                    this._timer.stop();
                }
                this.timeLbl.text = Util.formatTime(currShow, true);
            }.bind(this), this);
            this._timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
                this.updateMorale();
            }.bind(this), this);
            this.updateMorale();
        };
        __egretProto__.onStopTime = function () {
            this._timer.stop();
        };
        __egretProto__.updateMorale = function () {
            tt.BattleManage.updateMorale(function (data) {
                this.changeDataItem(data.morale, data.remain);
            }.bind(this));
        };
        __egretProto__.changeDataItem = function (morale, remain) {
            gm.dataManage.data.morale = morale;
            gm.dataManage.data.remain = remain;
            gm.dataManage.data.willRemainTime = new Date().getTime() + remain * 1000;
            var maxMorale = gm.dataManage.maxMorale();
            this.progress.maximum = maxMorale;
            this.progress.value = morale;
            this.progress.numLbl.text = _.sprintf("%d%%", morale);
            if (morale == maxMorale) {
                this.timeLbl.text = Util.formatTime(0, true);
                return;
            }
            this._timer.delay = 1000;
            this._timer.repeatCount = remain + 1;
            this._timer.currentCount = 0;
            this._timer.reset();
            this._timer.start();
            gm.postMessage(consts.kMessageUpdateMorale);
        };
        __egretProto__.onTouchLayer = function (event) {
            if (event.target == this.moraleBtn) {
                var moraleLy = new PKExplanationPanel();
                gm.guiLayer.addElement(moraleLy);
            }
            if (event.target == this.timeBtn) {
                var recoveryLy = new PKRecoveryPanel();
                gm.guiLayer.addElement(recoveryLy);
            }
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return PKMoraleProgressGroup;
    })(egret.gui.SkinnableComponent);
    uiskins.PKMoraleProgressGroup = PKMoraleProgressGroup;
    PKMoraleProgressGroup.prototype.__class__ = "uiskins.PKMoraleProgressGroup";
})(uiskins || (uiskins = {}));
