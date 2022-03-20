import {MyAssets} from "./assets";

export class MyTypecast {

    /**
     * 将字符串(数字)转为数字
     * @param data
     */
    static str2Number(data: string | number | null): number {
        return this.strToNumber(data);
    }

    /**
     * 将字符串(数字)转为数字
     * @param data {string|number}
     */
    static strToNumber(data: string | number | null): number {
        if (typeof data === 'string') {
            if (MyAssets.isNumber(data)) {
                return /\./.test(data) ? parseFloat(data) : parseInt(data, 10);
            }
            return 0;
        } else {
            return data || 0;
        }
    }

    /**
     * 将时间转为时间戳(秒)
     * @param date {Date} 时间
     */
    static dateToNumber(date: Date): number {
        return Math.ceil((date as Date).getTime() / 1000);
    }

    /**
     * 将时间戳转为时间
     * @param timestamp {number} 时间戳(秒)
     */
    static numberToDate(timestamp: number): Date {
        return new Date(timestamp * 1000);
    }

}