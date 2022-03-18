// ui element
export class MyMiniUI {
    // 对图片进行缩放
    static scaleImage(e: any, newWidth: number): number {
        const width = e.detail.width
        const height = e.detail.height
        const ratio = width / height;
        return newWidth / ratio
    }

    /**
     * 图片分布 |p|m|图片|m|m|图片|m|p|
     * @param {number} width 总宽度
     * @param {number} num 每一行显示的图片数量
     * @param {number} padding 最外层的空白
     * @param {number} margin 图片之间的距离
     * @returns {Number}
     */
    static clientWidth(width: number, num: number, padding: number, margin: number): number {
        if (num <= 0) {
            num = 1;
        }
        return (width - padding * 2 - num * margin * 2) / num;
    }
}
