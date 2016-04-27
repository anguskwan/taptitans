var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var MatchRankItemList = (function (_super) {
        __extends(MatchRankItemList, _super);
        function MatchRankItemList(data) {
            _super.call(this);
            this.value = data;
            this.skinName = skins.components.MatchRankItemListSkin;
        }
        var __egretProto__ = MatchRankItemList.prototype;
        Object.defineProperty(__egretProto__, "dataItem", {
            get: function () {
                return this.value;
            },
            set: function (value) {
                this.value = value;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.changeItemStatus();
        };
        __egretProto__.getStageSetId = function () {
            var stage = this.value.score;
            var setId = Math.ceil(stage / 5);
            setId = Util.modByLimit(setId, 10);
            return setId;
        };
        __egretProto__.getStageMission = function () {
            var stage = this.value.score;
            var setId = Util.modByLimit(stage, 5);
            //console.log("stage" + stage + "setId" + setId);
            return setId;
        };
        __egretProto__.changeItemStatus = function () {
            if (this.value.rank <= 3) {
                this.numLbl.visible = false;
                this.numImg.visible = true;
                this.numImg.source = "rank_num" + this.value.rank;
            }
            else {
                this.numLbl.visible = true;
                this.numImg.visible = false;
            }
            this.nameLbl.text = this.value.name;
            this.numLbl.text = "" + this.value.rank;
            this.lvLbl.text = _.sprintf("%d关", this.value.score);
            this.stageImg.source = "submap" + this.getStageSetId() + "_" + this.getStageMission();
            this.lineImg.visible = this.value.isHideLine;
            if (this.value.avatar != "") {
                var url = this.getWechatUrlBySize(this.value.avatar, 96);
                //var url = "resource/image/scene_bg1.png";
                //var url = "http://wx.qlogo.cn/mmopen/UUiahibzfr6ichbwdRYFiaKgM77jdMWqdXA0ickibct3h1WC8ySeKSxS3wAoA7oEiaLVY1ricSAVdj947F0gQwCzCibny0Wevpogs1xY7/96"
                //var newUrl = this.getWechatUrlBySize(url,96);
                RES.getResByUrl(url, function (event) {
                    this.iconImg.source = event;
                    //var scaleX = this.iconImg.width / event.textureWidth;
                    //var scaleY = this.iconImg.height / event.textureHeight;
                    //this.iconImg.scaleX = scaleX;
                    //this.iconImg.scaleY = scaleY;
                }, this, RES.ResourceItem.TYPE_IMAGE);
            }
            if (this.value.isSelf) {
                this.lvLbl.textColor = 0xEB780F;
                this.numLbl.textColor = 0xEB780F;
                this.nameLbl.textColor = 0xEB780F;
            }
            else {
                this.lvLbl.textColor = 0xFFFFFF;
                this.numLbl.textColor = 0xFFFFFF;
                this.nameLbl.textColor = 0xFFFFFF;
            }
        };
        __egretProto__.getWechatUrlBySize = function (url, size) {
            return url.replace(/\/[0-9]+$/, "/" + size);
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return MatchRankItemList;
    })(egret.gui.SkinnableComponent);
    uiskins.MatchRankItemList = MatchRankItemList;
    MatchRankItemList.prototype.__class__ = "uiskins.MatchRankItemList";
})(uiskins || (uiskins = {}));
