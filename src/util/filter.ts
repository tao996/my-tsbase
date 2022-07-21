const urlRegex = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;

export class MyFilter {
    /**
     * 提取 抖音/淘宝分享 中的网址
     * @param data
     */
    static getURL(data: string): string {
        if (data) {
            const rst = data.match(urlRegex)
            if (rst != null) {
                return rst[0]
            }
        }
        return '';
    }
}
