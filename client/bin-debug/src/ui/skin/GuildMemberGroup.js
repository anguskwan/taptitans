var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var GuildMemberGroup = (function (_super) {
        __extends(GuildMemberGroup, _super);
        function GuildMemberGroup() {
            _super.call(this);
            this.skinName = skins.components.GuildMemberGroupSkin;
        }
        var __egretProto__ = GuildMemberGroup.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._guildMemberItemRenderer = new egret.gui.ClassFactory(uiskins.GuildMemberItemRenderer);
            this.memberData = [];
            this.initMemberList();
        };
        __egretProto__.initMemberList = function () {
            gm.gameUI.showLoadingLayer();
            var ids = gm.dataManage.guild.members;
            tt.GuildManage.playerList(ids, function (data) {
                _.each(data, function (v, i) {
                    v["delFunction"] = function (data) {
                        var index = data;
                        this.memberCollection.removeItemAt(index);
                    }.bind(this);
                    v["updateFunction"] = function () {
                        this.updateList();
                    }.bind(this);
                    this.memberData.push(v);
                }.bind(this));
                var collection = this.memberCollection = new egret.gui.ArrayCollection(this.memberData);
                this.memberList.dataProvider = collection;
                this.memberList.itemRendererFunction = function (item) {
                    return this.getItemRender(item);
                }.bind(this);
                gm.gameUI.hideLoadingLayer();
            }.bind(this), function () {
                gm.gameUI.hideLoadingLayer();
            }.bind(this));
        };
        __egretProto__.getItemRender = function (event) {
            return this._guildMemberItemRenderer;
        };
        __egretProto__.updateMemberList = function () {
            gm.gameUI.showLoadingLayer();
            var ids = gm.dataManage.guild.members;
            tt.GuildManage.playerList(ids, function (data) {
                this.memberData = [];
                _.each(data, function (v, i) {
                    v["delFunction"] = function (data) {
                        var index = data;
                        this.memberCollection.removeItemAt(index);
                    }.bind(this);
                    v["updateFunction"] = function () {
                        this.updateList();
                    }.bind(this);
                    this.memberData.push(v);
                }.bind(this));
                this.memberCollection.replaceAll(this.memberData);
                gm.gameUI.hideLoadingLayer();
            }.bind(this), function () {
                gm.gameUI.hideLoadingLayer();
            }.bind(this));
        };
        __egretProto__.updateList = function () {
            _.each(this.memberCollection.source, function (v) {
                this.memberCollection.itemUpdated(v);
            }.bind(this));
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return GuildMemberGroup;
    })(egret.gui.SkinnableComponent);
    uiskins.GuildMemberGroup = GuildMemberGroup;
    GuildMemberGroup.prototype.__class__ = "uiskins.GuildMemberGroup";
})(uiskins || (uiskins = {}));
