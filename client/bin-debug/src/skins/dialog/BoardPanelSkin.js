var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var BoardPanelSkin = (function (_super) {
            __extends(BoardPanelSkin, _super);
            function BoardPanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [760, 480]);
                this.elementsContent = [this.__3_i(), this.boardGroup_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = BoardPanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return BoardPanelSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source"], [560, egret.gui.getScale9Grid("55,53,337,324"), "dialog_popup"]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "horizontalCenter", "width", "y"], [0x2C2930, 420, 0, 400, 24]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "maxDisplayedLines", "size", "text", "textAlign", "width"], ["Arial", 1000, 30, "公告", "center", 380]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.gap = 10;
                return t;
            };
            __egretProto__.boardGroup_i = function () {
                var t = new egret.gui.Group();
                this.boardGroup = t;
                this.__s(t, ["horizontalCenter", "verticalCenter", "x", "y"], [0, 0, 10, 10]);
                t.elementsContent = [this.__4_i(), this.__5_i(), this.scroller_i(), this.rightBtn_i()];
                return t;
            };
            __egretProto__.boardTextGroup_i = function () {
                var t = new egret.gui.Group();
                this.boardTextGroup = t;
                this.__s(t, ["touchChildren", "touchEnabled"], [false, false]);
                t.layout = this.__7_i();
                t.elementsContent = [this.__6_i()];
                return t;
            };
            __egretProto__.rightBtn_i = function () {
                var t = new egret.gui.Button();
                this.rightBtn = t;
                t.setStyle("fontFamily", "Arial");
                t.setStyle("size", 24);
                t.setStyle("textAlign", "center");
                t.setStyle("verticalAlign", "middle");
                this.__s(t, ["horizontalCenter", "label", "skinName", "y"], [0.5, "确定", new egret.gui.ButtonSkin("dialog_btn_blue", "dialog_btn_blue", "dialog_btn_blue"), 470]);
                return t;
            };
            __egretProto__.scroller_i = function () {
                var t = new egret.gui.Scroller();
                this.scroller = t;
                this.__s(t, ["height", "horizontalCenter", "scrollSpeed", "verticalCenter", "width"], [400, 0, 0.1, -48, 380]);
                t.viewport = this.boardTextGroup_i();
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillAlpha", "fillColor", "percentHeight", "percentWidth"], [0.5, 0x000000, 100, 100]);
                return t;
            };
            BoardPanelSkin._skinParts = ["boardTextGroup", "scroller", "rightBtn", "boardGroup"];
            return BoardPanelSkin;
        })(egret.gui.Skin);
        dialog.BoardPanelSkin = BoardPanelSkin;
        BoardPanelSkin.prototype.__class__ = "skins.dialog.BoardPanelSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
