export interface Kv {
    id?: number | string;
    name?: string | number;
    title: string;
    color?: string; // 颜色
}

export function getKvColor(items: Kv[], name: string | number): string {
    const index = items.findIndex(m => m.name == name);
    // @ts-ignore
    return index > -1 ? items[index].color : '';
}

export function getKvTitle(items: Kv[], name: string | number): string {
    const index = items.findIndex(m => m.name == name);
    return index > -1 ? items[index].title : '' + name;
}

export function getKvId(items: Kv[], name: string | number): string | number {
    const index = items.findIndex(m => m.name == name);
    // @ts-ignore
    return index > -1 ? items[index].id : name;
}

export function getKvTitleById(items: Kv[], id: number): string {
    const index = items.findIndex(m => m.id == id);
    return index > -1 ? items[index].title : '' + id;
}


export interface RecordAttrs {
    name: string;
    value: any;
}

export class ResListResult<T> {
    total = 0;
    tag = 0;
    rows = new Array<T>()
}

export interface ReqPagParam {
    page?: number;
    page_size?: number;
}