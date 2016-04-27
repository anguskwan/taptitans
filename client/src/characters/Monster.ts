/**
 * Created by lhb on 15/9/1.
 */

class Monster extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.anchorX = 0.5;
        this.anchorY = 0;
        this.addEventListener(egret.Event.ADDED, this.onAddChild, this);
    }

    private onAddChild():void {
        this.addView();
    }

    private addView():void {
        var bitmap = new egret.Bitmap();
        bitmap.texture = RES.getRes("monster");
        this.addChild(bitmap);
    }
}
