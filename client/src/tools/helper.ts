/**
 * Created by lhb on 15/10/26.
 */

module tt {

    export function fastAddChild(child) {
        var len = this._children.length;
        if (child._DO_Props_._parent == this) {
            len --;
        }
        return this._doAddChild(child, len, false);
    }

    export function fastRemoveChild(child) {
        child = this._children.indexOf(child);
        if (0 <= child) {
            return this._doRemoveChild(child, false);
        }
        egret.$error(1008);
        return null;
    }
}
