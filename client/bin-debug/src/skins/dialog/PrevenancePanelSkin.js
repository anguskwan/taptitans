var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var PrevenancePanelSkin = (function (_super) {
            __extends(PrevenancePanelSkin, _super);
            function PrevenancePanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [260, 447]);
                this.elementsContent = [this.__6_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = PrevenancePanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return PrevenancePanelSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "width", "x", "y"], [0x2C2930, 80, 394, 28, 66]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [2, 2, "diamond", 370, 10]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "verticalCenter"], [0, 0]);
                t.elementsContent = [this.__3_i(), this.__4_i(), this.__5_i(), this.title_i(), this.content_i(), this.closeBtn_i()];
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                t.setStyle("fontFamily", "Arial");
                this.__s(t, ["label", "skinName", "x", "y"], ["好", new egret.gui.ButtonSkin("dialog_btn_blue", "dialog_btn_blue", "dialog_btn_blue"), 236, 171]);
                return t;
            };
            __egretProto__.content_i = function () {
                var t = new egret.gui.Label();
                this.content = t;
                this.__s(t, ["fontFamily", "size", "text", "x", "y"], ["Arial", 14, "关注我们的公众号，可以玩更多好玩的游戏。\n更可获得100钻石~", 32, 71]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source"], [260, egret.gui.getScale9Grid("55,53,337,324"), "dialog_popup"]);
                return t;
            };
            __egretProto__.title_i = function () {
                var t = new egret.gui.Label();
                this.title = t;
                this.__s(t, ["fontFamily", "size", "text", "x", "y"], ["Arial", 18, "关注《疯狂游乐场》公众号", 29, 18]);
                return t;
            };
            PrevenancePanelSkin._skinParts = ["title", "content", "closeBtn"];
            return PrevenancePanelSkin;
        })(egret.gui.Skin);
        dialog.PrevenancePanelSkin = PrevenancePanelSkin;
        PrevenancePanelSkin.prototype.__class__ = "skins.dialog.PrevenancePanelSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
