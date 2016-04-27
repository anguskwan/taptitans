/**
 *
 * @author
 *
 */
var RankLayer = (function (_super) {
    __extends(RankLayer, _super);
    function RankLayer() {
        _super.call(this);
        this.skinName = skins.dialog.RankLayerSkin;
    }
    var __egretProto__ = RankLayer.prototype;
    __egretProto__.childrenCreated = function () {
        this._lineItemList = new egret.gui.ClassFactory(uiskins.RankLineItemList);
        this._rankItemList = new egret.gui.ClassFactory(uiskins.RankItemList);
        this._rankPKItemList = new egret.gui.ClassFactory(uiskins.RankPKItemList);
        if (!Util.isJuHe()) {
            this._rankInviteItemList = new egret.gui.ClassFactory(uiskins.RankInviteItemList);
        }
        this._initFriend = true;
        this._initWorld = true;
        this._initAtt = true;
        this.rankToggleBtns = [];
        this.friendData = [];
        this.worldData = [];
        this.attData = [];
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        var arr = ["world", "friend", "att"];
        _.each(arr, function (key) {
            this.initBtnSource(key);
        }.bind(this));
        this.changeRankList("friend", true);
        this.changeRankList("world", false);
        this.changeRankList("att", false);
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        if (event.target == this.btnBack) {
            gm.guiLayer.removeElement(this);
        }
    };
    __egretProto__.initBtnSource = function (name) {
        var btn = this[name + "Btn"];
        this.rankToggleBtns.push(btn);
        btn.addEventListener(egret.Event.CHANGE, this.toggleChangeHandler, this);
        this[name + "Btn"].upSkinName = "rank_topbtn_" + name + "_off";
        this[name + "Btn"].downSkinName = "rank_topbtn_" + name + "_on";
        this[name + "Btn"].disabledSkinName = "rank_topbtn_" + name + "_off";
        this[name + "Btn"].upAndSelectedSkinName = "rank_topbtn_" + name + "_on";
        this[name + "Btn"].downAndSelectedSkinName = "rank_topbtn_" + name + "_on";
        this[name + "Btn"].disabledAndSelectedSkinName = "rank_topbtn_" + name + "_on";
    };
    __egretProto__.toggleChangeHandler = function (evt) {
        var arr = ["world", "friend", "att"];
        for (var i = 0; i < this.rankToggleBtns.length; i++) {
            var btn = this.rankToggleBtns[i];
            this.changeRankList(arr[i], (btn == evt.target));
        }
    };
    __egretProto__.changeRankList = function (name, isShow) {
        this[name + "List"].visible = isShow;
        this[name + "Btn"].selected = isShow;
        if (isShow) {
            this[name + "InitList"]();
        }
    };
    __egretProto__.friendInitList = function () {
        if (!this._initFriend) {
            return;
        }
        gm.gameUI.showLoadingLayer();
        var data;
        gm.network.getFriendsRankList(function (obj) {
            _.each(obj, function (v, i) {
                data = {
                    type: consts.kItemRendererRank,
                    value: v,
                    typeList: "friend"
                };
                this.friendData.push(data);
            }.bind(this));
            data = {
                type: consts.kItemRendererRankInvite
            };
            this.friendData.push(data);
            var collection = this.friendCollection = new egret.gui.ArrayCollection(this.friendData);
            this.friendList.dataProvider = collection;
            this.friendList.itemRendererFunction = function (item) {
                return this.getItemRender(item);
            }.bind(this);
            this._initFriend = false;
            gm.gameUI.hideLoadingLayer();
        }.bind(this));
    };
    __egretProto__.worldInitList = function () {
        if (!this._initWorld) {
            return;
        }
        gm.gameUI.showLoadingLayer();
        var data; //
        var line;
        var isAddLine = false;
        gm.network.getRankList(function (obj) {
            _.each(obj, function (v, i) {
                var index = i + 1;
                data = {
                    type: consts.kItemRendererRank,
                    value: v,
                    typeList: "world"
                };
                if (index != v.rank + 1) {
                    if (!isAddLine) {
                        line = {
                            type: consts.kItemRendererRankLine
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
                type: consts.kItemRendererRankInvite
            };
            this.worldData.push(data);
            var collection = this.worldCollection = new egret.gui.ArrayCollection(this.worldData);
            this.worldList.dataProvider = collection;
            this.worldList.itemRendererFunction = function (item) {
                return this.getItemRender(item);
            }.bind(this);
            this._initWorld = false;
            gm.gameUI.hideLoadingLayer();
        }.bind(this));
    };
    __egretProto__.attInitList = function () {
        if (!this._initAtt) {
            return;
        }
        gm.gameUI.showLoadingLayer();
        var data; //
        var line;
        var isAddLine = false;
        gm.network.getBattlePointRankList(function (obj) {
            _.each(obj, function (v, i) {
                var index = i + 1;
                data = {
                    type: consts.kItemRendererRankPK,
                    value: v
                };
                if (index != v.rank + 1) {
                    if (!isAddLine) {
                        line = {
                            type: consts.kItemRendererRankLine
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
                type: consts.kItemRendererRankInvite
            };
            this.attData.push(data);
            var collection = this.attCollection = new egret.gui.ArrayCollection(this.attData);
            this.attList.dataProvider = collection;
            this.attList.itemRendererFunction = function (item) {
                return this.getItemRender(item);
            }.bind(this);
            this._initAtt = false;
            gm.gameUI.hideLoadingLayer();
        }.bind(this));
    };
    __egretProto__.getItemRender = function (item) {
        if (item.type == consts.kItemRendererRankInvite) {
            return this._rankInviteItemList;
        }
        if (item.type == consts.kItemRendererRankLine) {
            return this._lineItemList;
        }
        if (item.type == consts.kItemRendererRank) {
            return this._rankItemList;
        }
        if (item.type == consts.kItemRendererRankPK) {
            return this._rankPKItemList;
        }
    };
    /**
     partAdded 是皮肤部件赋值到逻辑类的入口，你可以在这里进行
     必要的初始化操作。比如需要随屏幕改变组件的尺寸，写在这里
     可以避免写在 childrenCreated 中修改造成的多次测量。


     The method "partAdded" will be called just after the
     skin parts is assigned to the property. You can make
     changes will effect to the layout or other components.
     */
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return RankLayer;
})(egret.gui.SkinnableComponent);
RankLayer.prototype.__class__ = "RankLayer";
