import {MyAssets} from "./assets";

test('MyAssets', () => {
    expect(MyAssets.isNumber('1')).toBeTruthy();
    expect(MyAssets.isNumber('1.5')).toBeTruthy();
    expect(MyAssets.isNumber(1)).toBeTruthy();
    expect(MyAssets.isNumber(1.5)).toBeTruthy();
    expect(MyAssets.isNumber(0)).toBeTruthy();
    expect(MyAssets.isNumber('0')).toBeTruthy();
    expect(MyAssets.isNumber('')).toBeFalsy()
    expect(MyAssets.isNumber('null')).toBeFalsy()
    expect(MyAssets.isNumber(' ')).toBeFalsy()
    expect(MyAssets.isNumber('-')).toBeFalsy()
    expect(MyAssets.isNumber({})).toBeFalsy()
    expect(MyAssets.isNumber([])).toBeFalsy()
    expect(MyAssets.isNumber(null)).toBeFalsy()
    expect(MyAssets.isNumber(undefined)).toBeFalsy()
    expect(MyAssets.isNumber(false)).toBeFalsy()
    expect(MyAssets.isNumber(true)).toBeFalsy()
    expect(MyAssets.isNumber(() => {
    })).toBeFalsy()

    expect(MyAssets.isTrue(true)).toBeTruthy()
    expect(MyAssets.isTrue('true')).toBeTruthy()
    expect(MyAssets.isTrue('false')).toBeFalsy()
    expect(MyAssets.isTrue('TRUE')).toBeTruthy()

    expect(MyAssets.isArray([1, 2, 3])).toBeTruthy()
    expect(MyAssets.isArray('abc')).toBeFalsy()
    expect(MyAssets.isArray(1)).toBeFalsy()
    expect(MyAssets.isArray(null)).toBeFalsy()
    expect(MyAssets.isArray(() => {
    })).toBeFalsy()

    expect(MyAssets.isObject({})).toBeTruthy()
    expect(MyAssets.isObject([])).toBeTruthy()
    expect(MyAssets.isObject(null)).toBeFalsy()
    expect(MyAssets.isObject(() => {
    })).toBeFalsy()

    expect(MyAssets.isEmpty(null)).toBeTruthy()
    expect(MyAssets.isEmpty(undefined)).toBeTruthy()
    expect(MyAssets.isEmpty(0)).toBeTruthy()
    expect(MyAssets.isEmpty('0')).toBeTruthy()
    expect(MyAssets.isEmpty('')).toBeTruthy()
    expect(MyAssets.isEmpty({})).toBeTruthy()
    expect(MyAssets.isEmpty([])).toBeTruthy()
    expect(MyAssets.isEmpty(false)).toBeTruthy()

    expect(MyAssets.isUrl('http://test.com')).toBeTruthy()
    expect(MyAssets.isUrl('https://test.com')).toBeTruthy()
    expect(MyAssets.isUrl('http://www.test.com')).toBeTruthy()
    expect(MyAssets.isUrl('https://www.test.com')).toBeTruthy()
    expect(MyAssets.isUrl('test.com')).toBeTruthy()
    expect(MyAssets.isUrl('www.test.com')).toBeTruthy()
    expect(MyAssets.isUrl(' www.test.com')).toBeFalsy()
    expect(MyAssets.isUrl('www. test.com')).toBeFalsy()
    expect(MyAssets.isUrl('www.test. com')).toBeFalsy()
});
