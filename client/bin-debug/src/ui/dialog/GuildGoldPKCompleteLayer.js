/**
 *
 * @author
 *
 */
var GuildGoldPKCompleteLayer = (function (_super) {
    __extends(GuildGoldPKCompleteLayer, _super);
    function GuildGoldPKCompleteLayer(data) {
        _super.call(this);
        this._aniWin = 0;
        this._aniLose = 0;
        this._oppValue = data;
        this.skinName = skins.dialog.PKCompleteLayerSkin;
    }
    var __egretProto__ = GuildGoldPKCompleteLayer.prototype;
    __egretProto__.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.setBgImage();
        this.onSetNameAndIcon();
        this.onSetCompleteData(this._oppValue);
    };
    __egretProto__.getIsWin = function () {
        var win = _.count(this._oppValue.alive, "0");
        var lose = _.size(this._oppValue.alive) - win;
        return win > lose;
    };
    __egretProto__.onAddMoney = function (data) {
        //gm.dataManage.addItem(data.fragment,"fragment");
    };
    __egretProto__.onSetCompleteData = function (data) {
        this.onSetTitle(data);
        this.setPKListData(data);
        this.setPKList();
        //add money
        this.onAddMoney(data);
        this.onCompleteAni();
    };
    __egretProto__.onCompleteAni = function () {
        egret.callLater(function () {
            var scroller = this.pkList.getChildAt(0);
            scroller.throwVertically(33 * 79 + 300 - 550, 5000);
        }, this);
    };
    __egretProto__.onSetTitle = function (data) {
    };
    __egretProto__.onSetNameAndIcon = function () {
        this.setIcon("Self", gm.dataManage.data.avatar || "");
        this.setName("Self", gm.dataManage.data.name || "我");
        this.setIcon("Opp", this._oppValue.oppAvatar || "");
        this.setName("Opp", this._oppValue.oppName || "对手");
    };
    __egretProto__.setIcon = function (type, avatar) {
        if (avatar != "") {
            var url = Util.getWechatUrlBySize(avatar, 96);
            RES.getResByUrl(url, function (event) {
                this["icon" + type + "Img"].source = event;
            }, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    __egretProto__.setName = function (type, name) {
        if (name != "") {
            this["name" + type + "Lbl"].text = name;
        }
    };
    __egretProto__.setTitleScoreTimeOut = function (win, lose, index) {
        egret.setTimeout(function (cw, cl) {
            this._aniWin += cw;
            this._aniLose += cl;
            this.scoreLbl.text = _.sprintf("%d : %d", this._aniWin, this._aniLose);
        }.bind(this), this, 3000 * (index / 33), win, lose);
    };
    __egretProto__.setLeftOrRightWin = function (data, i) {
        var index = i + 1;
        var p1 = data.p1;
        var p2 = data.p2;
        if (p1.dps == p2.dps) {
            this.setTitleScoreTimeOut(0, 0, index);
            return -1;
        }
        if (p1.dps > p2.dps) {
            this.setTitleScoreTimeOut(1, 0, index);
            return 1;
        }
        this.setTitleScoreTimeOut(0, 1, index);
        return 0;
    };
    __egretProto__.setPKListData = function (data) {
        this._dataArr = [];
        var item;
        _.each(data.detail, function (v, i) {
            item = {
                type: consts.kItemRendererPKHero,
                value: v
            };
            this._dataArr.push(item);
            this.setLeftOrRightWin(v, i);
        }.bind(this));
        item = {
            type: consts.kItemRendererPKHeroComplete,
            isWin: this.getIsWin(),
            exp: data.exp
        };
        this._dataArr.push(item);
    };
    __egretProto__.setPKList = function () {
        this._heroItemRenderer = new egret.gui.ClassFactory(uiskins.PKHeroItemRenderer);
        this._heroCompleteItemRenderer = new egret.gui.ClassFactory(uiskins.GuildGoldPKCompleteItemRenderer);
        var dataProvider = this._dataProvider = new egret.gui.ArrayCollection(this._dataArr);
        this.pkList.dataProvider = dataProvider;
        this.pkList.itemRendererFunction = function (item) {
            return this.getItemRender(item);
        }.bind(this);
    };
    __egretProto__.getItemRender = function (item) {
        if (item.type == consts.kItemRendererPKHero) {
            return this._heroItemRenderer;
        }
        if (item.type == consts.kItemRendererPKHeroComplete) {
            return this._heroCompleteItemRenderer;
        }
    };
    __egretProto__.setBgImage = function () {
        var url = Util.getImageUrl("pk_bg");
        RES.getResByUrl(url, function (event) {
            this.bgImg.source = event;
        }, this, RES.ResourceItem.TYPE_IMAGE);
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        if (event.target == this.backBtn) {
            gm.guiLayer.removeElement(this);
            this.onShowGuildGoldLayer();
        }
    };
    __egretProto__.onShowGuildGoldLayer = function () {
        gm.gameUI.showLoadingLayer();
        var id = this._oppValue.goldId;
        tt.BattleManage.zodiacPlayerRankingList(id, 0, function (list) {
            var data = {
                list: list,
                id: id
            };
            var ly = new GuildGoldLayer(data);
            gm.guiLayer.addElement(ly);
            gm.gameUI.hideLoadingLayer();
        }.bind(this), function () {
            gm.gameUI.hideLoadingLayer();
        }.bind(this));
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return GuildGoldPKCompleteLayer;
})(egret.gui.SkinnableComponent);
GuildGoldPKCompleteLayer.prototype.__class__ = "GuildGoldPKCompleteLayer";
