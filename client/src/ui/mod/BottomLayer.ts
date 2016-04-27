/**
 *
 * @author 
 *
 */
class BottomLayer extends egret.gui.SkinnableComponent {
    public bottomPopUpGroup:egret.gui.Group;
    public bottomPopUpDialog: BottomPopUpDialog;
    public bottomShowLy: BottomShowLayer;
    public bottomSkillLy: BottomSkillLayer;
    public bottomTabBarLy: BottomTabBarLayer;
    
    public constructor() {
        super();
        this.skinName = skins.mod.BottomLayerSkin;
    }

    public childrenCreated() {
        super.childrenCreated();
        gm.registerMessage(consts.kMessageShowPopUpDialog, this.showBottomPopUpDialog, this);
        gm.registerMessage(consts.kMessageHidePopUpDialog, this.hideBottomPopUpDialog, this);

        gm.registerMessage(consts.kMessageChangeToMin,this.changeToMin,this);
        gm.registerMessage(consts.kMessageChangeToMax,this.changeToMax,this);
    }

    public changeToMin():void {

        this.bottomPopUpGroup._setHeight(DIALOG_MAIN_MIN);
        this.bottomPopUpDialog._setHeight(DIALOG_MAIN_MIN);
    }

    public changeToMax():void {

        this.bottomPopUpGroup._setHeight(DIALOG_MAIN_MAX);
        this.bottomPopUpDialog._setHeight(DIALOG_MAIN_MAX);
    }

    private bottomPopUp:BottomPopUpDialog = null;
    showBottomPopUpDialog(obj){
        if(!this.bottomPopUpDialog){
            if(!this.bottomPopUp){
                this.bottomPopUp = new BottomPopUpDialog(obj)
            }
            else {
                this.bottomPopUp.selectTabBarShowList(obj);
            }
            var ly = this.bottomPopUpDialog = this.bottomPopUp;
            this.bottomPopUpGroup.addElement(ly);
        }
        else {
            this.bottomPopUpDialog.selectTabBarShowList(obj);
        }
    }

    hideBottomPopUpDialog(){
        if(this.bottomPopUpDialog){
            this.bottomPopUpGroup.removeElement(this.bottomPopUpDialog);
            this.bottomPopUpDialog = null;
        }
        //if(this.bottomPopUpDialog){
        //    this.bottomPopUpDialog.visible = false;
        //}
    }

    /**
    partAdded 是皮肤部件赋值到逻辑类的入口，你可以在这里进行
    必要的初始化操作。比如需要随屏幕改变组件的尺寸，写在这里
    可以避免写在 childrenCreated 中修改造成的多次测量。
        
        
    The method "partAdded" will be called just after the
    skin parts is assigned to the property. You can make
    changes will effect to the layout or other components.
    */
    public partAdded(partName: string,instance: any): void {
        super.partAdded(partName,instance);
    }

    public partRemoved(partName: string,instance: any): void{
        super.partRemoved(partName,instance);
    }

}
