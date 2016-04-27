/**
 *
 * @author 
 *
 */
class BoardPanel extends egret.gui.SkinnableComponent {
	public rightBtn:egret.gui.Button;
	public scroller:egret.gui.Scroller;
	public boardGroup:egret.gui.Group;
	public boardTextGroup:egret.gui.Group;

	public boardText: egret.gui.Label;

	public constructor() {
		super();
		this.skinName = skins.dialog.BoardPanelSkin;
	}

	public childrenCreated() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
		this.onTextGroup();
		gm.network.getBoardText((text) => {
			console.log("display the text:", text);
			Util.setStyleText(this.boardText, text);
		});

	}

	onTextGroup(){
		var textDesc1 = "各位亲爱的玩家，本次更新内容如下：";
		var textDesc5 = "" +
			"                                    《疯狂打怪兽》运营团队";

		var text1 = new egret.gui.Label();
		text1.size = 18;
		text1.width = 380;
		text1.fontFamily = "Arial";
		text1.text = textDesc1;

		this.boardText = new egret.gui.Label();
		this.boardText.size = 18;
		this.boardText.width = 380;
		this.boardText.fontFamily = "Arial";
		this.boardText.text = "载入中...";

		var text5 = new egret.gui.Label();
		text5.size = 18;
		text5.width = 380;
		text5.fontFamily = "Arial";
		text5.text = textDesc5;

		this.boardTextGroup.addElement(text1);
		this.boardTextGroup.addElement(this.boardText);
		this.boardTextGroup.addElement(text5);
	}

	onTouchLayer(event:egret.TouchEvent){
		event.stopPropagation();

		console.log("BoardPanel: touch the layer.");

		if(!event.target){return ;}
		if(event.target.parent == this.boardGroup){
			if(event.target == this.rightBtn){
				gm.guiLayer.removeElement(this);
			}
			return ;
		}
		else {
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
