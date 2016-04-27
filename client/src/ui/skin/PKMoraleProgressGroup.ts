module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
    export class PKMoraleProgressGroup extends egret.gui.SkinnableComponent {
        public moraleBtn:egret.gui.Button;
        public timeBtn:egret.gui.Button;
        public timeLbl:egret.gui.Label;
        public progress:uiskins.PKProgressBar;
        private _timer:egret.Timer;
        public constructor() {
            super();
            this.skinName = skins.components.PKMoraleProgressGroupSkin;
        }

        public childrenCreated() {
            super.childrenCreated();
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
            gm.registerMessage(consts.kMessageBuyMorale,this.updateMorale,this);
            this._timer = new egret.Timer(1000);
            this._timer.addEventListener(egret.TimerEvent.TIMER,function(){
                var maxMorale = gm.dataManage.maxMorale();
                var currTime = new Date();
                var lastTime = gm.dataManage.data.willRemainTime;
                var currRemain = Math.floor((lastTime - currTime.getTime())/1000);
                var lastMorale = maxMorale - gm.dataManage.data.morale - 1;
                var currShow =  lastMorale*Conf.config["minutesPerMorale"]*60 + currRemain;
                if(currShow < 0){
                    currShow = 0;
                    this._timer.stop();
                }
                this.timeLbl.text = Util.formatTime(currShow,true);
            }.bind(this),this);
            this._timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,function(){
                this.updateMorale();
            }.bind(this),this);
            this.updateMorale();
        }

        public onStopTime(){
            this._timer.stop();
        }

        updateMorale(){
            tt.BattleManage.updateMorale(function(data){
                this.changeDataItem(data.morale,data.remain);
            }.bind(this));
        }

        changeDataItem(morale,remain){
            gm.dataManage.data.morale = morale;
            gm.dataManage.data.remain = remain;
            gm.dataManage.data.willRemainTime = new Date().getTime() + remain*1000;
            var maxMorale = gm.dataManage.maxMorale();
            this.progress.maximum = maxMorale;
            this.progress.value = morale;
            this.progress.numLbl.text = _.sprintf("%d%%",morale);
            if(morale == maxMorale){
                this.timeLbl.text = Util.formatTime(0,true);
                return ;
            }
            this._timer.delay = 1000;
            this._timer.repeatCount = remain + 1;
            this._timer.currentCount = 0;

            this._timer.reset();
            this._timer.start();
            gm.postMessage(consts.kMessageUpdateMorale);
        }

        onTouchLayer(event:egret.TouchEvent){
            if(event.target == this.moraleBtn){
                var moraleLy = new PKExplanationPanel();
                gm.guiLayer.addElement(moraleLy);
            }
            if(event.target == this.timeBtn){
                var recoveryLy = new PKRecoveryPanel();
                gm.guiLayer.addElement(recoveryLy);
            }
        }

        public partAdded(partName: string,instance: any): void {
            super.partAdded(partName,instance);
        }

        public partRemoved(partName: string,instance: any): void {
            super.partRemoved(partName,instance);
        }
    }
}
