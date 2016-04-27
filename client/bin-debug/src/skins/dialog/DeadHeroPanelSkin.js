var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var DeadHeroPanelSkin = (function (_super) {
            __extends(DeadHeroPanelSkin, _super);
            function DeadHeroPanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__3_i(), this.__18_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = DeadHeroPanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return DeadHeroPanelSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.7, 0.7, "diamond", 107, 31]);
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["horizontalAlign", "verticalAlign"], ["center", "middle"]);
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "touchChildren", "touchEnabled", "y"], [0.5, false, false, 34]);
                t.layout = this.__12_i();
                t.elementsContent = [this.__11_i(), this.diamondLbl_i()];
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "horizontalCenter", "width", "y"], [62, 0.5, 300, 380]);
                t.elementsContent = [this.revivalBtn_i(), this.__10_i(), this.__13_i()];
                return t;
            };
            __egretProto__.__15_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textColor"], ["Arial", 18, "英雄复活时间倒数:", 0xFFFFFF]);
                return t;
            };
            __egretProto__.__16_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["horizontalAlign", "verticalAlign"], ["center", "middle"]);
                return t;
            };
            __egretProto__.__17_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "x", "y"], [1, 10, 342]);
                t.layout = this.__16_i();
                t.elementsContent = [this.__15_i(), this.timeLbl_i()];
                return t;
            };
            __egretProto__.__18_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "verticalCenter"], [0, 0]);
                t.elementsContent = [this.__4_i(), this.iconImg_i(), this.__5_i(), this.__6_i(), this.__9_i(), this.__14_i(), this.__17_i(), this.closeBtn_i()];
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillAlpha", "fillColor", "percentHeight", "percentWidth"], [0.5, 0x000000, 100, 100]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source"], [480, egret.gui.getScale9Grid("55,53,337,324"), "dialog_popup"]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "horizontalCenter", "width", "y"], [0x2C2930, 150, 0.5, 380, 173]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "textAlign", "x", "y"], ["Arial", 0.5, 18, "失去英雄援助之后，你获得的黄金和攻击\n力都大幅度减少！", "center", 10, 225]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textColor"], ["Arial", 24, "已阵亡", 0xFFFFFF]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.HorizontalLayout();
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "y"], [0.5, 112]);
                t.layout = this.__8_i();
                t.elementsContent = [this.heroLbl_i(), this.__7_i()];
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                this.__s(t, ["skinName", "x", "y"], [new egret.gui.ButtonSkin("dialog_btn_cha_close", "dialog_btn_cha_close", "dialog_btn_cha_close"), 387, 18]);
                return t;
            };
            __egretProto__.diamondLbl_i = function () {
                var t = new egret.gui.Label();
                this.diamondLbl = t;
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text"], ["Arial", 0, 14, "0"]);
                return t;
            };
            __egretProto__.heroLbl_i = function () {
                var t = new egret.gui.Label();
                this.heroLbl = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor"], ["Arial", 24, "标签", 0x0B8FB5]);
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["height", "horizontalCenter", "source", "width", "y"], [58, 0, "hero1", 58, 28]);
                return t;
            };
            __egretProto__.revivalBtn_i = function () {
                var t = new egret.gui.Button();
                this.revivalBtn = t;
                this.__s(t, ["horizontalCenter", "skinName", "verticalCenter"], [0, new egret.gui.ButtonSkin("dialog_btn_big_blue", "dialog_btn_big_blue", "dialog_btn_big_blue"), 0]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "y"], ["Arial", 0, 24, "立即复活", false, 5]);
                return t;
            };
            __egretProto__.timeLbl_i = function () {
                var t = new egret.gui.Label();
                this.timeLbl = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["Arial", 18, "00:00:00", 0xF3780F, 20, 20]);
                return t;
            };
            DeadHeroPanelSkin._skinParts = ["iconImg", "heroLbl", "revivalBtn", "diamondLbl", "timeLbl", "closeBtn"];
            return DeadHeroPanelSkin;
        })(egret.gui.Skin);
        dialog.DeadHeroPanelSkin = DeadHeroPanelSkin;
        DeadHeroPanelSkin.prototype.__class__ = "skins.dialog.DeadHeroPanelSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
