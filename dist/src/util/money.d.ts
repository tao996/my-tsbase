export declare class MyMoney {
    /**
     * 格式化金额
     * @param {string} value 值
     * @return {string}
     */
    static formatter(value: string): string;
    /**
     * 转为货币符号
     * @param {string|number} feeType 货币
     * @returns {string}
     */
    static getFeeTypeText(feeType: any): "" | "$" | "￥";
    /**
     * 转为金额
     * @param {string|number} feeType 货币
     * @param {number} price 金额
     */
    static getPriceText(feeType: any, price: number): string;
    /**
     * 为金额补上单位
     * @param {number} price 金额
     */
    static toString(price: number): string;
}
