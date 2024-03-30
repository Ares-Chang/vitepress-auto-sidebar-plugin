import { describe, expect, it } from 'vitest'
import { generateSidebar, setDataFormat, setItem } from '../src'

const cwd = './playground'
const paths = [
  'web/index.md',
  'web/js.md',
  'web/css/index.md',
  'web/css/background.md',
  'linux/index.md',
  'linux/wsl.md',
]

describe('处理文件数据', () => {
  it('设置数据体', () => {
    expect(setItem(cwd, 'web/css/background.md'.split('/'), {}))
      .toMatchInlineSnapshot(`
        {
          "children": [
            {
              "children": [
                {
                  "children": [],
                  "h1": "background",
                  "isFile": true,
                  "link": "web/css/background.md",
                  "text": "background",
                  "title": "background",
                },
              ],
              "isFile": false,
              "link": "web/css",
              "text": "css",
            },
          ],
          "isFile": false,
          "link": "web",
          "text": "web",
        }
      `)
  })

  it('设置数据体列表', () => {
    expect(setDataFormat(cwd, paths, {}))
      .toMatchInlineSnapshot(`
        [
          {
            "children": [
              {
                "children": [],
                "h1": "web",
                "isFile": true,
                "link": "web/index.md",
                "text": "index",
                "title": "Web Title",
              },
              {
                "children": [],
                "h1": "js",
                "isFile": true,
                "link": "web/js.md",
                "text": "js",
                "title": "js",
              },
              {
                "children": [
                  {
                    "children": [],
                    "h1": "css",
                    "hide": true,
                    "isFile": true,
                    "link": "web/css/index.md",
                    "text": "index",
                    "title": "index",
                  },
                  {
                    "children": [],
                    "h1": "background",
                    "isFile": true,
                    "link": "web/css/background.md",
                    "text": "background",
                    "title": "background",
                  },
                ],
                "isFile": false,
                "link": "web/css",
                "text": "css",
              },
            ],
            "isFile": false,
            "link": "web",
            "text": "web",
          },
          {
            "children": [
              {
                "children": [],
                "h1": "Linux",
                "isFile": true,
                "link": "linux/index.md",
                "text": "index",
                "title": "index",
              },
              {
                "children": [],
                "h1": "WSL",
                "isFile": true,
                "link": "linux/wsl.md",
                "text": "wsl",
                "title": "wsl",
              },
            ],
            "isFile": false,
            "link": "linux",
            "text": "linux",
          },
        ]
      `)
  })

  it('使用文件 H1 标题', () => {
    expect(setDataFormat(cwd, paths, { useH1Title: true }))
      .toMatchInlineSnapshot(`
        [
          {
            "children": [
              {
                "children": [],
                "h1": "web",
                "isFile": true,
                "link": "web/index.md",
                "text": "index",
                "title": "Web Title",
              },
              {
                "children": [],
                "h1": "js",
                "isFile": true,
                "link": "web/js.md",
                "text": "js",
                "title": "js",
              },
              {
                "children": [
                  {
                    "children": [],
                    "h1": "css",
                    "hide": true,
                    "isFile": true,
                    "link": "web/css/index.md",
                    "text": "index",
                    "title": "css",
                  },
                  {
                    "children": [],
                    "h1": "background",
                    "isFile": true,
                    "link": "web/css/background.md",
                    "text": "background",
                    "title": "background",
                  },
                ],
                "isFile": false,
                "link": "web/css",
                "text": "css",
              },
            ],
            "isFile": false,
            "link": "web",
            "text": "web",
          },
          {
            "children": [
              {
                "children": [],
                "h1": "Linux",
                "isFile": true,
                "link": "linux/index.md",
                "text": "index",
                "title": "Linux",
              },
              {
                "children": [],
                "h1": "WSL",
                "isFile": true,
                "link": "linux/wsl.md",
                "text": "wsl",
                "title": "WSL",
              },
            ],
            "isFile": false,
            "link": "linux",
            "text": "linux",
          },
        ]
      `)
  })
})

describe('生成侧边栏', () => {
  it('生成默认配置', () => {
    expect(generateSidebar(setDataFormat(cwd, paths, { useH1Title: true })))
      .toMatchInlineSnapshot(`
        {
          "/linux/": {
            "base": "",
            "items": [
              {
                "link": "linux/index.md",
                "text": "index",
              },
              {
                "link": "linux/wsl.md",
                "text": "wsl",
              },
            ],
          },
          "/web/": {
            "base": "",
            "items": [
              {
                "link": "web/index.md",
                "text": "index",
              },
              {
                "link": "web/js.md",
                "text": "js",
              },
              {
                "items": [
                  {
                    "link": "web/css/index.md",
                    "text": "index",
                  },
                  {
                    "link": "web/css/background.md",
                    "text": "background",
                  },
                ],
                "text": "css",
              },
            ],
          },
        }
      `)
  })
})
