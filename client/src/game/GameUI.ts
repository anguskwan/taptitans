/**
 * Created by lhb on 15/8/31.
 */

class GameUI extends egret.gui.SkinnableComponent {
    public bottomLy: BottomLayer;
    public topLy: TopLayer;
    public leftBtnLy: LeftBtnLayer;
    public rightBtnLy: RightBtnLayer;
    public group:egret.gui.Group;
    public img:egret.gui.UIAsset;
    public handImg:egret.gui.UIAsset;
    //public addExpBtn:egret.gui.Button;
    public isAddNewEquip:any;
    public constructor() {
        super();
        this.isAddNewEquip = false;
        this.skinName = skins.GameUISkin;
    }

    public childrenCreated() {
        super.childrenCreated();
        this.bottomLy.visible = true;
        this.topLy.visible = true;
        this.leftBtnLy.visible = true;
        this.rightBtnLy.visible = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
        gm.registerMessage(consts.kMessageTapDamage,this.onTapDamage,this);
        gm.registerMessage(consts.kMessageShowToastLayer,this.showToastLayer,this);
        if(!gm.dataManage.data.tutorials[consts.kTutorialClickScreen]){
            this.runHandAni();
        }
        else {
            this.hideHand();
        }
        //this.showValidateLayer();
        this.showBoardPanel();
    }


    showBoardPanel(){
        var ly = new BoardPanel();
        gm.guiLayer.addElement(ly);
        //gm.guiLayer.addElement(new LoadingResLayer("boardres",function(){
        //    var ly = new BoardImagePanel();
        //    gm.guiLayer.addElement(ly);
        //}.bind(this)))
    }

    showValidateLayer(){
        //var time = Util.randomInt(0.5*60*60*1000,60*60*1000);
        //egret.setTimeout(function(){
        //    var ly = new ValidateLayer();
        //    gm.guiLayer.addElement(ly);
        //}.bind(this),this,time);
    }

    showGetMoneyAni(type){
        if(type == "relic"){
            var num = Util.formatNumber(gm.dataManage.data.relic);
            var icon = new egret.gui.UIAsset;
            icon.source = type;
            var bitmap = new egret.gui.BitmapLabel();
            bitmap.font = RES.getRes("font_white_fnt");
            bitmap.text = num;
            var group = new egret.gui.Group;
            var layout = new egret.gui.HorizontalLayout;
            group.layout = layout;
            group.left = 0;
            layout.gap = 0;
            layout.horizontalAlign = "center";
            layout.verticalAlign = "middle";
            group.addElement(icon);
            group.addElement(bitmap);
            this.skin.addElement(group);
            group.x = -(20*_.size(num) + 60);
            group.y = 70;
            group.includeInLayout = false;
            egret.Tween.get(group)
                .to({x:5},300)
                .wait(2000)
                .to({x:-(20*_.size(num) + 60)},200)
                .call(function(){
                    this.skin.removeElement(group);
                }.bind(this),this);
        }
    }

    runHandAni(){
        this.handImg.visible = true;
        egret.Tween.removeTweens(this.handImg);
        egret.Tween.get(this.handImg,{loop:true}).to({y:243},300).to({y:253},200);
    }

    hideHand(){
        this.handImg.visible = false;
        egret.Tween.removeTweens(this.handImg);
    }

    onTapDamage(){
        if(!gm.dataManage.data.tutorials[consts.kTutorialClickScreen]) {
            this.hideHand();
            gm.dataManage.setTutorialFinish(consts.kTutorialClickScreen);
        }
    }

    onTouchLayer(event:egret.TouchEvent){
        event.stopPropagation();
        //if(event.target == this.addExpBtn){
        //    gm.dataManage.cheatExp(10);
        //}
    }

    private layerManage:any = {};
    public showLayerByLayer(obj){
        if(!this.layerManage[obj]){
            this.layerManage[obj] = obj;
        }
        gm.guiLayer.addElement(this.layerManage[obj]);
    }

