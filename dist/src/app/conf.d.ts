export interface MapConf {
    readonly [param: string]: any;
}
export declare class MyMapConf {
    static merge<T>(destination: T, source: MapConf): void;
}
