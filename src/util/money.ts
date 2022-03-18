export class MyMoney {
    /**
     * 格式化金额
     * @param {string} value 值
     * @return {string}
     */
    static formatter(value: string) {
        return parseFloat(value).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        }).replace('$', '')
    }


    /**
     * 转为货币符号
     * @param {string|number} feeType 货币
     * @returns {string}
     */
    static getFeeTypeText(feeType: any) {
        switch (feeType) {
            case 'RMB':
            case 'CNY':
            case 1:
                return '￥'
            case 'HK':
            case 'HKD':
            case 2:
                return '$';
        }
        return '';
    }

    /**
     * 转为金额
     * @param {string|number} feeType 货币
     * @param {number} price 金额
     */
    static getPriceText(feeType: any, price: number) {
        return this.getFeeTypeText(feeType) + (price / 100).toFixed(2)
    }

    /**
     * 为金额补上单位
     * @param {number} price 金额
     */
    static toString(price: number) {
        if (price == 0) {
            return '￥0'
        }
        return '￥' + (price / 100).toFixed(2);
    }
}