    public loadingLy:LoadingLayer = null;
    public showLoadingLayer(){
        if(!this.loadingLy){
            this.loadingLy = new LoadingLayer();
            gm.guiLayer.addElement(this.loadingLy);
        }
    }

    public hideLoadingLayer(){
        if(this.loadingLy){
            gm.guiLayer.removeElement(this.loadingLy);
            this.loadingLy = null;
        }
    }

    showPayFailLayer(){
        var ly = new MessagePayFailPanel(function(){
            var url = "http://mp.weixin.qq.com/s?__biz=MzA3NzcyMzgyOQ==&mid=408455143&idx=1&sn=656618b9a21027b302b067b290a9502c#wechat_redirect";
            window.location.href = url;
        }.bind(this),null);
        gm.guiLayer.addElement(ly);
    }

    public showToastLayer(obj){
        if(obj && obj.data){
            var ly = new ToastLayer(obj.data);
            gm.guiLayer.addElement(ly);
            egret.Tween.get(ly).wait(3000).to({alpha:0},500).call(function(){
                gm.guiLayer.removeElement(ly);
            }.bind(this));
        }
    }

    getGuildLvUpSource(type){
        var source = {
            1:{
                title:"扩充成员",
                desc:"增加<font color=0xFFFFFF>%d</font>名成员上限",
                icon:"guild_item1",
                base:1,
                baseType:1
            },
            2:{
                title:"额外经验",
                desc:"PK额外获得<font color=0xFFFFFF>%d</font>点经验值",
                icon:"guild_item2",
                base:2,
                baseType:2
            },
            3:{
                title:"召唤碎片",
                desc:"PK获得碎片几率增加<font color=0xFFFFFF>%d%%</font>",
                icon:"guild_item3",
                base:5,
                baseType:2
            },
            4:{
                title:"水晶掉落",
                desc:"公会战额外获得<font color=0xFFFFFF>%d</font>个水晶",
                icon:"guild_item4",
                base:10,
                baseType:2
            }
        };
        return source[type];
    }

    getGuildTypeSource(type){
        var source = {
            "1":{
                title:"金币灿烂",
                desc:"可收到%s块黄金",
                icon:"shop1",
                cost:100,
                isOpen:true
            },
            "2":{
                title:"小宝盒",
                desc:"购买1个宝盒，有几率获得1个\n武器",
                icon:"guild_icon_shop2",
                cost:248,
                isOpen:true
            },
            "3":{
                title:"普通装备宝箱",
                desc:"购买1个宝箱，有几率获得1个\n主角装备",
                icon:"guild_icon_shop3",
                cost:260,
                isOpen:true
            },
            "4":{
                title:"超级装备宝箱",
                desc:"购买10个宝箱，爆主角装备",
                icon:"guild_icon_shop4",
                cost:2480,
                isOpen:true
            },
            "5":{
                title:"洗武器",
                desc:"牺牲1个现有武器，你可以重\n新抽取1次",
                icon:"guild_icon_shop5",
                cost:200,
                isOpen:true
            }
        };
        return source[type];
    }

/*
    //todoyby
    getActivityBlack(type){
        var source = {
            1:{
                icon:"icon_fragment",
                type:"fragment"
            },
            2:{
                icon:"item_big_fragment",
                type:"fragment"
            },
            3:{
                icon:"item_small_exp",
                type:"exp"
            },
            4:{
                icon:"item_big_exp",
                type:"exp"
            },
            5:{
                icon:"icon_crystal",
                type:"crystal"
            },
            6:{
                icon:"item_big_crystal",
                type:"crystal"
            },
            7:{
                icon:"shop1",
                type:"goldRain"
            },
            8:{
                icon:"icon_lvup_weapon",
                type:"weaponItem"
            },
            9:{
                icon:"guild_icon_shop3",
                type:"equip"
            },
            10:{
                icon:"guild_icon_shop4",
                type:"superEquip"
            },
            11:{
                icon:"item_relic",
                type:"relic"
            },
            12:{
                icon:"icon_lvup_weapon",
                type:"weaponItem"
            }
        };
        return source[type];
    }
*/
    getEveryDayReward(day){
        var elementSource = {
            1:{
                type:"diamond",
                num:50
            },
            2:{
                type:"relic",
                num:1
            },
            3:{
                type:"diamond",
                num:100
            },
            4:{
                type:"crystal",
                num:50
            },
            5:{
                type:"weaponItem",
                num:1
            },
            6:{
                type:"crystal",
                num:100
            },
            7:{
                type:"weaponItem",
                num:100
            }
        };
        return elementSource[day];
    }

