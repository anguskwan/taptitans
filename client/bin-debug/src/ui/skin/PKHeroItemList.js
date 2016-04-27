var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var PKHeroItemList = (function (_super) {
        __extends(PKHeroItemList, _super);
        function PKHeroItemList() {
            _super.call(this);
            this.skinName = skins.components.PKHeroItemListSkin;
        }
        var __egretProto__ = PKHeroItemList.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        __egretProto__.changeItemStatus = function () {
            this.setBgImg();
            this.nameLbl.text = this.value.name;
            this.dpsLbl.text = this.value.dps;
            this.iconImg.source = this.value.heroImgSource;
            this.setVictory();
            this.setEquip();
        };
        __egretProto__.setVictory = function () {
            var isWin = this.value.isWin;
            this.victoryImg.visible = isWin == -1 ? false : (isWin == 1);
        };
        __egretProto__.setBgImg = function () {
            this.bgImg.source = "pk_banner_" + this.value.type;
        };
        __egretProto__.setEquip = function () {
            if (this.value.nerf != 0) {
                this.equipGroup.visible = true;
                this.equipLbl.text = _.sprintf("-%.1f%%", this.value.nerf * 100);
            }
            else {
                this.equipGroup.visible = false;
            }
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
        return PKHeroItemList;
    })(egret.gui.SkinnableComponent);
    uiskins.PKHeroItemList = PKHeroItemList;
    PKHeroItemList.prototype.__class__ = "uiskins.PKHeroItemList";
})(uiskins || (uiskins = {}));
