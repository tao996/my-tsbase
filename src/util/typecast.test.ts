import {MyTypecast} from "./typecast";

test('str2Number', () => {
    expect(MyTypecast.str2Number(1)).toEqual(1);
    expect(MyTypecast.str2Number('1')).toEqual(1);
    expect(MyTypecast.str2Number('1.5')).toEqual(1.5);
    expect(MyTypecast.str2Number('')).toEqual(0);
});