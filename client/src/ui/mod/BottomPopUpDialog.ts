/**
 *
 * @author 
 *
 */
class BottomPopUpDialog extends egret.gui.SkinnableComponent {
    private btnClose: egret.gui.UIAsset;
    public tapDamage:egret.gui.Label;
    public explanation:egret.gui.Label;
    public coinImg:egret.gui.UIAsset;
    public coinLbl:egret.gui.Label;
    public tapGroup:egret.gui.Group;

    public lvUnlockLbl:egret.gui.Label;
    public handImg:egret.gui.UIAsset;

    public currTabBarName:any;
    public isAddHeroWeapon:any;
    private _obj:any;
    //master
    private _masterPlayerItemRenderer:egret.gui.ClassFactory;
    private _masterPrestigeItemRenderer:egret.gui.ClassFactory;
    private _masterSkillItemRenderer:egret.gui.ClassFactory;
    private _masterCollection:egret.gui.ArrayCollection;
    private _masterData:any;
    private _masterInitData:boolean;
    private masterList:egret.gui.List;

    //heroes
    private _heroesItemRenderer:egret.gui.ClassFactory;
    private _heroesBuyWeaponItemRenderer:egret.gui.ClassFactory;
    private _heroesCollection:egret.gui.ArrayCollection;
    private _heroesData:any;
    private _heroesInitData:boolean;
    private heroesList:egret.gui.List;

    //halidom
    private _halidomItemRenderer:egret.gui.ClassFactory;
    private _halidomBuyArtifactItemRenderer:egret.gui.ClassFactory;
    private _halidomAllItem:egret.gui.ClassFactory;

    private _halidomCollection:egret.gui.ArrayCollection;
    private _halidomData:any;
    private _halidomInitData:boolean;
    private halidomList:egret.gui.List;

    //shop
    private _shopBuyDiamondItemRenderer:egret.gui.ClassFactory;
    private _shopBuyMonthCardItemRenderer:egret.gui.ClassFactory;
    private _shopBuySupMonthCardItemRenderer:egret.gui.ClassFactory;
    private _shopBuyLifeCardItemRenderer: egret.gui.ClassFactory;
    private _shopBuySkillItemRenderer:egret.gui.ClassFactory;
    private _shopShareItemRenderer:egret.gui.ClassFactory;
    private _shopCollection:egret.gui.ArrayCollection;
    private _shopData:any;
    private _shopInitData:boolean;
    private shopList:egret.gui.List;

    private btnMinMax: egret.gui.UIAsset;
    private bMax:boolean;

    public constructor(obj) {
        super();
        this._obj = obj;
        var data = obj.data;
        this.currTabBarName = data.key;
        this.isAddHeroWeapon = false;
        this.skinName = skins.mod.BottomPopUpDialogSkin;
    }

    public childrenCreated() {
        super.childrenCreated();
        this.onRegisterMessage();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchDialog,this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtnClick, this);
        this.lvUnlockLbl.text = "80关之后有几率掉落圣物";
        //master
        this._masterPlayerItemRenderer = new egret.gui.ClassFactory(uiskins.MasterPlayerItemRenderer);
        this._masterPrestigeItemRenderer = new egret.gui.ClassFactory(uiskins.MasterPrestigeItemRenderer);
        this._masterSkillItemRenderer = new egret.gui.ClassFactory(uiskins.MasterSkillItemRenderer);
        this._masterData = [];
        this._masterInitData = true;
        //hero
        this._heroesItemRenderer = new egret.gui.ClassFactory(uiskins.HeroesItemRenderer);
        this._heroesBuyWeaponItemRenderer = new egret.gui.ClassFactory(uiskins.HeroesBuyWeaponItemRenderer);
        this._heroesData = [];
        this._heroesInitData = true;

