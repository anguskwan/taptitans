/**
 *
 * @author 
 *
 */
class GuildGoldRewardLayer extends egret.gui.SkinnableComponent {
	public textGroup:egret.gui.Group;
	public list:egret.gui.List;
	public listData:any;
	public collection:egret.gui.ArrayCollection;
	public _item:egret.gui.ClassFactory;
	public closeBtn:egret.gui.Button;
	public constructor() {
		super();
		this.skinName = skins.dialog.GuildGoldRewardLayerSkin;
	}

	public childrenCreated() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
		this._item = new egret.gui.ClassFactory(uiskins.GuildGoldRewardItemRenderer);
		this.listData = [];
		this.onInitList();
		this.onInitText();
	}

	onTouchLayer(event:egret.TouchEvent){
		event.stopPropagation();
		if(event.target == this.closeBtn){
			gm.guiLayer.removeElement(this);
		}
	}

	onInitList(){
		_.each(Conf.guildGoldScore,function(v){
			this.listData.push(v);
		}.bind(this));
		var collection:egret.gui.ArrayCollection = this.collection = new egret.gui.ArrayCollection(this.listData);
		this.list.dataProvider = collection;
		this.list.itemRendererFunction = function(item){
			return this.getItemRender(item);
		}.bind(this);
	}

	getItemRender(item){
		return this._item;
	}

	onInitText(){
		var textDesc1 = "- 开启时间为每天上午9点到晚上9点\n" +
			"- 每1小时开1个宫殿，共12个宫殿\n" +
			"- 每人每天只可进入1个宫殿\n" +
			"- 每个宫殿的前30分钟为报名时间，后30分钟为PK时间\n" +
			"- 奖励领取时间为晚上21点-24点，有效时间3个小时\n" +
			"- 按公会全体成员积分之和的排名获得奖励，奖励领取地点在公会排行榜页面最下方\n" +
			"- 第一天新加入公会的人，无法参加12个宫殿的比赛和领取排名奖励";

		var text1 = new egret.gui.Label();
		text1.size = 16;
		text1.width = 440;
		text1.textColor = 0xFFFFFF;
		text1.fontFamily = "Arial";
		Util.setStyleText(text1,textDesc1);

		this.textGroup.addElement(text1);
	}

	public partAdded(partName: string,instance: any): void {
		super.partAdded(partName,instance);
	}

	public partRemoved(partName: string,instance: any): void{
		super.partRemoved(partName,instance);
	}

}
