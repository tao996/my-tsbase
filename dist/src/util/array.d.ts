export declare class MyArray {
    /**
     * 取出数组中第一个值
     * @param items {Array} 待检测的数组
     * @param first {Function} 回调函数
     */
    static first(items: any[], first: (item: any) => void): void;
    static swap(items: any[], index1: number, index2: number): void;
    static toTop(items: any[], index: number): void;
    static toUp(items: any[], index: number): void;
    static toDown(items: any[], index: number): void;
    static change<T>(items: T[], item: T, checked: boolean): void;
    static combine(items: any[], adds: any[], key: string): any[];
    static unshift(items: any[], adds: any[], key: string): void;
    static merge(items: any[], adds: any[], key: string): void;
}