        //halidom
        this._halidomItemRenderer = new egret.gui.ClassFactory(uiskins.HalidomItemRenderer);
        this._halidomBuyArtifactItemRenderer = new egret.gui.ClassFactory(uiskins.HalidomBuyArtifactItemRenderer);
        this._halidomAllItem = new egret.gui.ClassFactory(uiskins.HalidomAllRenderer);


        this._halidomData = [];
        this._halidomInitData = true;

        //shop
        this._shopBuyDiamondItemRenderer = new egret.gui.ClassFactory(uiskins.ShopBuyDiamondItemRenderer);
        this._shopBuyMonthCardItemRenderer = new egret.gui.ClassFactory(uiskins.ShopBuyMonthCardItemRenderer);
        this._shopBuySupMonthCardItemRenderer = new egret.gui.ClassFactory(uiskins.ShopBuySupMonthCardItemRenderer);
        this._shopBuyLifeCardItemRenderer = new egret.gui.ClassFactory(uiskins.ShopBuyLifeCardItemRenderer);
        this._shopBuySkillItemRenderer = new egret.gui.ClassFactory(uiskins.ShopBuySkillItemRenderer);
        if (!Util.isJuHe()){
            this._shopShareItemRenderer = new egret.gui.ClassFactory(uiskins.ShopShareItemRenderer);
        }
        this._shopData = [];
        this._shopInitData = true;

        this.selectTabBarShowList(this._obj);

