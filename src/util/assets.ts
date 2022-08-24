const emailRegex = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2,3})?)$/;
const phoneCnRegex = /^[1-9]\d{10}$/;
const captchaRegex = /^[A-Za-z0-9]{4,6}$/;
const numRegex = /^[\d.]+$/;
const urlRegex = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
// copy from lodash
/** Used as references for various `Number` constants. */
export const MAX_SAFE_INTEGER = 9007199254740991

export class MyAssets {

    static isLength(value: any) {
        return typeof value === 'number' &&
            value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER
    }

    /**
     * 是否为数组
     * @param value
     * @example [1,2,3]=>true, document.body.children=>true, 'abc'=>false, Function=>false
     */
    static isArray(value: any): boolean {
        return value != null && typeof value !== 'function' && typeof value !== 'string' && this.isLength(value.length)
    }

    /**
     * 检查是否为对象
     * @param value
     * @example {}=>true, [1,2,3]=>true, Function=>false, null=>false
     */
    static isObject(value: any): boolean {
        return typeof value === 'object' && value !== null
    }

    /**
     * 是否为数字
     * @param data {any} 待检测的数据
     */
    static isNumber(data: any): boolean {
        switch (typeof data) {
            case "number":
            case "bigint":
                return true;
            case "string":
                return numRegex.test(data);
            case "function":
            case "object":
            case "boolean":
            case "symbol":
            case "undefined":
                return false;
            default:
                return !isNaN(Number(data));
        }
    }

    /**
     * 是否没有定义，即为 null | undefined
     * @param data
     */
    static isNotSet(data: any) {
        return data === null || data === undefined;
    }

    /**
     * 数据有定义，即不是 null|undefined
     * @param data
     */
    static hasSet(data: any) {
        return !this.isNotSet(data)
    }

    /**
     * 数据有定义，hasSet 的同名方法
     * @param data
     */
    static hasData(data: any) {
        return !this.isNotSet(data)
    }

    // https://stackoverflow.com/questions/4994201/is-object-empty
    /**
     * 判断值是否为空
     * @param {any} data 待判断的数
     * @returns {boolean}
     */
    static isEmpty(data: any) {
        if (data === null || data === undefined) {
            return true
        }
        switch (typeof data) {
            case 'undefined':
                return true;
            case 'number':
                return data === 0;
            case 'string':
                return data === '0' ||
                    data === 'null' ||
                    data === '' ||
                    data === 'undefined' ||
                    data === '0001-01-01T00:00:00Z' ||
                    data === '0001-01-01 00:00:00' ||
                    data.trim() === '';
            case 'object':
                const r = JSON.stringify(data);
                return r === '{}' || r === '[]'
            case "boolean":
                return !data;
            default:
                return !!data;
        }
    }

    static unEmpty(data: any) {
        return !this.isEmpty(data);
    }

    static isTrue(data: any) {
        switch (typeof data) {
            case "boolean":
                return data;
            case "string":
                return data.toLowerCase() === 'true'
        }
        return false
    }

    /**
     * 是否为中国大陆手机号
     * @param phone
     */
    static isPhoneCn(phone: string): boolean {
        return phoneCnRegex.test(phone);
    }

    /**
     * 是否是电子邮箱地址
     * @param email
     */
    static isEmail(email: string): boolean {
        return emailRegex.test(email);
    }

    /**
     * 是否为4~6位的验证码
     * @param data
     */
    static isCaptcha(data: string): boolean {
        return captchaRegex.test(data);
    }

    static isPassword(pwd: string): boolean {
        return !!pwd && pwd.length >= 7;
    }

    /**
     * 判断是否为账号
     * @param {string} account 账号
     * @returns {boolean}
     */
    static isAccount(account: string) {
        return this.isPhoneCn(account) || this.isEmail(account);
    }

    static isUrl(data: string): boolean {
        return urlRegex.test(data);
    }
}
