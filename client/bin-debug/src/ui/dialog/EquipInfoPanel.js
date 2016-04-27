/**
 *
 * @author
 *
 */
var EquipInfoPanel = (function (_super) {
    __extends(EquipInfoPanel, _super);
    function EquipInfoPanel() {
        _super.call(this);
        this.skinName = skins.dialog.EquipInfoPanelSkin;
    }
    var __egretProto__ = EquipInfoPanel.prototype;
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.onTextGroup();
    };
    __egretProto__.onTextGroup = function () {
        var textInfo1 = "1.<font color= 0xF3780F>装备获得：</font>" + "在公会商店购买，公会功能100级开启。";
        var textInfo2 = "2.<font color= 0xF3780F>装备升级：</font>" + "选中装备之后，" + "主角会换上该装备进行战斗，" + "只有穿在身上的装备才会在PK中会获得经验。";
        var textInfo3 = "3.<font color= 0xF3780F>装备进化：</font>" + "当装备到达10级、20级时获得经验将不会增加，" + "需要进化成下一个星级才会继续获得经验升级，" + "进化需要消耗一定的碎片，进化的同时附加技能也会改变。";
        var textInfo4 = "4.<font color= 0xF3780F>附加技能：</font>" + "附加技能可以削弱对手英雄的战斗力，一共有9种，天地无用、" + "天地-柔、天地-刚、天地-未、乱舞乾坤、乱舞-刚、" + "乱舞-柔、乱舞-未、生克。";
        var textInfo5 = "5.<font color= 0xF3780F>装备碎片：</font>" + "PK有可能获得碎片，公会商店抽取装备有可能会获得大量碎片。";
        var textInfo6 = "6.<font color= 0xF3780F>装备属性：</font>" + "装备只要获得属性就会起作用，与是否穿在身上无关，" + "每一种属性的加成是该类装备所有属性加成之和。\n";
        var textDesc1 = "<font color= 0xF3780F>英雄-刚：</font>" + "暗影忍者、精灵王子、铠甲武士、铁锤战士、" + "驯龙人、哈利波特、钢铁侠、杰克船长、" + "夜礼服假面、甘道夫、大鹏暗黑骑士";
        var textDesc2 = "<font color= 0xF3780F>英雄-柔：</font>" + "水晶魔法师、小红帽、炮姐、" + "冰女、白雪皇后、魔术师金星、" + "花千骨、黑皇后、纳美公主、德州女王、异界女巫";
        var textDesc3 = "<font color= 0xF3780F>英雄-未：</font>" + "EVA、风暴机甲、黑面权杖、" + "忍者神龟、金刚、地狱火使者、" + "黄金人马战士、灵魂收割者、飞行者哑铃鹅、丘比特、圣君混沌";
        this.setTextLabel(textInfo1);
        this.setTextLabel(textInfo2);
        this.setTextLabel(textInfo3);
        this.setTextLabel(textInfo4);
        this.setTextLabel(textInfo5);
        this.setTextLabel(textInfo6);
        this.setTextLabel(textDesc1);
        this.setTextLabel(textDesc2);
        this.setTextLabel(textDesc3);
    };
    __egretProto__.setTextLabel = function (desc) {
        var text = new egret.gui.Label();
        text.size = 18;
        text.width = 380;
        text.fontFamily = "Arial";
        Util.setStyleText(text, desc);
        this.textGroup.addElement(text);
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        if (event.target == this.closeBtn) {
            gm.guiLayer.removeElement(this);
        }
    };
    return EquipInfoPanel;
})(egret.gui.SkinnableContainer);
EquipInfoPanel.prototype.__class__ = "EquipInfoPanel";
