import {MyAssets} from "../util/assets";

export class MyUrl {

    /**
     * 查询链接地址中的值
     * @param href {string} 网址
     * @param key {string} 键
     * @param defaultValue {number} 默认值
     */
    static queryParamNumber(href: string, key: string, defaultValue: number = 0): number {
        const reg = new RegExp(`${key}=(\\d+)`);
        const r = href.match(reg);
        // console.log(location.href, reg, r);
        if (r) {
            return +r[1];
        } else {
            return defaultValue;
        }
    }

    /**
     * 查询链接地址中指定的键的值
     * @param href {string} 链接地址，通常是 location.href
     * @param key {string} 等提取的键
     * @param defaultValue {string} 如果没有找到，则返回此默认值
     */
    static queryParamString(href: string, key: string, defaultValue: string = ''): string {
        const reg = new RegExp(`${key}=([^;&]+)`);
        const r = href.match(reg);
        if (r) {
            return r[1];
        } else {
            return defaultValue;
        }
    }

    static map2Query(obj: any) {
        if (!MyAssets.isEmpty(obj)) {
            const rst = [];
            for (let k in obj) {
                rst.push([encodeURIComponent(k), encodeURIComponent(obj[k])].join('='))
            }
            return rst.join('&')
        }
        return '';
    }

    /**
     * 将对象转为查询字符串
     * @param obj {Object} 待转换对象
     * @return {string} 示例 将 {a:'a',b:'b'} 转换为 a=a&b=b
     */
    static objToUrl(obj: any) {
        let str = '';
        for (const key in obj) {
            if (key === null || key === undefined) {
                continue;
            }
            if (str !== '') {
                str += '&';
            }
            // @ts-ignore
            str += key + '=' + encodeURIComponent(obj[key]);
        }
        return str;
    }

    /**
     * 为 src 追加 & 或者 ? 符号
     * @param src {string} 网址
     */
    static append(src: string): string {
        if (src.indexOf('?') > -1) {
            src += '&';
        } else {
            src += '?';
        }
        return src;
    }

    /**
     * 拼接地址
     * @param url {string} 地址 示例 aaa
     * @param query {string} 参数 bbb
     * @return {string} aaa?bbb
     */
    static appendQuery(url: string, query: any): string {
        return url.indexOf('?') > -1 ? url + '&' + query : url + '?' + query;
    }

    /**
     * 拼接地址
     * @param url {string}
     * @param obj {Object} 字典参数
     */
    static appendMap(url: string, obj: any) {
        return this.appendQuery(url, this.map2Query(obj))
    }

    static contact(domain: string, other: string): string {
        const e1 = domain.endsWith('/');
        const e2 = other.startsWith('/');
        if (e1) {
            if (e2) {
                return domain + other.substring(1)
            } else {
                return domain + other;
            }
        } else {
            if (e2) {
                return domain + other;
            } else {
                return domain + '/' + other;
            }
        }
    }
}
