var skins;
(function (skins) {
    var components;
    (function (components) {
        var ActivityWorthBoxItemRendererSkin = (function (_super) {
            __extends(ActivityWorthBoxItemRendererSkin, _super);
            function ActivityWorthBoxItemRendererSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [250, 200]);
                this.elementsContent = [this.__21_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = ActivityWorthBoxItemRendererSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ActivityWorthBoxItemRendererSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__10_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [3, "center", "middle"]);
                return t;
            };
            __egretProto__.__11_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "width", "y"], [-17, 122, 186]);
                t.layout = this.__10_i();
                t.elementsContent = [this.__8_i(), this.lblRemainTimes_i(), this.__9_i()];
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.BitmapLabel();
                this.__s(t, ["x", "y"], [48, 16]);
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.TileLayout();
                this.__s(t, ["columnAlign", "horizontalAlign", "rowAlign", "verticalAlign"], ["justifyUsingWidth", "center", "justifyUsingGap", "middle"]);
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "horizontalCenter", "width", "y"], [30, -17.5, 89, 7]);
                t.layout = this.__13_i();
                t.elementsContent = [this.lblTitle_i(), this.__12_i()];
                return t;
            };
            __egretProto__.__15_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "touchEnabled", "x", "y"], [true, "Adobe 黑体 Std R", 15, "原价", 0x7C5D35, false, 26, 10]);
                return t;
            };
            __egretProto__.__16_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "source", "touchEnabled", "width", "x", "y"], [20, "diamond", false, 20, 106, 152]);
                return t;
            };
            __egretProto__.__17_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [0, "left", "middle"]);
                return t;
            };
            __egretProto__.__18_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width", "x", "y"], [25, 88, 69, 149]);
                t.layout = this.__17_i();
                t.elementsContent = [this.__15_i(), this.__16_i(), this.lblOriPrice_i()];
                return t;
            };
            __egretProto__.__19_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "x", "y"], ["Arial", 13, "可购", 16, 14]);
                return t;
            };
            __egretProto__.__20_i = function () {
                var t = new egret.gui.VerticalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [0, "center", "middle"]);
                return t;
            };
            __egretProto__.__21_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "verticalCenter", "width"], [0, 0, 250]);
                t.elementsContent = [this.__4_i(), this.btnBuy_i(), this.iconImg_i(), this.descLbl_i(), this.__7_i(), this.__11_i(), this.__14_i(), this.__18_i(), this.vipIcon_i(), this.groupVip_i()];
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["activity_worth_img_title", 42, 0]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "touchEnabled", "x", "y"], ["activity_worth_diamond_icon", false, 81, 127]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.HorizontalLayout();
                t.verticalAlign = "middle";
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width", "x", "y"], [25, 103, 79, 127]);
                t.layout = this.__6_i();
                t.elementsContent = [this.__5_i(), this.lblPrice_i()];
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor"], [true, "Adobe 黑体 Std R", 17, "限购", 0x7C5D35]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Adobe 黑体 Std R", 17, " 次", 0x7C5D35, 50, 10]);
                return t;
            };
            __egretProto__.btnBuy_i = function () {
                var t = new egret.gui.Button();
                this.btnBuy = t;
                this.__s(t, ["skinName", "x", "y"], [new egret.gui.ButtonSkin("activity_worth_btn_buy", "", "activity_worth_btn_unable"), 54, 124]);
                return t;
            };
            __egretProto__.descLbl_i = function () {
                var t = new egret.gui.Label();
                this.descLbl = t;
                this.__s(t, ["fontFamily", "size", "stroke", "strokeColor", "text", "textAlign", "textColor", "width", "x", "y"], ["Arial", 14, 1, 0x663C0E, "内容111", "right", 0xF9F5F0, 82, 65, 105]);
                return t;
            };
            __egretProto__.groupVip_i = function () {
                var t = new egret.gui.Group();
                this.groupVip = t;
                this.__s(t, ["height", "width", "x", "y"], [35, 40, 162, 134]);
                t.layout = this.__20_i();
                t.elementsContent = [this.lblVip_i(), this.__19_i()];
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["autoScale", "height", "scaleX", "scaleY", "source", "width", "x", "y"], [true, 58, 1.5, 1.5, "activity_worth_item_icon1", 58, 65, 37]);
                return t;
            };
            __egretProto__.lblOriPrice_i = function () {
                var t = new egret.gui.Label();
                this.lblOriPrice = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "touchEnabled", "x", "y"], ["Arial", 15, "55", 0x7C5D35, false, 36, 2]);
                return t;
            };
            __egretProto__.lblPrice_i = function () {
                var t = new egret.gui.Label();
                this.lblPrice = t;
                this.__s(t, ["bold", "fontFamily", "size", "strokeColor", "text", "textColor", "touchEnabled", "x", "y"], [true, "Arial", 18, 0x663C0E, "50", 0x7C5D35, false, 85, -27]);
                return t;
            };
            __egretProto__.lblRemainTimes_i = function () {
                var t = new egret.gui.Label();
                this.lblRemainTimes = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x"], ["Arial", 16, "10", 0x7C5D35, 64]);
                return t;
            };
            __egretProto__.lblTitle_i = function () {
                var t = new egret.gui.Label();
                this.lblTitle = t;
                this.__s(t, ["fontFamily", "size", "stroke", "strokeColor", "text", "textAlign", "verticalAlign", "x", "y"], ["Adobe 黑体 Std R", 16, 2, 0x7C5D35, "黄金风", "center", "middle", 77, 3]);
                return t;
            };
            __egretProto__.lblVip_i = function () {
                var t = new egret.gui.Label();
                this.lblVip = t;
                this.__s(t, ["fontFamily", "size", "text", "x", "y"], ["Arial", 13, "V1", 9, 4]);
                return t;
            };
            __egretProto__.VipBg_i = function () {
                var t = new egret.gui.UIAsset();
                this.VipBg = t;
                this.__s(t, ["source", "x", "y"], ["activity_worth_img_vip", 0, 0]);
                return t;
            };
            __egretProto__.vipIcon_i = function () {
                var t = new egret.gui.Group();
                this.vipIcon = t;
                this.__s(t, ["height", "width", "x", "y"], [51, 52, 162, 132]);
                t.elementsContent = [this.VipBg_i()];
                return t;
            };
            ActivityWorthBoxItemRendererSkin._skinParts = ["btnBuy", "iconImg", "descLbl", "lblPrice", "lblRemainTimes", "lblTitle", "lblOriPrice", "VipBg", "vipIcon", "lblVip", "groupVip"];
            return ActivityWorthBoxItemRendererSkin;
        })(egret.gui.Skin);
        components.ActivityWorthBoxItemRendererSkin = ActivityWorthBoxItemRendererSkin;
        ActivityWorthBoxItemRendererSkin.prototype.__class__ = "skins.components.ActivityWorthBoxItemRendererSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
