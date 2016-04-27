/**
 * Created by tom on 15/12/22.
 */

module tt {
    export class ActivityManage {

        static catInfo(cb,fail){
            gm.network.request("activity.activityHandler.catInfo", {}, (data) => {
                Util.invokeCallback(cb,data);
            },fail)
        }

        static catGo(cb,fail){
            gm.network.request("activity.activityHandler.catGo", {}, () => {
                gm.dataManage.updateDiamond(function(diamond){
                    this.catInfo(function(data){
                        Util.invokeCallback(cb,{times:data.times,diamond:diamond});
                    }.bind(this),function(){
                        Util.invokeCallback(fail);
                    }.bind(this));
                }.bind(this),function(){
                    Util.invokeCallback(fail);
                }.bind(this));
            },fail)
        }

        static purchaseInfo(cb,fail){
            gm.network.request("activity.activityHandler.purchaseInfo", {}, (data) => {
                Util.invokeCallback(cb,data);
            },fail)
        }

        static activityInfo(type,cb,fail){
            gm.network.request("activity.activityHandler.activityInfo", {type:type}, (data) => {
                if(type == "diamond"){
                    gm.dataManage.costDiamondActivity = data || {count:0,got:[]};
                }
                Util.invokeCallback(cb,data);
            },fail)
        }

        static getActivityReward(idx,cb,fail){
            gm.network.sendAction("getActivityReward", {idx:idx}, (data) => {
                gm.dataManage.purchaseActivity.got[idx] = true;
                Util.invokeCallback(cb,data);
            },fail)
        }

        static getActivityDiamondReward(idx,cb,fail){
            gm.network.sendAction("getActivityDiamondReward", {idx:idx}, (data) => {
                gm.dataManage.costDiamondActivity.got[idx] = true;
                Util.invokeCallback(cb,data);
            },fail)
        }
    }
}