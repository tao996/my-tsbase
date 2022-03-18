## 简介

my typescript library

## 参考资料

* [How to create your own Typescript library](https://aganglada.com/blog/how-to-create-your-own-typescript-library)
* [pm2](https://pm2.keymetrics.io/)

```
pm2 start verdaccio
pm2 stop verdaccio

# 此时只有登录了verdaccio的用户才能对仓库里的包进行操作。

# npm登录
npm adduser --registry http://127.0.0.1:4873
# 发布包
npm publish --registry http://127.0.0.1:4873
# 取消发布, 如果是24h内发布的包，需要加上--force
npm unpublish 包名 --registry http://127.0.0.1:4873
```