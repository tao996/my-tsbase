import {MyAssets} from "./assets";
import {MyTypecast} from "./typecast";

const weekday: string[] = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

export class MyDatetime {
    /**
     * 将 Sun Feb 16 2020 00:00:00 GMT+0800 转为 yyyy-mm-dd
     * @param date
     * @param separator
     */
    static formatDateText(date: any, separator = '-'): string {
        const d = this.parseNewDate(date);
        if (d) {
            return [d.getFullYear(), this.fillZero(d.getMonth() + 1), this.fillZero(d.getDate())].join(separator);
        } else {
            return '';
        }
    }

    /**
     * 将 Sun Feb 16 2020 00:00:00 GMT+0800 转为 yyyymmdd
     * @param date
     */
    static dateText(date: any): string {
        return this.formatDateText(date, '');
    }

    /**
     * 将 Date 切割成 yyyymmdd, hhMMss
     * @param d
     */
    static explodeDate(d: Date): { date: string, time: string } {
        const dates = [d.getFullYear(), '-', this.fillZero(d.getMonth() + 1), '-', this.fillZero(d.getDate())];
        const hour = d.getHours();
        const minute = d.getMinutes();
        if (hour > 0 || minute > 0) {
            const times = [this.fillZero(hour), ':', this.fillZero(minute)];
            return {date: dates.join(''), time: times.join('')};
        }
        return {date: dates.join(''), time: ''};
    }

    /**
     * 将时间戳分割成两个文本部分：date, time
     * @param data
     */
    static formatYmdHm(data: any): { date: string, time: string } {
        const d = this.parseNewDate(data);
        if (d) {
            return this.explodeDate(d);
        }
        return {date: '', time: ''};
    }

    /**
     * 判断是否为一个日期
     * @param data
     */
    public static isDate(data: any): boolean {
        if (!MyAssets.isEmpty(data)) {
            switch (typeof data) {
                case 'string':
                    switch (data.length) {
                        case 6:  // yyyymm
                        case 7:  // yyyy-mm
                        case 8:  // yyyymmdd
                        case 10: // yyyy-mm-dd, yyyy/mm/dd
                        case 16: // yyyy-mm-dd hh:mm
                        case 19: // yyyy-mm-dd hh:mm:ss
                        case 25: // 2020-08-01T00:00:00+08:00
                        case 33: //  Tue Jun 30 2020 00:00:00 GMT+0800
                            return true;
                        default:
                            return false;
                    }
                case 'number':
                    return data > 1000000000 || (data > 10000000 && data < 99999999);
                case 'object':
                    try {
                        return (data as Date).getSeconds() > 0;
                    } catch (e) {
                        return false;
                    }
            }
            return false;
        }
        return false;
    }

    /**
     * 日期打印
     * @param data
     */
    static printDate(data: string): string {
        switch (data.length) {
            case 6: // yyyymm
                return [
                    data.substr(0, 4),
                    data.substr(4, 2),
                ].join('-');
            case 7: // yyyy-mm
                return data;
            case 8:// yyyymmdd
                return [
                    data.substr(0, 4),
                    data.substr(4, 2),
                    data.substr(6, 2)
                ].join('-');
            case 10: // yyyy-mm-dd, yyyy/mm/dd
                return data.replace('/', '-');
            case 16: // yyyy-mm-dd hh:mm
                return data;
            case 33://  Tue Jun 30 2020 00:00:00 GMT+0800
                return this.date2YMDHI(new Date(data));
            default: // yyyy-mm-dd hh:mm:ss
                return '';
        }
    }

