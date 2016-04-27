var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var RankBestGroup = (function (_super) {
        __extends(RankBestGroup, _super);
        function RankBestGroup() {
            _super.call(this);
            this.pageIndex = 0;
            this.skinName = skins.components.RankBestGroupSkin;
        }
        var __egretProto__ = RankBestGroup.prototype;
        __egretProto__.childrenCreated = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
            this._rankBestItemList = new egret.gui.ClassFactory(uiskins.RankBestItemList);
            this.bestData = [];
            this.initBestList();
        };
        __egretProto__.onTouchLayer = function (event) {
            if (event.target == this.nextBtn) {
                this.nextPageList();
            }
            if (event.target == this.preBtn) {
                this.prePageList();
            }
        };
        __egretProto__.updatePageBtn = function (data) {
            var size = _.size(data);
            if (this.pageIndex == 0) {
                if (size == 0 || size < 10) {
                    this.refreshGroup.visible = false;
                }
                else {
                    this.preGroup.visible = false;
                    this.nextGroup.visible = true;
                }
            }
            else {
                this.preGroup.visible = true;
                if (size == 0 || size < 10) {
                    this.nextGroup.visible = false;
                }
                else {
                    this.nextGroup.visible = true;
                }
            }
        };
        __egretProto__.initBestList = function () {
            gm.gameUI.showLoadingLayer();
            gm.network.getGlobalBPList(0, function (obj) {
                _.each(obj, function (v, i) {
                    this.bestData.push(v);
                }.bind(this));
                this.updatePageBtn(obj);
                var collection = this.bestCollection = new egret.gui.ArrayCollection(this.bestData);
                this.bestList.dataProvider = collection;
                this.bestList.itemRendererFunction = function (item) {
                    return this.getItemRender(item);
                }.bind(this);
                gm.gameUI.hideLoadingLayer();
            }.bind(this), function () {
                gm.gameUI.hideLoadingLayer();
            }.bind(this));
        };
        __egretProto__.getItemRender = function (event) {
            return this._rankBestItemList;
        };
        __egretProto__.prePageList = function () {
            gm.gameUI.showLoadingLayer();
            this.pageIndex--;
            gm.network.getGlobalBPList(this.pageIndex * 10, function (obj) {
                this.bestData = [];
                _.each(obj, function (v) {
                    this.bestData.push(v);
                }.bind(this));
                this.bestCollection.replaceAll(this.bestData);
                this.updatePageBtn(obj);
                gm.gameUI.hideLoadingLayer();
            }.bind(this), function () {
                gm.gameUI.hideLoadingLayer();
            }.bind(this));
        };
        __egretProto__.nextPageList = function () {
            gm.gameUI.showLoadingLayer();
            this.pageIndex++;
            gm.network.getGlobalBPList(this.pageIndex * 10, function (obj) {
                this.bestData = [];
                _.each(obj, function (v) {
                    this.bestData.push(v);
                }.bind(this));
                this.bestCollection.replaceAll(this.bestData);
                this.updatePageBtn(obj);
                gm.gameUI.hideLoadingLayer();
            }.bind(this), function () {
                gm.gameUI.hideLoadingLayer();
            }.bind(this));
        };
        return RankBestGroup;
    })(egret.gui.SkinnableComponent);
    uiskins.RankBestGroup = RankBestGroup;
    RankBestGroup.prototype.__class__ = "uiskins.RankBestGroup";
})(uiskins || (uiskins = {}));
