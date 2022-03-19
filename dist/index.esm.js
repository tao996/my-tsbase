import { isArray, isNumber, isEmpty, isObjectLike, cloneDeep, at, forIn, keys, random } from 'lodash';
import { Md5 } from 'ts-md5';
import each from 'lodash/each';

var MyArray = /** @class */ (function () {
    function MyArray() {
    }
    /**
     * 取出数组中第一个值
     * @param items {Array} 待检测的数组
     * @param first {Function} 回调函数
     */
    MyArray.first = function (items, first) {
        if (items && items.length == 1) {
            first(items[0]);
        }
        else {
            console.warn('items is empty of length error');
        }
    };
    // 交换位置
    MyArray.swap = function (items, index1, index2) {
        items[index1] = items.splice(index2, 1, items[index1])[0];
    };
    // 置顶
    MyArray.toTop = function (items, index) {
        if (index > 0) {
            items.unshift(items.splice(index, 1)[0]);
        }
    };
    // 上移
    MyArray.toUp = function (items, index) {
        if (index > 0) {
            items[index] = items.splice(index - 1, 1, items[index])[0];
        }
    };
    // 下移
    MyArray.toDown = function (items, index) {
        if (index >= 0 && index < items.length - 1) {
            items[index] = items.splice(index + 1, 1, items[index])[0];
        }
    };
    MyArray.change = function (items, item, checked) {
        var index = items.indexOf(item);
        if (checked) {
            if (index < 0) {
                items.push(item);
            }
        }
        else {
            if (index > -1) {
                items.splice(index, 1);
            }
        }
    };
    // 合并多个数组，并返回全新的数组；
    // items: 数组1; adds: 数组2;
    // key: 数组元素中表示唯一标识的键名;
    MyArray.combine = function (items, adds, key) {
        var res = [];
        this.merge(res, items, key);
        this.merge(res, adds, key);
        return res;
    };
    // 添加到前面
    MyArray.unshift = function (items, adds, key) {
        var keys = [];
        if (items.length > 0) {
            for (var i in items) {
                var m = items[i];
                keys.push(m[key]);
            }
        }
        if (adds.length > 0) {
            for (var i in adds) {
                var m = adds[i];
                if (keys.indexOf(m[key]) < 0) {
                    keys.push(m[key]);
                    items.unshift(m);
                }
                else {
                    for (var i_1 = 0; i_1 < items.length; i_1++) {
                        if (items[i_1][key] == m[key]) {
                            items[i_1] = m;
                        }
                    }
                }
            }
        }
    };
    // 合并
    MyArray.merge = function (items, adds, key) {
        var keys = [];
        if (items.length > 0) {
            for (var i in items) {
                var m = items[i];
                keys.push(m[key]);
            }
        }
        if (adds.length > 0) {
            for (var i in adds) {
                var m = adds[i];
                // 如果没有找到，则追加
                if (keys.indexOf(m[key]) < 0) {
                    keys.push(m[key]);
                    items.push(m);
                    // 找到则替换
                }
                else {
                    for (var i_2 = 0; i_2 < items.length; i_2++) {
                        if (items[i_2][key] == m[key]) {
                            items[i_2] = m;
                        }
                    }
                }
            }
        }
    };
    return MyArray;
}());

var emailRegex = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2,3})?)$/;
var phoneCnRegex = /^[1-9]\d{10}$/;
var captchaRegex = /^[A-Za-z0-9]{4,6}$/;
var MyAssets = /** @class */ (function () {
    function MyAssets() {
    }
    MyAssets.isArray = function (obj) {
        return isArray(obj);
    };
    /**
     * 是否为数字 3, Number.MIN_VALUE, Infinity => true
     * @param data {any} 待检测的数据
     */
    MyAssets.isNumber = function (data) {
        return isNumber(data);
    };
    // https://stackoverflow.com/questions/4994201/is-object-empty
    /**
     * 判断值是否为空
     * @param {any} data 待判断的数
     * @returns {boolean}
     */
    MyAssets.isEmpty = function (data) {
        if (data === null || data === undefined) {
            return true;
        }
        switch (typeof data) {
            case 'undefined':
                return true;
            case 'number':
                return data === 0;
            case 'string':
                return data === '0' ||
                    data === 'null' ||
                    data === '' ||
                    data === 'undefined' ||
                    data === '0001-01-01T00:00:00Z' ||
                    data === '0001-01-01 00:00:00' ||
                    data.trim() === '';
            default:
                return isEmpty(data);
        }
    };
    /**
     * 是否是类对象，{}|[]|new student() => true, null => false
     * @param data
     */
    MyAssets.isObjectLike = function (data) {
        return isObjectLike(data);
    };
    /**
     * 是否为中国大陆手机号
     * @param phone
     */
    MyAssets.isPhoneCn = function (phone) {
        return phoneCnRegex.test(phone);
    };
    /**
     * 是否是电子邮箱地址
     * @param email
     */
    MyAssets.isEmail = function (email) {
        return emailRegex.test(email);
    };
    /**
     * 是否为4~6位的验证码
     * @param data
     */
    MyAssets.isCaptcha = function (data) {
        return captchaRegex.test(data);
    };
    MyAssets.isPassword = function (pwd) {
        return !!pwd && pwd.length >= 7;
    };
    /**
     * 判断是否为账号
     * @param {string} account 账号
     * @returns {boolean}
     */
    MyAssets.isAccount = function (account) {
        return this.isPhoneCn(account) || this.isEmail(account);
    };
    return MyAssets;
}());

