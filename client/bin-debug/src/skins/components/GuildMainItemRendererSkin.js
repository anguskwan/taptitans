var skins;
(function (skins) {
    var components;
    (function (components) {
        var GuildMainItemRendererSkin = (function (_super) {
            __extends(GuildMainItemRendererSkin, _super);
            function GuildMainItemRendererSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [148, 447]);
                this.elementsContent = [this.__11_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildMainItemRendererSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildMainItemRendererSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.bgImg_i(), this.timeRect_i(), this.timeLbl_i(), this.warGroup_i(), this.__10_i(), this.infoBtn_i()];
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Button();
                this.__s(t, ["height", "horizontalCenter", "skinName", "verticalCenter", "width"], [40, 0, new egret.gui.ButtonSkin("dialog_btn_big_blue", "dialog_btn_big_blue", "dialog_btn_big_blue"), 0, 150]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "verticalCenter"], ["Arial", 0, 18, "进入战争", false, 0]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillAlpha", "fillColor", "percentHeight", "percentWidth"], [0.7, 0x000000, 100, 100]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "x", "y"], ["Arial", 16, "/", 10, 10]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [2, "center"]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                t.layout = this.__8_i();
                t.elementsContent = [this.winLbl_i(), this.__7_i(), this.loseLbl_i()];
                return t;
            };
            __egretProto__.bgImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.bgImg = t;
                t.source = "guild_main_item_open";
                return t;
            };
            __egretProto__.infoBtn_i = function () {
                var t = new egret.gui.Button();
                this.infoBtn = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [34, new egret.gui.ButtonSkin("guild_btn_info", "guild_btn_info", "guild_btn_info"), 34, 402, 3]);
                return t;
            };
            __egretProto__.loseLbl_i = function () {
                var t = new egret.gui.Label();
                this.loseLbl = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["Arial", 16, "0", 0x00FF00, 20, 20]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["left", "y"], [18, 6]);
                t.elementsContent = [this.__6_i(), this.__9_i()];
                return t;
            };
            __egretProto__.timeLbl_i = function () {
                var t = new egret.gui.Label();
                this.timeLbl = t;
                this.__s(t, ["fontFamily", "right", "size", "text", "textAlign", "verticalAlign", "visible", "y"], ["Arial", 12, 18, "每天上午9:00开启", "center", "middle", false, 115]);
                return t;
            };
            __egretProto__.timeRect_i = function () {
                var t = new egret.gui.Rect();
                this.timeRect = t;
                this.__s(t, ["fillAlpha", "fillColor", "height", "visible", "width", "x", "y"], [0.7, 0x000000, 30, false, 150, 281, 112]);
                return t;
            };
            __egretProto__.warGroup_i = function () {
                var t = new egret.gui.Group();
                this.warGroup = t;
                this.__s(t, ["height", "horizontalCenter", "touchEnabled", "verticalCenter", "visible", "width", "x", "y"], [40, 133.5, false, 50, false, 150, 40, 10]);
                t.elementsContent = [this.__4_i(), this.__5_i()];
                return t;
            };
            __egretProto__.winLbl_i = function () {
                var t = new egret.gui.Label();
                this.winLbl = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor"], ["Arial", 16, "0", 0xFF0000]);
                return t;
            };
            GuildMainItemRendererSkin._skinParts = ["bgImg", "timeRect", "timeLbl", "warGroup", "winLbl", "loseLbl", "infoBtn"];
            return GuildMainItemRendererSkin;
        })(egret.gui.Skin);
        components.GuildMainItemRendererSkin = GuildMainItemRendererSkin;
        GuildMainItemRendererSkin.prototype.__class__ = "skins.components.GuildMainItemRendererSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
