import {Md5} from 'ts-md5';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export class MySecret {
    static randomString(length: number) {
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    static generatePassword(pd: string): string {
        if (pd == '') {
            return '';
        } else {
            const first = Md5.hashStr(pd + pd.substr(0, 4)) as string;
            return Md5.hashStr(pd + first) as string;
        }
    }

    static md5(text: string): string {
        return Md5.hashStr(text) as string;
    }

}