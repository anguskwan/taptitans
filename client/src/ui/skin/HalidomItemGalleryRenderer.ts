module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class HalidomItemGalleryRenderer extends egret.gui.ItemRenderer {
		public iconImg: egret.gui.UIAsset;
		public nameLbl: egret.gui.Label;
		public explainLbl1: egret.gui.Label;
		public explainLbl2: egret.gui.Label;
		public dataItem:any;
		public isHave:egret.gui.UIAsset;
		public topMask:egret.gui.Rect;
		public lvLbl:egret.gui.Label;

		public constructor() {
			super();
			this.dataItem = {};
			this.skinName = skins.components.HalidomItemGallerySkin;
		}

		initData(){
			this.dataItem = {
				cost:this.getCost(),
				value:this.getArtifactValue()
			}
		}

		getArtifactValue(){
			if (gm.dataManage.artifact.hasArtifact(this.data.id))
				return gm.dataManage.artifact.getArtifactValue(this.data.id);
			else
				return gm.dataManage.artifact.getArtifactValueStatic(this.data.id);
		}


		getCost(){
			return formula.artifactUpgradeCost(gm.dataManage.data, this.data.id);
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
			this.setExplainText1();
			this.setExplainText2();
		}

		onTouchBtnClick(event:egret.TouchEvent){

		}

		onTouchBegin(event:egret.TouchEvent){

		}

		setName(){
			this.nameLbl.text = Conf.artifacts[this.data.id].name;
		}



		setIconImg(){
			this.iconImg.source = "artifact" + this.data.id;

			var artifact=gm.dataManage.artifact.hasArtifact(this.data.id);
			if (artifact)
			{
				this.isHave.source = "halidom_gallery_2";
				this.topMask.visible=false;
				this.lvLbl.text = artifact["level"]+"";
			}
			else
			{
				this.isHave.source = "halidom_gallery_1";
				this.topMask.visible=true;
				this.lvLbl.text = "1";
			}

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



	}
}