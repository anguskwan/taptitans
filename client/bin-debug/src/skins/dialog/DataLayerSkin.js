var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var DataLayerSkin = (function (_super) {
            __extends(DataLayerSkin, _super);
            function DataLayerSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__59_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = DataLayerSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return DataLayerSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 18, "金币：", 20, 20]);
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 18, "水晶：", 30, 30]);
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 18, "英雄等级总计：", 40, 40]);
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 18, "重击点击几率：", 50, 50]);
                return t;
            };
            __egretProto__.__15_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 18, "DPS加成倍数：", 60, 60]);
                return t;
            };
            __egretProto__.__16_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 18, "重击点击加成倍数：", 70, 70]);
                return t;
            };
            __egretProto__.__17_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 18, "当前区：", 90, 252]);
                return t;
            };
            __egretProto__.__18_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 18, "当前服务器：", 80, 80]);
                return t;
            };
            __egretProto__.__19_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 18, "用户id：", 80, 80]);
                return t;
            };
            __egretProto__.__20_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 18, "渠道号：", 80, 80]);
                return t;
            };
            __egretProto__.__21_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 18, "版本：", 80, 80]);
                return t;
            };
            __egretProto__.__22_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.gap = 4;
                return t;
            };
            __egretProto__.__23_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["left", "y"], [44, 55]);
                t.layout = this.__22_i();
                t.elementsContent = [this.__9_i(), this.__10_i(), this.__11_i(), this.__12_i(), this.__13_i(), this.__14_i(), this.__15_i(), this.__16_i(), this.__17_i(), this.__18_i(), this.__19_i(), this.__20_i(), this.__21_i()];
                return t;
            };
            __egretProto__.__24_i = function () {
                var t = new egret.gui.VerticalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [4, "right"]);
                return t;
            };
            __egretProto__.__25_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor"], [true, "Arial", 18, "0", 0xF3780F]);
                return t;
            };
            __egretProto__.__26_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 18, "0", 0xF3780F, 10, 10]);
                return t;
            };
            __egretProto__.__27_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 18, "0", 0xF3780F, 20, 20]);
                return t;
            };
            __egretProto__.__28_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 18, "0", 0xF3780F, 30, 30]);
                return t;
            };
            __egretProto__.__29_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 18, "0", 0xF3780F, 40, 40]);
                return t;
            };
            __egretProto__.__30_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 18, "0", 0xF3780F, 50, 50]);
                return t;
            };
            __egretProto__.__31_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 18, "0", 0xF3780F, 60, 60]);
                return t;
            };
            __egretProto__.__32_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 18, "0", 0xF3780F, 70, 70]);
                return t;
            };
            __egretProto__.__33_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 18, "0", 0xF3780F, 80, 80]);
                return t;
            };
            __egretProto__.__34_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 18, "0", 0xF3780F, 90, 90]);
                return t;
            };
            __egretProto__.__35_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 18, "0", 0xF3780F, 100, 100]);
                return t;
            };
            __egretProto__.__36_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 18, "0", 0xF3780F, 110, 110]);
                return t;
            };
            __egretProto__.__37_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 18, "0", 0xF3780F, 120, 120]);
                return t;
            };
            __egretProto__.__38_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "percentWidth", "y"], [320, 100, 105]);
                t.elementsContent = [this.__7_i(), this.__8_i(), this.__23_i(), this.currGroup_i()];
                return t;
            };
            __egretProto__.__39_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "left", "size", "text", "x", "y"], [true, "Arial", 40, 20, "累计", 10, 8]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["bottom", "fillColor", "percentHeight", "horizontalCenter", "percentWidth", "x", "y"], [0, 0x39363F, 100, 0, 100, 10, 10]);
                return t;
            };
            __egretProto__.__40_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["horizontalCenter", "source", "y"], [0.5, "rank_line", 42]);
                return t;
            };
            __egretProto__.__41_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.gap = 4;
                return t;
            };
            __egretProto__.__42_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text"], [true, "Arial", 18, "黄金总数："]);
                return t;
            };
            __egretProto__.__43_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 18, "点击总数：", 10, 10]);
                return t;
            };
            __egretProto__.__44_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 18, "小怪兽消灭总数：", 20, 20]);
                return t;
            };
            __egretProto__.__45_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 18, "大BOSS消灭总数：", 30, 30]);
                return t;
            };
            __egretProto__.__46_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 18, "最高关卡：", 50, 50]);
                return t;
            };
            __egretProto__.__47_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 18, "蜕变总数：", 60, 60]);
                return t;
            };
            __egretProto__.__48_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 18, "距离首次游戏的天数：", 70, 70]);
                return t;
            };
            __egretProto__.__49_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["left", "y"], [44, 55]);
                t.layout = this.__41_i();
                t.elementsContent = [this.__42_i(), this.__43_i(), this.__44_i(), this.__45_i(), this.__46_i(), this.__47_i(), this.__48_i()];
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "horizontalCenter", "source", "verticalCenter"], [86, 0, "rank_title_bar", 0]);
                return t;
            };
            __egretProto__.__50_i = function () {
                var t = new egret.gui.VerticalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [4, "right"]);
                return t;
            };
            __egretProto__.__51_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor"], [true, "Arial", 18, "0", 0xF3780F]);
                return t;
            };
            __egretProto__.__52_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 18, "0", 0xF3780F, 10, 10]);
                return t;
            };
            __egretProto__.__53_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 18, "0", 0xF3780F, 20, 20]);
                return t;
            };
            __egretProto__.__54_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 18, "0", 0xF3780F, 30, 30]);
                return t;
            };
            __egretProto__.__55_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 18, "0", 0xF3780F, 50, 50]);
                return t;
            };
            __egretProto__.__56_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 18, "0", 0xF3780F, 60, 60]);
                return t;
            };
            __egretProto__.__57_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 18, "0", 0xF3780F, 70, 70]);
                return t;
            };
            __egretProto__.__58_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "percentWidth", "x", "y"], [300, 100, 0, 466]);
                t.elementsContent = [this.__39_i(), this.__40_i(), this.__49_i(), this.addGroup_i()];
                return t;
            };
            __egretProto__.__59_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.__3_i(), this.__6_i(), this.__38_i(), this.__58_i()];
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "left", "size", "text", "verticalCenter"], [true, "Arial", 10, 24, "统计数据", 0.5]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Group();
                t.horizontalCenter = 0;
                t.elementsContent = [this.__4_i(), this.__5_i(), this.closeBtn_i()];
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "left", "size", "text", "x", "y"], [true, "Arial", 40, 20, "目前", 10, 8]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["horizontalCenter", "source", "y"], [0.5, "rank_line", 42]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text"], [true, "Arial", 18, "钻石："]);
                return t;
            };
            __egretProto__.addGroup_i = function () {
                var t = new egret.gui.Group();
                this.addGroup = t;
                this.__s(t, ["right", "y"], [43, 55]);
                t.layout = this.__50_i();
                t.elementsContent = [this.__51_i(), this.__52_i(), this.__53_i(), this.__54_i(), this.__55_i(), this.__56_i(), this.__57_i()];
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                this.__s(t, ["skinName", "verticalCenter", "x"], [new egret.gui.ButtonSkin("dialog_btn_cha_close", "dialog_btn_cha_close", "dialog_btn_cha_close"), 0, 422]);
                return t;
            };
            __egretProto__.currGroup_i = function () {
                var t = new egret.gui.Group();
                this.currGroup = t;
                this.__s(t, ["height", "right", "y"], [346, 43, 55]);
                t.layout = this.__24_i();
                t.elementsContent = [this.__25_i(), this.__26_i(), this.__27_i(), this.__28_i(), this.__29_i(), this.__30_i(), this.__31_i(), this.__32_i(), this.__33_i(), this.__34_i(), this.__35_i(), this.__36_i(), this.__37_i()];
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 18, "圣物：", 10, 10]);
                return t;
            };
            DataLayerSkin._skinParts = ["closeBtn", "currGroup", "addGroup"];
            return DataLayerSkin;
        })(egret.gui.Skin);
        dialog.DataLayerSkin = DataLayerSkin;
        DataLayerSkin.prototype.__class__ = "skins.dialog.DataLayerSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
