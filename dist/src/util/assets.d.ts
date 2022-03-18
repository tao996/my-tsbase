export declare class MyAssets {
    static isArray(obj: any): boolean;
    /**
     * 是否为数字 3, Number.MIN_VALUE, Infinity => true
     * @param data {any} 待检测的数据
     */
    static isNumber(data: any): boolean;
    /**
     * 判断值是否为空
     * @param {any} data 待判断的数
     * @returns {boolean}
     */
    static isEmpty(data: any): boolean;
    /**
     * 是否是类对象，{}|[]|new student() => true, null => false
     * @param data
     */
    static isObjectLike(data: any): boolean;
    /**
     * 是否为中国大陆手机号
     * @param phone
     */
    static isPhoneCn(phone: string): boolean;
    /**
     * 是否是电子邮箱地址
     * @param email
     */
    static isEmail(email: string): boolean;
    /**
     * 是否为4~6位的验证码
     * @param data
     */
    static isCaptcha(data: string): boolean;
    static isPassword(pwd: string): boolean;
    /**
     * 判断是否为账号
     * @param {string} account 账号
     * @returns {boolean}
     */
    static isAccount(account: string): boolean;
}
