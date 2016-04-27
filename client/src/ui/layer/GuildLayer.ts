/**
 *
 * @author 
 *
 */
class GuildLayer extends egret.gui.SkinnableComponent {
	public mainToggleBtn:uiskins.GuildMainToggleBtn;
	public memberToggleBtn:uiskins.GuildMemberToggleBtn;
	public shopToggleBtn:uiskins.GuildShopToggleBtn;
	public rankToggleBtn:uiskins.GuildRankToggleBtn;
	public manageToggleBtn:uiskins.GuildManageToggleBtn;
	public mainGroup:egret.gui.Group;
	public memberGroup:egret.gui.Group;
	public shopGroup:egret.gui.Group;
	public rankGroup:egret.gui.Group;
	public manageGroup:egret.gui.Group;
	public closeBtn:egret.gui.Button;
	public mainIsInit:any;
	public memberIsInit:any;
	public shopIsInit:any;
	public rankIsInit:any;
	public manageIsInit:any;
	private toggleBtns:any;
	private currName:any;
	public constructor() {
		super();
		this.toggleBtns = [];
		this.mainIsInit = true;
		this.memberIsInit = true;
		this.shopIsInit = true;
		this.rankIsInit = true;
		this.manageIsInit = true;
		this.skinName = skins.dialog.GuildLayerSkin;
	}

	public childrenCreated() {
		super.childrenCreated();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
		gm.registerMessage(consts.kMessageKickedGuild,this.onKickedGuild,this);
		this.initToggleBtn();
		this.onUpdateGuildWarStart();
	}

	onKickedGuild(){
		this.onCloseLayer();
	}

	initToggleBtn(){
		var arr = ["main","member","shop","rank","manage"];
		_.each(arr,function(name){
			this[name + "ToggleBtn"].addEventListener(egret.Event.CHANGE,this.toggleChangeHandler,this);
			this.toggleBtns.push(this[name + "ToggleBtn"]);
			this.changeRankList(name,name == "main");
		}.bind(this));
	}

	toggleChangeHandler(evt:egret.Event):void {
		var arr = ["main","member","shop","rank","manage"];
		for(var i:number=0;i<this.toggleBtns.length;i++) {
			this.changeRankList(arr[i],(this.toggleBtns[i] == evt.target));
		}
	}

	onUpdateGuildWarStart(){
		var currTime = new Date();
		var nextTime9 = new Date();
		var nextTime24 = new Date();
		nextTime9.setHours(9,0,0,0);
		nextTime24.setHours(24,0,0,0);
		var setoffTime9 = nextTime9.getTime() - currTime.getTime();
		var setoffTime24 = nextTime24.getTime() - currTime.getTime();
		if(setoffTime9 >= 0){
			egret.setTimeout(function(){
				this.onUpdateMainGroup();
			}.bind(this),this,setoffTime9)
		}
		if(setoffTime24 >= 0){
			egret.setTimeout(function(){
				this.onUpdateMainGroup();
			}.bind(this),this,setoffTime24)
		}
	}

	changeRankList(name,isShow){
		this[name + "Group"].visible = isShow;
		this[name + "ToggleBtn"].selected = isShow;
		if(isShow){
			this.currName = name;
			this.onUpdateGroup(name);
		}
	}

	onUpdateMainGroup(){
		if(this.currName == "main"){
			this.onUpdateGroup(this.currName);
		}
	}

	onUpdateGroup(name){
		if(this[name + "IsInit"]){
			this[name + "Init"]();
			this[name + "IsInit"] = false;
		}
		else {
			this[name + "Update"]();
		}
	}

	onTouchLayer(event:egret.TouchEvent){
		event.stopPropagation();
		if(event.target == this.closeBtn){
			this.onCloseLayer();
		}
	}

	mainInit(){
		var group = new uiskins.GuildMainGroup(function(){
			this.onCloseLayer();
		}.bind(this));
		this.mainGroup.addElement(group);
	}

	mainUpdate(){
		var group:uiskins.GuildMainGroup = <uiskins.GuildMainGroup>this.mainGroup.getElementAt(0);
		group.updateMain();
	}

	memberInit(){
		var group = new uiskins.GuildMemberGroup();
		this.memberGroup.addElement(group);
	}

	memberUpdate(){
		var group:uiskins.GuildMemberGroup = <uiskins.GuildMemberGroup>this.memberGroup.getElementAt(0);
		group.updateMemberList();
	}

	shopInit(){
		var group = new uiskins.GuildShopGroup();
		this.shopGroup.addElement(group);
	}

	shopUpdate(){

	}

	rankInit(){
		var group = new uiskins.GuildRankGroup();
		this.rankGroup.addElement(group);
	}

	rankUpdate(){

	}

	manageInit(){
		var group = new uiskins.GuildManageGroup(function(){
			this.onCloseLayer();
		}.bind(this));
		this.manageGroup.addElement(group);
	}

	manageUpdate(){
		var group:uiskins.GuildManageGroup = <uiskins.GuildManageGroup>this.manageGroup.getElementAt(0);
		group.updateMemberList();
	}

	onCloseLayer(){
		gm.removeMessage(consts.kMessageKickedGuild,this.onKickedGuild,this);
		gm.guiLayer.removeElement(this);
	}

	public partAdded(partName: string,instance: any): void {
		super.partAdded(partName,instance);
	}

	public partRemoved(partName: string,instance: any): void{
		super.partRemoved(partName,instance);
	}
}
