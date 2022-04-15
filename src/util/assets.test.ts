import {MyAssets} from "./assets";

test('isNumber', () => {
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
});