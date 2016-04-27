/**
 *
 * @author 
 *
 */
class PetPKLayer extends egret.gui.SkinnableComponent {

	public label_player1_name:egret.gui.Label;
	public label_player2_name:egret.gui.Label;
	public label_player1_pet:egret.gui.Label;
	public label_player2_pet:egret.gui.Label;
	public hp1_img:egret.gui.UIAsset;
	public hp2_img:egret.gui.UIAsset;

	public groupPet1:egret.gui.Group;
	public groupPet2:egret.gui.Group;
	
	public btn_fastFight:egret.gui.UIAsset;

	private armaturePet1: any;
	private armaturePet2: any;

	private state = 0;

	public constructor() {
		super();

		this.skinName = skins.dialog.PetPKLayerSkin;
	}

	public childrenCreated() {
        gm.gameUI.showLoadingLayer();

        // id 挑战时候需要发玩家id，缺省为0；
        // idx 挑战的宠物下标 默认为1
        gm.network.request("pk.pkHandler.getPKPetInfo", {id:0, idx : 1},
        function(data){
            this.serverData = data;
            console.log("getPetPkList response!");
            console.log(JSON.stringify(data));
            this.initUI();

            gm.gameUI.hideLoadingLayer();
        }.bind(this), function(){
            console.log("pet no response!");
            gm.gameUI.hideLoadingLayer();
        });
	}

	public initUI() {
		// pet1 
		var idPet1 = 10;
        this.armaturePet1 = new tt.Armature('boss'+idPet1);
	    this.armaturePet1.setCustomToken("token_monster", 0.5, 1);
        this.armaturePet1.defaultAnimation = "idle";
        this.armaturePet1.play("enter");	
    	this.groupPet1.addElement(this.armaturePet1);
        this.armaturePet1.addEventListener(this.armaturePet1.ANIM_END, this.onPet1AnimEnd, this);

		// pet2 
		var idPet2 = 11;
        this.armaturePet2 = new tt.Armature('boss'+idPet2);
	    this.armaturePet2.setCustomToken("token_monster", 0.5, 1);
        this.armaturePet2.defaultAnimation = "idle";
        this.armaturePet2.play("enter");	
    	this.groupPet2.addElement(this.armaturePet2);    	
	}

	// idle idle
	// attack hittd
	// idle idle 
	// hitted attack


	public onPet1AnimEnd() {
		if (this.state == 0){
			console.log("idle idle");
			this.armaturePet1.play("idle");
			this.armaturePet2.play("idle");
		} else if (this.state == 1) {
			console.log("idle hit");
			this.armaturePet1.play("idle");
			this.armaturePet2.play("hit");
		} else if (this.state == 2) {
			console.log("idle idle");
			this.armaturePet1.play("idle");
			this.armaturePet2.play("idle");
		} else if (this.state == 3) {
			console.log("hit idle");
			this.armaturePet1.play("hit");
			this.armaturePet2.play("idle");
		}

		this.state = this.state + 1;
		this.state = this.state % 4 ;		
	}

	public onTouchLayer() {

	}

}