    // 将字符串转为时间对象
    static parseNewDate(data: any): Date | null {
        if (MyAssets.isEmpty(data)) {
            return null;
        }
        if (/^\d+$/.test(data)) {
            data = MyTypecast.str2Number(data);
        }
        switch (typeof data) {
            case 'string':
                switch (data.length) {
                    case 6: // yyyymm
                        return new Date([
                            data.substr(0, 4),
                            data.substr(4, 2),
                            '01'
                        ].join('-') + ' 00:00:00');
                    case 7: // yyyy-mm
                        return new Date(data + '-01 00:00:00');
                    case 8:// yyyymmdd
                        return new Date([
                            data.substr(0, 4),
                            data.substr(4, 2),
                            data.substr(6, 2)
                        ].join('-') + ' 00:00:00');
                    case 10: // yyyy-mm-dd, yyyy/mm/dd
                        return new Date(data + ' 00:00:00');
                    case 16: // yyyy-mm-dd hh:mm
                        return new Date(data + ':00');
                    case 33://  Tue Jun 30 2020 00:00:00 GMT+0800
                        return new Date(data);
                    default: // yyyy-mm-dd hh:mm:ss
                        return new Date(data); // —— 在 wechat mini 中可能会转换失败
                    // const date = data.substr(0, 10); // yyyy-mm-dd
                    //
                    // const dn = new Date(date).getTime() / 1000;
                    //
                    // const hour = data.substr(11, 2) === '00'
                    //   ? 0
                    //   : data.substr(11, 2).replace(/\b(0+)/gi, '');
                    // const minute = data.substr(14, 2) === '00'
                    //   ? 0
                    //   : data.substr(14, 2).replace(/\b(0+)/gi, '');
                    // const second = data.substr(17, 2) === '00'
                    //   ? 0
                    //   : data.substr(17, 2).replace(/\b(0+)/gi, '');
                    //
                    //
                    // data = parseInt('' + dn, 10)
                    //   + parseInt('' + hour, 10) * 3600
                    //   + parseInt('' + minute, 10) * 60
                    //   + parseInt('' + second, 10)
                    //   - 28800;
                    // return new Date(data * 1000);
                }
            case 'number':
                if (data > 10000000000) { // 微秒
                    return new Date(data);
                } else if (data > 1000000000) { // 时间戳
                    return new Date(data * 1000);
                } else if (data > 10000000 && data < 99999999) { // yyyymmdd
                    data = '' + data;
                    return new Date([
                        data.substr(0, 4),
                        data.substr(4, 2),
                        data.substr(6, 2)
                    ].join('-') + ' 00:00:00');
                } else if (data > 100000 && data < 999999) { // yyyymm
                    data = '' + data;
                    return new Date([
                        data.substr(0, 4),
                        data.substr(4, 2),
                    ].join('-') + '-01 00:00:00');
                } else {
                    console.warn('datetime.unknown number of data:', data);
                    return null;
                }
            case 'object':
                return data;
            default:
                console.warn('datetime.unknown type of data:', data);
                return null;
        }
    }

    static date2YMDHI(date: Date): string {
        const d = this.explodeDate(date);
        return [d.date, d.time].join(' ');
    }

    // 补 0
    // es2018 有个 padStart 语法，功能更强大
    static fillZero(n: number): string | number {
        // return ('' + n).padStart(2, '0');
        return n > 9 ? n : '0' + n;
    }

    static week(data: any): string {
        const d = this.parseNewDate(data);
        if (d) {
            return weekday[d.getDay()];
        }
        return '';
    }

    static ymd(d: Date): string {
        return [d.getFullYear(), this.fillZero(d.getMonth() + 1), this.fillZero(d.getDate())].join('');
    }

    static ymdHiWeek(data: any): string {
        const d = this.parseNewDate(data);
        if (d) {
            let dates = [d.getFullYear(), this.fillZero(d.getMonth() + 1), this.fillZero(d.getDate())];
            if (d.getHours() > 0 || d.getMinutes() > 0) {
                return dates.join('-') + ' ' + this.fillZero(d.getHours()) + ':' + this.fillZero(d.getMinutes()) + ' (' + weekday[d.getDay()] + ')';
            }
            return dates.join('-') + ' ' + ' (' + weekday[d.getDay()] + ')';
        }
        return '';
    }

    static ymdWeek(date: any): string {
        const d = this.parseNewDate(date);
        if (d) {
            let dates = [d.getFullYear(), this.fillZero(d.getMonth() + 1), this.fillZero(d.getDate())];
            return dates.join('-') + ' (' + weekday[d.getDay()] + ')';
        }
        return '';
    }

    /**
     * 获取指定日期的时间戳
     * @param data
     */
    static timestamp(data: any): number {
        const d = this.parseNewDate(data);
        if (d) {
            return d.getTime();
        }
        return 0;
    }

    /**
     * 当前时间戳
     * @returns {number}
     */
    static currentTimestamp() {
        return Math.ceil(Date.parse(new Date().toString()) / 1000)
    }

    static formatDate(date: Date): string {
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()

        return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`

    }
}

const formatNumber = (n: number) => {
    const m = n.toString()
    return m[1] ? n : `0${n}`
}