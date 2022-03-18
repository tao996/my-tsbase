import {ResListResult} from "./model";

export class MyTable<T> {

    backupWhere: {
        [key: string]: any;
    } = {}; // 在 mat-checkbox + lib-paginator 结合使用时，false/true 会被转为字符串
    protected submit: any; // 提交函数

    total = 0; // 记录总量
    rows: T[] = [];
    where: any = {}; // 查询的数据
    isLoading = false;

    onSubmit() {
        this.isLoading = true;
        if (typeof this.submit == 'function') {
            this.submit();
        } else {
            console.warn('table: submit is not a function');
        }
    }

    get hasRows(): boolean {
        return this.rows && this.rows.length > 0;
    }

    protected cloneBackupWhere() {
        switch (typeof this.backupWhere) {
            case 'function':
                return Object.assign({}, this.backupWhere());
            default:
                return Object.assign({}, this.backupWhere);
        }
    }

    onReset() {
        this.resetWhere();
        this.onSubmit();
    }

    protected resetWhere() {
        this.where = this.cloneBackupWhere();
    }

    assignWhere(q: any) {
        this.where = Object.assign({}, this.cloneBackupWhere(), q || {});
    }

    setSubmitCallback(callback: Function) {
        this.submit = callback;
    }

    // 方法，或者对象
    setBackupWhere(callback: any) {
        this.backupWhere = callback;
        this.resetWhere();
        return this;
    }

    addBackupWhere(params: any) {
        Object.assign(this.backupWhere, params);
        this.resetWhere();
        return this;
    }

    listResponse(res: ResListResult<T>) {
        this.isLoading = false;
        if (res) {
            this.total = res.total;
            this.rows = res.rows || [];
        }
    }

    listResponseAndAssignWhere(res: ResListResult<T>, q: any) {
        this.listResponse(res);
        this.assignWhere(q);
    }

    totalDecr() {
        this.total -= 1;
    }

    itemRemove(e: T) {
        const index = this.rows.indexOf(e);
        this.remove(index);
    }

    itemReplace(e: T, newE: T) {
        if (newE) {
            Object.assign(e, newE);
        }
    }

    remove(index: number) {
        if (index > -1) {
            this.rows.splice(index, 1);
            this.total -= 1;
        } else {
            console.warn('remove rows with error index;', index);
        }
    }

    append(item: T) {
        if (item) {
            this.rows.unshift(item);
            this.total += 1;
        }
    }

    update(index: number, item: T) {
        Object.assign(this.rows[index], item);
    }

    whereWith(name: string) {
        return this.where[name] || '';
    }
}