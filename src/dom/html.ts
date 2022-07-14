const KEY_HREF = 'href';
const KEY_SRC = 'src';

export class MyHtml {
// 缓存检测的结果
    static files: string[] = [];

    // 重新检查
    private static reloadFiles() {
        if (this.files.length > 0) {
            return;
        }
        const nodes:HTMLCollection = document.getElementsByTagName('head')[0].children;
        if (nodes){
            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];
                // @ts-ignore
                if (node.nodeName === 'LINK' && typeof node[KEY_HREF] === 'string') {
                    // @ts-ignore
                    this.files.push(node[KEY_HREF]);
                } else { // @ts-ignore
                    if (node.nodeName === 'SCRIPT' && typeof node[KEY_SRC] === 'string') {
                        // @ts-ignore
                        this.files.push(node[KEY_SRC]);
                    }
                }
            }
        }
        // console.log(this.files);
    }

    /**
     * 检查指定的文件是否
     * @param filename 文件名
     */
    static fileExists(filename: string) {
        this.reloadFiles();
        for (const i in this.files) {
            if (this.files[i].lastIndexOf(filename) > -1) {
                return true;
            }
        }
        return false;
    }

    /**
     * 追加一个 js 文件到 head 标签内
     * @param src js 文件的路径
     */
    static appendJsFile(src: string): boolean {
        console.log('js file:', src);
        if (this.fileExists(src)) {
            console.log('js file exists');
            return false;
        }
        const node = document.createElement('script');
        node.src = src;
        node.type = 'text/javascript';
        document.head.appendChild(node);
        // document.getElementsByTagName('head')[0].appendChild(node);
        this.files.push(src);
        return true;
    }

    /**
     * 追加一个 css 文件到 head 标签内
     * @param href css 文件的地址
     */
    static appendCssFile(href: string) {
        console.log('css href:', href);
        if (this.fileExists(href)) {
            console.log('css file exists');
            return;
        }
        const css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = href;
        document.getElementsByTagName('head')[0].appendChild(css);
        this.files.push(href);
    }

    static backgroundImageUrlStyle(src: string, bgSize: string = 'cover') {
        if (src) {
            return {
                'background-image': `url('${src}')`,
                'background-size': bgSize,
            };
        } else {
            return {};
        }
    }
}