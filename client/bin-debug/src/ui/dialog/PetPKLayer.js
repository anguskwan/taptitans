/**
 *
 * @author
 *
 */
var PetPKLayer = (function (_super) {
    __extends(PetPKLayer, _super);
    function PetPKLayer() {
        _super.call(this);
        this.state = 0;
        this.skinName = skins.dialog.PetPKLayerSkin;
    }
    var __egretProto__ = PetPKLayer.prototype;
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.initUI();
    };
    __egretProto__.initUI = function () {
        // pet1 
        var idPet1 = 10;
        this.armaturePet1 = new tt.Armature('boss' + idPet1);
        this.armaturePet1.setCustomToken("token_monster", 0.5, 1);
        this.armaturePet1.defaultAnimation = "idle";
        this.armaturePet1.play("enter");
        this.groupPet1.addElement(this.armaturePet1);
        this.armaturePet1.addEventListener(this.armaturePet1.ANIM_END, this.onPet1AnimEnd, this);
        // pet2 
        var idPet2 = 11;
        this.armaturePet2 = new tt.Armature('boss' + idPet2);
        this.armaturePet2.setCustomToken("token_monster", 0.5, 1);
        this.armaturePet2.defaultAnimation = "idle";
        this.armaturePet2.play("enter");
        this.groupPet2.addElement(this.armaturePet2);
    };
    // idle idle
    // attack hittd
    // idle idle 
    // hitted attack
    __egretProto__.onPet1AnimEnd = function () {
        if (this.state == 0) {
            console.log("idle idle");
            this.armaturePet1.play("idle");
            this.armaturePet2.play("idle");
        }
        else if (this.state == 1) {
            console.log("idle hit");
            this.armaturePet1.play("idle");
            this.armaturePet2.play("hit");
        }
        else if (this.state == 2) {
            console.log("idle idle");
            this.armaturePet1.play("idle");
            this.armaturePet2.play("idle");
        }
        else if (this.state == 3) {
            console.log("hit idle");
            this.armaturePet1.play("hit");
            this.armaturePet2.play("idle");
        }
        this.state = this.state + 1;
        this.state = this.state % 4;
    };
    __egretProto__.onTouchLayer = function () {
    };
    return PetPKLayer;
})(egret.gui.SkinnableComponent);
PetPKLayer.prototype.__class__ = "PetPKLayer";
