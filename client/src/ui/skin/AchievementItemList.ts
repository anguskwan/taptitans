module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
    export class AchievementItemList extends egret.gui.ItemRenderer {
        public btnItem: uiskins.CommonItemButton;
        public iconImg: egret.gui.UIAsset;
        public nameLbl: egret.gui.Label;
        public achieveLbl:egret.gui.Label;
        public starGroup:egret.gui.Group;

        public constructor() {
            super();
            this.skinName = skins.components.AchievementItemListSkin;
        }

        getName(){
            var mate = Conf.achievements[this.data.id];
            var desc = mate.name.replace("%d","%s");
            return _.sprintf(desc,Util.formatNumber(mate["star" + this.getCurrStars()]));
        }

        getCurrAchieveNum(){
            return gm.dataManage.data.achievements[this.data.id].value;
        }

        getMaxAchieveNum(){
            var mate = Conf.achievements[this.data.id];
            return mate["star" + this.getCurrStars()];
        }

        getCurrStars(){
            var stars = gm.dataManage.data.achievements[this.data.id].stars;
            var currStars = stars + 1;
            currStars = currStars > 5 ? 5:currStars;
            return currStars;
        }

        public childrenCreated() {
            super.childrenCreated();
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
        }

        onTouchLayer(event:egret.TouchEvent){
            gm.dataManage.gainAchievementReward(this.data.id);
        }

        dataChanged() {
            super.dataChanged();
            this.setNameText();
            this.setIconImg();
            this.setStartImg();
            this.setAchieveText();
            this.setBtnIconImg();
            this.setBtnText();
            this.setBtnCost();
            this.getBtnSource();
        }

        setNameText(){
            this.nameLbl.text = this.getName();
        }

        setIconImg(){
            this.iconImg.source = "achievement" + this.data.id;
        }

        setStartImg(){
            var starNum = gm.dataManage.data.achievements[this.data.id].stars;
            for(var i:number = 1;i <= 5;i++){
                this["starImg" + i].visible = (i <= starNum);
            }
        }

        setAchieveText(){
           this.achieveLbl.text = _.sprintf("%s/%s",Util.formatNumber(this.getCurrAchieveNum()),Util.formatNumber(this.getMaxAchieveNum()));
        }

        setBtnIconImg() {
            this.btnItem.iconImg.source = "diamond";
        }

        setBtnText(){
            this.btnItem.textLbl.text = "奖励";
        }

        setBtnCost(){
            var cost = consts.kAchievementsRewards[this.getCurrStars()];
            this.btnItem.iconLbl.text = Util.formatNumber(cost);
        }

        getBtnSource(){
            var isReward = gm.dataManage.isAchievementRewardAvailable(this.data.id);
            var source;
            if(isReward){
                source = "btn_orange";
            }
            else {
                source = "btn_disabled";
            }
            this.btnItem.setBtnSkinName(source);
        }

        public partAdded(partName: string,instance: any): void {
            super.partAdded(partName,instance);
        }

        public partRemoved(partName: string,instance: any): void{
            super.partRemoved(partName,instance);
        }
    }
}
