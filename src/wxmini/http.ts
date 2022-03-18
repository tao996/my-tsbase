export const MethodGet = 'GET'
export const MethodPost = 'POST'
export const MethodPut = 'PUT'
export const MethodDel = 'DELETE'

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