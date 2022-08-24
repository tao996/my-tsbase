export class MyCache {
    private engine: Storage;
    private readonly name: string;

    /**
     * @param name {string} 缓存 key
     * @param engine {Storage} 存储引擎，默认为 localStorage
     */
    constructor(name: string, engine?: Storage) {
        this.name = name;
        this.engine = engine ? engine : localStorage;
    }

    read() {
        const text = this.engine.getItem(this.name);
        if (text) {
            return JSON.parse(text);
        }
        return null;
    }

    private writeString(data: string) {
        this.engine.setItem(this.name, data);
    }

    write(data: any) {
        switch (typeof data) {
            case 'string':
                this.writeString(data);
                break;
            default:
                this.writeString(JSON.stringify(data));
                break;
        }
    }

    clean() {
        this.engine.removeItem(this.name);
    }
}
