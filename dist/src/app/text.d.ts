import { Kv } from "./model";
export declare const StatusActive = "active";
export declare const StatusDisabled = "disabled";
export declare class MyTextService {
    static symYes: string;
    static symNo: string;
    static readonly mapStatusText: Kv[];
    static readonly mapStatusOptions: Kv[];
    static nextStatus(s: string): string;
    static getStatusText(s: string): string;
    static getStatusColor(s: string): string;
    static getStatusBoolText(s: string | boolean): string;
    static readonly mapMockBool: Kv[];
}
