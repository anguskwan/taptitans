module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class HalidomItemRenderer extends egret.gui.ItemRenderer {
		public iconImg: egret.gui.UIAsset;
		public nameLbl: egret.gui.Label;
		public lvLbl: egret.gui.Label;
		public explainLbl1: egret.gui.Label;
		public explainLbl2: egret.gui.Label;
		public btnItem:uiskins.CommonItemButton;
		public dataItem:any;

		public constructor() {
			super();
			this.dataItem = {};
			this.skinName = skins.components.HalidomItemRendererSkin;
		}

		//name:info.name,
		//lv:info.level,
		//maxLv:info.maxLevel,
		//dmg:info.dmg,
		//effect:info.effect,
		//cost:info.cost

		initData(){
			this.dataItem = {
				level:this.getLevel(),
				cost:this.getCost(),
				value:this.getArtifactValue()
			}
		}

		getArtifactValue(){
			return gm.dataManage.artifact.getArtifactValue(this.data.id);
		}

		getMaxLevel(){
			return Conf.artifacts[this.data.id].maxLevel;
		}

		getLevel(){
			var artifact = _.find(gm.dataManage.data.artifacts, function(v) {return v["id"] == this.data.id;}.bind(this));
			return artifact["level"];
		}

		getCost(){
			return formula.artifactUpgradeCost(gm.dataManage.data, this.data.id);
		}

		isCostRelic(cost){
			return gm.dataManage.data.relic >= cost;
		}

		onArtifactResetPanel(){
			var data = {
				id:this.data.id,
				index:this.itemIndex - 1,
				itemIndex:this.itemIndex
			};
			var ly = new ArtifactResetPanel(data);
			gm.guiLayer.addElement(ly);
		}

		public childrenCreated() {
			super.childrenCreated();
			this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchBtnClick,this);
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
		}

		dataChanged() {
			super.dataChanged();
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
		}

		onTouchBtnClick(event:egret.TouchEvent){
			if(event.target == this.btnItem){
				if(this.dataItem.cost > 0 && this.isCostRelic(this.dataItem.cost)){
					gm.dataManage.artifact.upgrade(this.data.id);
				}
				return ;
			}
			this.onArtifactResetPanel();
		}

		onTouchBegin(event:egret.TouchEvent){
			if(event.target == this.btnItem){
			}
		}

		setName(){
			this.nameLbl.text = Conf.artifacts[this.data.id].name;
		}

		setLevel(){
			this.lvLbl.text = this.dataItem.level+"";
		}

		setIconImg(){
			this.iconImg.source = "artifact" + this.data.id;
		}

		setExplainText1(){
			var desc = Conf.artifacts[this.data.id].desc;
			var effect = this.dataItem.value.effect;
			this.explainLbl1.text = _.sprintf(desc, effect * 100);
		}

		setExplainText2(){
			var dmg = this.dataItem.value.damage;
			this.explainLbl2.text = _.sprintf("+%d%%总攻击力",dmg*100)
		}

		setBtnText(){
			var text:any;
			if(this.dataItem.cost == 0){
				text = "已满级";
			}
			else {
				text = "等级提升";
			}
			this.btnItem.textLbl.text = text;
		}

		setBtnIconImg(){
			this.btnItem.iconImg.source = "relic";
		}

		setBtnCost(){
			this.btnItem.iconLbl.text = Util.formatNumber(this.dataItem.cost);
		}

		setBtnSource(){
			var source:any;
			if(this.dataItem.cost == 0){
				source = "btn_disabled"
			}
			else {
				if(this.isCostRelic(this.dataItem.cost)){
					source = "btn_yellow"
				}
				else {
					source = "btn_disabled";
				}
			}
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