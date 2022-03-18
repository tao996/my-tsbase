export declare class MyCache {
    private engine;
    private readonly name;
    constructor(name: string, engine?: Storage);
    read(): any;
    private writeString;
    write(data: any): void;
    clean(): void;
}
