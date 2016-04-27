/**
 *
 * @author 
 *
 */
class GuildCreateLayer extends egret.gui.SkinnableComponent {
	public joinToggleBtn:uiskins.GuildJoinToggleBtn;
	public createToggleBtn:uiskins.GuildCreateToggleBtn;
	public searchToggleBtn:uiskins.GuildSearchToggleBtn;
	public joinGroup:egret.gui.Group;
	public createGroup:egret.gui.Group;
	public searchGroup:egret.gui.Group;
	public backBtn:egret.gui.Button;

	public autoEnterBtn: egret.gui.Button;

	public isInitJoinGroup:any;
	public isInitCreateGroup:any;
	public isInitSearchGroup:any;
	private toggleBtns:any[];

	public constructor() {
        super();
		this.isInitJoinGroup = true;
		this.isInitCreateGroup = true;
		this.isInitSearchGroup = true;
		this.toggleBtns = [];
		this.skinName = skins.dialog.GuildCreateLayerSkin;
	}

	public childrenCreated() {
		super.childrenCreated();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
		this.initToggleBtn();
	}

	initToggleBtn(){
		this.joinToggleBtn.addEventListener(egret.Event.CHANGE,this.toggleChangeHandler,this);
		this.createToggleBtn.addEventListener(egret.Event.CHANGE,this.toggleChangeHandler,this);
		this.searchToggleBtn.addEventListener(egret.Event.CHANGE,this.toggleChangeHandler,this);
		this.toggleBtns.push(this.joinToggleBtn);
		this.toggleBtns.push(this.createToggleBtn);
		this.toggleBtns.push(this.searchToggleBtn);
		this.changeRankList("join",true);
		this.changeRankList("create",false);
		this.changeRankList("search",false);
	}

	toggleChangeHandler(evt:egret.Event):void {
		var arr = ["join","create","search"];
		for(var i:number=0;i<this.toggleBtns.length;i++) {
			this.changeRankList(arr[i],(this.toggleBtns[i] == evt.target));
		}
	}

	changeRankList(name,isShow){
		this[name + "Group"].visible = isShow;
		this[name + "ToggleBtn"].selected = isShow;
		if(isShow){
			this[name + "InitGroup"]();
		}
	}

	joinInitGroup(){
		if(!this.isInitJoinGroup){return ;}
		var group = new uiskins.GuildJoinGroup(function(){
			gm.guiLayer.removeElement(this);
			this.showGuildLayer();
		}.bind(this));
		this.joinGroup.addElement(group);
		this.isInitJoinGroup = false;
	}

	createInitGroup(){
		if(!this.isInitCreateGroup){return ;}
		var group = new uiskins.GuildCreateGroup(function(){
			gm.guiLayer.removeElement(this);
			this.showGuildLayer();
		}.bind(this));
		this.createGroup.addElement(group);
		this.isInitCreateGroup = false;
	}

	searchInitGroup(){
		if(!this.isInitSearchGroup){return ;}
		var group = new uiskins.GuildSearchGroup(function(){
			gm.guiLayer.removeElement(this);
			this.showGuildLayer();
		}.bind(this));
		this.searchGroup.addElement(group);
		this.isInitSearchGroup = false;
	}

	showGuildLayer(){
		var ly = new GuildLayer();
		gm.guiLayer.addElement(ly);
	}

	onTouchLayer(event:egret.TouchEvent){
		event.stopPropagation();
		if(event.target == this.backBtn) {
			gm.guiLayer.removeElement(this);
		}
		else if (event.target == this.autoEnterBtn) {
			console.log("Guild: touch the auto enter btn");

			tt.GuildManage.autoEnterGuild( (data) => {
				console.log("Guild: auto enter guild success, guildId=" + data.id);
				gm.dataManage.data.guild = data.id;
				gm.guiLayer.removeElement(this);
				this.showGuildLayer();
			}, (fail) => {
				console.log("auto enter failed.");
			});
		}
	}

	public partAdded(partName: string,instance: any): void {
		super.partAdded(partName,instance);
	}

	public partRemoved(partName: string,instance: any): void{
		super.partRemoved(partName,instance);
	}
}
