var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var GuildRankGroup = (function (_super) {
        __extends(GuildRankGroup, _super);
        function GuildRankGroup() {
            _super.call(this);
            this.pageIndex = 0;
            this.skinName = skins.components.GuildRankGroupSkin;
        }
        var __egretProto__ = GuildRankGroup.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
            this._guildRankItemRenderer = new egret.gui.ClassFactory(uiskins.GuildRankItemRenderer);
            this.rankData = [];
            this.initRankList();
        };
        __egretProto__.onTouchLayer = function (event) {
            if (event.target == this.nextBtn) {
                this.nextPageList();
            }
            if (event.target == this.preBtn) {
                this.prePageList();
            }
        };
        __egretProto__.initRankList = function () {
            gm.gameUI.showLoadingLayer();
            tt.GuildManage.listGuilds(0, function (obj) {
                _.each(obj, function (v, i) {
                    this.rankData.push(v);
                }.bind(this));
                this.updatePageBtn(obj);
                var collection = this.rankCollection = new egret.gui.ArrayCollection(this.rankData);
                this.rankList.dataProvider = collection;
                this.rankList.itemRendererFunction = function (item) {
                    return this.getItemRender(item);
                }.bind(this);
                gm.gameUI.hideLoadingLayer();
            }.bind(this), function () {
                gm.gameUI.hideLoadingLayer();
            }.bind(this));
        };
        __egretProto__.getItemRender = function (event) {
            return this._guildRankItemRenderer;
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
        __egretProto__.prePageList = function () {
            gm.gameUI.showLoadingLayer();
            this.pageIndex--;
            tt.GuildManage.listGuilds(this.pageIndex * 10, function (obj) {
                this.rankData = [];
                _.each(obj, function (v) {
                    this.rankData.push(v);
                }.bind(this));
                this.rankCollection.replaceAll(this.rankData);
                this.updatePageBtn(obj);
                gm.gameUI.hideLoadingLayer();
            }.bind(this), function () {
                gm.gameUI.hideLoadingLayer();
            }.bind(this));
        };
        __egretProto__.nextPageList = function () {
            gm.gameUI.showLoadingLayer();
            this.pageIndex++;
            tt.GuildManage.listGuilds(this.pageIndex * 10, function (obj) {
                this.rankData = [];
                _.each(obj, function (v) {
                    this.rankData.push(v);
                }.bind(this));
                this.rankCollection.replaceAll(this.rankData);
                this.updatePageBtn(obj);
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
        return GuildRankGroup;
    })(egret.gui.SkinnableComponent);
    uiskins.GuildRankGroup = GuildRankGroup;
    GuildRankGroup.prototype.__class__ = "uiskins.GuildRankGroup";
})(uiskins || (uiskins = {}));
