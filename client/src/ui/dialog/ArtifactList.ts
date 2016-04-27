/**
 *
 * @author 
 *
 */
class ArtifactList extends egret.gui.SkinnableComponent{
    public closeBtn:egret.gui.Button;
    private halidomCollection:egret.gui.ArrayCollection;
    private halidomData:any;
    private halidomList:egret.gui.List;

    public constructor() {
        super();
        this.skinName = skins.dialog.ArtifactListSkin;


    }

    public childrenCreated() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);

        this.halidomData = [];

        this.initData();
    }

    public initData() {
        _.each(Conf.artifacts,function(v){
            this.addHalidomData(v.id);
        }.bind(this));

        var collection:egret.gui.ArrayCollection = new egret.gui.ArrayCollection(this.halidomData);
        this.halidomList.dataProvider = collection;
        this.halidomList.itemRenderer = new egret.gui.ClassFactory(uiskins.HalidomItemGalleryRenderer);
    }

    public addHalidomData(i){
        var index = parseInt(i);
        var data:any;
        data = {
            type:consts.kItemRendererHalidom,
            id:index,
            level:1
        };
        this.halidomData.push(data);
    }


    onTouchLayer(event:egret.TouchEvent){
        event.stopPropagation();

        if(event.target == this.closeBtn){
            gm.guiLayer.removeElement(this);
        }

    }

    public partAdded(partName: string,instance: any): void {
        super.partAdded(partName,instance);
    }

    public partRemoved(partName: string,instance: any): void{
        super.partRemoved(partName,instance);
    }
}