    getElementTypeSource(type){
        var kElementTypeSource = {
            relic: {
                icon: "achievement4",
                name: consts.kMoneyZNNames[consts.kMoneyTypeRelic]
            },
            gold: {
                icon: "item_coin",
                name: consts.kMoneyZNNames[consts.kMoneyTypeGold]
            },
            diamond:{
                icon: "shop11",
                name: consts.kMoneyZNNames[consts.kMoneyTypeDiamond]
            },
            weaponItem: {
                icon: "icon_lvup_weapon",
                name: consts.kMoneyZNNames[consts.kMoneyTypeWeaponItem]
            },
            set:{
                icon: "icon_weapons",
                name: "武器包"
            },
            exp:{
                icon:"item_exp",
                name:"装备经验"
            },
            crystal:{
                icon:"icon_crystal",
                name: consts.kMoneyZNNames[consts.kMoneyTypeCrystal]
            },
            fragment:{
                icon:"icon_fragment",
                name: consts.kMoneyZNNames[consts.kMoneyTypeFragment]
            },
            refreshSkill: {
                icon: "shop5",
                name: Conf.shop[consts.kShopItemRefreshSkill].name
            },
            powerOfHolding: {
                icon: "shop4",
                name: Conf.shop[consts.kShopItemPowerOfHolding].name
            },
            goldRain: {
                icon: "shop1",
                name: Conf.shop[consts.kShopItemGoldRain].name
            },
            autoTap: {
                icon: "shop2",
                name: Conf.shop[consts.kShopItemAutoTap].name
            },
            doom: {
                icon: "shop3",
                name: Conf.shop[consts.kShopItemDoom].name
            },
            tenTimes:{
                icon: "shop6",
                name: Conf.shop[consts.kShopItemTenTimes].name
            }            
        }
        return kElementTypeSource[type];
    }

    getGuildGoldSource(id){
        var source = {
            1:{
                name:"白羊座",
                time:[9,10]
            },
            2:{
                name:"金牛座",
                time:[10,11]
            },
            3:{
                name:"双子座",
                time:[11,12]
            },
            4:{
                name:"巨蟹座",
                time:[12,13]
            },
            5:{
                name:"狮子座",
                time:[13,14]
            },
            6:{
                name:"处女座",
                time:[14,15]
            },
            7:{
                name:"天秤座",
                time:[15,16]
            },
            8:{
                name:"天蝎座",
                time:[16,17]
            },
            9:{
                name:"射手座",
                time:[17,18]
            },
            10:{
                name:"摩羯座",
                time:[18,19]
            },
            11:{
                name:"水瓶座",
                time:[19,20]
            },
            12:{
                name:"双鱼座",
                time:[20,21]
            }
        };
        return source[id];
    }

    getEquipTypeToName(type){
        var name = ["","weapon","mantle","headpiece","wing","armor","sword"];
        return name[type];
    }

    getEquipSkillColor(skill){
        var color:any;
        switch (skill){
            case 1:
                color = 0xee9f41;
                break;
            case 2:
            case 3:
            case 4:
                color = 0xa85eed;
                break;
            case 5:
            case 6:
            case 7:
            case 8:
                color = 0x4c8dda;
                break;
            case 9:
                color = 0x40a63e;
                break;
        }
        return color;
    }
}
