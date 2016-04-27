var skins;
(function (skins) {
    var components;
    (function (components) {
        var RankInviteItemListSkin = (function (_super) {
            __extends(RankInviteItemListSkin, _super);
            function RankInviteItemListSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [80, 462]);
                this.elementsContent = [this.__5_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = RankInviteItemListSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return RankInviteItemListSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.__4_i(), this.btnFriend_i()];
                return t;
            };
            __egretProto__.btnFriend_i = function () {
                var t = new egret.gui.Button();
                this.btnFriend = t;
                t.setStyle("textAlign", "center");
                t.setStyle("verticalAlign", "middle");
                this.__s(t, ["horizontalCenter", "label", "skinName", "verticalCenter", "width"], [0, "邀请好友", new egret.gui.ButtonSkin("dialog_btn_blue", "dialog_btn_blue", "dialog_btn_blue"), 0, 200]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [0x39363F, 100, 0, 0, 100]);
                return t;
            };
            RankInviteItemListSkin._skinParts = ["btnFriend"];
            return RankInviteItemListSkin;
        })(egret.gui.Skin);
        components.RankInviteItemListSkin = RankInviteItemListSkin;
        RankInviteItemListSkin.prototype.__class__ = "skins.components.RankInviteItemListSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
