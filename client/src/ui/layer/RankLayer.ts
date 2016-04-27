/**
 *
 * @author 
 *
 */
class RankLayer extends egret.gui.SkinnableComponent {
    public btnBack:egret.gui.Button;
    public friendBtn:uiskins.RankToggleBtn;
    public worldBtn:uiskins.RankToggleBtn;
    public attBtn:uiskins.RankToggleBtn;
    public friendList:egret.gui.List;
    public worldList:egret.gui.List;
    public attList:egret.gui.List;
    public friendData:any;
    public worldData:any;
    public attData:any;
    public friendCollection:egret.gui.ArrayCollection;
    public worldCollection:egret.gui.ArrayCollection;
    public attCollection:egret.gui.ArrayCollection;
    private rankToggleBtns:uiskins.RankToggleBtn[];
    private _lineItemList:egret.gui.ClassFactory;
    private _rankItemList:egret.gui.ClassFactory;
    private _rankInviteItemList:egret.gui.ClassFactory;
    private _rankPKItemList:egret.gui.ClassFactory;
    private _initFriend:any;
    private _initWorld:any;
    private _initAtt:any;

    public constructor(){
        super();
        this.skinName = skins.dialog.RankLayerSkin;
    }
    public childrenCreated() {
        this._lineItemList = new egret.gui.ClassFactory(uiskins.RankLineItemList);
        this._rankItemList = new egret.gui.ClassFactory(uiskins.RankItemList);
        this._rankPKItemList = new egret.gui.ClassFactory(uiskins.RankPKItemList);
        if (!Util.isJuHe()){
            this._rankInviteItemList = new egret.gui.ClassFactory(uiskins.RankInviteItemList);
        }
        this._initFriend = true;
        this._initWorld = true;
        this._initAtt = true;
        this.rankToggleBtns = [];
        this.friendData = [];
        this.worldData = [];
        this.attData = [];

        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
        var arr = ["world","friend","att"];
        _.each(arr,function(key) {
            this.initBtnSource(key);
        }.bind(this));
        this.changeRankList("friend",true);
        this.changeRankList("world",false);
        this.changeRankList("att",false);
    }

    onTouchLayer(event:egret.TouchEvent){
        event.stopPropagation();
        if(event.target == this.btnBack){
            gm.guiLayer.removeElement(this);
        }
    }

    public initBtnSource(name: string): void {
        var btn:uiskins.RankToggleBtn = this[name + "Btn"];
        this.rankToggleBtns.push(btn);
        btn.addEventListener(egret.Event.CHANGE,this.toggleChangeHandler,this);
        this[name + "Btn"].upSkinName = "rank_topbtn_" + name + "_off";
        this[name + "Btn"].downSkinName = "rank_topbtn_" + name + "_on";
        this[name + "Btn"].disabledSkinName = "rank_topbtn_" + name + "_off";
        this[name + "Btn"].upAndSelectedSkinName = "rank_topbtn_" + name + "_on";
        this[name + "Btn"].downAndSelectedSkinName = "rank_topbtn_" + name + "_on";
        this[name + "Btn"].disabledAndSelectedSkinName = "rank_topbtn_" + name + "_on";
    }

    private toggleChangeHandler(evt:egret.Event):void {
        var arr = ["world","friend","att"];
        for(var i:number=0;i<this.rankToggleBtns.length;i++) {
            var btn:uiskins.RankToggleBtn = this.rankToggleBtns[i];
            this.changeRankList(arr[i],(btn == evt.target));
        }
    }

    changeRankList(name,isShow){
        this[name + "List"].visible = isShow;
        this[name + "Btn"].selected = isShow;
        if(isShow){
            this[name + "InitList"]();
        }
    }

    friendInitList(){
        if(!this._initFriend){return ;}
        gm.gameUI.showLoadingLayer();
        var data:any;
        gm.network.getFriendsRankList(function(obj){
            _.each(obj,function(v,i){
                data = {
                    type:consts.kItemRendererRank,
                    value:v,
                    typeList:"friend"
                };
                this.friendData.push(data);
            }.bind(this));
            data = {
                type:consts.kItemRendererRankInvite
            };
            this.friendData.push(data);
            var collection:egret.gui.ArrayCollection = this.friendCollection = new egret.gui.ArrayCollection(this.friendData);
            this.friendList.dataProvider = collection;
            this.friendList.itemRendererFunction = function(item){
                return this.getItemRender(item);
            }.bind(this);
            this._initFriend = false;
            gm.gameUI.hideLoadingLayer();
        }.bind(this))
    }

    worldInitList(){
        if(!this._initWorld){return ;}
        gm.gameUI.showLoadingLayer();
        var data:any; //
        var line:any;
        var isAddLine:any = false;
        gm.network.getRankList(function(obj){
            _.each(obj,function(v,i){
                var index = i + 1;
                data = {
                    type:consts.kItemRendererRank,
                    value:v,
                    typeList:"world"
                };
                if(index != v.rank + 1){
                    if(!isAddLine){
                        line = {
                            type:consts.kItemRendererRankLine
                        };
                        this.worldData.push(line);
                        isAddLine = true;
                    }
                    this.worldData.push(data);
                }
                else {
                    this.worldData.push(data);
                }
            }.bind(this));
            data = {
                type:consts.kItemRendererRankInvite
            };
            this.worldData.push(data);
            var collection:egret.gui.ArrayCollection = this.worldCollection = new egret.gui.ArrayCollection(this.worldData);
            this.worldList.dataProvider = collection;
            this.worldList.itemRendererFunction = function(item){
                return this.getItemRender(item);
            }.bind(this);
            this._initWorld = false;
            gm.gameUI.hideLoadingLayer();
        }.bind(this));
    }

    attInitList(){
        if(!this._initAtt){return ;}
        gm.gameUI.showLoadingLayer();
        var data:any; //
        var line:any;
        var isAddLine:any = false;
        gm.network.getBattlePointRankList(function(obj){
            _.each(obj,function(v,i){
                var index = i + 1;
                data = {
                    type:consts.kItemRendererRankPK,
                    value:v
                };
                if(index != v.rank + 1){
                    if(!isAddLine){
                        line = {
                            type:consts.kItemRendererRankLine
                        };
                        this.attData.push(line);
                        isAddLine = true;
                    }
                    this.attData.push(data);
                }
                else {
                    this.attData.push(data);
                }
            }.bind(this));
            data = {
                type:consts.kItemRendererRankInvite
            };
            this.attData.push(data);
            var collection:egret.gui.ArrayCollection = this.attCollection = new egret.gui.ArrayCollection(this.attData);
            this.attList.dataProvider = collection;
            this.attList.itemRendererFunction = function(item){
                return this.getItemRender(item);
            }.bind(this);
            this._initAtt = false;
            gm.gameUI.hideLoadingLayer();
        }.bind(this));
    }

    getItemRender(item):egret.gui.ClassFactory{
        if(item.type == consts.kItemRendererRankInvite){
            return this._rankInviteItemList
        }
        if(item.type == consts.kItemRendererRankLine){
            return this._lineItemList;
        }
        if(item.type == consts.kItemRendererRank){
            return this._rankItemList;
        }
        if(item.type == consts.kItemRendererRankPK){
            return this._rankPKItemList;
        }
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
}
