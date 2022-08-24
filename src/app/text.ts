import {getKvColor, Kv} from "./model";

export const StatusActive = 'active';
export const StatusDisabled = 'disabled';

const StatusText = {
    [StatusActive]: '正常',
    [StatusDisabled]: '禁用',
    disable: '禁用',
    draft: '草稿',

    lock: '锁定',
    warning: '警告',
    delete: '删除',
    check: '待审核',

    black: '黑名单',
    bind: '绑定',
};

const SymYes = '✔';
const SymNo = '✘';

export class MyTextService {
    static symYes = SymYes;
    static symNo = SymNo;
    /**
     * 状态文字
     */
    static readonly mapStatusText: Kv[] = [
        {name: StatusActive, title: '正常', color: 'success'},
        {name: StatusDisabled, title: '禁用', color: 'secondary grey'},
        {name: 'check', title: '待审', color: 'info'},
        {name: 'lock', title: '锁定', color: 'lock'},
        {name: 'delete', title: '删除', color: 'danger'},
        {name: 'warning', title: '警告', color: 'warning'},
    ];

    static readonly mapStatusOptions: Kv[] = [
        {name: StatusActive, title: '正常'},
        {name: StatusDisabled, title: '禁用'},
    ];

    static nextStatus(s: string): string {
        return s == StatusDisabled ? StatusActive : StatusDisabled;
    }

    static getStatusText(s: string): string {
        // @ts-ignore
        return StatusText[s] || '未知';
    }

    static getStatusColor(s: string): string {
        return getKvColor(this.mapStatusText, s);
    }

    static getStatusBoolText(s: string | boolean): string {
        if (s === true || 'yes' === s) {
            return SymYes;
        } else if (s === false || 'no' === s) {
            return SymNo;
        }
        switch (s) {
            case StatusActive:
                return SymYes;
            case StatusDisabled:
                return SymNo;
            case '':
                return '-';
            default:
                // @ts-ignore
                return StatusText[s];
        }
    }

    static readonly mapMockBool: Kv[] = [
        {name: 'true', title: '是'},
        {name: 'false', title: '否'}
    ];
}
