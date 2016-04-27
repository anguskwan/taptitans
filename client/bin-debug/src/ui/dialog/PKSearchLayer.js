/**
 *
 * @author
 *
 */
var PKSearchLayer = (function (_super) {
    __extends(PKSearchLayer, _super);
    function PKSearchLayer(data) {
        _super.call(this);
        this.oppValue = data;
        this.skinName = skins.dialog.PKSearchLayerSkin;
    }
    var __egretProto__ = PKSearchLayer.prototype;
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.setBgImage();
        this.onSetSelf();
        this.onFindOpponent();
    };
    __egretProto__.onShowGlassAni = function () {
        this.glassImg.visible = true;
        this.glassImg.x = 357;
        this.glassImg.y = 114;
        egret.Tween.get(this.glassImg, { loop: true }).to({ x: 347 }, 200).to({ y: 104 }, 200).to({ x: 357 }, 200).to({ y: 114 }, 200);
    };
    __egretProto__.onHideGlassAni = function () {
        egret.Tween.removeTweens(this.glassImg);
        this.glassImg.visible = false;
    };
    __egretProto__.onFindOpponent = function () {
        if (!_.isEmpty(this.oppValue)) {
            this.onSetOpponent();
            this.startGroup.visible = true;
            this.resetGroup.visible = true;
            this.startBtn.enabled = true;
            this.resetBtn.enabled = true;
        }
        else {
            this.onShowGlassAni();
            tt.BattleManage.findOpponent(function (data) {
                if (data) {
                    this.oppValue = data;
                    this.onSetOpponent();
                    this.startBtn.enabled = true;
                }
                else {
                    this.oppValue = {};
                    this.onSetOpponent();
                    this.startBtn.enabled = false;
                    var message = new MessageNotOpponentPanel();
                    gm.guiLayer.addElement(message);
                }
                tt.BattleManage.updateMorale(function (data) {
                    this.resetBtn.enabled = true;
                    this.progressGroup.changeDataItem(data.morale, data.remain);
                }.bind(this));
                this.onHideGlassAni();
            }.bind(this), function () {
            }.bind(this));
        }
    };
    __egretProto__.setIcon = function (type, avatar) {
        if (avatar != "") {
            if (avatar == "icon_default") {
                this["icon" + type + "Img"].source = "icon_default";
            }
            else {
                var url = Util.getWechatUrlBySize(avatar, 96);
                RES.getResByUrl(url, function (event) {
                    this["icon" + type + "Img"].source = event;
                }, this, RES.ResourceItem.TYPE_IMAGE);
            }
        }
    };
    __egretProto__.setName = function (type, name) {
        if (name != "") {
            this["name" + type + "Lbl"].text = name;
        }
    };
    __egretProto__.setOppAttribute = function () {
        this.attOppLbl.text = Util.formatNumber(this.oppValue.fightValue || 0);
        this.weaponOppLbl.text = (this.oppValue.weapons || 0) + "";
    };
    __egretProto__.setSelfAttribute = function () {
        this.attSelfLbl.text = Util.formatNumber(gm.dataManage.heroes.getFightValue());
        this.weaponSelfLbl.text = Util.formatNumber(gm.dataManage.heroes.getWeaponTotalNum());
    };
    __egretProto__.onSetOpponent = function () {
        this.setIcon("Opp", this.oppValue.avatar || "icon_default");
        this.setName("Opp", this.oppValue.name || "英雄");
        this.setOppAttribute();
    };
    __egretProto__.onSetSelf = function () {
        this.setIcon("Self", gm.dataManage.data.avatar || "");
        this.setName("Self", gm.dataManage.data.name || "英雄");
        this.setSelfAttribute();
    };
    __egretProto__.setBgImage = function () {
        var url = Util.getImageUrl("pk_bg");
        RES.getResByUrl(url, function (event) {
            this.bgImg.source = event;
        }, this, RES.ResourceItem.TYPE_IMAGE);
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        if (event.target == this.btnBack) {
            this.progressGroup.onStopTime();
            gm.guiLayer.removeElement(this);
        }
        if (event.target == this.resetBtn && this.resetBtn.enabled) {
            this.oppValue = {};
            this.startBtn.enabled = false;
            this.resetBtn.enabled = false;
            this.onSetOpponent();
            this.onFindOpponent();
        }
        if (event.target == this.startBtn && this.startBtn.enabled) {
            if (this.isMoraleNotEnough()) {
                alert("士气值不足。");
                return;
            }
            gm.gameUI.showLoadingLayer();
            this.startBtn.enabled = false;
            tt.BattleManage.fightOpponent(this.oppValue.id, function (data) {
                gm.dataManage.updateEquipValue(function () {
                    this.progressGroup.onStopTime();
                    gm.guiLayer.removeElement(this);
                    var ly = new PKCompleteLayer({
                        id: this.oppValue.id,
                        value: this.oppValue,
                        data: data
                    });
                    gm.guiLayer.addElement(ly);
                    gm.gameUI.hideLoadingLayer();
                }.bind(this), function () {
                    gm.gameUI.hideLoadingLayer();
                }.bind(this));
            }.bind(this), function () {
                gm.gameUI.hideLoadingLayer();
            }.bind(this));
        }
    };
    __egretProto__.isMoraleNotEnough = function () {
        return gm.dataManage.data.morale <= 10;
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return PKSearchLayer;
})(egret.gui.SkinnableComponent);
PKSearchLayer.prototype.__class__ = "PKSearchLayer";
