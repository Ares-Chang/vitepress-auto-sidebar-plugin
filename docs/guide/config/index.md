---
group: true
collapsed: false
outline: deep
---

# 插件可选项

引入插件时可设置以下可选项。

## srcDir

- 类型: `string`
- 默认值: `vitepress.srcDir | './'`

源文件目录，如不设置默认与 `vitepress.srcDir` 相同，未设置时默认为 `./`。

## pattern

- 类型: `string`
- 默认值: `**.md`

文件路由提取由 [fast-glob](https://github.com/mrmlnc/fast-glob) 来完成，支持自定义匹配表达式，如不设置默认为 `**.md`，也可参考 [fast-glob](https://github.com/mrmlnc/fast-glob) 文档自定义设置。

## ignoreList

- 类型: `string[]`
- 默认值: `vitepress.srcExclude`

忽略文件路由提取的文件列表，如不设置默认与 `vitepress.srcExclude` 相同，也可参考 [fast-glob#ignore](https://github.com/mrmlnc/fast-glob#ignore) 文档自定义设置。

> [!TIP]
> 程序默认忽略 `**/node_modules/**`、`**/dist/**` 和 `index.md` 文件不可修改。

## useH1Title

- 类型: `boolean`
- 默认值: `true`

是否使用 `h1` 作为标题，默认开启。

## title

- 类型: `TitleOptions`

自定义文件夹标题配置。

### mode

- 类型: `TitleMode`
- 默认值: `'titlecase'`

自定义文件夹标题模式。

**TS 类型:**

<<< @/../src/types.ts#TitleMode

#### false

关闭格式化，不做修改。

```
Web-A => Web-A
Web A => Web A
```

#### lowercase

将标题转为小写

```
Web-A => web-a
Web A => web a
```

#### uppercase

将标题转为大写

```
Web-A => WEB-A
Web A => WEB A
```

#### capitalize

将标题首字母大写

```
Web-A => Web-a
WebA => Weba
```

#### kebabcase

将标题转为连字符模式

```
Web-A => web-a
Web A => web-a
```

#### titlecase

将标题转为标题模式

```
Web-A => Web A
web a => Web A
```

#### 自定义标题

- 类型: `(text: string) => string`

可传入自定义标题方法，进行自定义修改。

```ts
export default defineConfig({
  vite: {
    plugins: [
      AutoSidebarPlugin({
        title: {
          mode: text => text.toUpperCase(),
        },
      }),
    ],
  },
})
```

### map

- 类型: `Record<string, string>`

自定义标题映射，可指定文件夹 Title ，级别优先于标题 model

```ts
export default defineConfig({
  vite: {
    plugins: [
      AutoSidebarPlugin({
        title: {
          map: {
            'web/css/': '🎉CSS World🎉'
          },
        },
      }),
    ],
  },
})
```

## sort

- 类型: `(a: Item, b: Item) => number`

内部执行 [sort](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) 方法，可自定义排序。

自定义排序方法，遍历每个文件夹时会依次执行。

返回值应该是一个数字，其符号表示两个元素的相对顺序：如果 a 小于 b，返回值为负数，如果 a 大于 b，返回值为正数，如果两个元素相等，返回值为 0。NaN 被视为 0。

具体可参考 [Array.sort](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) 文档。

```ts
export default defineConfig({
  vite: {
    plugins: [
      AutoSidebarPlugin({
        sort: (a, b) => a.text.localeCompare(b.text)
      }),
    ],
  },
})
```
