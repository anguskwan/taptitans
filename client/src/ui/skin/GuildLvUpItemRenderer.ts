module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class GuildLvUpItemRenderer extends egret.gui.ItemRenderer {
		public iconImg:egret.gui.UIAsset;
		public nameLbl:egret.gui.Label;
		public descLbl:egret.gui.Label;
		public lvLbl:egret.gui.Label;
		public diamondLbl:egret.gui.Label;
		public progress:uiskins.GuildLvUpProgressBar;
		public lvUpBtn:egret.gui.Button;
		public currUpgrades:any;
		public constructor() {
			super();
			this.skinName = skins.components.GuildLvUpItemRendererSkin;
		}
		public childrenCreated() {
			super.childrenCreated();
			this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchBtnClick,this);

		}

		dataChanged() {
			super.dataChanged();
			this.initData();
			this.setIconImg();
			this.setNameText();
			this.setDescText();
			this.setLvText();
			this.setDiamondText();
			this.setProgress();
		}

		onTouchBtnClick(event:egret.TouchEvent){
			if(event.target == this.lvUpBtn){
				var limit = 5 + gm.dataManage.vipInfo().donate;
				var donate = gm.dataManage.data.dailyEvent.donate || 0;
				var gid = gm.dataManage.data.guild;
				var type = this.data.id;
				var diamond = gm.dataManage.guild.multiple*50;
				if (donate >= limit) {
					gm.postMessage(consts.kMessageShowToastLayer,"捐献次数已达上限");
					return ;
				}
				if (!gm.dataManage.costMoney(diamond, 'diamond')) {
					return ;
				}
				gm.gameUI.showLoadingLayer();
				gm.dataManage.donate(gid,type,diamond,function(){
					this.setProgress();
					this.setLvText();
					Util.invokeCallback(this.data.updateFunction);
					gm.gameUI.hideLoadingLayer();
				}.bind(this),function(){
					gm.gameUI.hideLoadingLayer();
				}.bind(this))
			}
		}

		initData(){
			var upgrades = _.clone(gm.dataManage.guild.upgrades);
			var id = this.data.id;
			if (!upgrades) {upgrades = {}}
			upgrades[id] = upgrades[id] || {exp:0, level:1};
			if (consts.kGuildUpgradeTypeMember == id) {
				this.currUpgrades = _.clone(gm.dataManage.guild);
			}
			else {
				this.currUpgrades = upgrades[id];
			}
		}

		setIconImg(){
			var icon = gm.gameUI.getGuildLvUpSource(this.data.id).icon;
			this.iconImg.source = icon;
		}

		setNameText(){
			var text = gm.gameUI.getGuildLvUpSource(this.data.id).title;
			this.nameLbl.text = text;
		}

		setDescText(){
			var base = gm.gameUI.getGuildLvUpSource(this.data.id).base;
			var baseType = gm.gameUI.getGuildLvUpSource(this.data.id).baseType;
			var text = gm.gameUI.getGuildLvUpSource(this.data.id).desc;
			var level = this.currUpgrades.level - 1;
			var value = baseType == 1 ? level:level*base;
			Util.setStyleText(this.descLbl,_.sprintf(text,value));
		}

		setLvText(){
			var level = this.currUpgrades.level;
			this.lvLbl.text = _.sprintf("Lv%d",level);
		}

		setDiamondText(){
			var diamond = gm.dataManage.guild.multiple*50;
			this.diamondLbl.text = _.sprintf("x%d",diamond);
		}

		setProgress(){
			var guild = this.currUpgrades;
			var meta = Conf.guildLevel[guild.level];
			if (meta && guild.exp <= meta.exp){
				this.progress.maximum = meta.exp;
				this.progress.value = guild.exp;
			}
			else {
				meta = Conf.guildLevel[10];
				this.progress.maximum = meta.exp;
				this.progress.value = meta.exp;
			}
		}
	}
}
