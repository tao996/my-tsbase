export declare class MySecret {
    static randomString(length: number): string;
    /**
     * 产生一个包括 lower 与 upper 之间的数。
     * 如果只提供一个参数返回一个0到提供数之间的数。
     * 如果 floating 设为 true，或者 lower 或 upper 是浮点数，结果返回浮点数。
     * _.random(1.2, 5.2) => 产生 1.2 到 5.2 之间的随机数
     * @param lower {number} 下限
     * @param upper {number} 上限
     * @param floating {boolean} 是否返回浮点数
     */
    static randomNumber(lower: number, upper: number, floating?: boolean): number;
    static generatePassword(pd: string): string;
    static md5(text: string): string;
}
