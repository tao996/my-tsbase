import {MyAssets} from "./assets";

export class MyString {
    /**
     * replace all s1 to s2
     * @param text {string} 字符串
     * @param s1 {string} 被替换的字符
     * @param s2 {string} 替换成此字符
     */
    static replaceAll(text: string, s1: string, s2: string) {
        return text.replace(new RegExp(s1, 'gm'), s2);
    }

    /**
     * 为数字或字符串补0到指定长度
     * @param id {number|string} 数字或字符串
     * @param len {number} 长度
     */
    static padZero(id: number | string, len: number): string {
        // @ts-ignore
        return ('' + id).padStart(len, '0');
    }

    /**
     * 字符串过滤
     * @param data
     */
    static strFilter(data: string): string {
        return MyAssets.isEmpty(data) ? '' : data;
    }
}