var MyTypecast = /** @class */ (function () {
    function MyTypecast() {
    }
    /**
     * 将字符串(数字)转为数字
     * @param data
     */
    MyTypecast.str2Number = function (data) {
        return this.strToNumber(data);
    };
    /**
     * 将字符串(数字)转为数字
     * @param data {string|number}
     */
    MyTypecast.strToNumber = function (data) {
        if (typeof data === 'string') {
            if (MyAssets.isNumber(data)) {
                return /\./.test(data) ? parseFloat(data) : parseInt(data, 10);
            }
            return 0;
        }
        else {
            return data || 0;
        }
    };
    /**
     * 将时间转为时间戳(秒)
     * @param date {Date} 时间
     */
    MyTypecast.dateToNumber = function (date) {
        return Math.ceil(date.getTime() / 1000);
    };
    /**
     * 将时间戳转为时间
     * @param timestamp {number} 时间戳(秒)
     */
    MyTypecast.numberToDate = function (timestamp) {
        return new Date(timestamp * 1000);
    };
    return MyTypecast;
}());

var weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
var MyDatetime = /** @class */ (function () {
    function MyDatetime() {
    }
    /**
     * 将 Sun Feb 16 2020 00:00:00 GMT+0800 转为 yyyy-mm-dd
     * @param date
     * @param separator
     */
    MyDatetime.formatDateText = function (date, separator) {
        if (separator === void 0) { separator = '-'; }
        var d = this.parseNewDate(date);
        if (d) {
            return [d.getFullYear(), this.fillZero(d.getMonth() + 1), this.fillZero(d.getDate())].join(separator);
        }
        else {
            return '';
        }
    };
    /**
     * 将 Sun Feb 16 2020 00:00:00 GMT+0800 转为 yyyymmdd
     * @param date
     */
    MyDatetime.dateText = function (date) {
        return this.formatDateText(date, '');
    };
    /**
     * 将 Date 切割成 yyyymmdd, hhMMss
     * @param d
     */
    MyDatetime.explodeDate = function (d) {
        var dates = [d.getFullYear(), '-', this.fillZero(d.getMonth() + 1), '-', this.fillZero(d.getDate())];
        var hour = d.getHours();
        var minute = d.getMinutes();
        if (hour > 0 || minute > 0) {
            var times = [this.fillZero(hour), ':', this.fillZero(minute)];
            return { date: dates.join(''), time: times.join('') };
        }
        return { date: dates.join(''), time: '' };
    };
    /**
     * 将时间戳分割成两个文本部分：date, time
     * @param data
     */
    MyDatetime.formatYmdHm = function (data) {
        var d = this.parseNewDate(data);
        if (d) {
            return this.explodeDate(d);
        }
        return { date: '', time: '' };
    };
    /**
     * 判断是否为一个日期
     * @param data
     */
    MyDatetime.isDate = function (data) {
        if (!MyAssets.isEmpty(data)) {
            switch (typeof data) {
                case 'string':
                    switch (data.length) {
                        case 6: // yyyymm
                        case 7: // yyyy-mm
                        case 8: // yyyymmdd
                        case 10: // yyyy-mm-dd, yyyy/mm/dd
                        case 16: // yyyy-mm-dd hh:mm
                        case 19: // yyyy-mm-dd hh:mm:ss
                        case 25: // 2020-08-01T00:00:00+08:00
                        case 33: //  Tue Jun 30 2020 00:00:00 GMT+0800
                            return true;
                        default:
                            return false;
                    }
                case 'number':
                    return data > 1000000000 || (data > 10000000 && data < 99999999);
                case 'object':
                    try {
                        return data.getSeconds() > 0;
                    }
                    catch (e) {
                        return false;
                    }
            }
            return false;
        }
        return false;
    };
    /**
     * 日期打印
     * @param data
     */
    MyDatetime.printDate = function (data) {
        switch (data.length) {
            case 6: // yyyymm
                return [
                    data.substr(0, 4),
                    data.substr(4, 2),
                ].join('-');
            case 7: // yyyy-mm
                return data;
            case 8: // yyyymmdd
                return [
                    data.substr(0, 4),
                    data.substr(4, 2),
                    data.substr(6, 2)
                ].join('-');
            case 10: // yyyy-mm-dd, yyyy/mm/dd
                return data.replace('/', '-');
            case 16: // yyyy-mm-dd hh:mm
                return data;
            case 33: //  Tue Jun 30 2020 00:00:00 GMT+0800
                return this.date2YMDHI(new Date(data));
            default: // yyyy-mm-dd hh:mm:ss
                return '';
        }
    };
    // 将字符串转为时间对象
    MyDatetime.parseNewDate = function (data) {
        if (MyAssets.isEmpty(data)) {
            return null;
        }
        if (/^\d+$/.test(data)) {
            data = MyTypecast.str2Number(data);
        }
        switch (typeof data) {
            case 'string':
                switch (data.length) {
                    case 6: // yyyymm
                        return new Date([
                            data.substr(0, 4),
                            data.substr(4, 2),
                            '01'
                        ].join('-') + ' 00:00:00');
                    case 7: // yyyy-mm
                        return new Date(data + '-01 00:00:00');
                    case 8: // yyyymmdd
                        return new Date([
                            data.substr(0, 4),
                            data.substr(4, 2),
                            data.substr(6, 2)
                        ].join('-') + ' 00:00:00');
                    case 10: // yyyy-mm-dd, yyyy/mm/dd
                        return new Date(data + ' 00:00:00');
                    case 16: // yyyy-mm-dd hh:mm
                        return new Date(data + ':00');
                    case 33: //  Tue Jun 30 2020 00:00:00 GMT+0800
                        return new Date(data);
                    default: // yyyy-mm-dd hh:mm:ss
                        return new Date(data); // —— 在 wechat mini 中可能会转换失败
                    // const date = data.substr(0, 10); // yyyy-mm-dd
                    //
                    // const dn = new Date(date).getTime() / 1000;
                    //
                    // const hour = data.substr(11, 2) === '00'
                    //   ? 0
                    //   : data.substr(11, 2).replace(/\b(0+)/gi, '');
                    // const minute = data.substr(14, 2) === '00'
                    //   ? 0
                    //   : data.substr(14, 2).replace(/\b(0+)/gi, '');
                    // const second = data.substr(17, 2) === '00'
                    //   ? 0
                    //   : data.substr(17, 2).replace(/\b(0+)/gi, '');
                    //
                    //
                    // data = parseInt('' + dn, 10)
                    //   + parseInt('' + hour, 10) * 3600
                    //   + parseInt('' + minute, 10) * 60
                    //   + parseInt('' + second, 10)
                    //   - 28800;
                    // return new Date(data * 1000);
                }
            case 'number':
                if (data > 10000000000) { // 微秒
                    return new Date(data);
                }
                else if (data > 1000000000) { // 时间戳
                    return new Date(data * 1000);
                }
                else if (data > 10000000 && data < 99999999) { // yyyymmdd
                    data = '' + data;
                    return new Date([
                        data.substr(0, 4),
                        data.substr(4, 2),
                        data.substr(6, 2)
                    ].join('-') + ' 00:00:00');
                }
                else if (data > 100000 && data < 999999) { // yyyymm
                    data = '' + data;
                    return new Date([
                        data.substr(0, 4),
                        data.substr(4, 2),
                    ].join('-') + '-01 00:00:00');
                }
                else {
                    console.warn('datetime.unknown number of data:', data);
                    return null;
                }
            case 'object':
                return data;
            default:
                console.warn('datetime.unknown type of data:', data);
                return null;
        }
    };
    MyDatetime.date2YMDHI = function (date) {
        var d = this.explodeDate(date);
        return [d.date, d.time].join(' ');
    };
    // 补 0
    // es2018 有个 padStart 语法，功能更强大
    MyDatetime.fillZero = function (n) {
        // return ('' + n).padStart(2, '0');
        return n > 9 ? n : '0' + n;
    };
    MyDatetime.week = function (data) {
        var d = this.parseNewDate(data);
        if (d) {
            return weekday[d.getDay()];
        }
        return '';
    };
    MyDatetime.ymd = function (d) {
        return [d.getFullYear(), this.fillZero(d.getMonth() + 1), this.fillZero(d.getDate())].join('');
    };
    MyDatetime.ymdHiWeek = function (data) {
        var d = this.parseNewDate(data);
        if (d) {
            var dates = [d.getFullYear(), this.fillZero(d.getMonth() + 1), this.fillZero(d.getDate())];
            if (d.getHours() > 0 || d.getMinutes() > 0) {
                return dates.join('-') + ' ' + this.fillZero(d.getHours()) + ':' + this.fillZero(d.getMinutes()) + ' (' + weekday[d.getDay()] + ')';
            }
            return dates.join('-') + ' ' + ' (' + weekday[d.getDay()] + ')';
        }
        return '';
    };
    MyDatetime.ymdWeek = function (date) {
        var d = this.parseNewDate(date);
        if (d) {
            var dates = [d.getFullYear(), this.fillZero(d.getMonth() + 1), this.fillZero(d.getDate())];
            return dates.join('-') + ' (' + weekday[d.getDay()] + ')';
        }
        return '';
    };
    /**
     * 获取指定日期的时间戳
     * @param data
     */
    MyDatetime.timestamp = function (data) {
        var d = this.parseNewDate(data);
        if (d) {
            return d.getTime();
        }
        return 0;
    };
    /**
     * 当前时间戳
     * @returns {number}
     */
    MyDatetime.currentTimestamp = function () {
        return Math.ceil(Date.parse(new Date().toString()) / 1000);
    };
    MyDatetime.formatDate = function (date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        return "".concat([year, month, day].map(formatNumber).join('/'), " ").concat([hour, minute, second].map(formatNumber).join(':'));
    };
    return MyDatetime;
}());
var formatNumber = function (n) {
    var m = n.toString();
    return m[1] ? n : "0".concat(n);
};

