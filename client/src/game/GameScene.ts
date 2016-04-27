/**
 * Created by lhb on 15/9/1.
 */


class GameScene extends egret.DisplayObjectContainer {
    public isShowAllHeroes = JSON.parse(localStorage.getItem("isShowAllHeroes"));
    private showHeroesNum = 15;

    public constructor() {
        super();
        this.showHeroesNum = this.isShowAllHeroes == null ? 15:(this.isShowAllHeroes ? 15 : 1);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        gm.registerMessage(consts.kMessageOnBossDead, this.onBossDead, this);
        gm.registerMessage(consts.kMessageOnBossEnter, this.onBossEnter, this);
        gm.registerMessage(consts.kMessageStageComplete, this.onStageComp, this);
    }

    private onAddToStage(event:egret.Event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.refreshBg();
        this.addBoss();
        this.createHeroes();
        this.addMaster();
    }

    public master: Master;

    private addMaster() {
        this.master = new Master();
        this.addChild(this.master);
    }

    private onStageComp(event) {
        var stage = event.data;
        if (stage % 5 == 1) {
            this.showStageInfoLayer();
            this.refreshBg();
        }
    }

    public showStageInfoLayer() {
        var stageSet = gm.dataManage.getStageSetId();
        var ly = new StageInfoLayer(consts.kStageNameArr[stageSet]);
        gm.mainLayer.addChild(ly);
    }

    private bossLayer : egret.DisplayObjectContainer;

    private addBoss(id?) {
        id = id || gm.dataManage.calBossId();
        if (!this.bossLayer) {
            this.bossLayer = new egret.DisplayObjectContainer();
            this.addChild(this.bossLayer);
        }
        this.bossId = id;
        this.bossArm = new tt.Armature("boss"+id);
        this.bossArm.setCustomToken("token_monster", 0.5, 1);
        this.bossArm.defaultAnimation = "idle";
        this.bossArm.play("enter");
        this.bossArm.scaleX = this.bossArm.scaleY = this.calBossScaleFactor();
        this.bossArm.x = 240;
        this.bossArm.y = 410;
        this.bossLayer.addChild(this.bossArm);
    }

    public showTapEffect(pos) {
        var mc = pool.createMovieClip("tap");
        mc.play();
        mc.x = pos.x;
        mc.y = pos.y;
        this.addChild(mc);
    }

    public onBossHit() {
        this.bossArm.play('hit');
    }

    public showDamageText(value, scale = 1) {
        if (scale == 1 && !tt.Setting.isDamageTextShow()) {
            return;
        }
        var bitmap = pool.createBitmapText("font_red_fnt");
        bitmap.cacheAsBitmap = false;
        bitmap.text = Util.formatNumber(value);
        bitmap.scaleX = bitmap.scaleY = scale;
        this.addChild(bitmap);
        bitmap.x = 240;
        bitmap.y = 250;
        bitmap.anchorX = 0.5;
        bitmap.anchorY = 0.5;
        bitmap.alpha = 1;
        var tw = egret.Tween.get(bitmap);
        tw.to({x: 240, y: 180}, 500).to({x:240, y:150, alpha:0}, 150).call(()=> {
            Util.removeFromParent(bitmap);
            pool.recycleBitmapText(bitmap);
        }, this);
    }

    private showDivineChalice() {
        if (gm.dataManage.data.isDivineChalice) {

            var icon = new egret.Bitmap();
            icon.texture = RES.getRes("artifact22");
            icon.x = 240;
            icon.y = 300;
            icon.anchorX = 0.5;
            icon.anchorY = 0.5;
            icon.alpha = 1;
            this.addChild(icon);
            var tw = egret.Tween.get(icon);
            tw.to({scaleX:1.5,scaleY:1.5,alpha:0}, 1500).call(()=> {
                Util.removeFromParent(icon);
            }, this);
        }
    }

    public deadTimeout;

    private onBossDead(event) {
        var node = this.bossArm;
        if (node.hasAnimation('dead')) {
            node.play('dead');
            node.autoRemove = true;
        } else {
            Util.removeFromParent(node);
        }
        this.showDivineChalice();
        this.deadTimeout = egret.setTimeout(function() {
            gm.dataManage.monsterDead(event.data);
        }, this, 500);
    }
    public bossId : number;
    private onBossEnter(event) {
        if (gm.dataManage.isBossMonster() || event.data) {
            this.showBossTitle();
        }
        this.addBoss();
        this.refreshBg();
    }

