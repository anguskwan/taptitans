var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var GuildSearchGroup = (function (_super) {
        __extends(GuildSearchGroup, _super);
        function GuildSearchGroup(finishFunction) {
            _super.call(this);
            this.finishFunction = finishFunction;
            this.skinName = skins.components.GuildSearchGroupSkin;
        }
        var __egretProto__ = GuildSearchGroup.prototype;
        __egretProto__.childrenCreated = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
            this._guildSearchItemRenderer = new egret.gui.ClassFactory(uiskins.GuildSearchItemRenderer);
            this.guildData = [];
            this.initSearchList();
        };
        __egretProto__.initSearchList = function () {
            var collection = this.guildCollection = new egret.gui.ArrayCollection(this.guildData);
            this.guildList.dataProvider = collection;
            this.guildList.itemRendererFunction = function (item) {
                return this.getItemRender(item);
            }.bind(this);
        };
        __egretProto__.getItemRender = function (event) {
            return this._guildSearchItemRenderer;
        };
        __egretProto__.onTouchLayer = function (event) {
            if (event.target == this.searchBtn) {
                var name = this.textInput.text;
                if (name == "") {
                    gm.gameUI.showLoadingLayer();
                    tt.GuildManage.randomTenGuild(function (data) {
                        this.guildData = [];
                        _.each(data, function (v) {
                            v["finishFunction"] = function () {
                                Util.invokeCallback(this.finishFunction);
                            }.bind(this);
                            this.guildData.push(v);
                        }.bind(this));
                        this.updateSearchList();
                        gm.gameUI.hideLoadingLayer();
                    }.bind(this), function () {
                        gm.gameUI.hideLoadingLayer();
                    }.bind(this));
                }
                else if (this.isRegExpCode(name)) {
                    gm.gameUI.showLoadingLayer();
                    tt.GuildManage.findGuild(name, function (data) {
                        this.guildData = [];
                        data["finishFunction"] = function () {
                            Util.invokeCallback(this.finishFunction);
                        }.bind(this);
                        this.guildData.push(data);
                        this.updateSearchList();
                        gm.gameUI.hideLoadingLayer();
                    }.bind(this), function () {
                        gm.gameUI.hideLoadingLayer();
                    }.bind(this));
                }
            }
        };
        __egretProto__.updateSearchList = function () {
            this.guildCollection.replaceAll(this.guildData);
        };
        __egretProto__.isRegExpCode = function (str) {
            var re = new RegExp("^[a-zA-Z0-9\\u4e00-\\u9fa5][a-zA-Z0-9\\u4e00-\\u9fa5]{0,10}$");
            return (str.search(re) != -1);
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return GuildSearchGroup;
    })(egret.gui.SkinnableComponent);
    uiskins.GuildSearchGroup = GuildSearchGroup;
    GuildSearchGroup.prototype.__class__ = "uiskins.GuildSearchGroup";
})(uiskins || (uiskins = {}));
