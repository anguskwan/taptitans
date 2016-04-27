/**
 * Created by lhb on 15/9/1.
 */

class GM {
    public winSize = {width: 480, height: 756};

    public eventManage:egret.EventDispatcher = new egret.EventDispatcher();

    public registerMessage(name:string, selector:Function, target:any):void {
        this.eventManage.addEventListener(name, selector, target);
    }

    public removeMessage(name:string, selector:Function, target:any):void{
        this.eventManage.removeEventListener(name, selector, target);
    }

    public postMessage(name:string, data?:any):void {
        var evt:egret.Event = new egret.Event(name);
        evt.data = data;
        this.eventManage.dispatchEvent(evt);
    }

    private messagesNeedPost:any = {};

    public postMessageNextTick(name, data?, once = true) {
        if (once && this.messagesNeedPost[name]) {
            return;
        }
        if (_.isEmpty(this.messagesNeedPost)) {
            egret.callLater(() => {
                _.each(this.messagesNeedPost, (v, k:string) => {
                    this.postMessage(k, v);
                });
                this.messagesNeedPost = {};
            }, this)
        }
        this.messagesNeedPost[name] = data;
    }

    public dataManage:DataManage;
    public timeManage:TimeManage;
    public mainLayer:Main;
    public network:Network;
    public gameScene: GameScene;
    public gameUI:GameUI;
    public guiLayer:egret.gui.UIStage;
    public validateLayer:egret.gui.UIStage;
    public resReady:boolean;
    private cacheData;
    private showClickError;
    public channel_1758: Channel_1758;

    public init(mainLayer) {
        this.mainLayer = mainLayer;

        this.network = new Network();
        this.network.login();
    }

    public onTapScreen(pos):void {
        if (this.dataManage.data.dailyEvent.clicks < 0) {
            if (!this.showClickError) {
                this.showClickError = true;
                alert("今日点击次数已达上限，请注意休息。");
            }
            return;
        }
        this.dataManage.onTapDamage(pos);
    }

    private firstInit = true;

    public onLogin(player) {
        if (!this.firstInit) {
            gm.gameUI.hideLoadingLayer();
//            egret.Ticker.getInstance().resume();
            if (!this.dataManage.hasMonster) {
                if (player.mission == this.dataManage.data.mission) {
                    this.dataManage.monsterDead(false);
                } else {
                    this.dataManage.nextMission();
                }
            }
//            this.dataManage.data = player;
        } else {
            this.cacheData = player;
            this.drawScene();
        }
    }

    public drawScene() {
        if (this.cacheData && this.resReady) {
            this.dataManage = new DataManage(this.cacheData);
            this.timeManage = new TimeManage(this.cacheData, this.dataManage.getServerTime);
            if (this.firstInit) {
                this.firstInit = false;
                myDCAgent.init();
                var wechat = new Wechat();
                wechat.init();
                this.channel_1758 = new Channel_1758();
            }
            this.mainLayer.removeChildren();
            this.gameScene = new GameScene();
            this.mainLayer.addChild(this.gameScene);
            this.guiLayer = new egret.gui.UIStage();
            this.mainLayer.addChild(this.guiLayer);
            this.gameUI = new GameUI();
            this.guiLayer.addElement(this.gameUI);

            if (!!this.cacheData.isNewbiePackageBought && !this.cacheData.hasGainedNewGiftBag){
                gm.network.sendAction("gainNewPlayerGiftBag", {}, function(){});
                this.cacheData.hasGainedNewGiftBag = true;
                this.dataManage.addShopSkill(2,"goldRain");
            }
        }
    }

    public pause() {

    }

    public resume() {

    }

}
var gm = new GM();