/**
 *
 * @author
 *
 */
var PetPKPanel = (function (_super) {
    __extends(PetPKPanel, _super);
    function PetPKPanel() {
        _super.call(this);
        this.skinName = skins.dialog.PetPKPanelSkin;
    }
    var __egretProto__ = PetPKPanel.prototype;
    __egretProto__.addBgRectColorAndCenter = function () {
        var width = gm.guiLayer.width;
        var height = gm.guiLayer.height;
        this.bgRect = new egret.gui.Rect();
        this.bgRect.width = width;
        this.bgRect.height = height;
        this.bgRect.fillColor = 0x000000;
        this.bgRect.fillAlpha = 0.5;
        this.skin.addElementAt(this.bgRect, 0);
        this.width = width;
        this.height = height;
    };
    __egretProto__.childrenCreated = function () {
        this.addBgRectColorAndCenter();
        gm.gameUI.showLoadingLayer();
        // id 挑战时候需要发玩家id，缺省为0；
        // idx 挑战的宠物下标 默认为1
        gm.network.request("pk.pkHandler.getPKPetInfo", { id: 0, idx: 1 }, function (data) {
            this.serverData = data;
            console.log("getPetPkList response!");
            console.log(JSON.stringify(data));
            this.initUI();
            gm.gameUI.hideLoadingLayer();
        }.bind(this), function () {
            console.log("pet no response!");
            gm.gameUI.hideLoadingLayer();
        });
    };
    __egretProto__.initUI = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        console.log("pet initUI!");
        var petGrade = this.serverData["grade"];
        var petName = Conf.petRank[petGrade].name;
        var petRes = Conf.petRank[petGrade].res;
        this.labelUserName.text = this.serverData["name"];
        this.labelPetInfo.text = "lv" + this.serverData["level"] + petName;
        //armature
        //todo petres
        var petArm = new tt.Armature("boss" + 1);
        petArm.setCustomToken("token_monster", 0.5, 1);
        petArm.defaultAnimation = "idle";
        petArm.play("enter");
        this.containerPet.addChild(petArm);
        //award
        //this.labelCoin   
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        this.onTouchTarget(event.target);
    };
    __egretProto__.onTouchTarget = function (target) {
        if (target == this.closeBtn) {
            //			egret.gui.PopUpManager.removePopUp(this);
            gm.guiLayer.removeElement(this);
        }
        else if (target == this.attackBtnImg) {
            gm.guiLayer.removeElement(this);
            //show pk
            var petLayer = new PetPKLayer();
            gm.guiLayer.addElement(petLayer);
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
    return PetPKPanel;
})(egret.gui.SkinnableContainer);
PetPKPanel.prototype.__class__ = "PetPKPanel";
