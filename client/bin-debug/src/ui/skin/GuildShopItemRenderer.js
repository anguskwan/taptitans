var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var GuildShopItemRenderer = (function (_super) {
        __extends(GuildShopItemRenderer, _super);
        function GuildShopItemRenderer() {
            _super.call(this);
            this.dataItem = {};
            this._showDisabledBtnTime = 0;
            this.skinName = skins.components.GuildShopItemRendererSkin;
        }
        var __egretProto__ = GuildShopItemRenderer.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnClick, this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        };
        __egretProto__.initData = function () {
            this.dataItem = {};
        };
        __egretProto__.getRainGold = function () {
            return gm.dataManage.getGoldRain();
        };
        __egretProto__.getCost = function () {
            return gm.gameUI.getGuildTypeSource(this.data.id).cost;
        };
        __egretProto__.isShopSkillCost = function () {
            var cost = this.getCost();
            if (cost == 0 || gm.dataManage.data.crystal == 0) {
                return false;
            }
            return gm.dataManage.data.crystal >= cost;
        };
        __egretProto__.isTouchBtn = function () {
            if (this.isShopSkillCost() && this.data.base.touchBtnDisabled) {
                return true;
            }
            return false;
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            //直接更改资源
            this.setIconImg();
            this.setName();
            this.setExplainText();
            this.setBtnText();
            this.setBtnIconImg();
            this.setBtnCost();
            this.setBtnSourceByTimeout();
            this.setBtnSource();
        };
        __egretProto__.onTouchBtnClick = function (event) {
            if (event.target == this.btnItem) {
                this.onUseShopSkill();
            }
        };
        __egretProto__.onTouchBegin = function (event) {
            if (event.target == this.btnItem) {
            }
        };
        __egretProto__.setTouchBtnTimeout = function (cb) {
            if (this.data.base.touchBtnDisabledTimeoutIndex != -1) {
                egret.clearTimeout(this.data.base.touchBtnDisabledTimeoutIndex);
            }
            this._showDisabledBtnTime = 5000;
            this.data.base.touchBtnDisabledTimeout = new Date().getTime();
            this.data.base.touchBtnDisabledTimeoutIndex = egret.setTimeout(function () {
                Util.invokeCallback(cb);
            }.bind(this), this, this._showDisabledBtnTime);
        };
        __egretProto__.onUseShopSkill = function () {
            if (this.data.id == consts.kGuildItemGoldRain) {
                if (this.isTouchBtn()) {
                    this.data.base.touchBtnDisabled = false;
                    this.setBtnSource();
                    tt.GuildManage.buyGuildGold(function (data) {
                        if (data != null) {
                            var ly = new MessageGetRewardPanel("获得物品", [{ type: "goldRain", num: data }]);
                            gm.guiLayer.addElement(ly);
                        }
                        this.data.base.touchBtnDisabled = true;
                        Util.invokeCallback(this.data.updateFunction);
                        this.setBtnSource();
                    }.bind(this), function () {
                        this.data.base.touchBtnDisabled = true;
                        this.setBtnSource();
                    }.bind(this));
                }
            }
            if (this.data.id == consts.kGuildItemBox1) {
                if (this.isTouchBtn()) {
                    this.data.base.touchBtnDisabled = false;
                    this.setBtnSource();
                    tt.GuildManage.buyGuildWeapon(function (data) {
                        if (data != null) {
                            var type;
                            var num = 1;
                            if (data) {
                                type = "weaponItem";
                            }
                            else {
                                type = "refreshSkill";
                            }
                            var ly = new MessageGetRewardPanel("获得物品", [{ type: type, num: num }]);
                            gm.guiLayer.addElement(ly);
                        }
                        this.data.base.touchBtnDisabled = true;
                        Util.invokeCallback(this.data.updateFunction);
                        this.setBtnSource();
                    }.bind(this), function () {
                        this.data.base.touchBtnDisabled = true;
                        this.setBtnSource();
                    }.bind(this));
                }
            }
            if (this.data.id == consts.kGuildItemBox2) {
                if (this.isTouchBtn()) {
                    this.data.base.touchBtnDisabled = false;
                    this.setBtnSource();
                    gm.gameUI.showLoadingLayer();
                    gm.dataManage.buyEquip(1, function (data) {
                        gm.dataManage.updateEquipValue(function () {
                            var obj;
                            if (data.type != "equip") {
                                obj = [{ type: data.type, num: data.num }];
                            }
                            else {
                                obj = [{ type: data.type, id: data.id }];
                            }
                            var ly = new MessageGetRewardPanel("获得物品", obj);
                            gm.guiLayer.addElement(ly);
                            this.data.base.touchBtnDisabled = true;
                            Util.invokeCallback(this.data.updateFunction);
                            this.setBtnSource();
                            gm.gameUI.hideLoadingLayer();
                        }.bind(this), function () {
                            gm.gameUI.hideLoadingLayer();
                        }.bind(this));
                    }.bind(this), function () {
                        gm.gameUI.hideLoadingLayer();
                    }.bind(this));
                }
            }
            if (this.data.id == consts.kGuildItemBox3) {
                if (this.isTouchBtn()) {
                    this.data.base.touchBtnDisabled = false;
                    this.setBtnSource();
                    gm.gameUI.showLoadingLayer();
                    gm.dataManage.buyTenEquip(1, function (data) {
                        gm.dataManage.updateEquipValue(function () {
                            var ly = new BuyTenTimesPanel(data);
                            gm.guiLayer.addElement(ly);
                            this.data.base.touchBtnDisabled = true;
                            Util.invokeCallback(this.data.updateFunction);
                            this.setBtnSource();
                            gm.gameUI.hideLoadingLayer();
                        }.bind(this), function () {
                            gm.gameUI.hideLoadingLayer();
                        }.bind(this));
                    }.bind(this), function () {
                        gm.gameUI.hideLoadingLayer();
                    }.bind(this));
                }
            }
            if (this.data.id == consts.kGuildItemResetWeapon) {
                //var ly = new WeaponResetPanel();
                var ly = new WeaponPanel();
                gm.guiLayer.addElement(ly);
                ly.setTitle();
            }
        };
        __egretProto__.setBtnSourceByTimeout = function () {
            var currTime = new Date().getTime();
            var disabledTime = this.data.base.touchBtnDisabledTimeout;
            var offsetTime = currTime - disabledTime;
            if (disabledTime == 0) {
                this.setBtnSource();
            }
            else {
                if (offsetTime < 5000) {
                    this._showDisabledBtnTime = 5000 - offsetTime;
                    this.setShowBtnSource();
                }
                else {
                    this.setBtnSource();
                }
            }
        };
        __egretProto__.setShowBtnSource = function () {
            this.btnItem.setBtnSkinName("btn_disabled");
            this.data.base.touchBtnDisabled = false;
            if (this.data.base.touchBtnDisabledTimeoutIndex != -1) {
                egret.clearTimeout(this.data.base.touchBtnDisabledTimeoutIndex);
            }
            this.data.base.touchBtnDisabledTimeoutIndex = egret.setTimeout(function () {
                this.data.base.touchBtnDisabled = true;
                this.setBtnSource();
            }.bind(this), this, this._showDisabledBtnTime);
        };
        __egretProto__.setName = function () {
            this.nameLbl.text = gm.gameUI.getGuildTypeSource(this.data.id).title;
        };
        __egretProto__.setIconImg = function () {
            this.iconImg.source = gm.gameUI.getGuildTypeSource(this.data.id).icon;
        };
        __egretProto__.setExplainText = function () {
            var text;
            var mate = gm.gameUI.getGuildTypeSource(this.data.id);
            if (this.data.id == consts.kGuildItemGoldRain) {
                text = _.sprintf(mate.desc, Util.formatNumber(this.getRainGold()));
            }
            else {
                var desc = mate.desc.replace("\\n", "\n");
                text = desc;
            }
            this.explainLbl.text = text;
        };
        __egretProto__.setBtnIconImg = function () {
            this.btnItem.iconImg.source = "crystal";
        };
        __egretProto__.setBtnCost = function () {
            var text;
            var isOpen = gm.gameUI.getGuildTypeSource(this.data.id).isOpen;
            if (isOpen) {
                if (this.data.id == consts.kGuildItemResetWeapon) {
                    this.btnItem.iconGroup.visible = false;
                    this.btnItem.iconCostLbl.visible = false;
                }
                else {
                    text = this.getCost() + "";
                    this.btnItem.iconGroup.visible = true;
                    this.btnItem.iconCostLbl.visible = false;
                    this.btnItem.iconLbl.text = text;
                }
            }
            else {
                this.btnItem.iconGroup.visible = false;
                this.btnItem.iconCostLbl.visible = false;
            }
        };
        __egretProto__.setBtnText = function () {
            var text;
            var isOpen = gm.gameUI.getGuildTypeSource(this.data.id).isOpen;
            if (!isOpen) {
                text = "尚未开启";
            }
            else {
                text = "使用水晶";
            }
            this.btnItem.textLbl.text = text;
        };
        __egretProto__.setBtnSource = function () {
            var source;
            var cost = this.getCost();
            var isOpen = gm.gameUI.getGuildTypeSource(this.data.id).isOpen;
            if (this.data.id == consts.kGuildItemResetWeapon) {
                source = "guild_btn_yellow";
            }
            else {
                if (this.data.base.touchBtnDisabled && cost > 0 && isOpen) {
                    source = "guild_btn_yellow";
                }
                else {
                    source = "btn_disabled";
                }
            }
            this.btnItem.setBtnSkinName(source);
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return GuildShopItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.GuildShopItemRenderer = GuildShopItemRenderer;
    GuildShopItemRenderer.prototype.__class__ = "uiskins.GuildShopItemRenderer";
})(uiskins || (uiskins = {}));