var MyMoney = /** @class */ (function () {
    function MyMoney() {
    }
    /**
     * 格式化金额
     * @param {string} value 值
     * @return {string}
     */
    MyMoney.formatter = function (value) {
        return parseFloat(value).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        }).replace('$', '');
    };
    /**
     * 转为货币符号
     * @param {string|number} feeType 货币
     * @returns {string}
     */
    MyMoney.getFeeTypeText = function (feeType) {
        switch (feeType) {
            case 'RMB':
            case 'CNY':
            case 1:
                return '￥';
            case 'HK':
            case 'HKD':
            case 2:
                return '$';
        }
        return '';
    };
    /**
     * 转为金额
     * @param {string|number} feeType 货币
     * @param {number} price 金额
     */
    MyMoney.getPriceText = function (feeType, price) {
        return this.getFeeTypeText(feeType) + (price / 100).toFixed(2);
    };
    /**
     * 为金额补上单位
     * @param {number} price 金额
     */
    MyMoney.toString = function (price) {
        if (price == 0) {
            return '￥0';
        }
        return '￥' + (price / 100).toFixed(2);
    };
    return MyMoney;
}());

var MyObject = /** @class */ (function () {
    function MyObject() {
    }
    /**
     * 深复制
     * @param {any} obj 待复制的数据
     */
    MyObject.deepCopy = function (obj) {
        return cloneDeep(obj);
    };
    MyObject.sortCompareFn = function (a, b) {
        if (a.sort_id < b.sort_id) {
            return 1;
        }
        else if (a.sort_id > b.sort_id) {
            return -1;
        }
        else if (a.id && b.id && a.id != b.id) {
            return a.id < b.id ? -1 : 1;
        }
        return 0;
    };
    /**
     * 找出 dict 中值为 value 的索引
     * @param dict {Object} 数组或者对象
     * @param value {any} 待检测的值
     */
    MyObject.keyOf = function (dict, value) {
        for (var index in dict) {
            if (dict.hasOwnProperty(index) && dict[index] == value) {
                return index;
            }
        }
        return null;
    };
    /**
     * 从对象中选择指定的健，并返回新对象 <br>
     * 注意，在 Page 中使用 keys 时，需要使用 Object.keys(new UserInfo())，不能使用 Object.keys(this.data.xxx)，否则可能错误
     * @param obj
     * @param keys
     * @param skipEmpty
     */
    MyObject.picker = function (obj, keys, skipEmpty) {
        if (skipEmpty === void 0) { skipEmpty = false; }
        var res = {};
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (skipEmpty) {
                if (!MyAssets.isEmpty(obj[key])) {
                    res[key] = obj[key];
                }
            }
            else {
                res[key] = obj[key];
            }
        }
        return res;
    };
    /**
     * 提取数据中的真值
     * @param {any} data 数值
     */
    MyObject.pickTrueItems = function (data) {
        var res = {};
        Object.keys(data).forEach(function (key) {
            if (!MyAssets.isEmpty(data[key])) {
                res[key] = data[key];
            }
        });
        return res;
    };
    /**
     * 将 source 中指定的属性值复制到 destination 中
     * @param destination {Object} 目标对象
     * @param source {Object} 复制源
     * @param keys {Array} 需要复制到属性名称
     * @param skipEmpty {boolean} 是否跳过 source[key] 为空的值，默认 false(即使是空值也要复制)
     */
    MyObject.overwrite = function (destination, source, keys, skipEmpty) {
        if (skipEmpty === void 0) { skipEmpty = false; }
        for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
            var key = keys_2[_i];
            if (skipEmpty) {
                if (!MyAssets.isEmpty(source[key])) {
                    destination[key] = source[key];
                }
            }
            else {
                destination[key] = source[key];
            }
        }
    };
    /**
     * 如果 source[key] 不为空,则用它的值来替换 destination[key]
     * @param {Object} destination 源数据
     * @param {Object} source 复制源
     */
    MyObject.overwriteTrueItems = function (destination, source) {
        Object.keys(destination).forEach(function (key) {
            if (typeof source[key] !== 'undefined') {
                destination[key] = source[key];
            }
        });
    };
    /**
     * @param destination {Object} 目标数据
     * @param source {Object} 复制源
     * @param def {Object} 默认值源
     */
    MyObject.overwriteNoEmpty = function (destination, source, def) {
        Object.keys(destination).forEach(function (key) {
            if (typeof source[key] !== 'undefined') {
                if (MyAssets.isEmpty(source[key])) {
                    if (!MyAssets.isEmpty(def[key])) {
                        destination[key] = def[key];
                    }
                }
                else {
                    destination[key] = source[key];
                }
            }
        });
    };
    /**
     * 来自 object 的 path 路径相应的值, _.at({a:{b:{c:'age'}}}, 'a.b.c').shift() == 'age'
     * @param obj {Object}
     * @param path {string} 路径
     */
    MyObject.at = function (obj, path) {
        return at(obj, path).shift();
    };
    /**
     * 使用 iteratee 遍历对象的自身和继承的可枚举属性
     * @param obj
     * @param iteratee {Function}
     */
    MyObject.forIn = function (obj, iteratee) {
        forIn(obj, iteratee);
    };
    /**
     * 创建一个 object 的自身可枚举属性名为数组
     * @param obj
     */
    MyObject.keys = function (obj) {
        return keys(obj);
    };
    return MyObject;
}());

