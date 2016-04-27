var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var EquipElementItem = (function (_super) {
        __extends(EquipElementItem, _super);
        function EquipElementItem() {
            _super.call(this);
            this.skinName = skins.components.EquipElementItemSkin;
        }
        var __egretProto__ = EquipElementItem.prototype;
        Object.defineProperty(__egretProto__, "dataItem", {
            get: function () {
                return this.value;
            },
            set: function (value) {
                this.value = value;
            },
            enumerable: true,
            configurable: true
        });
        //change data item
        __egretProto__.changeDataItem = function () {
            this.setIconImg();
            this.setSelectImg();
            this.setLockGroup();
            this.setLvText();
            this.setNameText();
            this.setStarGroup();
            this.setSuitImg();
            this.setAttText();
            this.setProgressBar();
        };
        __egretProto__.setIconImg = function () {
            var source;
            if (this.value.name == "wing" && this.value.index == 1) {
                source = "equip_without";
            }
            else {
                source = _.sprintf("equip_buy_%s%d", this.value.name, this.value.index);
            }
            this.iconImg.source = source;
        };
        __egretProto__.setSelectImg = function () {
            this.selectImg.visible = this.value.isSelect;
        };
        __egretProto__.setLockGroup = function () {
            var equips = gm.dataManage.equips;
            var index = this.value.index;
            var meta = this.value.meta;
            var equip = !meta ? null : equips[meta.id];
            if (index == 1 || equip) {
                this.lockGroup.visible = false;
            }
            else {
                this.lockGroup.visible = true;
            }
        };
        __egretProto__.setNameText = function () {
            var meta = this.value.meta;
            if (meta) {
                this.nameLbl.visible = true;
                this.nameLbl.text = meta.name;
            }
            else {
                this.nameLbl.visible = false;
            }
        };
        __egretProto__.setLvText = function () {
            var meta = this.value.meta;
            if (meta) {
                this.lvLbl.visible = true;
                var equips = gm.dataManage.equips;
                var equip = equips[meta.id];
                var lv;
                if (equip) {
                    lv = equip.level;
                }
                else {
                    lv = 0;
                }
                this.lvLbl.text = _.sprintf("Lv.%d", lv);
            }
            else {
                this.lvLbl.visible = false;
            }
        };
        __egretProto__.setStarGroup = function () {
            var meta = this.value.meta;
            if (meta) {
                this.starGroup.visible = true;
                var rareStarArr = [0, 3, 4, 5];
                var rareInitStarArr = { 3: 0, 4: 1, 5: 2 };
                var equips = gm.dataManage.equips;
                var equip = equips[meta.id];
                if (equip) {
                    var star = rareStarArr[meta.rare];
                    var step = rareInitStarArr[star] + equip.step;
                    for (var i = 1; i <= 5; i++) {
                        if (i <= star) {
                            this["star" + i].visible = true;
                            if (i <= step) {
                                this["star" + i].source = "equip_icon_star_on";
                            }
                            else {
                                this["star" + i].source = "equip_icon_star_off";
                            }
                        }
                        else {
                            this["star" + i].visible = false;
                        }
                    }
                }
                else {
                    this.starGroup.visible = false;
                }
            }
            else {
                this.starGroup.visible = false;
            }
        };
        __egretProto__.setSuitImg = function () {
            if (this.value.index >= 2 && this.value.index <= 11) {
                this.suitImg.visible = true;
                this.suitImg.source = "equip_icon_" + this.value.index;
            }
            else {
                this.suitImg.visible = false;
            }
        };
        __egretProto__.setAttText = function () {
            var meta = this.value.meta;
            if (meta) {
                this.attLbl.visible = true;
                var equips = gm.dataManage.equips;
                var equip = equips[meta.id];
                if (equip) {
                    this.attLbl.visible = true;
                    this.attLbl.text = _.sprintf("%.1f%%", meta.val / 30 * equip.level);
                }
                else {
                    this.attLbl.visible = false;
                }
            }
            else {
                this.attLbl.visible = false;
            }
        };
        __egretProto__.setProgressBar = function () {
            var meta = this.value.meta;
            if (meta) {
                this.lvLbl.visible = true;
                var equips = gm.dataManage.equips;
                var equip = equips[meta.id];
                if (equip) {
                    this.progress.visible = true;
                    this.progress.maximum = formula.masterEquipExp(gm.dataManage.data, meta.id, equip.level);
                    this.progress.value = equip.exp;
                }
                else {
                    this.progress.visible = false;
                }
            }
            else {
                this.progress.visible = false;
            }
        };
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return EquipElementItem;
    })(egret.gui.SkinnableComponent);
    uiskins.EquipElementItem = EquipElementItem;
    EquipElementItem.prototype.__class__ = "uiskins.EquipElementItem";
})(uiskins || (uiskins = {}));
