/**
 *
 * @author
 *
 */
var BoardPanel = (function (_super) {
    __extends(BoardPanel, _super);
    function BoardPanel() {
        _super.call(this);
        this.skinName = skins.dialog.BoardPanelSkin;
    }
    var __egretProto__ = BoardPanel.prototype;
    __egretProto__.childrenCreated = function () {
        var _this = this;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.onTextGroup();
        gm.network.getBoardText(function (text) {
            console.log("display the text:", text);
            Util.setStyleText(_this.boardText, text);
        });
    };
    __egretProto__.onTextGroup = function () {
        var textDesc1 = "各位亲爱的玩家，本次更新内容如下：";
        var textDesc5 = "" + "                                    《疯狂打怪兽》运营团队";
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
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        console.log("BoardPanel: touch the layer.");
        if (!event.target) {
            return;
        }
        if (event.target.parent == this.boardGroup) {
            if (event.target == this.rightBtn) {
                gm.guiLayer.removeElement(this);
            }
            return;
        }
        else {
            gm.guiLayer.removeElement(this);
        }
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return BoardPanel;
})(egret.gui.SkinnableComponent);
BoardPanel.prototype.__class__ = "BoardPanel";