var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
var MySecret = /** @class */ (function () {
    function MySecret() {
    }
    MySecret.randomString = function (length) {
        var result = '';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };
    /**
     * 产生一个包括 lower 与 upper 之间的数。
     * 如果只提供一个参数返回一个0到提供数之间的数。
     * 如果 floating 设为 true，或者 lower 或 upper 是浮点数，结果返回浮点数。
     * _.random(1.2, 5.2) => 产生 1.2 到 5.2 之间的随机数
     * @param lower {number} 下限
     * @param upper {number} 上限
     * @param floating {boolean} 是否返回浮点数
     */
    MySecret.randomNumber = function (lower, upper, floating) {
        if (floating === void 0) { floating = false; }
        return random(lower, upper, floating);
    };
    MySecret.generatePassword = function (pd) {
        if (pd == '') {
            return '';
        }
        else {
            var first = Md5.hashStr(pd + pd.substr(0, 4));
            return Md5.hashStr(pd + first);
        }
    };
    MySecret.md5 = function (text) {
        return Md5.hashStr(text);
    };
    return MySecret;
}());

var MyString = /** @class */ (function () {
    function MyString() {
    }
    /**
     * replace all s1 to s2
     * @param text {string} 字符串
     * @param s1 {string} 被替换的字符
     * @param s2 {string} 替换成此字符
     */
    MyString.replaceAll = function (text, s1, s2) {
        return text.replace(new RegExp(s1, 'gm'), s2);
    };
    /**
     * 为数字或字符串补0到指定长度
     * @param id {number|string} 数字或字符串
     * @param len {number} 长度
     */
    MyString.padZero = function (id, len) {
        // @ts-ignore
        return ('' + id).padStart(len, '0');
    };
    /**
     * 字符串过滤
     * @param data
     */
    MyString.strFilter = function (data) {
        return MyAssets.isEmpty(data) ? '' : data;
    };
    return MyString;
}());