        this.btnMinMax.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMinMaxBtnClick, this);

        this.changeToMin();
    }


    public changeToMin():void {
        gm.postMessage(consts.kMessageChangeToMin);
        this.bMax=false;
        this.btnMinMax.source="btn_main_max";
    }

    public changeToMax():void {
        gm.postMessage(consts.kMessageChangeToMax);
        this.bMax=true;
        this.btnMinMax.source="btn_main_min";
    }

    public onMinMaxBtnClick(event:egret.TouchEvent):void {
        if (this.bMax)
        {
            this.changeToMin();
        }
        else
        {
            this.changeToMax();
        }
    }


    public addMasterPlayerData(){
        var data:any;
        data = {
            type:consts.kItemRendererMasterPlayer,
            id:0,
            base:{
                touchTimeoutIndex:-1,
                touchTimeoutTime:0,
                touchBeginTimeoutIndex:-1,
                clickDoubleBtnTime:0,
                touchDoubleTimes:0
            }
        };
        this._masterData.push(data);
    }

    public addMasterSkillData(i){
        var index = parseInt(i);
        var data:any;
        data = {
            type:consts.kItemRendererMasterSkill,
            id:index
        };
        this._masterData.push(data);
    }

    public addMasterPrestigeData(){
        var data:any;
        data = {
            type:consts.kItemRendererMasterPrestige,
            id:7
        };
        this._masterData.push(data);
    }

    public initMasterData(){
        this.addMasterPlayerData();
        for(var i:number = 1;i <= _.size(Conf.masterSkill) - 1;i++){
            this.addMasterSkillData(i);
        }
        this.addMasterPrestigeData();
        //
        var collection:egret.gui.ArrayCollection = this._masterCollection = new egret.gui.ArrayCollection(this._masterData);
        this.masterList.dataProvider = collection;
        this.masterList.itemRendererFunction = function(item){
            return this.getMasterItemRender(item);
        }.bind(this);
    }

    public updateMasterData(){
        this.onChangeUpdate();
    }

    public getMasterItemRender(item):egret.gui.ClassFactory{
        if(item.type == consts.kItemRendererMasterPlayer){
            return this._masterPlayerItemRenderer;
        }
        if(item.type == consts.kItemRendererMasterSkill){
            return this._masterSkillItemRenderer;
        }
        if(item.type == consts.kItemRendererMasterPrestige){
            return this._masterPrestigeItemRenderer;
        }
    }

    //heroes
    public addHeroData(i){
        var data:any;
        var id = parseInt(i);
        data = {
            type:consts.kItemRendererHeroes,
            id:id,
            base:{
                touchTimeoutIndex:-1,
                touchTimeoutTime:0,
                touchBeginTimeoutIndex:-1,
                revivalTimeoutIndex:-1,
                revivalIntervalIndex:-1,
                clickDoubleBtnTime:0,
                touchDoubleTimes:0
            }
        };
        this._heroesData.push(data);
    }

    public addHeroDataInCollection(i){
        var data:any;
        var id = parseInt(i);
        data = {
            type:consts.kItemRendererHeroes,
            id:id,
            base:{
                touchTimeoutIndex:-1,
                touchTimeoutTime:0,
                touchBeginTimeoutIndex:-1,
                revivalTimeoutIndex:-1,
                revivalIntervalIndex:-1,
                clickDoubleBtnTime:0,
                touchDoubleTimes:0

            }
        };
        this._heroesCollection.addItem(data);
    }

    //IC = InCollection
    public addHeroDataICIndex(i,index){
        var data:any;
        var id = parseInt(i);
        data = {
            type:consts.kItemRendererHeroes,
            id:id,
            base:{
                touchTimeoutIndex:-1,
                touchTimeoutTime:0,
                touchBeginTimeoutIndex:-1,
                revivalTimeoutIndex:-1,
                revivalIntervalIndex:-1,
                clickDoubleBtnTime:0,
                touchDoubleTimes:0
            }
        };
        this._heroesCollection.addItemAt(data,index);
    }

    public addHeroWeaponData(){
        var data:any;
        data = {
            type:consts.kItemRendererHeroesBuyWeapon,
            id:-1
        };
        this._heroesData.push(data);
    }

    public addHeroWeaponDataInCollection(){
        var data:any;
        data = {
            type:consts.kItemRendererHeroesBuyWeapon,
            id:-1
        };
        this._heroesCollection.addItem(data);
    }

    public initHeroesData(){
        _.each(gm.dataManage.data.heroes,function(v,i){
            if(v == null){return ;}
            this.addHeroData(i);
        }.bind(this));
        if(!this.isEmptyHeroWeapons()){
            this.addHeroWeaponData();
            this.isAddHeroWeapon = true;
        }
        //
        var collection:egret.gui.ArrayCollection = this._heroesCollection = new egret.gui.ArrayCollection(this._heroesData);
        this.heroesList.dataProvider = collection;
        this.heroesList.itemRendererFunction = function(item){
            return this.getHeroesItemRender(item);
        }.bind(this);
    }

    public isEmptyHeroWeapons(){
        var arr = _.filter(gm.dataManage.data.heroWeapons,function(num){return num != 0;}.bind(this));
        return _.isEmpty(arr);
    }

    getHeroesCollectionLength(){
        if(this.isAddHeroWeapon) {
            length = this._heroesCollection.length - 1;
        }
        else {
            length = this._heroesCollection.length;
        }
        return length;
    }

    onHeroItemUpdate(){
        _.each(gm.dataManage.data.heroes,function(v,i){
            if(v == null){return ;}
            var index = i - 1;
            var id = i;
            var data = this._heroesCollection.getItemAt(index);
            data.id = id;
            this._heroesCollection.itemUpdated(data);
        }.bind(this));
    }

    onHeroesUpdateDel(len,dataLen){
        for(var num:number = dataLen;num < len;num++){
            this._heroesCollection.removeItemAt(dataLen);
        }
        this.onHeroItemUpdate();
    }

    onHeroesUpdateAdd(len,dataLen){
        for(var num:number = len;num < dataLen;num++){
            var id = num + 1;
            this.addHeroDataICIndex(id,num);
        }
        this.onHeroItemUpdate();
    }

    onHeroAddWeaponItem(){
        if(!this.isAddHeroWeapon && !this.isEmptyHeroWeapons()) {
            this.addHeroWeaponDataInCollection();
            this.isAddHeroWeapon = true;
        }
    }

    public updateHeroesData(){
        var length = this.getHeroesCollectionLength();
        var dataLength = gm.dataManage.data.heroes.length - 1;
        if(length == dataLength){
            this.onChangeUpdate();
        }
        else {
            if(length > dataLength){
                this.onHeroesUpdateDel(length,dataLength);
            }
            if(length < dataLength){
                this.onHeroesUpdateAdd(length,dataLength);
            }
        }
        this.onHeroAddWeaponItem();
    }

    public getHeroesItemRender(item):egret.gui.ClassFactory{
        if(item.type == consts.kItemRendererHeroes){
            return this._heroesItemRenderer;
        }
        if(item.type == consts.kItemRendererHeroesBuyWeapon){
            return this._heroesBuyWeaponItemRenderer;
        }
    }

    //halidom
    public addHalidomBuyArtifactData(){
        var data:any;
        //buy artifacts
        data = {
            type:consts.kItemRendererHalidomBuyArtifact,
            id:0,
            cost:gm.dataManage.artifact.getArtifactCost()
        };
        this._halidomData.push(data);
    }

    public addHalidomAllData(){
        var data:any;
        data = {
            type:consts.kItemRendererHalidomAll,
            id:10
        };
        this._halidomData.push(data);
    }


    public addHalidomData(i){
        var index = parseInt(i);
        var data:any;
        data = {
            type:consts.kItemRendererHalidom,
            id:index
        };
        this._halidomData.push(data);
    }

    public addHalidomDataInCollection(i){
        var index = parseInt(i);
        var data:any;
        data = {
            type:consts.kItemRendererHalidom,
            id:index
        };
        this._halidomCollection.addItemAt(data,this._halidomData.length-1);
    }

    public initHalidomData(){
        this.addHalidomBuyArtifactData();
        _.each(gm.dataManage.data.artifacts,function(v){
            this.addHalidomData(v.id);
        }.bind(this));
        this.addHalidomAllData();
        var collection:egret.gui.ArrayCollection = this._halidomCollection = new egret.gui.ArrayCollection(this._halidomData);
        this.halidomList.dataProvider = collection;
        this.halidomList.itemRendererFunction = function(item){
            return this.getHalidomItemRender(item);
        }.bind(this);
    }

    public updateHalidomData(){
        this.onChangeUpdate();
    }

    public getHalidomItemRender(item):egret.gui.ClassFactory{
        if(item.type == consts.kItemRendererHalidom){
            return this._halidomItemRenderer;
        }
        if(item.type == consts.kItemRendererHalidomBuyArtifact){
            return this._halidomBuyArtifactItemRenderer;
        }
        if(item.type == consts.kItemRendererHalidomAll){
            return this._halidomAllItem;
        }
    }

    //shop
    public addShopData(i){
        var index = parseInt(i);
        var data:any;
        if(index <= 6){
            data = {
                type:consts.kItemRendererShopBuySkill,
                id:index,
                base:{
                    autoTapInterval:-1,
                    touchBtnDisabledTimeoutIndex:-1,
                    touchBtnDisabledTimeout:0,
                    touchBtnDisabled:true
                }
            };
        }
        if(index == 7){
            data = {
                type:consts.kItemRendererShopShare,
                id:index
            };
        }
        if(index == 8){
            data = {
                type:consts.kItemRendererShopBuyMonthCard,
                id:index
            };
        }
        if(index == 9){
            data = {
                type:consts.kItemRendererShopBuySupMonthCard,
                id:index
            };
        }
        if(index == 10){
            data = {
                type:consts.kItemRendererShopBuyLifeCard,
                id:index
            };
        }
        if(index > 10){
            data = {
                type:consts.kItemRendererShopBuyDiamond,
                id:index
            };
        }
        this._shopData.push(data);
    }

    public initShopData(){
        _.each(Conf.shop,function(v){
            this.addShopData(v.id);
        }.bind(this));
        var collection:egret.gui.ArrayCollection = this._shopCollection = new egret.gui.ArrayCollection(this._shopData);
        this.shopList.dataProvider = collection;
        this.shopList.itemRendererFunction = function(item){
            return this.getShopItemRender(item);
        }.bind(this);
    }

    public updateShopData(){
        this.onChangeUpdate();
    }

    public getShopItemRender(item):egret.gui.ClassFactory{
        if(item.type == consts.kItemRendererShopShare){
            return this._shopShareItemRenderer;
        }
        if(item.type == consts.kItemRendererShopBuyDiamond){
            return this._shopBuyDiamondItemRenderer;
        }
        if(item.type == consts.kItemRendererShopBuyMonthCard){
            return this._shopBuyMonthCardItemRenderer;
        }
        if(item.type == consts.kItemRendererShopBuySupMonthCard){
            return this._shopBuySupMonthCardItemRenderer;
        }
        if(item.type == consts.kItemRendererShopBuyLifeCard){
            return this._shopBuyLifeCardItemRenderer;
        }
        if(item.type == consts.kItemRendererShopBuySkill){
            return this._shopBuySkillItemRenderer;
        }
    }

    onMoveSelectShopPay(){
        egret.setTimeout(function(){
            var scroller:egret.gui.Scroller = <egret.gui.Scroller>this.shopList.getChildAt(0);
            scroller.throwVertically(9*84,0);
        }.bind(this),this,100);
    }

    onRegisterMessage(){
        //gm.registerMessage(consts.kMessageSelectTabBarShowList, this.selectTabBarShowList, this);
        gm.registerMessage(consts.kMessageUpdateEquipValues, this.onMoneyUpdate, this);
        gm.registerMessage(consts.kMessageAddNewEquip, this.onMoneyUpdate, this);
        gm.registerMessage(consts.kMessageMoneyUpdate, this.onMoneyUpdate, this);
        gm.registerMessage(consts.kMessageGetVipLevel, this.onGetVipLevel, this);
        gm.registerMessage(consts.kMessageTutorialUpdate, this.onTutorialUpdate, this);
        gm.registerMessage(consts.kMessageBuyMonthCard, this.onBuyMonthCard, this);
        gm.registerMessage(consts.kMessageBuySupMonthCard, this.onBuyMonthCard, this);
        gm.registerMessage(consts.kMessageShopSkillUpdate, this.onShopSKillUpdate, this);
        gm.registerMessage(consts.kMessageRefreshSkill, this.onShopSKillUpdate, this);
        gm.registerMessage(consts.kMessageHeroDead, this.onHeroDead, this);
        gm.registerMessage(consts.kMessageHeroRevival, this.onHeroRevival, this);

        gm.registerMessage(consts.kMessageNewHeroAppear, this.addNewHeroes, this);
        gm.registerMessage(consts.kMessagePrestige,this.onPrestige,this);
        gm.registerMessage(consts.kMessageDelArtifact,this.onDelArtifact,this);
        gm.registerMessage(consts.kMessageBuyNewArtifact,this.onAddArtifact,this);
        gm.registerMessage(consts.kMessageAddWeapon,this.onAddWeapon,this);
    }

    onGetVipLevel(){
        if(this.currTabBarName == "shop"){
            this.onMoneyUpdate();
        }
    }

    onTutorialUpdate(){
        this.onMoneyUpdate();
    }

    onChangeUpdate(){
        this.onMoneyUpdate();
    }

    onMoneyUpdate(){
        if(this.currTabBarName != ""){
            this.selectLabelByName(this.currTabBarName);
            if(!this["_"+ this.currTabBarName +"InitData"]){
                _.each(this["_"+ this.currTabBarName +"Collection"].source,function(v){
                    this["_"+ this.currTabBarName +"Collection"].itemUpdated(v);
                }.bind(this))
            }
        }
    }

    onBuyMonthCard(obj){
        if(this.currTabBarName == "shop"
            && !this["_"+ this.currTabBarName +"InitData"]){
            if(obj){
                var index = obj.data.index;
                this.onItemUpdate(index);
            }
        }
    }

    onShopSKillUpdate(obj){
        if(this.currTabBarName == "shop"
            && !this["_"+ this.currTabBarName +"InitData"]){
            if(obj){
                var index = obj.data - 1;
                this.onItemUpdate(index);
            }
        }
    }

    onHeroDead(obj){
        if(this.currTabBarName == "heroes"
            && !this["_"+ this.currTabBarName +"InitData"]){
            if(obj){
                var index = obj.data - 1;
                this.onItemUpdate(index);
            }
        }
    }

    onHeroRevival(obj){
        if(this.currTabBarName == "heroes"){
            if(!this["_"+ this.currTabBarName +"InitData"]){
                if(obj){
                    var index = obj.data - 1;
                    this.onItemUpdate(index);
                }
            }
        }
    }

    public onAddWeapon(){
        if(this.currTabBarName == "heroes"
            && !this["_"+ this.currTabBarName +"InitData"]) {
            if(!this.isAddHeroWeapon){
                this.addHeroWeaponDataInCollection();
                this.isAddHeroWeapon = true;
            }
        }
    }

    public addNewHeroes(obj:any){
        if(this.currTabBarName == "heroes"
            && !this["_"+ this.currTabBarName +"InitData"]) {
            if(obj){
                if(this.isAddHeroWeapon){
                    var lastIndex = this["_"+ this.currTabBarName +"Collection"].length - 1;
                    this.addHeroDataICIndex(obj.data.id,lastIndex);
                }
                else{
                    this.addHeroDataInCollection(obj.data.id);
                }
            }
        }
    }

    public onPrestige(){
        if(this.currTabBarName == "heroes"
            && !this["_"+ this.currTabBarName +"InitData"]) {
            if(this.isAddHeroWeapon) {
                var lastIndex = this["_"+ this.currTabBarName +"Collection"].length - 1;
                for(var i:number = 0;i < lastIndex;i++){
                    this["_"+ this.currTabBarName +"Collection"].removeItemAt(0);
                }
            }
            else {
                this["_"+ this.currTabBarName +"Collection"].removeAll();
            }
        }
        else {
            this.onChangeUpdate();
        }
    }

    public onDelArtifact(obj){
        if(this.currTabBarName == "halidom"
            && !this["_"+ this.currTabBarName +"InitData"]) {
            if (obj) {
                this.selectLabelByName(this.currTabBarName);
                var index = parseInt(obj.data);
                this["_"+ this.currTabBarName +"Collection"].removeItemAt(index);
                this.onItemUpdate(0);
            }
        }
    }

    public onAddArtifact(obj:any){
        if(this.currTabBarName == "halidom"
            && !this["_"+ this.currTabBarName +"InitData"]) {
            if(obj){
                this.selectLabelByName(this.currTabBarName);
                var id = parseInt(obj.data);
                this.addHalidomDataInCollection(id);
                //
                this.onItemUpdate(0);
            }
        }
    }

    onItemUpdate(index){
        var data = this["_"+ this.currTabBarName +"Collection"].getItemAt(index);
        this["_"+ this.currTabBarName +"Collection"].itemUpdated(data);
    }

    public selectLabelByName(name){
        if(name == "master"){
            this.tapGroup.visible = true;
            this.lvUnlockLbl.visible = false;
            this.tapDamage.text = Util.formatNumber(gm.dataManage.master.getTapDamage());
            this.explanation.text = "点击攻击力";
            this.coinImg.source = "coin";
            this.coinLbl.text = Util.formatNumber(gm.dataManage.data.gold);

        }
        else if(name == "heroes"){
            this.tapGroup.visible = true;
            this.lvUnlockLbl.visible = false;
            this.tapDamage.text = Util.formatNumber(gm.dataManage.heroes.getAllHeroDPS());
            this.explanation.text = "DPS(每秒攻击力)";
            this.coinImg.source = "coin";
            this.coinLbl.text = Util.formatNumber(gm.dataManage.data.gold);
        }
        else if(name == "halidom"){
            var isArtifact = _.size(gm.dataManage.data.artifacts);
            this.tapGroup.visible = true;
            this.lvUnlockLbl.visible = (isArtifact == 0);
            this.tapDamage.text = Math.floor(gm.dataManage.artifact.getAllDamageBuffByArtifacts() * 100) + "%";
            this.explanation.text = "所有攻击力";
            this.coinImg.source = "relic";
            this.coinLbl.text = Util.formatNumber(gm.dataManage.data.relic || 0);
        }
        else {
            this.tapGroup.visible = false;
            this.lvUnlockLbl.visible = false;
            this.coinImg.source = "diamond";
            this.coinLbl.text = gm.dataManage.data.diamond + "";
        }
        this.onSetTutorial(name);
    }

    runHandAni(){
        egret.Tween.removeTweens(this.handImg);
        egret.Tween.get(this.handImg,{loop:true}).to({y:13},300).to({y:23},500);
    }

    public selectTabBarShowList(event:any):void{
        var arr = ["master","heroes","halidom","shop"];
        var data = event.data;
        _.each(arr,function(v) {
            this[v + "List"].visible = (data.key == v);
            if(data.key == v){
                this.currTabBarName = v;
                this.selectLabelByName(this.currTabBarName);
                if(this["_" + v + "InitData"]){
                    this["init" + Util.ReplaceFirstUper(v) + "Data"]();
                    this["_" + v + "InitData"] = false;
                }
                else {
                    this["update" + Util.ReplaceFirstUper(v) + "Data"]();
                }
            }
        }.bind(this));
        this.onSetTutorial(data.key);
        if(data.isMoveShopPay){
            this.onMoveSelectShopPay();
        }
    }

    onSetTutorial(data){
        if(this.isTutorial() == consts.kTutorialClickMasterUpgrade && data == "master"){
            this.handImg.visible = true;
            this.runHandAni();
        }
        else if(this.isTutorial() == consts.kTutorialClickHeroUpgrade && data == "heroes"){
            this.handImg.visible = true;
            this.runHandAni();
        }
        else {
            this.handImg.visible = false;
        }
    }

    /**
    所有子项和皮肤中的组件都已经创建完毕并完成测量，可以使用
    
    All the components in the children and skin have been
    created and measured, you can use them now.
    */

    public isTutorial(){
        if(gm.dataManage.data.tutorials[consts.kTutorialClickMaster]){
            if(Math.floor(gm.dataManage.data.gold) >= 5 &&
            !gm.dataManage.data.tutorials[consts.kTutorialClickMasterUpgrade]){
                return consts.kTutorialClickMasterUpgrade;
            }
        }
        if(gm.dataManage.data.tutorials[consts.kTutorialClickHero]){
            if(Math.floor(gm.dataManage.data.gold) >= 50 &&
                !gm.dataManage.data.tutorials[consts.kTutorialClickHeroUpgrade]){
                return consts.kTutorialClickHeroUpgrade;
            }
        }
        return -1;
    }

    /**
    partAdded 是皮肤部件赋值到逻辑类的入口，你可以在这里进行
    必要的初始化操作。比如需要随屏幕改变组件的尺寸，写在这里
    可以避免写在 childrenCreated 中修改造成的多次测量。
    
    
    The method "partAdded" will be called just after the
    skin parts is assigned to the property. You can make
    changes will effect to the layout or other components.
    */
    public partAdded(partName: string,instance: any): void {
        super.partAdded(partName,instance);
    }
    
    public partRemoved(partName: string,instance: any): void{
        super.partRemoved(partName,instance);
    }

    public onTouchDialog(event:egret.TouchEvent):void{
        event.stopPropagation();
    }

    public onCloseBtnClick(event:egret.TouchEvent):void {
        this.currTabBarName = "";
        gm.postMessage(consts.kMessageHidePopUpDialog);
        gm.postMessage(consts.kMessageUnSelectTabBarButton);
    }
}
