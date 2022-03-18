export declare const MethodGet = "GET";
export declare const MethodPost = "POST";
export declare const MethodPut = "PUT";
export declare const MethodDel = "DELETE";
export interface HttpRequest extends HttpRequestCallback {
    url: string;
    data?: any;
    method?: string;
    header?: any;
}
export interface HttpRequestCallback {
    success?: (rst: any) => void;
    fail?: (msg: string) => void;
    complete?: () => void;
}
