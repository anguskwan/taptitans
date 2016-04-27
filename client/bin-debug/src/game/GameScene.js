/**
 * Created by lhb on 15/9/1.
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);
        this.isShowAllHeroes = JSON.parse(localStorage.getItem("isShowAllHeroes"));
        this.showHeroesNum = 15;
        this.heroIds = [];
        this.showHeroEnterEffect = false;
        this.showHeroesNum = this.isShowAllHeroes == null ? 15 : (this.isShowAllHeroes ? 15 : 1);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        gm.registerMessage(consts.kMessageOnBossDead, this.onBossDead, this);
        gm.registerMessage(consts.kMessageOnBossEnter, this.onBossEnter, this);
        gm.registerMessage(consts.kMessageStageComplete, this.onStageComp, this);
    }
    var __egretProto__ = GameScene.prototype;
    __egretProto__.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.refreshBg();
        this.addBoss();
        this.createHeroes();
        this.addMaster();
    };
    __egretProto__.addMaster = function () {
        this.master = new Master();
        this.addChild(this.master);
    };
    __egretProto__.onStageComp = function (event) {
        var stage = event.data;
        if (stage % 5 == 1) {
            this.showStageInfoLayer();
            this.refreshBg();
        }
    };
    __egretProto__.showStageInfoLayer = function () {
        var stageSet = gm.dataManage.getStageSetId();
        var ly = new StageInfoLayer(consts.kStageNameArr[stageSet]);
        gm.mainLayer.addChild(ly);
    };
    __egretProto__.addBoss = function (id) {
        id = id || gm.dataManage.calBossId();
        if (!this.bossLayer) {
            this.bossLayer = new egret.DisplayObjectContainer();
            this.addChild(this.bossLayer);
        }
        this.bossId = id;
        this.bossArm = new tt.Armature("boss" + id);
        this.bossArm.setCustomToken("token_monster", 0.5, 1);
        this.bossArm.defaultAnimation = "idle";
        this.bossArm.play("enter");
        this.bossArm.scaleX = this.bossArm.scaleY = this.calBossScaleFactor();
        this.bossArm.x = 240;
        this.bossArm.y = 410;
        this.bossLayer.addChild(this.bossArm);
    };
    __egretProto__.showTapEffect = function (pos) {
        var mc = pool.createMovieClip("tap");
        mc.play();
        mc.x = pos.x;
        mc.y = pos.y;
        this.addChild(mc);
    };
    __egretProto__.onBossHit = function () {
        this.bossArm.play('hit');
    };
    __egretProto__.showDamageText = function (value, scale) {
        if (scale === void 0) { scale = 1; }
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
        tw.to({ x: 240, y: 180 }, 500).to({ x: 240, y: 150, alpha: 0 }, 150).call(function () {
            Util.removeFromParent(bitmap);
            pool.recycleBitmapText(bitmap);
        }, this);
    };
    __egretProto__.showDivineChalice = function () {
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
            tw.to({ scaleX: 1.5, scaleY: 1.5, alpha: 0 }, 1500).call(function () {
                Util.removeFromParent(icon);
            }, this);
        }
    };
    __egretProto__.onBossDead = function (event) {
        var node = this.bossArm;
        if (node.hasAnimation('dead')) {
            node.play('dead');
            node.autoRemove = true;
        }
        else {
            Util.removeFromParent(node);
        }
        this.showDivineChalice();
        this.deadTimeout = egret.setTimeout(function () {
            gm.dataManage.monsterDead(event.data);
        }, this, 500);
    };
    __egretProto__.onBossEnter = function (event) {
        if (gm.dataManage.isBossMonster() || event.data) {
            this.showBossTitle();
        }
        this.addBoss();
        this.refreshBg();
    };
    __egretProto__.showBossTitle = function () {
        var title = new tt.Armature('bossTitle');
        title.play('bossTitle');
        title.autoRemove = true;
        this.addChild(title);
        title.x = gm.winSize.width / 2;
        title.y = 250;
    };
    __egretProto__.removeBoss = function () {
        gm.dataManage.hasMonster = false;
        egret.clearTimeout(this.deadTimeout);
        Util.removeFromParent(this.bossArm);
    };
    __egretProto__.calBossScaleFactor = function () {
        if (gm.dataManage.isDailyBoss) {
            return 1;
        }
        var stageFactor = gm.dataManage.data.stage / 1000;
        return 0.4 * (gm.dataManage.isBossMonster() ? 1.5 : 1) * (1 + stageFactor);
    };
    __egretProto__.addHero = function (id) {
        if (!id) {
            return;
        }
        var pos = Conf.hero[id].pos;
        var armature = new tt.Armature('hero' + id);
        armature.play('attack', true);
        armature.name = "hero" + id;
        armature.x = pos[0];
        armature.y = pos[1];
        this.heroesLayer.addChild(armature);
        if (this.showHeroEnterEffect) {
            armature.visible = false;
            var mc = pool.createMovieClip("heroEnter");
            mc.play(false, function () {
                armature.visible = true;
            }, 1 / 2);
            mc.x = pos[0];
            mc.y = pos[1];
            this.heroesLayer.addChild(mc);
        }
        this.refreshHeroes();
    };
    __egretProto__.removeAllHeroes = function () {
        this.heroesLayer.removeChildren();
    };
    __egretProto__.createHeroes = function () {
        var ids = gm.dataManage.heroes.getActivatedHeroIds();
        this.heroesLayer = new egret.DisplayObjectContainer();
        this.addChild(this.heroesLayer);
        if (_.isEmpty(ids)) {
            return;
        }
        this.heroIds = ids;
        this.addHero(ids[0]);
    };
    __egretProto__.showAllHeroes = function (isShow) {
        this.showHeroesNum = isShow ? 15 : 1;
        this.isShowAllHeroes = isShow;
        localStorage.setItem("isShowAllHeroes", isShow);
        this.refreshHeroes();
    };
    __egretProto__.refreshHeroes = function () {
        var ids = gm.dataManage.heroes.getActivatedHeroIds();
        if (_.isEmpty(ids)) {
            return;
        }
        var oldIds = this.heroIds;
        this.heroIds = ids;
        for (var i = 0; i < ids.length; i++) {
            var id = oldIds[i];
            if (id) {
                var idx = _.indexOf(ids, id);
                if (idx >= this.showHeroesNum) {
                    var child = this.heroesLayer.getChildByName("hero" + id);
                    Util.removeFromParent(child);
                }
            }
            id = ids[i];
            if (id && i < this.showHeroesNum) {
                if (!this.heroesLayer.getChildByName("hero" + id)) {
                    this.addHero(id);
                }
            }
        }
    };
    __egretProto__.showHeroUpgradeEffect = function (id) {
        var pos = Conf.hero[id].pos;
        var mc = pool.createMovieClip("heroUpgrade");
        mc.play();
        mc.x = pos[0];
        mc.y = pos[1];
        this.heroesLayer.addChild(mc);
    };
    __egretProto__.refreshBg = function () {
        var self = this;
        var bgId;
        if (gm.dataManage.isDailyBoss) {
            bgId = 11;
        }
        else {
            bgId = gm.dataManage.getStageSetId();
        }
        if (this.bgId == bgId) {
            return;
        }
        this.bgId = bgId;
        var url = Util.getImageUrl("scene_bg" + bgId);
        RES.getResByUrl(url, function (event) {
            if (self.bgImg) {
                self.removeChild(self.bgImg);
            }
            else {
                gm.mainLayer.removeLoadingLayer();
            }
            self.bgImg = new egret.Bitmap();
            self.bgImg.texture = event;
            RES.destroyRes(url);
            this.addChildAt(self.bgImg, 0);
        }, this, RES.ResourceItem.TYPE_IMAGE);
    };
    return GameScene;
})(egret.DisplayObjectContainer);
GameScene.prototype.__class__ = "GameScene";
