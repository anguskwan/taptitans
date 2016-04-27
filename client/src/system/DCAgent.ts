/**
 * Created by lhb on 15/10/14.
 */

class myDCAgent {
    static timer:number;
    static init() {
        var agentConfig:DCAgentInitConfig = new DCAgentInitConfig();
        agentConfig.appId = "97BD2E87781A20F6BAF5D04F59019BD3";
        agentConfig.accountId = gm.dataManage.data.id;
        agentConfig.appVer = 'v1.0';
        agentConfig.channel = gm.dataManage.data.channel;
        agentConfig.interval = 60;
        agentConfig.virus = false;
        DCAgent.init(agentConfig);
//        myDCAgent.timer = egret.setTimeout(() => {
//            DCAgent.onEvent("loadingTooLong");
//        }, this, 10 * 1000);
    }

    static clearTimer() {
        clearTimeout(myDCAgent.timer);
    }

//    static login(name) {
//        DCAgent.login(name);
//    }

//    static onPayment(amount, iapid, orderId) {
//        var config : DCAgentPaymentConfig = {
//            amount : amount,
//            currencyType: 'CNY',
//            payType: '微信',
//            iapid : iapid,
//            orderId: orderId
//        };
//        DCAgent.onPayment(config);
//    }

    static onEvent(eventId, data?) {
        DCAgent.onEvent(eventId, 1, data);
    }

//    static onItemBuy(itemID: string, coinNum: number) {
//        DCAgent.onItemBuy(itemID, 1, 'diamond', coinNum, gm.dataManage.data.stage);
//    }
}
