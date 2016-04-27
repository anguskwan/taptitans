var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var GuildMainGroup = (function (_super) {
        __extends(GuildMainGroup, _super);
        function GuildMainGroup(delFunction) {
            _super.call(this);
            this._value = null;
            this._delFunction = delFunction;
            this.isAddWarItem = true;
            this.isAddRedEnvelopeItem = true;
            this.skinName = skins.components.GuildMainGroupSkin;
        }
        var __egretProto__ = GuildMainGroup.prototype;
        __egretProto__.getMaxMember = function () {
            var members = this._value.level - 1;
            return 10 + members;
        };
        __egretProto__.isFull = function () {
            return _.size(this._value.members) >= this.getMaxMember();
        };
        __egretProto__.isPresident = function () {
            return gm.dataManage.data.id == this._value.president;
        };
        __egretProto__.childrenCreated = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
            this._guildWarItemRenderer = new egret.gui.ClassFactory(uiskins.GuildMainItemRenderer);
            this._guildRedEnevlopeItemRenderer = new egret.gui.ClassFactory(uiskins.GuildMainRedEnvelopeItemRenderer);
            this._guildGoldItemRenderer = new egret.gui.ClassFactory(uiskins.GuildMainGoldItemRenderer);
            this.warData = [];
            this.initWarList();
            this.loadingQueryById();
        };
        __egretProto__.onTouchLayer = function (event) {
            if (event.target == this.editorBtn) {
                var ly = new GuildNoticePanel(this._value.notice, function (text) {
                    this._value.notice = text;
                    this.setContentText();
                }.bind(this));
                gm.guiLayer.addElement(ly);
            }
        };
        __egretProto__.initWarList = function () {
            var collection = this.warCollection = new egret.gui.ArrayCollection(this.warData);
            this.warList.dataProvider = collection;
            this.warList.itemRendererFunction = function (item) {
                return this.getItemRender(item);
            }.bind(this);
        };
        __egretProto__.getItemRender = function (event) {
            if (event.type == consts.kItemRendererGuildMainWar) {
                return this._guildWarItemRenderer;
            }
            if (event.type == consts.kItemRendererGuildMainRedEnvelope) {
                return this._guildRedEnevlopeItemRenderer;
            }
            if (event.type == consts.kItemRendererGuildMainGold) {
                return this._guildGoldItemRenderer;
            }
        };
        __egretProto__.loadingQueryById = function () {
            gm.gameUI.showLoadingLayer();
            var id = gm.dataManage.data.guild;
            tt.GuildManage.queryById(id, function (data) {
                this._value = data;
                gm.dataManage.guild = data;
                this.updateWarList();
                this.initGuild();
                gm.gameUI.hideLoadingLayer();
            }.bind(this), function () {
                gm.gameUI.hideLoadingLayer();
            }.bind(this));
        };
        __egretProto__.updateWarList = function () {
            if (this.isAddWarItem) {
                var data;
                data = {
                    type: consts.kItemRendererGuildMainWar
                };
                data["delFunction"] = function () {
                    Util.invokeCallback(this._delFunction);
                }.bind(this);
                this.warCollection.addItem(data);
                data = {
                    type: consts.kItemRendererGuildMainGold
                };
                data["delFunction"] = function () {
                    Util.invokeCallback(this._delFunction);
                }.bind(this);
                this.warCollection.addItem(data);
                data = {
                    type: consts.kItemRendererGuildMainRedEnvelope
                };
                data["delFunction"] = function () {
                    Util.invokeCallback(this._delFunction);
                }.bind(this);
                this.warCollection.addItem(data);
                this.isAddWarItem = false;
            }
            else {
                _.each(this.warCollection.source, function (v) {
                    this.warCollection.itemUpdated(v);
                }.bind(this));
            }
        };
        __egretProto__.initGuild = function () {
            this.setNameText();
            this.setManagerText();
            this.setAttText();
            this.setMemberText();
            this.setEditorBtn();
            this.setContentText();
            this.setIconImg();
            this.setWarList();
        };
        __egretProto__.updateMain = function () {
            this.loadingQueryById();
        };
        __egretProto__.setNameText = function () {
            this.nameLbl.text = this._value.name;
        };
        __egretProto__.setManagerText = function () {
            var presidentName = this._value.presidentName || "英雄会长";
            this.managerLbl.text = "会长：" + presidentName;
        };
        __egretProto__.setAttText = function () {
            var battlePoint = this._value.battlePoint;
            if (isNaN(parseInt(battlePoint))) {
                battlePoint = parseInt(battlePoint);
            }
            this.attLbl.text = Util.formatNumber(battlePoint);
        };
        __egretProto__.setMemberText = function () {
            this.memberLbl.text = _.sprintf("%d/%d", _.size(this._value.members), this.getMaxMember());
            if (this.isFull()) {
                this.memberLbl.textColor = 0xF34627;
            }
            else {
                this.memberLbl.textColor = 0x25ff3a;
            }
        };
        __egretProto__.setEditorBtn = function () {
            if (this.isPresident()) {
                this.editorBtn.visible = true;
            }
            else {
                this.editorBtn.visible = false;
            }
        };
        __egretProto__.setContentText = function () {
            this.contentLbl.text = this._value.notice;
        };
        __egretProto__.setIconImg = function () {
            var name = this._value.presidentName || "英雄会长";
            var data = {
                iconSource: this._value.icon,
                name: name[0]
            };
            this.iconImg.dataItem = data;
            this.iconImg.changeDataItem();
        };
        __egretProto__.setWarList = function () {
        };
        return GuildMainGroup;
    })(egret.gui.SkinnableComponent);
    uiskins.GuildMainGroup = GuildMainGroup;
    GuildMainGroup.prototype.__class__ = "uiskins.GuildMainGroup";
})(uiskins || (uiskins = {}));
