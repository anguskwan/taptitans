module uiskins {
    /**
     *
     * @author
     *
     */
    export class GuildSearchItemRenderer extends egret.gui.ItemRenderer {
        public joinBtn:egret.gui.Button;
        public joinGroup:egret.gui.Group;
        public fullLbl:egret.gui.Label;
        public joinLbl:egret.gui.Label;
        public nameLbl:egret.gui.Label;
        public descLbl:egret.gui.Label;
        public lvLbl:egret.gui.Label;
        public iconImg:uiskins.GuildBadgeItem;
        public memberLbl:egret.gui.Label;

        public constructor() {
            super();
            this.skinName = skins.components.GuildSearchItemRendererSkin;
        }

        getMaxMember(){
            var members = this.data.level - 1;
            return 10 + members;
        }

        getMaxFightValue(){
            return formula.maxFightValue(gm.dataManage.data);
        }

        isFull(){
            return this.data.memberCount >= this.getMaxMember();
        }

        public childrenCreated() {
            super.childrenCreated();
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchBtnClick,this);
        }

        dataChanged() {
            super.dataChanged();
            this.setNameText();
            this.setIconImg();
            this.setMemberText();
            this.setFull();
            this.setLevelText();
        }

        isAddGuild(){
            return gm.dataManage.data.guild != 0;
        }

        onTouchBtnClick(event:egret.TouchEvent){
            if(event.target == this.joinBtn){
                if(this.isAddGuild()){
                    alert("你已经加入了工会。");
                    return ;
                }
                var setting = this.data.setting || {};
                var needReq = _.isUndefined(setting.needReq) ? true:setting.needReq;
                gm.gameUI.showLoadingLayer();
                if(needReq){
                    this.joinGroup.visible = false;
                    tt.GuildManage.joinGuild(this.data.id,function(){
                        gm.gameUI.hideLoadingLayer();
                    }.bind(this),function(){
                        gm.gameUI.hideLoadingLayer();
                    }.bind(this));
                }
                else {
                    this.joinGroup.visible = false;
                    tt.GuildManage.joinGuildWithoutReq(this.data.id,function(){
                        Util.invokeCallback(this.data.finishFunction);
                        gm.gameUI.hideLoadingLayer();
                    }.bind(this),function(){
                        gm.gameUI.hideLoadingLayer();
                    }.bind(this));
                }
            }
        }

        setNameText(){
            this.nameLbl.text = this.data.name;
        }

        setIconImg(){
            var name = this.data.presidentName || "英雄会长";
            var data = {
                iconSource:this.data.icon,
                name:name[0]
            };
            this.iconImg.dataItem = data;
            this.iconImg.changeDataItem();
        }

        setMemberText(){
            this.memberLbl.text = _.sprintf("%d/%d",this.data.memberCount,this.getMaxMember());
            if(this.isFull()){
                this.memberLbl.textColor = 0xF34627;
            }
            else {
                this.memberLbl.textColor = 0x25ff3a;
            }
        }

        setLevelText(){
            var level = this.data.level || 1;
            this.lvLbl.text = _.sprintf("Lv.%d",level);
        }

        setFull(){
            if(this.isFull()){
                this.fullLbl.text = "已满员";
                this.fullLbl.visible = true;
                this.joinGroup.visible = false;
            }
            else {
                var setting = this.data.setting || {};
                var needReq = _.isUndefined(setting.needReq) ? true:setting.needReq;
                var bpLimit = setting.bpLimit || 0;
                var maxValue = this.getMaxFightValue();
                if(maxValue < bpLimit){
                    this.fullLbl.text = "不满足要求";
                    this.fullLbl.visible = true;
                    this.joinGroup.visible = false;
                }
                else {
                    if(needReq){
                        this.fullLbl.visible = false;
                        this.joinGroup.visible = true;
                        this.joinLbl.text = "请求";
                    }
                    else {
                        this.fullLbl.visible = false;
                        this.joinGroup.visible = true;
                        this.joinLbl.text = "加入";
                    }
                }
            }
        }

        //setDesc(){
        //    var setting = this.data.setting || {};
        //    var needReq = _.isUndefined(setting.needReq) ? true:setting.needReq;
        //    var bpLimit = setting.bpLimit || 0;
        //    if(!needReq){
        //        this.descLbl.visible = true;
        //        this.descLbl.text = _.sprintf("%s以上",Util.formatNumber(bpLimit));
        //    }
        //    else {
        //        this.descLbl.visible = false;
        //    }
        //}
    }
}
