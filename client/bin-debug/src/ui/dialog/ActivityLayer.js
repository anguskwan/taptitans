/**
 *
 * @author
 *
 */
var ActivityLayer = (function (_super) {
    __extends(ActivityLayer, _super);
    function ActivityLayer() {
        _super.call(this);
        this.newbagIsInit = true;
        this.vipIsInit = true;
        this.lifecardIsInit = true;
        this.threeIsInit = true;
        this.monthIsInit = true;
        this.eggIsInit = true;
        this.catIsInit = true;
        this.accuIsInit = true;
        this.blackIsInit = true;
        this.costdiamondIsInit = true;
        this.growth_fundIsInit = true;
        this.worthBoxIsInit = true;
        this.skinName = skins.dialog.ActivityLayerSkin;
    }
    var __egretProto__ = ActivityLayer.prototype;
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.onInitActivityName();
        this.initAllElement();
    };
    __egretProto__.onInitActivityName = function () {
        this.arrName = ["", "newbag", "vip"];
        this.arrBarName = ["", "首充奖励", "VIP福利"];
        this.onInitLifeCardName();
        this.onInitEggName();
        this.onInitCatName();
        this.onInitAccuName();
        this.onInitBlackName();
        this.onInitCostDiamondName();
        this.onInitThreeName();
        this.onInitMonthName();
        this.onInitGrowthFund();
        this.onInitWorthBox();
    };
    __egretProto__.onInitLifeCardName = function () {
        if (Util.isOpenLifeCardActivity()) {
            this.arrName.push("lifecard");
            this.arrBarName.push("终身卡");
        }
    };
    __egretProto__.onInitMonthName = function () {
        if (Util.isOpenMonth()) {
            this.arrName.push("month");
            this.arrBarName.push("月卡促销");
        }
    };
    __egretProto__.onInitThreeName = function () {
        var isBought = !!gm.dataManage.firstPurchaseGiftTime;
        var isByondTime = gm.dataManage.threeFinish == false;
        //判断入口资格
        if (isBought) {
            if (gm.dataManage.threeFinish) {
                return;
            }
        }
        else {
            if (!Util.isOpenThreeActivity()) {
                return;
            }
        }
        //开启入口
        this.addThreeDialog();
    };
    __egretProto__.addThreeDialog = function () {
        this.arrName.push("three");
        this.arrBarName.push("3元大礼包");
    };
    __egretProto__.onInitEggName = function () {
        if (Util.isOpenEggActivity()) {
            console.log("egg activity opened.");
            this.arrName.push("egg");
            this.arrBarName.push("砸金蛋");
            return;
        }
        console.log("egg activity is not open.");
    };
    __egretProto__.onInitCatName = function () {
        if (Util.isOpenCat()) {
            this.arrName.push("cat");
            this.arrBarName.push("招财猫");
        }
    };
    __egretProto__.onInitAccuName = function () {
        if (Util.isOpenAccu()) {
            this.arrName.push("accu");
            this.arrBarName.push("累充福利");
        }
    };
    __egretProto__.onInitBlackName = function () {
        if (Util.isOpenBlack()) {
            this.arrName.push("black");
            this.arrBarName.push("超值限购");
        }
    };
    __egretProto__.onInitCostDiamondName = function () {
        if (Util.isOpenCostDiamond()) {
            this.arrName.push("costdiamond");
            this.arrBarName.push("钻石返利");
        }
    };
    __egretProto__.onInitGrowthFund = function () {
        if (Util.isOpenGrowthActivity()) {
            this.arrName.push("growth_fund");
            this.arrBarName.push("成长基金");
        }
    };
    __egretProto__.onInitWorthBox = function () {
        if (Util.isOpenWorthBoxActivity()) {
            this.arrName.push("worthBox");
            this.arrBarName.push("超值宝箱");
        }
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        if (event.target == this.closeBtn) {
            gm.guiLayer.removeElement(this);
        }
        this.selectItemChangeStatus(event.target);
    };
    __egretProto__.selectItemChangeStatus = function (target) {
        var index = -1;
        for (var i = 1; i <= _.size(this.arrName) - 1; i++) {
            var idx = i - 1;
            var item = this.selectGroup2.getElementAt(idx);
            if (target == item) {
                index = i;
                this.updateGroup(this.arrName[i]);
            }
        }
        if (index != -1) {
            for (var i = 1; i <= _.size(this.arrName) - 1; i++) {
                this.showGroup(this.arrName[i], (index == i));
                var idx = i - 1;
                var item = this.selectGroup2.getElementAt(idx);
                item.dataItem.isSelect = (index == i);
                item.changeDataItem();
            }
        }
    };
    __egretProto__.initAllElement = function () {
        var data;
        for (var i = 1; i <= _.size(this.arrName) - 1; i++) {
            data = {
                isSelect: i == 1,
                iconSource: "activity_btn_" + this.arrName[i],
                name: this.arrBarName[i]
            };
            if (data.name == "3元大礼包") {
                data.iconSource = "activity3_in";
            }
            var item = new uiskins.ActivityItemSelect(data);
            this.selectGroup2.addElement(item);
        }
        this.updateGroup(this.arrName[1]);
        this.showGroup(this.arrName[1], true);
    };
    __egretProto__.showGroup = function (name, isShow) {
        this[name + "Group"].visible = isShow;
    };
    __egretProto__.updateGroup = function (name) {
        if (this[name + "IsInit"]) {
            this[name + "InitGroup"]();
            this[name + "IsInit"] = false;
        }
        else {
            this[name + "UpdateGroup"]();
        }
    };
    __egretProto__.catInitGroup = function () {
        var group = new uiskins.ActivityCatGroup();
        this.catGroup.addElement(group);
    };
    __egretProto__.catUpdateGroup = function () {
    };
    __egretProto__.newbagInitGroup = function () {
        var group = new uiskins.ActivityNewBagGroup();
        this.newbagGroup.addElement(group);
    };
    __egretProto__.newbagUpdateGroup = function () {
    };
    __egretProto__.vipInitGroup = function () {
        var group = new uiskins.ActivityVipGroup(function () {
            gm.guiLayer.removeElement(this);
        }.bind(this));
        this.vipGroup.addElement(group);
    };
    __egretProto__.vipUpdateGroup = function () {
    };
    __egretProto__.lifecardInitGroup = function () {
        console.log("init life card group");
        var group = new uiskins.ActivityLifeCardGroup(function () {
            gm.guiLayer.removeElement(this);
        }.bind(this));
        this.lifecardGroup.addElement(group);
    };
    __egretProto__.threeInitGroup = function () {
        var group = new uiskins.ActivityThree(function () {
            gm.guiLayer.removeElement(this);
        }.bind(this));
        this.threeGroup.addElement(group);
    };
    __egretProto__.monthInitGroup = function () {
        var group = new uiskins.ActivityMonth(function () {
            gm.guiLayer.removeElement(this);
        }.bind(this));
        this.monthGroup.addElement(group);
    };
    __egretProto__.lifecardUpdateGroup = function () {
    };
    __egretProto__.threeUpdateGroup = function () {
    };
    __egretProto__.monthUpdateGroup = function () {
    };
    __egretProto__.eggInitGroup = function () {
        console.log("init egg group");
        var group = new uiskins.ActivityEggGroup(function () {
            gm.guiLayer.removeElement(this);
        }.bind(this));
        this.eggGroup.addElement(group);
    };
    __egretProto__.eggUpdateGroup = function () {
    };
    __egretProto__.accuInitGroup = function () {
        var group = new uiskins.ActivityAccuGroup();
        this.accuGroup.addElement(group);
    };
    __egretProto__.accuUpdateGroup = function () {
    };
    __egretProto__.blackInitGroup = function () {
        //var group = new uiskins.ActivityBlackGroup();
        var group = new uiskins.ActivityWorthGroup(); //todoyby
        this.blackGroup.addElement(group);
    };
    __egretProto__.blackUpdateGroup = function () {
    };
    __egretProto__.costdiamondInitGroup = function () {
        var group = new uiskins.ActivityCostDiamondGroup();
        this.costdiamondGroup.addElement(group);
    };
    __egretProto__.costdiamondUpdateGroup = function () {
    };
    __egretProto__.growth_fundInitGroup = function () {
        var group = new uiskins.ActivityGrowthFund();
        this.growth_fundGroup.addElement(group);
    };
    __egretProto__.worthBoxInitGroup = function () {
        var group = new uiskins.ActivityWorthBox();
        this.worthBoxGroup.addElement(group);
    };
    __egretProto__.growth_fundUpdateGroup = function () {
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return ActivityLayer;
})(egret.gui.SkinnableComponent);
ActivityLayer.prototype.__class__ = "ActivityLayer";