// https://stackoverflow.com/questions/48836140/using-lodash-in-angular-4
var MyTrie = /** @class */ (function () {
    function MyTrie() {
    }
    /**
     * 对数组进行排序，可能需要 filter 出一级数组
     * @param data {any[]} 待排序的数组
     * @param key  {string} 排序的键
     * @returns {any[]}
     */
    MyTrie.reSort = function (data, key) {
        return data.sort(function (a, b) {
            if (a[key] == b[key]) {
                return 0;
            }
            return a[key] - b[key] > 0 ? -1 : 1;
        });
    };
    /**
     * 将数组转为字典
     * @param data {any[]} 数组
     * @param primaryKey {string} 主键
     */
    MyTrie.toDict = function (data, primaryKey) {
        if (primaryKey === void 0) { primaryKey = 'id'; }
        var result = {};
        data.forEach(function (e) {
            // @ts-ignore
            result[e[primaryKey]] = e;
        });
        return result;
    };
    /**
     * 将字典转为树 —— 多级显示时使用
     * @param dict {map}
     * @param parentKey {string}
     * @param children {string}
     */
    MyTrie.dict2Tree = function (dict, parentKey, children) {
        if (parentKey === void 0) { parentKey = 'parent_id'; }
        if (children === void 0) { children = 'children'; }
        var rst = [];
        for (var key in dict) {
            if (Object.prototype.hasOwnProperty.call(dict, key)) {
                var pid = dict[key][parentKey]; // 一级分类
                if (pid === 0) {
                    rst.push(dict[key]);
                }
                else {
                    if (typeof dict[pid][children] === 'undefined') {
                        dict[pid][children] = [];
                    }
                    dict[pid][children].push(dict[key]);
                }
            }
        }
        return rst;
    };
    /**
     * 将树转为一维数组 —— 单级显示时使用
     * @param tree dict2Tree 的结果
     * @param list {Array} 用来保存的结果
     * @param level {number} 表示层次
     * @param levelName {string} 层次键名
     * @param children {string} 子值键名
     */
    MyTrie.tree2List = function (tree, list, level, levelName, children) {
        var _a;
        if (level === void 0) { level = 0; }
        if (levelName === void 0) { levelName = 'level'; }
        if (children === void 0) { children = 'children'; }
        for (var key in tree) {
            if (Object.prototype.hasOwnProperty.call(tree, key)) {
                var ele = tree[key];
                ele[levelName] = level;
                list.push(Object.assign({}, ele, (_a = {}, _a[children] = [], _a)));
                if (typeof ele[children] === 'object' && ele[children].length > 0) {
                    this.tree2List(ele[children], list, level + 1, levelName, children);
                }
            }
        }
    };
    return MyTrie;
}());
/*
// 使用示例
const sData = Trie.reSort(rows, 'rank');
const sDict = Trie.toDict(sData);
const sTree = Trie.dict2Tree(sDict);
Trie.tree2List(sTree, sList);
sList.forEach(s => {
s.title = '|___'.repeat(s.level) + ' ' + s.title;
});

// console 数据
const data = [
  { id: 1, parent_id: 0, sort: 10, title: '1.0.0' },
  { id: 2, parent_id: 0, sort: 90, title: '3.0.0' },
  { id: 20, parent_id: 2, sort: 90, title: '3.1.0' },
  { id: 3, parent_id: 0, sort: 50, title: '2.0.0' },
  { id: 30, parent_id: 3, sort: 50, title: '2.1.0' },
];
const sortData = Trie.reSort(data, 'sort');
console.log('sort data', sortData);

  { id: 2, parent_id: 0, sort: 90, title: '3.0.0' },
  { id: 20, parent_id: 2, sort: 90, title: '3.1.0' },
  { id: 3, parent_id: 0, sort: 50, title: '2.0.0' },
  { id: 30, parent_id: 3, sort: 50, title: '2.1.0' },
  { id: 1, parent_id: 0, sort: 10, title: '1.0.0' }

const dict = Trie.toDict(sortData);
console.log('to dict', dict);

{
  '1': { id: 1, parent_id: 0, sort: 10, title: '1.0.0' },
  '2': { id: 2, parent_id: 0, sort: 90, title: '3.0.0' },
  '3': { id: 3, parent_id: 0, sort: 50, title: '2.0.0' },
  '20': { id: 20, parent_id: 2, sort: 90, title: '3.1.0' },
  '30': { id: 30, parent_id: 3, sort: 50, title: '2.1.0' }
}

const tree = Trie.dict2Tree(dict);
console.log('to tree', tree);

[ { id: 1, parent_id: 0, sort: 10, title: '1.0.0' },
  { id: 2, parent_id: 0, sort: 90, title: '3.0.0', children: [ [Object] ] },
  { id: 3, parent_id: 0, sort: 50, title: '2.0.0', children: [ [Object] ] }
]

const list = [];
Trie.tree2List(tree, list);
console.log('to html', list)

[ {id:  1, parent_id: 0, sort: 10, title: '1.0.0', level: 0},
  {id:  2, parent_id: 0, sort: 90, title: '3.0.0', level: 0},
  {id: 20, parent_id: 2, sort: 90, title: '3.1.0', level: 1},
  {id:  3, parent_id: 0, sort: 50, title: '2.0.0', level: 0},
  {id: 30, parent_id: 3, sort: 50, title: '2.1.0', level: 1}
]
*/

