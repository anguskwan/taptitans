/**
 *
 * @author 
 *
 */
class MatchStartPanel extends egret.gui.SkinnableComponent {
	public closeBtn:egret.gui.Button;
	public matchBtn:egret.gui.Button;
	public hardMatchBtn:egret.gui.Button;
	public touchGroup:egret.gui.Group;
	public touchHardGroup:egret.gui.Group;
	public hardLbl:egret.gui.Label;
	private kDiamondTag:number = 1;
	private kWeaponTag:number = 2;
	private kCrystalTag:number = 3;
	private kDiamondNumTag:number = 1;
	private kWeaponNumTag:number = 1;
	private kCrystalNumTag:number = 1;

	public constructor() {
		super();
		this.skinName = skins.dialog.MatchStartPanelSkin;
	}

	public childrenCreated() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
		this.initShowGeneralRankReward();
		//this.initShowHardRankReward();
		//this.onSetHardMatchStart();
	}

	initShowGeneralRankReward(){
		var meta = Conf.contest;
		for(var i:number = 1;i <= 3;i++){
			var itemGroup = this["group" + i];
			var diamondGroup:egret.gui.Group = itemGroup.getElementAt(this.kDiamondTag);
			var weaponGroup:egret.gui.Group = itemGroup.getElementAt(this.kWeaponTag);
			var diamondLbl:egret.gui.Label = <egret.gui.Label>diamondGroup.getElementAt(this.kDiamondNumTag);
			var weaponLbl:egret.gui.Label = <egret.gui.Label>weaponGroup.getElementAt(this.kWeaponNumTag);
			diamondLbl.text = _.sprintf("%d钻石",meta[i].diamond);
			weaponLbl.text = _.sprintf("%d武器升级",meta[i].weapon);
		}
	}

	onTouchLayer(event:egret.TouchEvent){
		event.stopPropagation();
		this.onTouchTarget(event.target);
	}

	onTouchTarget(target){
		var ly;
		var panel;
		if(target == this.closeBtn){
			gm.guiLayer.removeElement(this);
		}
		if(target == this.matchBtn){
			gm.guiLayer.removeElement(this);
			panel = new MatchPrestigePanel(false);
			gm.guiLayer.addElement(panel);
		}
		if(target == this.touchGroup){
			gm.guiLayer.removeElement(this);
			ly = new MatchRewardLayer();
			gm.guiLayer.addElement(ly);
		}
	}

	public partAdded(partName: string,instance: any): void {
		super.partAdded(partName,instance);
	}

	public partRemoved(partName: string,instance: any): void{
		super.partRemoved(partName,instance);
	}
}