    public showBossTitle() {
        var title = new tt.Armature('bossTitle');
        title.play('bossTitle');
        title.autoRemove = true;
        this.addChild(title);
        title.x = gm.winSize.width / 2;
        title.y = 250;
    }

    public removeBoss() {
        gm.dataManage.hasMonster = false;
        egret.clearTimeout(this.deadTimeout);
        Util.removeFromParent(this.bossArm);
    }

    private bossArm : tt.Armature;

    private calBossScaleFactor() {
        if (gm.dataManage.isDailyBoss) {return 1;}
        var stageFactor = gm.dataManage.data.stage / 1000;
        return 0.4 * (gm.dataManage.isBossMonster() ? 1.5 : 1) * (1+stageFactor);
    }

    private addHero(id) {
        if (!id) {return;}
        var pos = Conf.hero[id].pos;
        var armature = new tt.Armature('hero'+id);
        armature.play('attack', true);
        armature.name = "hero"+id;
        armature.x = pos[0];
        armature.y = pos[1];
        this.heroesLayer.addChild(armature);
        if (this.showHeroEnterEffect) {
            armature.visible = false;
            var mc = pool.createMovieClip("heroEnter");
            mc.play(false, ()=> {
                armature.visible = true;
            }, 1/2);
            mc.x = pos[0];
            mc.y = pos[1];
            this.heroesLayer.addChild(mc);
        }
        this.refreshHeroes()
    }

    private heroesLayer : egret.DisplayObjectContainer;
    private heroIds : Array<number> = [];

    removeAllHeroes () {
        this.heroesLayer.removeChildren();
    }

    public createHeroes() {
        var ids = gm.dataManage.heroes.getActivatedHeroIds();
        this.heroesLayer = new egret.DisplayObjectContainer();
        this.addChild(this.heroesLayer);
        if (_.isEmpty(ids)) {return;}
        this.heroIds = ids;
        this.addHero(ids[0]);
    }


    public showAllHeroes(isShow) {
        this.showHeroesNum = isShow ? 15 : 1;
        this.isShowAllHeroes = isShow;
        localStorage.setItem("isShowAllHeroes", isShow);
        this.refreshHeroes();
    }

    public refreshHeroes() {
        var ids = gm.dataManage.heroes.getActivatedHeroIds();
        if (_.isEmpty(ids)) {return;}
        var oldIds = this.heroIds;
        this.heroIds = ids;
        for (var i = 0; i < ids.length; i++) {
            var id = oldIds[i];
            if (id) {
                var idx = _.indexOf(ids, id);
                if (idx >= this.showHeroesNum) {
                    var child = this.heroesLayer.getChildByName("hero"+id);
                    Util.removeFromParent(child);
//                    RES.destroyRes("hero_arm"+id);
                }
            }
            id = ids[i];
            if (id && i < this.showHeroesNum) {
                if (!this.heroesLayer.getChildByName("hero"+id)) {
                    this.addHero(id);
                }
            }
        }
    }

    public showHeroEnterEffect: boolean = false;

    public showHeroUpgradeEffect(id) {
        var pos = Conf.hero[id].pos;
        var mc = pool.createMovieClip("heroUpgrade");
        mc.play();
        mc.x = pos[0];
        mc.y = pos[1];
        this.heroesLayer.addChild(mc);
    }

    private bgImg:egret.Bitmap;
    private bgId;

    public refreshBg():void {
        var self = this;
        var bgId;
        if (gm.dataManage.isDailyBoss) {
            bgId = 11;
        } else {
            bgId =gm.dataManage.getStageSetId();
        }
        if (this.bgId == bgId) {
            return;
        }
        this.bgId = bgId;
        var url = Util.getImageUrl("scene_bg" + bgId);
        RES.getResByUrl(url, function(event:any) {
            if (self.bgImg) {
                self.removeChild(self.bgImg);
            } else {
                gm.mainLayer.removeLoadingLayer();
            }
            self.bgImg = new egret.Bitmap();
            self.bgImg.texture = <egret.Texture>event;
            RES.destroyRes(url);
            this.addChildAt(self.bgImg, 0);
        }, this, RES.ResourceItem.TYPE_IMAGE);
    }

}
