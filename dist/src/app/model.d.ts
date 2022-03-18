export interface Kv {
    id?: number | string;
    name?: string | number;
    title: string;
    color?: string;
}
export declare function getKvColor(items: Kv[], name: string | number): string;
export declare function getKvTitle(items: Kv[], name: string | number): string;
export declare function getKvId(items: Kv[], name: string | number): string | number;
export declare function getKvTitleById(items: Kv[], id: number): string;
export interface RecordAttrs {
    name: string;
    value: any;
}
export declare class ResListResult<T> {
    total: number;
    tag: number;
    rows: T[];
}
export interface ReqPagParam {
    page?: number;
    page_size?: number;
}
