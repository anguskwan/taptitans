var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var HeroesSkillExp = (function (_super) {
        __extends(HeroesSkillExp, _super);
        function HeroesSkillExp(data) {
            _super.call(this);
            this.value = data;
            this.skinName = skins.components.HeroesSkillExpSkin;
        }
        var __egretProto__ = HeroesSkillExp.prototype;
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
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        __egretProto__.changeItemStatus = function () {
            this.lvLbl.text = this.value.unlockLv;
            this.nameLbl.text = this.value.name;
            this.descLbl.text = this.value.desc;
            this.iconImg.source = this.value.iconSource;
            this.unlockGroup.visible = !this.value.isUnlock;
            this.iconDisabled.visible = !this.value.isUnlock;
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return HeroesSkillExp;
    })(egret.gui.SkinnableComponent);
    uiskins.HeroesSkillExp = HeroesSkillExp;
    HeroesSkillExp.prototype.__class__ = "uiskins.HeroesSkillExp";
})(uiskins || (uiskins = {}));
