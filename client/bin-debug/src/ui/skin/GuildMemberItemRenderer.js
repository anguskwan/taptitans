var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var GuildMemberItemRenderer = (function (_super) {
        __extends(GuildMemberItemRenderer, _super);
        function GuildMemberItemRenderer() {
            _super.call(this);
            this.skinName = skins.components.GuildMemberItemRendererSkin;
        }
        var __egretProto__ = GuildMemberItemRenderer.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnClick, this);
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.setNameText();
            this.setIconImg();
            this.setAttText();
            this.setPresidentText();
            this.setCurrText();
            this.setHighestStageText();
        };
        __egretProto__.onTouchBtnClick = function (event) {
            if (event.target == this.delBtn) {
                //kick
                //gm.gameUI.showLoadingLayer();
                //var guildId = gm.dataManage.data.guild;
                //var memberId = this.data.id;
                //tt.GuildManage.kick(guildId,memberId,function(){
                //	Util.invokeCallback(this.data.delFunction,this.itemIndex);
                //	gm.gameUI.hideLoadingLayer();
                //}.bind(this),function(){
                //	gm.gameUI.hideLoadingLayer();
                //}.bind(this));
                this.data.index = this.itemIndex;
                var ly = new GuildMemberOperationPanel(this.data);
                gm.guiLayer.addElement(ly);
            }
        };
        __egretProto__.setNameText = function () {
            var name = this.data.name || "英雄";
            this.nameLbl.text = name;
        };
        __egretProto__.setIconImg = function () {
            var avatar = this.data.avatar || "";
            if (avatar != "") {
                Util.setIconImg(avatar, this.iconImg, 96);
            }
            else {
                this.iconImg.source = "icon_default";
            }
        };
        __egretProto__.setAttText = function () {
            var battlePoint = this.data.battlePoint;
            if (isNaN(parseInt(battlePoint))) {
                battlePoint = parseInt(battlePoint);
            }
            this.attLbl.text = Util.formatNumber(parseFloat(battlePoint));
        };
        __egretProto__.setCurrText = function () {
            this.currLbl.text = _.sprintf("武器：%d    神器：%d", this.data.heroWeapons, this.data.artifacts);
        };
        __egretProto__.setHighestStageText = function () {
            this.highestStageLbl.text = _.sprintf("历史最高关卡：%d", this.data.highestStage);
        };
        __egretProto__.setPresidentText = function () {
            var id = gm.dataManage.data.id;
            var presidentId = gm.dataManage.guild.president;
            if (this.data.id == presidentId) {
                this.selfLbl.text = "会长";
                this.selfLbl.visible = true;
                this.delGroup.visible = false;
            }
            else {
                if (id == this.data.id) {
                    this.selfLbl.text = "我";
                    this.selfLbl.visible = true;
                    this.delGroup.visible = false;
                }
                else {
                    if (id == presidentId) {
                        this.selfLbl.visible = false;
                        this.delGroup.visible = true;
                    }
                    else {
                        this.selfLbl.visible = false;
                        this.delGroup.visible = false;
                    }
                }
            }
        };
        return GuildMemberItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.GuildMemberItemRenderer = GuildMemberItemRenderer;
    GuildMemberItemRenderer.prototype.__class__ = "uiskins.GuildMemberItemRenderer";
})(uiskins || (uiskins = {}));
