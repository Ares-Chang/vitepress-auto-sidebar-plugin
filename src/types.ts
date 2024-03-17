import type { SiteConfig } from 'vitepress'

export interface Options {
  /**
   * glob 匹配表达式
   *
   * 会匹配 [srcDir] 目录下, 除 [srcExclude] 外满足表达式的 md 文件
   *
   * 默认：**.md
   */
  pattern?: string | string[]
  /**
   * 页面的目录, 相对于项目根目录
   *
   * default: vitepress.srcDir || ./
   */
  srcDir?: string
  /**
   * 排除扫描的文件
   *
   * default: vitepress.srcExclude || []
   */
  ignoreList?: string[]
}

export interface UserConfig {
  vitepress: SiteConfig
}
