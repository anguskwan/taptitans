/**
 * Created by lhb on 15/11/10.
 */
var tt;
(function (tt) {
    var Setting = (function () {
        function Setting() {
        }
        var __egretProto__ = Setting.prototype;
        Setting.isDamageTextShow = function () {
            var show = JSON.parse(localStorage.getItem("isDamageTextShow"));
            if (void 0 == show) {
                show = true;
            }
            return show;
        };
        Setting.setDamageTextShow = function (isShow) {
            localStorage.setItem("isDamageTextShow", JSON.stringify(isShow));
        };
        Setting.optimizePerformance = function (open) {
            tt.Setting.setDamageTextShow(!open);
            gm.gameScene.showAllHeroes(!open);
        };
        Setting.isOpenAutoHook = function () {
            var isOpenAutoHook = JSON.parse(localStorage.getItem("isOpenAutoHook"));
            if (isOpenAutoHook == null) {
                return false;
            }
            return isOpenAutoHook;
        };
        Setting.setOpenAutoHook = function (isOpen) {
            localStorage.setItem("isOpenAutoHook", JSON.stringify(isOpen));
        };
        Setting.isOpenAutoPrestige = function () {
            var isOpenAutoPrestige = JSON.parse(localStorage.getItem("isOpenAutoPrestige"));
            if (isOpenAutoPrestige == null) {
                return false;
            }
            return isOpenAutoPrestige;
        };
        Setting.setOpenAutoPrestige = function (isOpen) {
            localStorage.setItem("isOpenAutoPrestige", JSON.stringify(isOpen));
        };
        Setting.getAutoPrestigeStage = function () {
            var autoPrestigeStage = JSON.parse(localStorage.getItem("autoPrestigeStage"));
            if (autoPrestigeStage == null) {
                return 600;
            }
            return parseInt(autoPrestigeStage);
        };
        Setting.setAutoPrestigeStage = function (stage) {
            localStorage.setItem("autoPrestigeStage", JSON.stringify(stage));
        };
        Setting.isShowFps = false;
        Setting.isShowPKButton = true;
        return Setting;
    })();
    tt.Setting = Setting;
    Setting.prototype.__class__ = "tt.Setting";
})(tt || (tt = {}));
