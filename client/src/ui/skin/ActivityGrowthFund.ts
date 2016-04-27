/**
 * Created by tmp on 16/4/15.
 */
module uiskins
{
    enum Status_Fund {
        NOT_PASS,
        VALID,
        OBTAINED
    }

    export class ActivityGrowthFund extends egret.gui.SkinnableComponent
    {
        public clock_label:egret.gui.Label;

        private static ITEM_NUM:Number = 7;

        /**
         * {
         * purchase : x, // 活动期间充值数
        * statusArr : [
        *    {id:x, status:x}  // 0为不满足，1为未领取，2为已领取
        * ]
        * }
         * */
        private fundData:any;

        /** 是否达到RMB充值条件 */
        private isMeetRMBDemand():boolean
        {
            return this.fundData && this.fundData.purchase >= Conf.config.growthFundMinRMBLimit;
        }

        /** 基金状态 */
        private getFundItemStatus(id:number): Status_Fund
        {
            if(!this.fundData)
            {
                return Status_Fund.NOT_PASS;
            }
            for(var entry in this.fundData.statusArr)
            {
                var item = this.fundData.statusArr[entry];
                if(item.id == id)
                {
                    return item.status;
                }
            }
            return Status_Fund.NOT_PASS;
        }

        public constructor()
        {
            super();
            this.skinName = skins.components.ActivityGrowthFundSkin;
        }

        public childrenCreated()
        {
            gm.gameUI.showLoadingLayer();
            tt.ActivityManage.activityInfo("growth_fund",
                (data:any)=>{
                    console.log("数据拉取成功");
                    this.fundData = data;
                    this.initView();
                    gm.gameUI.hideLoadingLayer();
                },

                ()=>{
                    gm.gameUI.hideLoadingLayer();
                }
            );
        }


        private initView()
        {
            var meta = Conf.activityGrowthFund;

            for(var i = 1; i <= ActivityGrowthFund.ITEM_NUM; i++)
            {
                var itemInfo:any = meta[i];
                this.updateLabel(i, itemInfo.level);

                var btn = this.getObtainBtn(i);
                btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickObtainBtn, this);
                btn.id = itemInfo.id;

                this.updateFundBtnStatus(i, this.getFundItemStatus(itemInfo.id));
            }

            //倒计时，
            var activityInfo = ActivityUtil.getActivityInfo(ActivityType.GROWTH_FUND);
            var curTime = gm.timeManage.getCurrentTime();
            var endTime = activityInfo.endTime;

            this.updateClockCountDown(Util.formatTime(Math.floor((endTime - curTime ) / 1000), true));

            var intervalEntry = egret.setInterval(function () {
                var curTime = gm.timeManage.getCurrentTime();
                this.updateClockCountDown(Util.formatTime(Math.floor((endTime - curTime ) / 1000), true));
            }, this, 1000);

            egret.setTimeout(()=>{
                this.updateClockCountDown("活动已结束", 0x00ff00);
                egret.clearInterval(intervalEntry);
            }, this, endTime - curTime
            );
        }

        private updateLabel(index:number, level:number)
        {
            var lbl = this.getLevleLabel(index);
            lbl.text = level.toString();
        }

        private updateFundBtnStatus(index:number, status:Status_Fund)
        {
            var btn = this.getObtainBtn(index);
            var not_pass = this.getNotPassImg(index);
            var has_obtain = this.getHasObtainedImg(index);

            btn.visible = not_pass.visible = has_obtain.visible = false;

            if(!this.isMeetRMBDemand())
            {
                return;
            }

            switch (status)
            {
                case Status_Fund.VALID:
                    btn.visible = true;
                    break;
                case Status_Fund.NOT_PASS:
                    not_pass.visible = true;
                    break;
                case Status_Fund.OBTAINED:
                    has_obtain.visible = true;
                    break;
            }
        }

        private getItemGroup(index:number) : egret.gui.Group
        {
            return this["gf_item_" + index];
        }

        private getLevleLabel(index:number):egret.gui.Label
        {
            return this["gf_label_level_" + index];
        }

        private getObtainBtn(index:number):egret.gui.Button
        {
            return this["gf_bt_obtain_" + index];
        }

        private getNotPassImg(index:number):egret.gui.UIAsset
        {
            return this["gf_not_pass_" + index];
        }

        private getHasObtainedImg(index:number):egret.gui.UIAsset
        {
            return this["gf_has_obtained_" + index];
        }

        private updateClockCountDown(timeStr:string, color:number = 0xffffff)
        {
            this.clock_label.text = timeStr;
            this.clock_label.textColor = color;
        }

        private onClickObtainBtn(event:egret.TouchEvent)
        {
            var id:number = event.target.id;

            gm.network.sendAction("gainGrowthFundAward", {growthId: id }, (data:any) => {

                var meta = Conf.activityGrowthFund;
                var itemInfo = meta[id];
                gm.dataManage.addItem(itemInfo.diamond, "diamond");
                this.updateFundBtnStatus(id, Status_Fund.OBTAINED);
            });
        }
    }
}