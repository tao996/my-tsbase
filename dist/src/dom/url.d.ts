export declare class MyUrl {
    /**
     * 查询链接地址中的值
     * @param href {string} 网址
     * @param key {string} 键
     * @param defaultValue {number} 默认值
     */
    static queryParamNumber(href: string, key: string, defaultValue?: number): number;
    /**
     * 查询链接地址中指定的键的值
     * @param href {string} 链接地址，通常是 location.href
     * @param key {string} 等提取的键
     * @param defaultValue {string} 如果没有找到，则返回此默认值
     */
    static queryParamString(href: string, key: string, defaultValue?: string): string;
    static map2Query(obj: any): string;
    /**
     * 将对象转为查询字符串
     * @param obj {Object} 待转换对象
     * @return {string} 示例 将 {a:'a',b:'b'} 转换为 a=a&b=b
     */
    static objToUrl(obj: any): string;
    /**
     * 为 src 追加 & 或者 ? 符号
     * @param src {string} 网址
     */
    static append(src: string): string;
    /**
     * 拼接地址
     * @param url {string} 地址 示例 aaa
     * @param query {string} 参数 bbb
     * @return {string} aaa?bbb
     */
    static appendQuery(url: string, query: any): string;
    /**
     * 拼接地址
     * @param url {string}
     * @param obj {Object} 字典参数
     */
    static appendMap(url: string, obj: any): string;
    static contact(domain: string, other: string): string;
}
