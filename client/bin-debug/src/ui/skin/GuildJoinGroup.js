var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var GuildJoinGroup = (function (_super) {
        __extends(GuildJoinGroup, _super);
        function GuildJoinGroup(finishFunction) {
            _super.call(this);
            this.pageIndex = 0;
            this.finishFunction = finishFunction;
            this.skinName = skins.components.GuildJoinGroupSkin;
        }
        var __egretProto__ = GuildJoinGroup.prototype;
        __egretProto__.childrenCreated = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
            this._guildJoinItemRenderer = new egret.gui.ClassFactory(uiskins.GuildJoinItemRenderer);
            this.guildData = [];
            this.initJoinList();
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
                    this.preBtn.visible = false;
                    this.nextBtn.visible = true;
                }
            }
            else {
                this.preBtn.visible = true;
                if (size == 0 || size < 10) {
                    this.nextBtn.visible = false;
                }
                else {
                    this.nextBtn.visible = true;
                }
            }
        };
        __egretProto__.initJoinList = function () {
            gm.gameUI.showLoadingLayer();
            tt.GuildManage.listGuilds(0, function (obj) {
                _.each(obj, function (v, i) {
                    v["finishFunction"] = function () {
                        Util.invokeCallback(this.finishFunction);
                    }.bind(this);
                    this.guildData.push(v);
                }.bind(this));
                this.updatePageBtn(obj);
                var collection = this.guildCollection = new egret.gui.ArrayCollection(this.guildData);
                this.guildList.dataProvider = collection;
                this.guildList.itemRendererFunction = function (item) {
                    return this.getItemRender(item);
                }.bind(this);
                gm.gameUI.hideLoadingLayer();
            }.bind(this), function () {
                gm.gameUI.hideLoadingLayer();
            }.bind(this));
        };
        __egretProto__.getItemRender = function (event) {
            return this._guildJoinItemRenderer;
        };
        __egretProto__.prePageList = function () {
            gm.gameUI.showLoadingLayer();
            this.pageIndex--;
            tt.GuildManage.listGuilds(this.pageIndex * 10, function (obj) {
                this.guildData = [];
                _.each(obj, function (v) {
                    v["finishFunction"] = function () {
                        Util.invokeCallback(this.finishFunction);
                    }.bind(this);
                    this.guildData.push(v);
                }.bind(this));
                this.guildCollection.replaceAll(this.guildData);
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
                this.guildData = [];
                _.each(obj, function (v) {
                    v["finishFunction"] = function () {
                        Util.invokeCallback(this.finishFunction);
                    }.bind(this);
                    this.guildData.push(v);
                }.bind(this));
                this.guildCollection.replaceAll(this.guildData);
                this.updatePageBtn(obj);
                gm.gameUI.hideLoadingLayer();
            }.bind(this), function () {
                gm.gameUI.hideLoadingLayer();
            }.bind(this));
        };
        return GuildJoinGroup;
    })(egret.gui.SkinnableComponent);
    uiskins.GuildJoinGroup = GuildJoinGroup;
    GuildJoinGroup.prototype.__class__ = "uiskins.GuildJoinGroup";
})(uiskins || (uiskins = {}));
