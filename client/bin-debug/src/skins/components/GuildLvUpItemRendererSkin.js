var skins;
(function (skins) {
    var components;
    (function (components) {
        var GuildLvUpItemRendererSkin = (function (_super) {
            __extends(GuildLvUpItemRendererSkin, _super);
            function GuildLvUpItemRendererSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [102, 464]);
                this.elementsContent = [this.__9_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildLvUpItemRendererSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildLvUpItemRendererSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__5_i = function () {
                var t = new egret.gui.HorizontalLayout();
                t.gap = 2;
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.9, 0.9, "diamond", 212, 128]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "touchChildren", "touchEnabled", "verticalCenter"], [0, false, false, 0]);
                t.layout = this.__5_i();
                t.elementsContent = [this.__6_i(), this.diamondLbl_i()];
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [323, 26]);
                t.elementsContent = [this.lvUpBtn_i(), this.__7_i()];
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.__4_i(), this.iconImg_i(), this.nameLbl_i(), this.lvLbl_i(), this.descLbl_i(), this.progress_i(), this.__8_i()];
                return t;
            };
            __egretProto__.descLbl_i = function () {
                var t = new egret.gui.Label();
                this.descLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "x", "y"], [true, "Arial", 16, "内容", "left", 0xAA8A61, 80, 42]);
                return t;
            };
            __egretProto__.diamondLbl_i = function () {
                var t = new egret.gui.Label();
                this.diamondLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 20, "x50", 0xFFFFFF, 10, 10]);
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["source", "x", "y"], ["guild_item1", 11, 11]);
                return t;
            };
            __egretProto__.lvLbl_i = function () {
                var t = new egret.gui.Label();
                this.lvLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "x", "y"], [true, "Arial", 20, "Lv.0", "left", 0x61F762, 190, 13]);
                return t;
            };
            __egretProto__.lvUpBtn_i = function () {
                var t = new egret.gui.Button();
                this.lvUpBtn = t;
                this.__s(t, ["height", "skinName", "width"], [40, new egret.gui.ButtonSkin("dialog_btn_yellow", "dialog_btn_yellow", "dialog_btn_disabled"), 120]);
                return t;
            };
            __egretProto__.nameLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "x", "y"], [true, "Arial", 20, "名字", "left", 0xF7DDB9, 80, 13]);
                return t;
            };
            __egretProto__.progress_i = function () {
                var t = new uiskins.GuildLvUpProgressBar();
                this.progress = t;
                this.__s(t, ["skinName", "slideDuration", "x", "y"], [skins.components.GuildLvUpProgressBarSkin, 0, 12, 78]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["horizontalCenter", "source", "verticalCenter"], [0, "guild_lvup_item_bar", 0]);
                return t;
            };
            GuildLvUpItemRendererSkin._skinParts = ["iconImg", "nameLbl", "lvLbl", "descLbl", "progress", "lvUpBtn", "diamondLbl"];
            return GuildLvUpItemRendererSkin;
        })(egret.gui.Skin);
        components.GuildLvUpItemRendererSkin = GuildLvUpItemRendererSkin;
        GuildLvUpItemRendererSkin.prototype.__class__ = "skins.components.GuildLvUpItemRendererSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
