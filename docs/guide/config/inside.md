---
outline: deep
---

# 文件内配置

指定于文章内部 frontmatter 配置，同 [vitepress frontmatter 配置](https://vitepress.dev/zh/reference/frontmatter-config#outline)。

```md
---
title: Web Title
collapsed: false
---
```

## 文件配置

### title

- 类型: `string`

文章显示标题，优先级最高。

```md
---
title: Web Title
---
```

### index

- 类型: `number`

文章排序顺序，优先级高于文件名称下标。

```md
---
index: 1
---
```

### hide

- 类型: `boolean`
- 默认值: `false`

是否隐藏文章。

```md
---
hide: true
---
```

## 文件夹配置

以下配置可配置于文件夹下 `index.md` 文件内，如果设置会自动读取文件夹配置并生效。

```sh {1-3,6}
├── guide
│   ├── config
│   │   ├── index.md
│   │   ├── inside.md
│   │   └── types.md
│   └── index.md
└── index.md
```

### group

- 类型: `boolean`

是否为文件夹分组，会被提取到分组级别。

::: code-group

```md [config/index.md]
---
group: true
---
```

```sh [目录结构]
├── guide
│   ├── config
│   │   ├── index.md
│   │   ├── inside.md
│   │   └── types.md
│   └── index.md
└── index.md
```

```json [输出路由]
{
  "/guide/": [
    {
      "text": "Guide",
      "items": [
        {
          "text": "开始",
          "link": "guide/index.md"
        }
      ],
      "collapsed": false
    },
    {
      "text": "Config",
      "items": [
        {
          "text": "插件可选项",
          "link": "guide/config/index.md"
        },
        {
          "text": "文件内配置",
          "link": "guide/config/inside.md"
        },
        {
          "text": "TS 类型",
          "link": "guide/config/types.md"
        }
      ],
      "collapsed": false
    }
  ]
}
```

:::

### collapsed

- 类型: `boolean`

是否折叠文件夹，默认不显示折叠按钮。

设置 `false` 情况下折叠为打开状态，如果希望加载时关闭，将 `collapsed` 设置为 `true`

```md
---
collapsed: true
---
```
