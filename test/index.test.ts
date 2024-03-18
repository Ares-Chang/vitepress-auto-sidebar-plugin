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
    expect(generateSidebar(paths)).toEqual({
      '/web/': [
        {
          text: 'web',
          items: [
            {
              text: 'index',
              link: '/web/index',
            },
            {
              text: 'js',
              link: '/web/js',
            },
            {
              text: 'css',
              items: [
                {
                  text: 'index',
                  link: '/web/css/index',
                },
                {
                  text: 'background',
                  link: '/web/css/background',
                },
              ],
            },
          ],
        },
      ],
      '/linux/': [
        {
          text: 'linux',
          items: [
            {
              text: 'index',
              link: '/linux/index',
            },
            {
              text: 'wsl',
              link: '/linux/wsl',
            },
          ],
        },
      ],
    })
  })
})
