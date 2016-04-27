var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var GuildBagGetPanelSkin = (function (_super) {
            __extends(GuildBagGetPanelSkin, _super);
            function GuildBagGetPanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [760, 480]);
                this.elementsContent = [this.__3_i(), this.__10_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildBagGetPanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildBagGetPanelSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillAlpha", "fillColor", "percentHeight", "percentWidth"], [0.5, 0x000000, 100, 100]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scale9Grid", "source"], [egret.gui.getScale9Grid("55,53,337,324"), "guildbag_get_bg"]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "horizontalCenter", "width", "y"], [0xD43A3C, 268, 0, 370, 279]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.VerticalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [0, "center"]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [1.6, 1.6, "diamond", 212, 128]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.HorizontalLayout();
                t.gap = 0;
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "y"], [0, 229]);
                t.layout = this.__8_i();
                t.elementsContent = [this.__7_i(), this.getDiamondLbl_i()];
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                this.__s(t, ["skinName", "x", "y"], [new egret.gui.ButtonSkin("dialog_btn_cha_close_white", "dialog_btn_cha_close_white", "dialog_btn_cha_close_white"), 339, 11]);
                return t;
            };
            __egretProto__.getDiamondLbl_i = function () {
                var t = new egret.gui.Label();
                this.getDiamondLbl = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["Arial", 36, "0", 0xFFFFFF, 10, 10]);
                return t;
            };
            __egretProto__.getList_i = function () {
                var t = new egret.gui.List();
                this.getList = t;
                this.__s(t, ["height", "horizontalCenter", "useVirtualLayout", "width", "y"], [268, 0, true, 370, 278]);
                t.layout = this.__6_i();
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["height", "horizontalCenter", "source", "width", "y"], [58, 0, "icon_default", 58, 82]);
                return t;
            };
            __egretProto__.nameLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameLbl = t;
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "y"], ["Arial", 0, 18, "名字", 143]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "verticalCenter", "x", "y"], [0, 0, 10, 10]);
                t.elementsContent = [this.__4_i(), this.closeBtn_i(), this.__5_i(), this.getList_i(), this.iconImg_i(), this.nameLbl_i(), this.titleLbl_i(), this.__9_i()];
                return t;
            };
            __egretProto__.titleLbl_i = function () {
                var t = new egret.gui.Label();
                this.titleLbl = t;
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "y"], ["Arial", 0, 24, 182]);
                return t;
            };
            GuildBagGetPanelSkin._skinParts = ["closeBtn", "getList", "iconImg", "nameLbl", "titleLbl", "getDiamondLbl"];
            return GuildBagGetPanelSkin;
        })(egret.gui.Skin);
        dialog.GuildBagGetPanelSkin = GuildBagGetPanelSkin;
        GuildBagGetPanelSkin.prototype.__class__ = "skins.dialog.GuildBagGetPanelSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
