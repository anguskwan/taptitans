/**
 *
 * @author
 *
 */
var BottomSkillLayer = (function (_super) {
    __extends(BottomSkillLayer, _super);
    function BottomSkillLayer() {
        _super.call(this);
        this.time = 0;
        this.skinName = skins.mod.BottomSkillLayerSkin;
    }
    var __egretProto__ = BottomSkillLayer.prototype;
    __egretProto__.onRegister = function () {
        gm.registerMessage(consts.kMessageMasterUpgradeSkill, this.changeAllItemStatus, this);
        gm.registerMessage(consts.kMessagePrestige, this.changeAllItemStatus, this);
        gm.registerMessage(consts.kMessageMasterActiveSkill, this.onMasterActiveSkill, this);
    };
    __egretProto__.onMasterActiveSkill = function (obj) {
        if (obj) {
            this.setBtnTimeStatus(parseInt(obj.data));
        }
    };
    __egretProto__.changeAllItemStatus = function () {
        var isUnLock = false;
        for (var i = 1; i <= 6; i++) {
            isUnLock = this.isUnlockSkill(i);
            this.setSkillBtnSkin(this["_skillBtn" + i], isUnLock ? "btn_skill" + i : "btn_skill_disabled");
        }
    };
    /**
    所有子项和皮肤中的组件都已经创建完毕并完成测量，可以使用
        
    All the components in the children and skin have been
    created and measured, you can use them now.
    */
    __egretProto__.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.onRegister();
        //touch
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchDialog, this);
        //btn
        this.arrBtn = [];
        this.arrTime = [];
        var isUnLock = false;
        var time;
        for (var i = 1; i <= 6; i++) {
            isUnLock = this.isUnlockSkill(i);
            this.setSkillBtnSkin(this["_skillBtn" + i], isUnLock ? "btn_skill" + i : "btn_skill_disabled");
            this["_skillBtn" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchSkillBtnClick, this);
            this.arrBtn.push(this["_skillBtn" + i]);
            time = new egret.Timer(1000);
            var tempFun = (function (tmp) {
                return function (event) {
                    this.onSkillTimes(event, tmp);
                };
            })(i);
            time.addEventListener(egret.TimerEvent.TIMER, tempFun, this);
            this.arrTime.push({ time: time, cd: 0, duration: 0, currCd: 0, currDuration: 0 });
            this.setBtnTimeStatus(i);
        }
        //time.start();
        this.visible = true;
    };
    __egretProto__.isUnlockSkill = function (index) {
        var info = gm.dataManage.master.getSkillInfo(index);
        var unlock = gm.dataManage.master.isUnlockSkill(index);
        return unlock ? (info.level == 0 ? false : true) : false;
    };
    __egretProto__.setSkillBtnSkin = function (btn, skin) {
        btn.upSkinName = skin;
        btn.downSkinName = skin;
        btn.disabledName = skin;
    };
    __egretProto__.onSkillTimes = function (event, index) {
        this.changeBtnStatus(index);
    };
    __egretProto__.changeBtnStatus = function (index) {
        var i = index - 1;
        var btn = this.arrBtn[i];
        this.setBtnTimeCd(index);
        this.setBtnTimeDuration(index);
        var item = this.arrTime[i];
        btn.cdGroup.visible = (item.currCd !== 0 || item.currDuration !== 0);
        btn.cdLbl.textColor = item.currDuration == 0 ? 0xFFFFFF : 0xEB780F;
        btn.cdLbl.text = item.currDuration == 0 ? (item.currCd == 0 ? Util.formatTime(0) : Util.formatTime(item.cd - item.currCd)) : Util.formatTime(item.duration - item.currDuration);
    };
    __egretProto__.setBtnTimeCd = function (sid) {
        var i = sid - 1;
        var now = new Date();
        var skill = gm.dataManage.data.masterSkills[sid];
        var cd = this.arrTime[i].cd;
        var cdTime = new Date(skill.lastTimeUse);
        var past = (now.getTime() - cdTime.getTime()) / 1000;
        if (past < cd) {
            this.arrTime[i].currCd = past;
        }
        else {
            this.arrTime[i].currCd = 0;
        }
    };
    __egretProto__.setBtnTimeDuration = function (sid) {
        var i = sid - 1;
        var now = new Date();
        var skill = gm.dataManage.data.masterSkills[sid];
        var cd = this.arrTime[i].duration;
        var cdTime = new Date(skill.lastTimeUse);
        var past = (now.getTime() - cdTime.getTime()) / 1000;
        if (past < cd) {
            this.arrTime[i].currDuration = past;
        }
        else {
            this.arrTime[i].currDuration = 0;
        }
    };
    //set time
    __egretProto__.setBtnTimeStatus = function (index) {
        var i = index - 1;
        var info = gm.dataManage.master.getSkillInfo(index);
        var past = gm.dataManage.master.getSkillPast(index);
        var duration = gm.dataManage.master.getSkillDuration(index);
        if (past > 0) {
            this.arrTime[i].currCd = past;
            this.arrTime[i].currDuration = duration;
            this.arrTime[i].cd = info.cd;
            this.arrTime[i].duration = info.duration;
            this.arrTime[i].time.delay = 100;
            var repeatCount = info.cd > info.duration ? info.cd - past : info.duration - past;
            this.arrTime[i].time.repeatCount = Math.ceil(repeatCount * 10);
            this.arrTime[i].time.currentCount = 0;
            this.arrTime[i].time.reset();
            this.arrTime[i].time.start();
        }
        //console.log("repeat cd count " + (Math.ceil((info.cd - past)*10)));
        //console.log("repeat duration count " + (Math.ceil((info.duration - duration)*10)));
    };
    /**
    partAdded 是皮肤部件赋值到逻辑类的入口，你可以在这里进行
    必要的初始化操作。比如需要随屏幕改变组件的尺寸，写在这里
    可以避免写在 childrenCreated 中修改造成的多次测量。
        
        
    The method "partAdded" will be called just after the
    skin parts is assigned to the property. You can make
    changes will effect to the layout or other components.
    */
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    //touch
    __egretProto__.onTouchDialog = function (event) {
        event.stopPropagation();
    };
    __egretProto__.onTouchSkillBtnClick = function (event) {
        var index = this.skillGroup.getElementIndex(event.target);
        if (this.isUnlockSkill(index + 1)) {
            gm.dataManage.master.useSkill(index + 1);
        }
    };
    return BottomSkillLayer;
})(egret.gui.SkinnableComponent);
BottomSkillLayer.prototype.__class__ = "BottomSkillLayer";
