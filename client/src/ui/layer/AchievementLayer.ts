/**
 *
 * @author 
 *
 */
class AchievementLayer extends egret.gui.SkinnableComponent {
    public diamondLbl:egret.gui.Label;
    public btnBack:egret.gui.Button;
    public achievementList:egret.gui.List;
    public achievementData:any;
    public achievementCollection:egret.gui.ArrayCollection;
    private _achievementItemList:egret.gui.ClassFactory;

    public constructor() {
        super();
        this.skinName = skins.dialog.AchievementLayerSkin;
    }

    public childrenCreated() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
        gm.registerMessage(consts.kMessageMoneyUpdate, this.refreshDiamondLabel, this);
        gm.registerMessage(consts.kMessageGetAchievement, this.updateListStatus, this);
        this.achievementData = [];
        this._achievementItemList = new egret.gui.ClassFactory(uiskins.AchievementItemList);
        this.initAchievementList();
        this.refreshDiamondLabel();
    }

    refreshDiamondLabel(){
        this.diamondLbl.text = Util.formatNumber(gm.dataManage.data.diamond);
    }

    updateListStatus(){
        _.each(this.achievementCollection.source,function(v){
            this.achievementCollection.itemUpdated(v);
        }.bind(this))
    }

    initAchievementList(){
        _.each(Conf.achievements,function(v){
            this.achievementData.push(v);
        }.bind(this));
        var collection:egret.gui.ArrayCollection = this.achievementCollection = new egret.gui.ArrayCollection(this.achievementData);
        this.achievementList.dataProvider = collection;
        this.achievementList.itemRendererFunction = function(item){
            return this.getItemRender(item);
        }.bind(this);
    }

    getItemRender(event){
        return this._achievementItemList;
    }

    onTouchLayer(event:egret.TouchEvent){
        event.stopPropagation();
        if(event.target == this.btnBack){
            gm.removeMessage(consts.kMessageMoneyUpdate, this.refreshDiamondLabel, this);
            gm.removeMessage(consts.kMessageGetAchievement, this.updateListStatus, this);
            gm.guiLayer.removeElement(this);
        }
    }

    public isTouchUpgradeBtn(currBtn,touchBtn):boolean{
        return (currBtn == touchBtn);
    }

    public partAdded(partName: string,instance: any): void {
        super.partAdded(partName,instance);
    }

    public partRemoved(partName: string,instance: any): void{
        super.partRemoved(partName,instance);
    }
}
