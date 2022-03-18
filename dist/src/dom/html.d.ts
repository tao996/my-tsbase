export declare class MyHtml {
    static files: string[];
    private static reloadFiles;
    /**
     * 检查指定的文件是否
     * @param filename 文件名
     */
    static fileExists(filename: string): boolean;
    /**
     * 追加一个 js 文件到 head 标签内
     * @param src js 文件的路径
     */
    static appendJsFile(src: string): boolean;
    /**
     * 追加一个 css 文件到 head 标签内
     * @param href css 文件的地址
     */
    static appendCssFile(href: string): void;
    static backgroundImageUrlStyle(src: string, bgSize?: string): {
        'background-image': string;
        'background-size': string;
    } | {
        'background-image'?: undefined;
        'background-size'?: undefined;
    };
}
