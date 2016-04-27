var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var GuildHeroItemRenderer = (function (_super) {
        __extends(GuildHeroItemRenderer, _super);
        function GuildHeroItemRenderer() {
            _super.call(this);
            this.skinName = skins.components.GuildHeroItemRendererSkin;
        }
        var __egretProto__ = GuildHeroItemRenderer.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.setItem();
        };
        __egretProto__.setItem = function () {
            this.setLeftItem();
            this.setRightItem();
        };
        __egretProto__.setLeftItem = function () {
            if (this.data["mine"]) {
                this.leftItem.visible = true;
                this.data["mine"]["index"] = this.itemIndex;
                this.data["mine"]["oppDead"] = this.data["opp"]["isDead"];
                this.data["mine"]["attDead"] = this.getMineAttDead();
                this.data["mine"]["playerType"] = "mine";
                var dpsValue = null;
                if (this.data.detail) {
                    dpsValue = this.data.detail.p1;
                }
                this.leftItem.updateItem(this.data["mine"], dpsValue);
            }
            else {
                this.leftItem.visible = false;
            }
        };
        __egretProto__.setRightItem = function () {
            if (this.data["opp"]) {
                this.rightItem.visible = true;
                this.data["opp"]["index"] = this.itemIndex;
                this.data["opp"]["oppDead"] = this.data["mine"]["isDead"];
                this.data["opp"]["attDead"] = this.getOppAttDead();
                this.data["opp"]["playerType"] = "opp";
                var dpsValue = null;
                if (this.data.detail) {
                    dpsValue = this.data.detail.p2;
                }
                this.rightItem.updateItem(this.data["opp"], dpsValue);
            }
            else {
                this.rightItem.visible = false;
            }
        };
        __egretProto__.attDead = function (att1, att2) {
            var attBp1 = att1;
            if (isNaN(parseInt(attBp1))) {
                attBp1 = parseInt(attBp1);
            }
            var attBp2 = att2;
            if (isNaN(parseInt(attBp2))) {
                attBp2 = parseInt(attBp2);
            }
            if (attBp1 == attBp2) {
                return 0;
            }
            if (attBp1 > attBp2) {
                return 1;
            }
            else {
                return -1;
            }
        };
        __egretProto__.getMineAttDead = function () {
            if (this.data.detail) {
                return this.attDead(this.data.detail.p1.dps, this.data.detail.p2.dps);
            }
            else {
                return this.attDead(this.data["mine"].bp, this.data["opp"].bp);
            }
        };
        __egretProto__.getOppAttDead = function () {
            if (this.data.detail) {
                return this.attDead(this.data.detail.p2.dps, this.data.detail.p1.dps);
            }
            else {
                return this.attDead(this.data["opp"].bp, this.data["mine"].bp);
            }
        };
        return GuildHeroItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.GuildHeroItemRenderer = GuildHeroItemRenderer;
    GuildHeroItemRenderer.prototype.__class__ = "uiskins.GuildHeroItemRenderer";
})(uiskins || (uiskins = {}));