var AnyData = null;

var MyBrowser = /** @class */ (function () {
    function MyBrowser() {
    }
    // 检查是否为检测浏览器
    MyBrowser.isWeiXin = function () {
        // window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
        var ua = window.navigator.userAgent.toLowerCase();
        // 通过正则表达式匹配ua中是否含有MicroMessenger字符串
        return ua.indexOf('micromessenger') > -1 || ua.indexOf('wechat') > -1;
    };
    MyBrowser.isMobile = function () {
        var ua = navigator.userAgent;
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS|micro|wechat/i.test(ua)) {
            return true;
        }
        else if (/Chrome/i.test(ua)) {
            return false;
        }
        else {
            return false;
        }
    };
    return MyBrowser;
}());

var MyCache = /** @class */ (function () {
    function MyCache(name, engine) {
        this.name = name;
        this.engine = engine ? engine : localStorage;
    }
    MyCache.prototype.read = function () {
        var text = this.engine.getItem(this.name);
        if (text) {
            return JSON.parse(text);
        }
        return null;
    };
    MyCache.prototype.writeString = function (data) {
        this.engine.setItem(this.name, data);
    };
    MyCache.prototype.write = function (data) {
        switch (typeof data) {
            case 'string':
                this.writeString(data);
                break;
            default:
                this.writeString(JSON.stringify(data));
                break;
        }
    };
    MyCache.prototype.clean = function () {
        this.engine.removeItem(this.name);
    };
    return MyCache;
}());

var KEY_HREF = 'href';
var KEY_SRC = 'src';
var MyHtml = /** @class */ (function () {
    function MyHtml() {
    }
    // 重新检查
    MyHtml.reloadFiles = function () {
        var _this = this;
        if (this.files.length > 0) {
            return;
        }
        var nodes = document.getElementsByTagName('head')[0].children;
        each(nodes, function (node) {
            // @ts-ignore
            if (node.nodeName === 'LINK' && typeof node[KEY_HREF] === 'string') {
                // @ts-ignore
                _this.files.push(node[KEY_HREF]);
            }
            else { // @ts-ignore
                if (node.nodeName === 'SCRIPT' && typeof node[KEY_SRC] === 'string') {
                    // @ts-ignore
                    _this.files.push(node[KEY_SRC]);
                }
            }
        });
        // console.log(this.files);
    };
    /**
     * 检查指定的文件是否
     * @param filename 文件名
     */
    MyHtml.fileExists = function (filename) {
        this.reloadFiles();
        for (var i in this.files) {
            if (this.files[i].lastIndexOf(filename) > -1) {
                return true;
            }
        }
        return false;
    };
    /**
     * 追加一个 js 文件到 head 标签内
     * @param src js 文件的路径
     */
    MyHtml.appendJsFile = function (src) {
        console.log('js file:', src);
        if (this.fileExists(src)) {
            console.log('js file exists');
            return false;
        }
        var node = document.createElement('script');
        node.src = src;
        node.type = 'text/javascript';
        document.head.appendChild(node);
        // document.getElementsByTagName('head')[0].appendChild(node);
        this.files.push(src);
        return true;
    };
    /**
     * 追加一个 css 文件到 head 标签内
     * @param href css 文件的地址
     */
    MyHtml.appendCssFile = function (href) {
        console.log('css href:', href);
        if (this.fileExists(href)) {
            console.log('css file exists');
            return;
        }
        var css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = href;
        document.getElementsByTagName('head')[0].appendChild(css);
        this.files.push(href);
    };
    MyHtml.backgroundImageUrlStyle = function (src, bgSize) {
        if (bgSize === void 0) { bgSize = 'cover'; }
        if (src) {
            return {
                'background-image': "url('".concat(src, "')"),
                'background-size': bgSize,
            };
        }
        else {
            return {};
        }
    };
    // 缓存检测的结果
    MyHtml.files = [];
    return MyHtml;
}());

