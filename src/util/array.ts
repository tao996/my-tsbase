export class MyArray {
    /**
     * 取出数组中第一个值
     * @param items {Array} 待检测的数组
     * @param first {Function} 回调函数
     */
    static first(items: any[], first: (item: any) => void) {
        if (items && items.length == 1) {
            first(items[0]);
        } else {
            console.warn('items is empty of length error');
        }
    }

    // 交换位置
    static swap(items: any[], index1: number, index2: number) {
        items[index1] = items.splice(index2, 1, items[index1])[0];
    }

    // 置顶
    static toTop(items: any[], index: number) {
        if (index > 0) {
            items.unshift(items.splice(index, 1)[0]);
        }
    }

    // 上移
    static toUp(items: any[], index: number) {
        if (index > 0) {
            items[index] = items.splice(index - 1, 1, items[index])[0];
        }
    }

    // 下移
    static toDown(items: any[], index: number) {
        if (index >= 0 && index < items.length - 1) {
            items[index] = items.splice(index + 1, 1, items[index])[0];
        }
    }

    static change<T>(items: T[], item: T, checked: boolean) {
        const index = items.indexOf(item);
        if (checked) {
            if (index < 0) {
                items.push(item);
            }
        } else {
            if (index > -1) {
                items.splice(index, 1);
            }
        }
    }

    // 合并多个数组，并返回全新的数组；
    // items: 数组1; adds: 数组2;
    // key: 数组元素中表示唯一标识的键名;
    static combine(items: any[], adds: any[], key: string): any[] {
        let res: any[] = [];
        this.merge(res, items, key);
        this.merge(res, adds, key);
        return res;
    }

    // 添加到前面
    static unshift(items: any[], adds: any[], key: string) {
        let keys = [];
        if (items.length > 0) {
            for (let i in items) {
                let m = items[i];
                keys.push(m[key]);

            }
        }
        if (adds.length > 0) {
            for (let i in adds) {
                let m = adds[i];
                if (keys.indexOf(m[key]) < 0) {
                    keys.push(m[key]);
                    items.unshift(m)
                } else {
                    for (let i = 0; i < items.length; i++) {
                        if (items[i][key] == m[key]) {
                            items[i] = m;
                        }
                    }
                }
            }
        }
    }

    // 合并
    static merge(items: any[], adds: any[], key: string) {
        let keys = [];
        if (items.length > 0) {
            for (let i in items) {
                let m = items[i];
                keys.push(m[key]);
            }
        }
        if (adds.length > 0) {
            for (let i in adds) {
                let m = adds[i];
                // 如果没有找到，则追加
                if (keys.indexOf(m[key]) < 0) {
                    keys.push(m[key]);
                    items.push(m)
                    // 找到则替换
                } else {
                    for (let i = 0; i < items.length; i++) {
                        if (items[i][key] == m[key]) {
                            items[i] = m;
                        }
                    }
                }
            }
        }
    }
}