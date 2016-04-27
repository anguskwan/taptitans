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

interface UnderscoreStatic extends UnderscoreStringStaticExports { }

interface SignPackage {
    appId:string;
    nonceStr:string;
    timestamp:number;
    signature:string;
    url:string;
}

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        var prefix = "";
        if (Util.isLocalServer() || Util.isLocalClient()) {
            egret.Profiler.getInstance().run();
        } else {
            prefix = "taptitans/"
        }
        //inject the custom material parser
        //注入自定义的素材解析器
        egret.Injector.mapClass("egret.gui.IAssetAdapter", AssetAdapter);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        egret.gui.Theme.load(prefix+"resource/theme.thm");
        gm.init(this);

        new ResVersionManager().loadConfig(prefix+"resource/resource_version.json", this.loadResVersionComplate, this);
    }

    private loadResVersionComplate():void{
        var prefix = "";
        if (!Util.isLocalServer() && !Util.isLocalClient()) {
            prefix = "taptitans/"
        }
        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig(prefix+"resource/resource.json", prefix+"resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("loadingRes", 1);
        RES.loadGroup("gameres");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
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
    }

    public removeLoadingLayer() {
        Util.removeFromParent(this.loadingView);
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "gameres") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {
        System.init();
        gm.resReady = true;
        gm.drawScene();
        this.touchChildren = true;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchTap,this);
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);
    }


    private touchInterval: number;
    private webTapLimitTime :number = 200;
    private lastTapTime = 0;
    private lastTapDiff = 0;
    private limitTime = 0;
    private touchTap(event:egret.TouchEvent) {
        if (!Util.isMobile()) {
            var now = new Date().getTime();
            var diff = now - this.lastTapTime;
            if (Math.abs(diff - this.lastTapDiff) <= 5) {
                this.limitTime ++;
            } else {
                this.limitTime --;
                this.limitTime = Math.max(this.limitTime, 0);
            }
            if (this.limitTime > 10) {
                this.webTapLimitTime = 1000;
            }
            this.lastTapTime = now;
            this.lastTapDiff = diff;
            this.touchEnabled = false;
            egret.setTimeout(() => {
                this.touchEnabled = true;
            }, this, this.webTapLimitTime);
        }
        gm.onTapScreen({x:event.localX, y:event.localY});
    }

    private touchBegin(event:egret.TouchEvent):void {
        if (gm.dataManage.holdingPower && !this.touchInterval) {
            this.touchInterval = egret.setInterval(function() {
                gm.onTapScreen({x:event.stageX, y:event.stageY});
            }, this, 1000 / 30);
        }
    }

    public touchEnd(event?:egret.TouchEvent):void {
        if (this.touchInterval) {
            egret.clearInterval(this.touchInterval);
            this.touchInterval = null;
        }
    }

    public onRotation(angle:number):void {
        if (angle == 0) {
            // 竖屏

        } else {
            // 横屏
        }
    }
}
