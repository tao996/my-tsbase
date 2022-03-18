export interface MapConf {
    readonly [param: string]: any;
}

// 合并配置
export class MyMapConf {
    static merge<T>(destination: T, source: MapConf) {
        for (const k in source) {
            if (source.hasOwnProperty(k)) {
                // @ts-ignore
                destination[k] = source[k];
            }
        }
    }
}