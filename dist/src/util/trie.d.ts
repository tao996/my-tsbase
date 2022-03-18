export declare class MyTrie {
    /**
     * 对数组进行排序，可能需要 filter 出一级数组
     * @param data {any[]} 待排序的数组
     * @param key  {string} 排序的键
     * @returns {any[]}
     */
    static reSort(data: any[], key: string | number): any[];
    /**
     * 将数组转为字典
     * @param data {any[]} 数组
     * @param primaryKey {string} 主键
     */
    static toDict(data: any[], primaryKey?: string): {};
    /**
     * 将字典转为树 —— 多级显示时使用
     * @param dict {map}
     * @param parentKey {string}
     * @param children {string}
     */
    static dict2Tree(dict: any, parentKey?: string, children?: string): any[];
    /**
     * 将树转为一维数组 —— 单级显示时使用
     * @param tree dict2Tree 的结果
     * @param list {Array} 用来保存的结果
     * @param level {number} 表示层次
     * @param levelName {string} 层次键名
     * @param children {string} 子值键名
     */
    static tree2List(tree: any, list: any, level?: number, levelName?: string, children?: string): void;
}
