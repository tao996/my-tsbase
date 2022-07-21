import {MyFilter} from "./filter";

test('MyFilter',()=>{
    expect(MyFilter.getURL(
        '4.15 reb:/ 【古十九【简配版】一体即热式智能马桶】https://v.douyin.com/abc/ 长按复制此条消息，打开抖音搜索，查看商品详情！')).
        toEqual('https://v.douyin.com/abc/')
})
