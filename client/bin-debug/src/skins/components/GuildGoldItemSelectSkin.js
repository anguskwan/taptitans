var skins;
(function (skins) {
    var components;
    (function (components) {
        var GuildGoldItemSelectSkin = (function (_super) {
            __extends(GuildGoldItemSelectSkin, _super);
            function GuildGoldItemSelectSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [160, 110]);
                this.elementsContent = [this.__3_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildGoldItemSelectSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildGoldItemSelectSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.baseImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.baseImg = t;
                this.__s(t, ["horizontalCenter", "source", "y"], [0, "guild_gold_item_base_common", 72]);
                return t;
            };
            __egretProto__.btnGroup_i = function () {
                var t = new egret.gui.Group();
                this.btnGroup = t;
                this.__s(t, ["horizontalCenter", "visible", "y"], [0, false, 120]);
                t.elementsContent = [this.btn_i(), this.btnText_i()];
                return t;
            };
            __egretProto__.btnText_i = function () {
                var t = new egret.gui.Label();
                this.btnText = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "verticalCenter", "y"], [true, "Arial", 0, 20, "开始", false, 0, 10]);
                return t;
            };
            __egretProto__.btn_i = function () {
                var t = new egret.gui.Button();
                this.btn = t;
                this.__s(t, ["height", "skinName", "width"], [43, new egret.gui.ButtonSkin("dialog_btn_red", "dialog_btn_red", "dialog_btn_disabled"), 110]);
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["horizontalCenter", "source", "verticalCenter"], [0.5, "guild_gold_item_on1", -32.5]);
                return t;
            };
            __egretProto__.nameLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textAlign", "verticalAlign", "y"], [true, "Arial", 0, 16, "名字", "center", "middle", 97]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "touchChildren", "touchEnabled", "verticalCenter", "percentWidth"], [100, 0, false, false, 0, 100]);
                t.elementsContent = [this.baseImg_i(), this.iconImg_i(), this.nameLbl_i(), this.timeLbl_i(), this.btnGroup_i()];
                return t;
            };
            __egretProto__.timeLbl_i = function () {
                var t = new egret.gui.Label();
                this.timeLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "textAlign", "verticalAlign", "y"], [true, "Arial", 0, 16, "center", "middle", 127]);
                return t;
            };
            GuildGoldItemSelectSkin._skinParts = ["baseImg", "iconImg", "nameLbl", "timeLbl", "btn", "btnText", "btnGroup"];
            return GuildGoldItemSelectSkin;
        })(egret.gui.Skin);
        components.GuildGoldItemSelectSkin = GuildGoldItemSelectSkin;
        GuildGoldItemSelectSkin.prototype.__class__ = "skins.components.GuildGoldItemSelectSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
