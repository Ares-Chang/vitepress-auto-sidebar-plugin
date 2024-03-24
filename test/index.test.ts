import { describe, expect, it } from 'vitest'
import { generateSidebar } from '../src'

describe('生成侧边栏', () => {
  it('返回侧边栏组', () => {
    const paths = [
      'web/index.md',
      'web/js.md',
      'web/css/index.md',
      'web/css/background.md',
      'linux/index.md',
      'linux/wsl.md',
    ]
    expect(generateSidebar('./playground', paths, {})).toMatchInlineSnapshot(`
      {
        "/linux/": [
          {
            "items": [
              {
                "link": "/linux/index",
                "text": "Linux",
              },
              {
                "link": "/linux/wsl",
                "text": "WSL",
              },
            ],
            "text": "linux",
          },
        ],
        "/web/": [
          {
            "items": [
              {
                "link": "/web/index",
                "text": "Web Title",
              },
              {
                "link": "/web/js",
                "text": "js",
              },
              {
                "items": [
                  {
                    "link": "/web/css/background",
                    "text": "background",
                  },
                ],
                "text": "css",
              },
            ],
            "text": "web",
          },
        ],
      }
    `)
  })
})
