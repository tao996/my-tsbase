export class MyMiniDataset {
    /**
     * e.detail
     */
    static detail(e: any) {
        return e.detail;
    }

    /**
     * e.detail
     */
    static getInputValue(e: any) {
        return e.detail;
    }

    /**
     * e.target.dataset[$name]
     */
    static getByName(e: any, name: string) {
        const v = e.target.dataset[name]
        if (v == undefined) {
            console.warn('e.target.dataset.', name, ' is undefined', e)
            return this.getCurrentTargetDataset(e, name); // try to get
        }
        return v;
    }

    static getBooleanByName(e: any, name: string) {
        const data = this.getByName(e, name)
        return data == 'true'
    }

    /**
     * e.target.dataset[name]
     */
    static getName(e: any) {
        return this.getByName(e, 'name')
    }

    /**
     * e.target.dataset[index]
     */
    static getIndex(e: any) {
        return this.getByName(e, 'index')
    }

    /**
     * e.detail.value
     * Field, bind:blur 或者 bind:focus 的值 e.detail.value
     * @param e
     */
    static getFieldValue(e: any) {
        return e.detail.value
    }

    /**
     *  e.currentTarget.dataset[$name]; 通常用于 view 上的 bind:tap;
     * @param e {Event}
     * @param name {string}
     * @return {*}
     */
    static getCurrentTargetDataset(e: any, name: string) {
        const v = e.currentTarget.dataset[name]
        if (v == undefined) {
            console.warn('e.currentTarget.dataset.', name, ' is undefined', e)
        }
        return v;
    }

    /**
     * e.detail.name 适用于 van-tabs bind:change
     * @param e
     * @return {string}
     */
    static getDetailName(e: any) {
        return e.detail.name;
    }

    /**
     * e.detail[$name]
     */
    static getDetailByName(e: any, name: string) {
        return e.detail[name];
    }
}
