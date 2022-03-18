export declare class MyDatetime {
    /**
     * 将 Sun Feb 16 2020 00:00:00 GMT+0800 转为 yyyy-mm-dd
     * @param date
     * @param separator
     */
    static formatDateText(date: any, separator?: string): string;
    /**
     * 将 Sun Feb 16 2020 00:00:00 GMT+0800 转为 yyyymmdd
     * @param date
     */
    static dateText(date: any): string;
    /**
     * 将 Date 切割成 yyyymmdd, hhMMss
     * @param d
     */
    static explodeDate(d: Date): {
        date: string;
        time: string;
    };
    /**
     * 将时间戳分割成两个文本部分：date, time
     * @param data
     */
    static formatYmdHm(data: any): {
        date: string;
        time: string;
    };
    /**
     * 判断是否为一个日期
     * @param data
     */
    static isDate(data: any): boolean;
    /**
     * 日期打印
     * @param data
     */
    static printDate(data: string): string;
    static parseNewDate(data: any): Date | null;
    static date2YMDHI(date: Date): string;
    static fillZero(n: number): string | number;
    static week(data: any): string;
    static ymd(d: Date): string;
    static ymdHiWeek(data: any): string;
    static ymdWeek(date: any): string;
    /**
     * 获取指定日期的时间戳
     * @param data
     */
    static timestamp(data: any): number;
    /**
     * 当前时间戳
     * @returns {number}
     */
    static currentTimestamp(): number;
    static formatDate(date: Date): string;
}
