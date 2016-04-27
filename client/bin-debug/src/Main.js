//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.webTapLimitTime = 200;
        this.lastTapTime = 0;
        this.lastTapDiff = 0;
        this.limitTime = 0;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var __egretProto__ = Main.prototype;
    __egretProto__.onAddToStage = function (event) {
        var prefix = "";
        if (Util.isLocalServer() || Util.isLocalClient()) {
            egret.Profiler.getInstance().run();
        }
        else {
            prefix = "taptitans/";
        }
        //inject the custom material parser
        //注入自定义的素材解析器
        egret.Injector.mapClass("egret.gui.IAssetAdapter", AssetAdapter);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        egret.gui.Theme.load(prefix + "resource/theme.thm");
        gm.init(this);
        new ResVersionManager().loadConfig(prefix + "resource/resource_version.json", this.loadResVersionComplate, this);
    };
    __egretProto__.loadResVersionComplate = function () {
        var prefix = "";
        if (!Util.isLocalServer() && !Util.isLocalClient()) {
            prefix = "taptitans/";
        }
        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig(prefix + "resource/resource.json", prefix + "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    __egretProto__.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("loadingRes", 1);
        RES.loadGroup("gameres");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    __egretProto__.onResourceLoadComplete = function (event) {
        if (event.groupName == "loadingRes") {
            this.loadingView = new LoadingUI();
            this.stage.addChild(this.loadingView);
        }
        if (event.groupName == "gameres") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
        }
    };
    __egretProto__.removeLoadingLayer = function () {
        Util.removeFromParent(this.loadingView);
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    __egretProto__.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    __egretProto__.onResourceProgress = function (event) {
        if (event.groupName == "gameres") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    __egretProto__.createGameScene = function () {
        System.init();
        gm.resReady = true;
        gm.drawScene();
        this.touchChildren = true;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTap, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
    };
    __egretProto__.touchTap = function (event) {
        var _this = this;
        if (!Util.isMobile()) {
            var now = new Date().getTime();
            var diff = now - this.lastTapTime;
            if (Math.abs(diff - this.lastTapDiff) <= 5) {
                this.limitTime++;
            }
            else {
                this.limitTime--;
                this.limitTime = Math.max(this.limitTime, 0);
            }
            if (this.limitTime > 10) {
                this.webTapLimitTime = 1000;
            }
            this.lastTapTime = now;
            this.lastTapDiff = diff;
            this.touchEnabled = false;
            egret.setTimeout(function () {
                _this.touchEnabled = true;
            }, this, this.webTapLimitTime);
        }
        gm.onTapScreen({ x: event.localX, y: event.localY });
    };
    __egretProto__.touchBegin = function (event) {
        if (gm.dataManage.holdingPower && !this.touchInterval) {
            this.touchInterval = egret.setInterval(function () {
                gm.onTapScreen({ x: event.stageX, y: event.stageY });
            }, this, 1000 / 30);
        }
    };
    __egretProto__.touchEnd = function (event) {
        if (this.touchInterval) {
            egret.clearInterval(this.touchInterval);
            this.touchInterval = null;
        }
    };
    __egretProto__.onRotation = function (angle) {
        if (angle == 0) {
        }
        else {
        }
    };
    return Main;
})(egret.DisplayObjectContainer);
Main.prototype.__class__ = "Main";
