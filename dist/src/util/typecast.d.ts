export declare class MyTypecast {
    /**
     * 将字符串(数字)转为数字
     * @param data
     */
    static str2Number(data: string | number): number;
    /**
     * 将字符串(数字)转为数字
     * @param data {string|number}
     */
    static strToNumber(data: string | number): number;
    /**
     * 将时间转为时间戳(秒)
     * @param date {Date} 时间
     */
    static dateToNumber(date: Date): number;
    /**
     * 将时间戳转为时间
     * @param timestamp {number} 时间戳(秒)
     */
    static numberToDate(timestamp: number): Date;
}
