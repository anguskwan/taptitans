var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var HalidomItemRenderer = (function (_super) {
        __extends(HalidomItemRenderer, _super);
        function HalidomItemRenderer() {
            _super.call(this);
            this.dataItem = {};
            this.skinName = skins.components.HalidomItemRendererSkin;
        }
        var __egretProto__ = HalidomItemRenderer.prototype;
        //name:info.name,
        //lv:info.level,
        //maxLv:info.maxLevel,
        //dmg:info.dmg,
        //effect:info.effect,
        //cost:info.cost
        __egretProto__.initData = function () {
            this.dataItem = {
                level: this.getLevel(),
                cost: this.getCost(),
                value: this.getArtifactValue()
            };
        };
        __egretProto__.getArtifactValue = function () {
            return gm.dataManage.artifact.getArtifactValue(this.data.id);
        };
        __egretProto__.getMaxLevel = function () {
            return Conf.artifacts[this.data.id].maxLevel;
        };
        __egretProto__.getLevel = function () {
            var artifact = _.find(gm.dataManage.data.artifacts, function (v) {
                return v["id"] == this.data.id;
            }.bind(this));
            return artifact["level"];
        };
        __egretProto__.getCost = function () {
            return formula.artifactUpgradeCost(gm.dataManage.data, this.data.id);
        };
        __egretProto__.isCostRelic = function (cost) {
            return gm.dataManage.data.relic >= cost;
        };
        __egretProto__.onArtifactResetPanel = function () {
            var data = {
                id: this.data.id,
                index: this.itemIndex - 1,
                itemIndex: this.itemIndex
            };
            var ly = new ArtifactResetPanel(data);
            gm.guiLayer.addElement(ly);
        };
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnClick, this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.initData();
            //直接更改资源
            this.setIconImg();
            this.setName();
            this.setLevel();
            this.setExplainText1();
            this.setExplainText2();
            this.setBtnText();
            this.setBtnIconImg();
            this.setBtnCost();
            this.setBtnSource();
        };
        __egretProto__.onTouchBtnClick = function (event) {
            if (event.target == this.btnItem) {
                if (this.dataItem.cost > 0 && this.isCostRelic(this.dataItem.cost)) {
                    gm.dataManage.artifact.upgrade(this.data.id);
                }
                return;
            }
            this.onArtifactResetPanel();
        };
        __egretProto__.onTouchBegin = function (event) {
            if (event.target == this.btnItem) {
            }
        };
        __egretProto__.setName = function () {
            this.nameLbl.text = Conf.artifacts[this.data.id].name;
        };
        __egretProto__.setLevel = function () {
            this.lvLbl.text = this.dataItem.level + "";
        };
        __egretProto__.setIconImg = function () {
            this.iconImg.source = "artifact" + this.data.id;
        };
        __egretProto__.setExplainText1 = function () {
            var desc = Conf.artifacts[this.data.id].desc;
            var effect = this.dataItem.value.effect;
            this.explainLbl1.text = _.sprintf(desc, effect * 100);
        };
        __egretProto__.setExplainText2 = function () {
            var dmg = this.dataItem.value.damage;
            this.explainLbl2.text = _.sprintf("+%d%%总攻击力", dmg * 100);
        };
        __egretProto__.setBtnText = function () {
            var text;
            if (this.dataItem.cost == 0) {
                text = "已满级";
            }
            else {
                text = "等级提升";
            }
            this.btnItem.textLbl.text = text;
        };
        __egretProto__.setBtnIconImg = function () {
            this.btnItem.iconImg.source = "relic";
        };
        __egretProto__.setBtnCost = function () {
            this.btnItem.iconLbl.text = Util.formatNumber(this.dataItem.cost);
        };
        __egretProto__.setBtnSource = function () {
            var source;
            if (this.dataItem.cost == 0) {
                source = "btn_disabled";
            }
            else {
                if (this.isCostRelic(this.dataItem.cost)) {
                    source = "btn_yellow";
                }
                else {
                    source = "btn_disabled";
                }
            }
            this.btnItem.setBtnSkinName(source);
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return HalidomItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.HalidomItemRenderer = HalidomItemRenderer;
    HalidomItemRenderer.prototype.__class__ = "uiskins.HalidomItemRenderer";
})(uiskins || (uiskins = {}));
