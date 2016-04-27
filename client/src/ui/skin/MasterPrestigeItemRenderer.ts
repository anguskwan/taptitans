module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class MasterPrestigeItemRenderer extends egret.gui.ItemRenderer {
		public iconDisabled: egret.gui.Rect;
		public btnItem: uiskins.CommonItemButton;

		public constructor() {
			super();
			this.skinName = skins.components.MasterPrestigeItemRendererSkin;
		}

		isUnlock(){
			//return gm.dataManage.isUnlockPrestige();
			return gm.dataManage.master.isUnlockSkill(this.data.id);
		}

		onPrestigeSkillPanel(){
			var data = {
				isUnlock:this.isUnlock()
			};
			gm.guiLayer.addElement(new PrestigeSkillPanel(data));
		}

		public childrenCreated() {
			super.childrenCreated();
			this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchBtnClick,this);
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
		}

		onTouchBtnClick(event:egret.TouchEvent){
			if(event.target == this.btnItem){
				if(this.isUnlock()){
					gm.guiLayer.addElement(new PrestigePanel());
				}
				return ;
			}
			this.onPrestigeSkillPanel();
		}

		onTouchBegin(event:egret.TouchEvent) {
			if (event.target == this.btnItem) {
			}
		}

		dataChanged() {
			super.dataChanged();
			//直接更改资源
			this.setBtnCost();
			this.setIconDisabled();
			this.setBtnText();
			this.setBtnSource();
		}

		setBtnCost(){
			this.btnItem.iconGroup.visible = false;
		}

		setIconDisabled(){
			if(this.isUnlock()){
				this.iconDisabled.visible = false;
			}
			else {
				this.iconDisabled.visible = true;
			}
		}

		setBtnText(){
			var text:any;
			if(this.isUnlock()){
				text = "蜕变";
			}
			else {
				text = _.sprintf("%d级解锁",Conf.masterSkill[this.data.id].unlock);;
			}
			this.btnItem.textLbl.text = text;
		}

		setBtnSource(){
			var source:any = this.isUnlock() ? "btn_orange":"btn_disabled";
			this.btnItem.setBtnSkinName(source);
		}

		public partAdded(partName: string,instance: any): void {
			super.partAdded(partName,instance);
		}

		public partRemoved(partName: string,instance: any): void {
			super.partRemoved(partName,instance);
		}
	}
}
