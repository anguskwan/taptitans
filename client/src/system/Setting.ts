/**
 * Created by lhb on 15/11/10.
 */

module tt {

    export class Setting {

        static isShowFps = false;
        static isShowPKButton = true;

        static isDamageTextShow() {
            var show = JSON.parse(localStorage.getItem("isDamageTextShow"));
            if (void 0 == show) {
                show = true;
            }
            return show;
        }

        static setDamageTextShow(isShow) {
            localStorage.setItem("isDamageTextShow", JSON.stringify(isShow));
        }

        static optimizePerformance(open) {
            tt.Setting.setDamageTextShow(!open);
            gm.gameScene.showAllHeroes(!open);
        }

        static isOpenAutoHook(){
            var isOpenAutoHook = JSON.parse(localStorage.getItem("isOpenAutoHook"));
            if(isOpenAutoHook == null){
                return false;
            }
            return isOpenAutoHook;
        }

        static setOpenAutoHook(isOpen){
            localStorage.setItem("isOpenAutoHook", JSON.stringify(isOpen));
        }

        static isOpenAutoPrestige(){
            var isOpenAutoPrestige = JSON.parse(localStorage.getItem("isOpenAutoPrestige"));
            if(isOpenAutoPrestige == null){
                return false;
            }
            return isOpenAutoPrestige;
        }

        static setOpenAutoPrestige(isOpen){
            localStorage.setItem("isOpenAutoPrestige", JSON.stringify(isOpen));
        }

        static getAutoPrestigeStage(){
            var autoPrestigeStage = JSON.parse(localStorage.getItem("autoPrestigeStage"));
            if(autoPrestigeStage == null){
                return 600;
            }
            return parseInt(autoPrestigeStage);
        }

        static setAutoPrestigeStage(stage){
            localStorage.setItem("autoPrestigeStage", JSON.stringify(stage));
        }

    }
}