var MyUrl = /** @class */ (function () {
    function MyUrl() {
    }
    /**
     * 查询链接地址中的值
     * @param href {string} 网址
     * @param key {string} 键
     * @param defaultValue {number} 默认值
     */
    MyUrl.queryParamNumber = function (href, key, defaultValue) {
        if (defaultValue === void 0) { defaultValue = 0; }
        var reg = new RegExp("".concat(key, "=(\\d+)"));
        var r = href.match(reg);
        // console.log(location.href, reg, r);
        if (r) {
            return +r[1];
        }
        else {
            return defaultValue;
        }
    };
    /**
     * 查询链接地址中指定的键的值
     * @param href {string} 链接地址，通常是 location.href
     * @param key {string} 等提取的键
     * @param defaultValue {string} 如果没有找到，则返回此默认值
     */
    MyUrl.queryParamString = function (href, key, defaultValue) {
        if (defaultValue === void 0) { defaultValue = ''; }
        var reg = new RegExp("".concat(key, "=([^;&]+)"));
        var r = href.match(reg);
        if (r) {
            return r[1];
        }
        else {
            return defaultValue;
        }
    };
    MyUrl.map2Query = function (obj) {
        if (!MyAssets.isEmpty(obj)) {
            var rst = [];
            for (var k in obj) {
                rst.push([encodeURIComponent(k), encodeURIComponent(obj[k])].join('='));
            }
            return rst.join('&');
        }
        return '';
    };
    /**
     * 将对象转为查询字符串
     * @param obj {Object} 待转换对象
     * @return {string} 示例 将 {a:'a',b:'b'} 转换为 a=a&b=b
     */
    MyUrl.objToUrl = function (obj) {
        var str = '';
        for (var key in obj) {
            if (key === null || key === undefined) {
                continue;
            }
            if (str !== '') {
                str += '&';
            }
            // @ts-ignore
            str += key + '=' + encodeURIComponent(obj[key]);
        }
        return str;
    };
    /**
     * 为 src 追加 & 或者 ? 符号
     * @param src {string} 网址
     */
    MyUrl.append = function (src) {
        if (src.indexOf('?') > -1) {
            src += '&';
        }
        else {
            src += '?';
        }
        return src;
    };
    /**
     * 拼接地址
     * @param url {string} 地址 示例 aaa
     * @param query {string} 参数 bbb
     * @return {string} aaa?bbb
     */
    MyUrl.appendQuery = function (url, query) {
        return url.indexOf('?') > -1 ? url + '&' + query : url + '?' + query;
    };
    /**
     * 拼接地址
     * @param url {string}
     * @param obj {Object} 字典参数
     */
    MyUrl.appendMap = function (url, obj) {
        return this.appendQuery(url, this.map2Query(obj));
    };
    MyUrl.contact = function (domain, other) {
        var e1 = domain.endsWith('/');
        var e2 = other.startsWith('/');
        if (e1) {
            if (e2) {
                return domain + other.substring(1);
            }
            else {
                return domain + other;
            }
        }
        else {
            if (e2) {
                return domain + other;
            }
            else {
                return domain + '/' + other;
            }
        }
    };
    return MyUrl;
}());

// 合并配置
var MyMapConf = /** @class */ (function () {
    function MyMapConf() {
    }
    MyMapConf.merge = function (destination, source) {
        for (var k in source) {
            if (source.hasOwnProperty(k)) {
                // @ts-ignore
                destination[k] = source[k];
            }
        }
    };
    return MyMapConf;
}());

function getKvColor(items, name) {
    var index = items.findIndex(function (m) { return m.name == name; });
    // @ts-ignore
    return index > -1 ? items[index].color : '';
}
function getKvTitle(items, name) {
    var index = items.findIndex(function (m) { return m.name == name; });
    return index > -1 ? items[index].title : '' + name;
}
function getKvId(items, name) {
    var index = items.findIndex(function (m) { return m.name == name; });
    // @ts-ignore
    return index > -1 ? items[index].id : name;
}
function getKvTitleById(items, id) {
    var index = items.findIndex(function (m) { return m.id == id; });
    return index > -1 ? items[index].title : '' + id;
}
var ResListResult = /** @class */ (function () {
    function ResListResult() {
        this.total = 0;
        this.tag = 0;
        this.rows = new Array();
    }
    return ResListResult;
}());

