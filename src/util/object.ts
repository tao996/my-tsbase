import {cloneDeep, at, forIn, keys} from "lodash";
import {map} from "./util";
import {MyAssets} from "./assets";

export interface SortItem {
    sort_id: number;
    id?: number;
}

export class MyObject {

    /**
     * 深复制
     * @param {any} obj 待复制的数据
     */
    static deepCopy(obj: any) {
        return cloneDeep(obj)
    }

    static sortCompareFn(a: SortItem, b: SortItem): number {
        if (a.sort_id < b.sort_id) {
            return 1;
        } else if (a.sort_id > b.sort_id) {
            return -1;
        } else if (a.id && b.id && a.id != b.id) {
            return a.id < b.id ? -1 : 1;
        }
        return 0;
    }

    /**
     * 找出 dict 中值为 value 的索引
     * @param dict {Object} 数组或者对象
     * @param value {any} 待检测的值
     */
    static keyOf(dict: any, value: any): string | number | null {
        for (let index in dict) {
            if (dict.hasOwnProperty(index) && dict[index] == value) {
                return index;
            }
        }
        return null;
    }

    /**
     * 从对象中选择指定的健，并返回新对象 <br>
     * 注意，在 Page 中使用 keys 时，需要使用 Object.keys(new UserInfo())，不能使用 Object.keys(this.data.xxx)，否则可能错误
     * @param obj
     * @param keys
     * @param skipEmpty
     */
    static picker(obj: any, keys: string[], skipEmpty = false): any {
        const res: map = {};
        for (const key of keys) {
            if (skipEmpty) {
                if (!MyAssets.isEmpty(obj[key])) {
                    res[key] = obj[key];
                }
            } else {
                res[key] = obj[key];
            }
        }
        return res;
    }

    /**
     * 提取数据中的真值
     * @param {any} data 数值
     */
    static pickTrueItems(data: any) {
        const res: map = {};
        Object.keys(data).forEach(key => {
            if (!MyAssets.isEmpty(data[key])) {
                res[key] = data[key];
            }
        })
        return res;
    }

    /**
     * 将 source 中指定的属性值复制到 destination 中
     * @param destination {Object} 目标对象
     * @param source {Object} 复制源
     * @param keys {Array} 需要复制到属性名称
     * @param skipEmpty {boolean} 是否跳过 source[key] 为空的值，默认 false(即使是空值也要复制)
     */
    static overwrite(destination: any, source: any, keys: string[], skipEmpty = false): any {
        for (const key of keys) {
            if (skipEmpty) {
                if (!MyAssets.isEmpty(source[key])) {
                    destination[key] = source[key];
                }
            } else {
                destination[key] = source[key];
            }
        }
    }

    /**
     * 如果 source[key] 不为空,则用它的值来替换 destination[key]
     * @param {Object} destination 源数据
     * @param {Object} source 复制源
     */
    static overwriteTrueItems(destination: any, source: any) {
        Object.keys(destination).forEach(key => {
            if (typeof source[key] !== 'undefined') {
                destination[key] = source[key];
            }
        })
    }

    /**
     * @param destination {Object} 目标数据
     * @param source {Object} 复制源
     * @param def {Object} 默认值源
     */
    static overwriteNoEmpty(destination: any, source: any, def: any) {
        Object.keys(destination).forEach(key => {
            if (typeof source[key] !== 'undefined') {
                if (MyAssets.isEmpty(source[key])) {
                    if (!MyAssets.isEmpty(def[key])) {
                        destination[key] = def[key];
                    }
                } else {
                    destination[key] = source[key];
                }
            }
        })
    }

    /**
     * 来自 object 的 path 路径相应的值, _.at({a:{b:{c:'age'}}}, 'a.b.c').shift() == 'age'
     * @param obj {Object}
     * @param path {string} 路径
     */
    static at(obj: any, path: string): any {
        return at(obj, path).shift()
    }

    /**
     * 使用 iteratee 遍历对象的自身和继承的可枚举属性
     * @param obj
     * @param iteratee {Function}
     */
    static forIn(obj: any, iteratee: (value: any, key: any) => void) {
        forIn(obj, iteratee)
    }

    /**
     * 创建一个 object 的自身可枚举属性名为数组
     * @param obj
     */
    static keys(obj: Object) {
        return keys(obj);
    }
}