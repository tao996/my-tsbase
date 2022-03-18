import { ResListResult } from "./model";
export declare class MyTable<T> {
    backupWhere: {
        [key: string]: any;
    };
    protected submit: any;
    total: number;
    rows: T[];
    where: any;
    isLoading: boolean;
    onSubmit(): void;
    get hasRows(): boolean;
    protected cloneBackupWhere(): any;
    onReset(): void;
    protected resetWhere(): void;
    assignWhere(q: any): void;
    setSubmitCallback(callback: Function): void;
    setBackupWhere(callback: any): this;
    addBackupWhere(params: any): this;
    listResponse(res: ResListResult<T>): void;
    listResponseAndAssignWhere(res: ResListResult<T>, q: any): void;
    totalDecr(): void;
    itemRemove(e: T): void;
    itemReplace(e: T, newE: T): void;
    remove(index: number): void;
    append(item: T): void;
    update(index: number, item: T): void;
    whereWith(name: string): any;
}