var MyTable = /** @class */ (function () {
    function MyTable() {
        this.backupWhere = {}; // 在 mat-checkbox + lib-paginator 结合使用时，false/true 会被转为字符串
        this.total = 0; // 记录总量
        this.rows = [];
        this.where = {}; // 查询的数据
        this.isLoading = false;
    }
    MyTable.prototype.onSubmit = function () {
        this.isLoading = true;
        if (typeof this.submit == 'function') {
            this.submit();
        }
        else {
            console.warn('table: submit is not a function');
        }
    };
    Object.defineProperty(MyTable.prototype, "hasRows", {
        get: function () {
            return this.rows && this.rows.length > 0;
        },
        enumerable: false,
        configurable: true
    });
    MyTable.prototype.cloneBackupWhere = function () {
        switch (typeof this.backupWhere) {
            case 'function':
                return Object.assign({}, this.backupWhere());
            default:
                return Object.assign({}, this.backupWhere);
        }
    };
    MyTable.prototype.onReset = function () {
        this.resetWhere();
        this.onSubmit();
    };
    MyTable.prototype.resetWhere = function () {
        this.where = this.cloneBackupWhere();
    };
    MyTable.prototype.assignWhere = function (q) {
        this.where = Object.assign({}, this.cloneBackupWhere(), q || {});
    };
    MyTable.prototype.setSubmitCallback = function (callback) {
        this.submit = callback;
    };
    // 方法，或者对象
    MyTable.prototype.setBackupWhere = function (callback) {
        this.backupWhere = callback;
        this.resetWhere();
        return this;
    };
    MyTable.prototype.addBackupWhere = function (params) {
        Object.assign(this.backupWhere, params);
        this.resetWhere();
        return this;
    };
    MyTable.prototype.listResponse = function (res) {
        this.isLoading = false;
        if (res) {
            this.total = res.total;
            this.rows = res.rows || [];
        }
    };
    MyTable.prototype.listResponseAndAssignWhere = function (res, q) {
        this.listResponse(res);
        this.assignWhere(q);
    };
    MyTable.prototype.totalDecr = function () {
        this.total -= 1;
    };
    MyTable.prototype.itemRemove = function (e) {
        var index = this.rows.indexOf(e);
        this.remove(index);
    };
    MyTable.prototype.itemReplace = function (e, newE) {
        if (newE) {
            Object.assign(e, newE);
        }
    };
    MyTable.prototype.remove = function (index) {
        if (index > -1) {
            this.rows.splice(index, 1);
            this.total -= 1;
        }
        else {
            console.warn('remove rows with error index;', index);
        }
    };
    MyTable.prototype.append = function (item) {
        if (item) {
            this.rows.unshift(item);
            this.total += 1;
        }
    };
    MyTable.prototype.update = function (index, item) {
        Object.assign(this.rows[index], item);
    };
    MyTable.prototype.whereWith = function (name) {
        return this.where[name] || '';
    };
    return MyTable;
}());

var _a;
var StatusActive = 'active';
var StatusDisabled = 'disabled';
var StatusText = (_a = {},
    _a[StatusActive] = '正常',
    _a[StatusDisabled] = '禁用',
    _a.disable = '禁用',
    _a.draft = '草稿',
    _a.lock = '锁定',
    _a.warning = '警告',
    _a.delete = '删除',
    _a.check = '待审核',
    _a.black = '黑名单',
    _a.bind = '绑定',
    _a);
var SymYes = '✔';
var SymNo = '✘';
var MyTextService = /** @class */ (function () {
    function MyTextService() {
    }
    MyTextService.nextStatus = function (s) {
        return s == StatusDisabled ? StatusActive : StatusDisabled;
    };
    MyTextService.getStatusText = function (s) {
        // @ts-ignore
        return StatusText[s] || '未知';
    };
    MyTextService.getStatusColor = function (s) {
        return getKvColor(this.mapStatusText, s);
    };
    MyTextService.getStatusBoolText = function (s) {
        if (s === true || 'yes' === s) {
            return SymYes;
        }
        else if (s === false || 'no' === s) {
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
    };
    MyTextService.symYes = SymYes;
    MyTextService.symNo = SymNo;
    MyTextService.mapStatusText = [
        { name: StatusActive, title: '正常', color: 'primary' },
        { name: StatusDisabled, title: '禁用', color: 'grey' },
        { name: 'lock', title: '锁定', color: '' },
        { name: 'delete', title: '删除', color: 'danger' },
        { name: 'warning', title: '警告', color: 'warning' },
        { name: 'check', title: '待审', color: '' },
    ];
    MyTextService.mapStatusOptions = [
        { name: StatusActive, title: '正常' },
        { name: StatusDisabled, title: '禁用' },
    ];
    MyTextService.mapMockBool = [
        { name: 'true', title: '是' },
        { name: 'false', title: '否' }
    ];
    return MyTextService;
}());

export { AnyData, MyArray, MyAssets, MyBrowser, MyCache, MyDatetime, MyHtml, MyMapConf, MyMoney, MyObject, MySecret, MyString, MyTable, MyTextService, MyTrie, MyTypecast, MyUrl, ResListResult, StatusActive, StatusDisabled, getKvColor, getKvId, getKvTitle, getKvTitleById };
