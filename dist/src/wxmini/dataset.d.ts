export declare class MyMiniDataset {
    /**
     * e.detail
     */
    static detail(e: any): any;
    /**
     * e.detail
     */
    static getInputValue(e: any): any;
    /**
     * e.target.dataset[$name]
     */
    static getByName(e: any, name: string): any;
    static getBooleanByName(e: any, name: string): boolean;
    /**
     * e.target.dataset[name]
     */
    static getName(e: any): any;
    /**
     * e.target.dataset[index]
     */
    static getIndex(e: any): any;
    /**
     * e.detail.value
     * Field, bind:blur 或者 bind:focus 的值 e.detail.value
     * @param e
     */
    static getFieldValue(e: any): any;
    /**
     *  e.currentTarget.dataset[$name]; 通常用于 view 上的 bind:tap;
     * @param e {Event}
     * @param name {string}
     * @return {*}
     */
    static getCurrentTargetDataset(e: any, name: string): any;
    /**
     * e.detail.name 适用于 van-tabs bind:change
     * @param e
     * @return {string}
     */
    static getDetailName(e: any): any;
    /**
     * e.detail[$name]
     */
    static getDetailByName(e: any, name: string): any;
}
