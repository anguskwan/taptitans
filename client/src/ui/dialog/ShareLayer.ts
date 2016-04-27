/**
 *
 * @author 
 *
 */
class ShareLayer extends egret.gui.SkinnableComponent {
	public handImg:egret.gui.UIAsset;
	skinName = skins.dialog.ShareLayerSkin;
	public lblDesc:egret.gui.Label;

	public groupTest:egret.gui.Group;

	public constructor() {
		super();
	}

	public childrenCreated() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
		this.runHandAni();

		if (gm.dataManage.shareTimes==0&&!gm.dataManage.isNotFirstShared)
			this.lblDesc.text=Conf.shareReward[1].content;
		else if(gm.dataManage.shareTimes==0&&gm.dataManage.isNotFirstShared)
			this.lblDesc.text=Conf.shareReward[2].content;
		else if(gm.dataManage.shareTimes==1)
			this.lblDesc.text=Conf.shareReward[3].content;
		else
			this.lblDesc.text="把游戏分享给好友吧！";

		//Util.testSkeleton(this.groupTest);
	}

	runHandAni(){
		egret.Tween.removeTweens(this.handImg);
		egret.Tween.get(this.handImg,{loop:true}).to({y:30},300).to({y:40},200);
	}

	onTouchLayer(event:egret.TouchEvent){
		event.stopPropagation();
		gm.guiLayer.removeElement(this);
	}

	public partAdded(partName: string,instance: any): void {
		super.partAdded(partName,instance);
	}

	public partRemoved(partName: string,instance: any): void{
		super.partRemoved(partName,instance);
	}
}
