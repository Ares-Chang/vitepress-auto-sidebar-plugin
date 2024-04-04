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
                  "name": "background",
                  "text": "background",
                },
              ],
              "group": undefined,
              "isFile": false,
              "link": "web/css",
              "name": "css",
              "text": "css",
            },
          ],
          "group": undefined,
          "isFile": false,
          "link": "web",
          "name": "web",
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
                "collapsed": true,
                "h1": "web",
                "isFile": true,
                "link": "web/index.md",
                "name": "index",
                "text": "Web Title",
                "title": "Web Title",
              },
              {
                "children": [
                  {
                    "children": [],
                    "h1": "css",
                    "hide": true,
                    "isFile": true,
                    "link": "web/css/index.md",
                    "name": "index",
                    "text": "index",
                  },
                  {
                    "children": [],
                    "h1": "background",
                    "isFile": true,
                    "link": "web/css/background.md",
                    "name": "background",
                    "text": "background",
                  },
                ],
                "group": undefined,
                "isFile": false,
                "link": "web/css",
                "name": "css",
                "text": "css",
              },
              {
                "children": [],
                "h1": "js",
                "isFile": true,
                "link": "web/js.md",
                "name": "js",
                "text": "js",
              },
            ],
            "collapsed": true,
            "group": undefined,
            "isFile": false,
            "link": "web",
            "name": "web",
            "text": "web",
          },
          {
            "children": [
              {
                "children": [],
                "h1": "Linux",
                "isFile": true,
                "link": "linux/index.md",
                "name": "index",
                "text": "index",
              },
              {
                "children": [],
                "h1": "WSL",
                "isFile": true,
                "link": "linux/wsl.md",
                "name": "wsl",
                "text": "wsl",
              },
            ],
            "group": undefined,
            "isFile": false,
            "link": "linux",
            "name": "linux",
            "text": "linux",
          },
        ]
      `)
  })

  describe('参与用户配置', () => {
    const list = paths.slice(0, 2)

    it('使用文件 H1 标题', () => {
      expect(setDataFormat(cwd, list, { useH1Title: true }))
        .toMatchInlineSnapshot(`
          [
            {
              "children": [
                {
                  "children": [],
                  "collapsed": true,
                  "h1": "web",
                  "isFile": true,
                  "link": "web/index.md",
                  "name": "index",
                  "text": "Web Title",
                  "title": "Web Title",
                },
                {
                  "children": [],
                  "h1": "js",
                  "isFile": true,
                  "link": "web/js.md",
                  "name": "js",
                  "text": "js",
                },
              ],
              "collapsed": true,
              "group": undefined,
              "isFile": false,
              "link": "web",
              "name": "web",
              "text": "web",
            },
          ]
        `)
    })

    it('设置 Title Mode', () => {
      expect(setDataFormat(cwd, list, { title: { mode: 'titlecase' } }))
        .toMatchInlineSnapshot(`
          [
            {
              "children": [
                {
                  "children": [],
                  "collapsed": true,
                  "h1": "web",
                  "isFile": true,
                  "link": "web/index.md",
                  "name": "index",
                  "text": "Web Title",
                  "title": "Web Title",
                },
                {
                  "children": [],
                  "h1": "js",
                  "isFile": true,
                  "link": "web/js.md",
                  "name": "js",
                  "text": "js",
                },
              ],
              "collapsed": true,
              "group": undefined,
              "isFile": false,
              "link": "web",
              "name": "web",
              "text": "Web",
            },
          ]
        `)
    })

    it('设置 Title Map', () => {
      expect(setDataFormat(cwd, ['web/css/index.md'], { title: { map: { 'web/css/': '🎉CSS World🎉' } } }))
        .toMatchInlineSnapshot(`
          [
            {
              "children": [
                {
                  "children": [
                    {
                      "children": [],
                      "h1": "css",
                      "hide": true,
                      "isFile": true,
                      "link": "web/css/index.md",
                      "name": "index",
                      "text": "index",
                    },
                  ],
                  "group": undefined,
                  "isFile": false,
                  "link": "web/css",
                  "name": "css",
                  "text": "🎉CSS World🎉",
                },
              ],
              "group": undefined,
              "isFile": false,
              "link": "web",
              "name": "web",
              "text": "web",
            },
          ]
        `)
    })

    it('设置排序', () => {
      expect(setDataFormat(cwd, list, { sort: (a, b) => a.text.localeCompare(b.text) }))
        .toMatchInlineSnapshot(`
          [
            {
              "children": [
                {
                  "children": [],
                  "h1": "js",
                  "isFile": true,
                  "link": "web/js.md",
                  "name": "js",
                  "text": "js",
                },
                {
                  "children": [],
                  "collapsed": true,
                  "h1": "web",
                  "isFile": true,
                  "link": "web/index.md",
                  "name": "index",
                  "text": "Web Title",
                  "title": "Web Title",
                },
              ],
              "collapsed": true,
              "group": undefined,
              "isFile": false,
              "link": "web",
              "name": "web",
              "text": "web",
            },
          ]
        `)
    })
  })

  describe('文章内配置', () => {
    it('隐藏文件', () => {
      expect(setDataFormat(cwd, ['web/hide.md'], {})).toMatchInlineSnapshot(`
        [
          {
            "children": [
              {
                "children": [],
                "h1": "文章被隐藏",
                "hide": true,
                "isFile": true,
                "link": "web/hide.md",
                "name": "hide",
                "text": "hide",
              },
            ],
            "group": undefined,
            "isFile": false,
            "link": "web",
            "name": "web",
            "text": "web",
          },
        ]
      `)
    })

    it('文章分组', () => {
      expect(setDataFormat(cwd, ['web/js.md', 'web/vue/index.md', 'web/vue/v-if.md'], {}))
        .toMatchInlineSnapshot(`
          [
            {
              "children": [
                {
                  "children": [
                    {
                      "children": [],
                      "collapsed": true,
                      "group": true,
                      "h1": "Vue",
                      "isFile": true,
                      "link": "web/vue/index.md",
                      "name": "index",
                      "text": "index",
                    },
                    {
                      "children": [],
                      "h1": "v-if",
                      "isFile": true,
                      "link": "web/vue/v-if.md",
                      "name": "v-if",
                      "text": "v-if",
                    },
                  ],
                  "collapsed": true,
                  "group": true,
                  "isFile": false,
                  "link": "web/vue",
                  "name": "vue",
                  "text": "vue",
                },
                {
                  "children": [],
                  "h1": "js",
                  "isFile": true,
                  "link": "web/js.md",
                  "name": "js",
                  "text": "js",
                },
              ],
              "group": undefined,
              "isFile": false,
              "link": "web",
              "name": "web",
              "text": "web",
            },
          ]
        `)
    })

    describe('可折叠侧边栏组', () => {
      describe('一级分组可折叠', () => {
        it('一级分组可折叠', () => {
          expect(setDataFormat(cwd, ['web/index.md', 'web/vue/index.md'], {}))
            .toMatchInlineSnapshot(`
              [
                {
                  "children": [
                    {
                      "children": [],
                      "collapsed": true,
                      "h1": "web",
                      "isFile": true,
                      "link": "web/index.md",
                      "name": "index",
                      "text": "Web Title",
                      "title": "Web Title",
                    },
                  ],
                  "collapsed": true,
                  "group": undefined,
                  "isFile": false,
                  "link": "web",
                  "name": "web",
                  "text": "web",
                },
                {
                  "children": [
                    {
                      "children": [],
                      "collapsed": true,
                      "group": true,
                      "h1": "Vue",
                      "isFile": true,
                      "link": "web/vue/index.md",
                      "name": "index",
                      "text": "index",
                    },
                  ],
                  "collapsed": true,
                  "group": true,
                  "isFile": false,
                  "link": "web/vue",
                  "name": "vue",
                  "text": "vue",
                },
              ]
            `)
        })

        it('bug: index 之前解析文章', () => {
          expect(setDataFormat(cwd, ['web/js.md', 'web/index.md'], {}))
            .toMatchInlineSnapshot(`
              [
                {
                  "children": [
                    {
                      "children": [],
                      "collapsed": true,
                      "h1": "web",
                      "isFile": true,
                      "link": "web/index.md",
                      "name": "index",
                      "text": "Web Title",
                      "title": "Web Title",
                    },
                    {
                      "children": [],
                      "h1": "js",
                      "isFile": true,
                      "link": "web/js.md",
                      "name": "js",
                      "text": "js",
                    },
                  ],
                  "collapsed": true,
                  "group": undefined,
                  "isFile": false,
                  "link": "web",
                  "name": "web",
                  "text": "web",
                },
              ]
            `)
        })
      })

      it.todo('下级分组可折叠', () => {
        expect(setDataFormat(cwd, ['web/index.md', 'web/css/index.md', 'web/css/background.md'], {}))
          .toMatchInlineSnapshot()
      })
    })
  })
})

describe('生成侧边栏', () => {
  it('生成默认配置', () => {
    expect(generateSidebar(setDataFormat(cwd, paths, {
      useH1Title: true,
      title: { mode: 'uppercase' },
    })))
      .toMatchInlineSnapshot(`
        {
          "/linux/": [
            {
              "items": [
                {
                  "link": "linux/index.md",
                  "text": "Linux",
                },
                {
                  "link": "linux/wsl.md",
                  "text": "WSL",
                },
              ],
              "text": "LINUX",
            },
          ],
          "/web/": [
            {
              "collapsed": true,
              "items": [
                {
                  "link": "web/index.md",
                  "text": "Web Title",
                },
                {
                  "items": [
                    {
                      "link": "web/css/background.md",
                      "text": "background",
                    },
                  ],
                  "text": "CSS",
                },
                {
                  "link": "web/js.md",
                  "text": "js",
                },
              ],
              "text": "WEB",
            },
          ],
        }
      `)
  })

  describe('参与文件配置', () => {
    it('隐藏文件', () => {
      expect(generateSidebar(setDataFormat(cwd, ['web/hide.md'], {})))
        .toMatchInlineSnapshot(`
          {
            "/web/": [
              {
                "items": [],
                "text": "web",
              },
            ],
          }
        `)
    })

    it('文章分组', () => {
      expect(generateSidebar(setDataFormat(cwd, ['web/js.md', 'web/vue/index.md'], {})))
        .toMatchInlineSnapshot(`
          {
            "/web/": [
              {
                "items": [
                  {
                    "collapsed": true,
                    "items": [
                      {
                        "link": "web/vue/index.md",
                        "text": "index",
                      },
                    ],
                    "text": "vue",
                  },
                  {
                    "link": "web/js.md",
                    "text": "js",
                  },
                ],
                "text": "web",
              },
            ],
          }
        `)
    })

    it('可折叠侧边栏组', () => {
      expect(generateSidebar(setDataFormat(cwd, ['web/index.md', 'web/vue/index.md', 'web/css/background.md'], {})))
        .toMatchInlineSnapshot(`
          {
            "/web/": [
              {
                "collapsed": true,
                "items": [
                  {
                    "link": "web/index.md",
                    "text": "Web Title",
                  },
                  {
                    "items": [
                      {
                        "link": "web/css/background.md",
                        "text": "background",
                      },
                    ],
                    "text": "css",
                  },
                ],
                "text": "web",
              },
              {
                "collapsed": true,
                "items": [
                  {
                    "link": "web/vue/index.md",
                    "text": "index",
                  },
                ],
                "text": "vue",
              },
            ],
          }
        `)
    })
  })
})
