/**
 *
 * @author 
 *
 */
class MatchRewardLayer extends egret.gui.SkinnableComponent {
	public closeBtn:egret.gui.Button;
	public kSubTag:number = 1;
	public kNameTag:number = 0;
	public kDiamondTag:number = 1;
	public kWeaponTag:number = 2;
	public kDiamondNumTag:number = 1;
	public kWeaponNumTag:number = 1;

	public constructor() {
		super();
		this.skinName = skins.dialog.MatchRewardLayerSkin;
	}

	public childrenCreated() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
		this.initShowRankReward();
		this.cacheAsBitmap = true;
	}

	initShowRankReward(){
		var meta = Conf.contest;
		for(var i:number = 1;i <= 11;i++){
			var itemGroup:egret.gui.Group = <egret.gui.Group>this["group" + i].getElementAt(this.kSubTag);
			var diamondGroup:egret.gui.Group = <egret.gui.Group>itemGroup.getElementAt(this.kDiamondTag);
			var weaponGroup:egret.gui.Group = <egret.gui.Group>itemGroup.getElementAt(this.kWeaponTag);
			var nameLbl:egret.gui.Label = <egret.gui.Label>itemGroup.getElementAt(this.kNameTag);
			var diamondLbl:egret.gui.Label = <egret.gui.Label>diamondGroup.getElementAt(this.kDiamondNumTag);
			var weaponLbl:egret.gui.Label = <egret.gui.Label>weaponGroup.getElementAt(this.kWeaponNumTag);
			nameLbl.text = this.getRangeToName(meta[i].range);
			diamondLbl.text = _.sprintf("%d钻石",meta[i].diamond);
			weaponLbl.text = _.sprintf("%d武器升级",meta[i].weapon);
		}
	}

	getRangeToName(range){
		var min = range[0];
		var max = range[1];
		if(min == max){
			return _.sprintf("第%d名",min);
		}
		else {
			return _.sprintf("第%d-%d名",min,max);
		}
	}

	onTouchLayer(event:egret.TouchEvent){
		event.stopPropagation();
		this.onTouchTarget(event.target);
	}

	onTouchTarget(target){
		if(target == this.closeBtn){
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

class MatchHardRewardLayer extends MatchRewardLayer {
	public kCrystalTag:number = 3;
	public kCrystalNumTag:number = 1;

	public constructor() {
		super();
		this.skinName = skins.dialog.MatchHardRewardLayerSkin;
	}

	initShowRankReward() {
		var meta = Conf.contestHard;
		for(var i:number = 1;i <= 11;i++){
			var itemGroup:egret.gui.Group = <egret.gui.Group>this["group" + i].getElementAt(this.kSubTag);
			var diamondGroup:egret.gui.Group = <egret.gui.Group>itemGroup.getElementAt(this.kDiamondTag);
			var weaponGroup:egret.gui.Group = <egret.gui.Group>itemGroup.getElementAt(this.kWeaponTag);
			var crystalGroup:egret.gui.Group = <egret.gui.Group>itemGroup.getElementAt(this.kCrystalTag);
			var nameLbl:egret.gui.Label = <egret.gui.Label>itemGroup.getElementAt(this.kNameTag);
			var diamondLbl:egret.gui.Label = <egret.gui.Label>diamondGroup.getElementAt(this.kDiamondNumTag);
			var weaponLbl:egret.gui.Label = <egret.gui.Label>weaponGroup.getElementAt(this.kWeaponNumTag);
			var crystalLbl:egret.gui.Label = <egret.gui.Label>crystalGroup.getElementAt(this.kCrystalNumTag);
			nameLbl.text = this.getRangeToName(meta[i].range);
			diamondLbl.text = _.sprintf("%d钻石",meta[i].diamond);
			weaponLbl.text = _.sprintf("%d武器升级",meta[i].weapon);
			crystalLbl.text = _.sprintf("%d水晶",meta[i].crystal);
		}
	}
}
