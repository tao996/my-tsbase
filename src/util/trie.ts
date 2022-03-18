// https://stackoverflow.com/questions/48836140/using-lodash-in-angular-4
export class MyTrie {
    /**
     * 对数组进行排序，可能需要 filter 出一级数组
     * @param data {any[]} 待排序的数组
     * @param key  {string} 排序的键
     * @returns {any[]}
     */
    static reSort(data: any[], key: string | number) {
        return data.sort((a, b) => {
            if (a[key] == b[key]) {
                return 0;
            }
            return a[key] - b[key] > 0 ? -1 : 1;
        });
    }

    /**
     * 将数组转为字典
     * @param data {any[]} 数组
     * @param primaryKey {string} 主键
     */
    static toDict(data: any[], primaryKey = 'id') {
        const result = {};
        data.forEach(e => {
            // @ts-ignore
            result[e[primaryKey]] = e;
        });
        return result;
    }

    /**
     * 将字典转为树 —— 多级显示时使用
     * @param dict {map}
     * @param parentKey {string}
     * @param children {string}
     */
    static dict2Tree(dict: any, parentKey = 'parent_id', children = 'children') {
        const rst = [];

        for (const key in dict) {
            if (Object.prototype.hasOwnProperty.call(dict, key)) {
                const pid = dict[key][parentKey]; // 一级分类
                if (pid === 0) {
                    rst.push(dict[key]);
                } else {
                    if (typeof dict[pid][children] === 'undefined') {
                        dict[pid][children] = [];
                    }
                    dict[pid][children].push(dict[key]);
                }

            }
        }
        return rst;
    }

    /**
     * 将树转为一维数组 —— 单级显示时使用
     * @param tree dict2Tree 的结果
     * @param list {Array} 用来保存的结果
     * @param level {number} 表示层次
     * @param levelName {string} 层次键名
     * @param children {string} 子值键名
     */
    static tree2List(tree: any, list: any, level = 0, levelName = 'level', children = 'children') {
        for (const key in tree) {
            if (Object.prototype.hasOwnProperty.call(tree, key)) {
                const ele = tree[key];
                ele[levelName] = level;
                list.push((<any>Object).assign({}, ele, {[children]: []}))

                if (typeof ele[children] === 'object' && ele[children].length > 0) {
                    this.tree2List(ele[children], list, level + 1, levelName, children);
                }
            }
        }
    }
}

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
