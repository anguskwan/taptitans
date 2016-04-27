var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var EveryDayItemSelect = (function (_super) {
        __extends(EveryDayItemSelect, _super);
        function EveryDayItemSelect() {
            _super.call(this);
            this.skinName = skins.components.EveryDayItemSelectSkin;
        }
        var __egretProto__ = EveryDayItemSelect.prototype;
        __egretProto__.getElementType = function () {
            return Conf.everyDayReward[this.value.day].type;
        };
        __egretProto__.getElementNum = function () {
            var num = Conf.everyDayReward[this.value.day].num;
            if (Util.isEveryDayDouble()) {
                num = num * 2;
            }
            return num;
        };
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
            this.setNameAndNumText();
            this.setDayText();
            this.setDisabledRect();
            this.setSelectImg();
            this.setGetImg();
            this.setDayRect();
        };
        __egretProto__.setIconImg = function () {
            var type = this.getElementType();
            var icon = gm.gameUI.getElementTypeSource(type).icon;
            this.iconImg.source = icon;
        };
        __egretProto__.setNameAndNumText = function () {
            var type = this.getElementType();
            var num = this.getElementNum();
            var name = gm.gameUI.getElementTypeSource(type).name;
            this.nameLbl.text = _.sprintf("%sx%d", name, num);
        };
        __egretProto__.setDayText = function () {
            this.dayLbl.text = _.sprintf("第%d天", this.value.day);
        };
        __egretProto__.setDisabledRect = function () {
            if (this.value.day < this.value.currDay) {
                this.disabledRect.visible = true;
            }
            else {
                this.disabledRect.visible = false;
            }
        };
        __egretProto__.setSelectImg = function () {
            if (this.value.day == this.value.currDay) {
                this.selectImg.visible = true;
            }
            else {
                this.selectImg.visible = false;
            }
        };
        __egretProto__.setGetImg = function () {
            if (this.value.info == 1) {
                this.getImg.visible = true;
            }
            else {
                this.getImg.visible = false;
            }
        };
        __egretProto__.setDayRect = function () {
            if (this.value.day == this.value.currDay) {
                this.dayRect.fillColor = 0x9B1F20;
            }
            else {
                this.dayRect.fillColor = 0x45659C;
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
        return EveryDayItemSelect;
    })(egret.gui.SkinnableComponent);
    uiskins.EveryDayItemSelect = EveryDayItemSelect;
    EveryDayItemSelect.prototype.__class__ = "uiskins.EveryDayItemSelect";
})(uiskins || (uiskins = {}));
