
chrome.runtime.onInstalled.addListener(() => {
  // コンテキストメニューを作成
  const parent = chrome.contextMenus.create({
    id: 'SimpleURLCopy',
    title: 'Simple URL Copy [F]',
    contexts: ['all']
  })
  // 設定を元に階層を作成
  const getSettingAry = ary => {
    const DEFAULT_SETTING = [
      ["Simple (Title URL)", "{title} {url}", true],
      ["Simple /w Breakline", "{title}\\n{url}", true],
      ["Bold /w Breakline", "**{title}**\\n{url}", false],
      ["URL Only", "{url}", true],
      ["Title Only", "{title}", false],
      ["Markdown Style", "[{title}]({url})", true],
      ["Backlog Style", "[[{title}:{url}]]", true],
      ["Textile Style", "\"{title}\":{url}", false],
      ["Org mode Style", "[[{url}][{title}]]", false],
    ]
    if (ary == null || ary.length === 0) return DEFAULT_SETTING
    return ary
  }
  chrome.storage.sync.get(value => {
    const valueData = value['simpleUrlCopy']
    const settingAry = getSettingAry(valueData)
    settingAry.forEach(ary => {
      chrome.contextMenus.create({
        parentId: 'SimpleURLCopy',
        id: ary[1], // テンプレート
        title: ary[0], // 名称
        contexts: ['all']
      })
    })
  })
})

// コンテキストメニューの処理
// TODO: 処理の共有化
chrome.contextMenus.onClicked.addListener((info, tab) => {
  const AMAZON_HOST = 'www.amazon.co.jp';
  const menuType = info.menuItemId
  const extractAmazonUrl = rawUrl => {
    const url = new URL(rawUrl)
    if (url.host != AMAZON_HOST) return rawUrl
    const urlOrigin = url.origin
    const urlPathname = url.pathname
    const urlMatch_dp = urlPathname.match(/\/dp\/[A-Za-z0-9]{10}/)
    const urlMatch_gp_product = urlPathname.match(/\/gp\/product\/[A-Za-z0-9]{10}/)
    const urlMatch_gp_aw_d = urlPathname.match(/\/gp\/aw\/d\/[A-Za-z0-9]{10}/)
    const urlMatch_gp_video_detail = urlPathname.match(/\/gp\/video\/detail\/[A-Za-z0-9]{10}/)
    const newUrl =
      (urlMatch_dp) ? `${urlOrigin}${urlMatch_dp[0]}` :
        (urlMatch_gp_product) ? `${urlOrigin}${urlMatch_gp_product[0]}` :
          (urlMatch_gp_aw_d) ? `${urlOrigin}${urlMatch_gp_aw_d[0]}` :
            (urlMatch_gp_video_detail) ? `${urlOrigin}${urlMatch_gp_video_detail[0]}` : rawUrl
    return newUrl
  }
  let url = tab.url;
  const title = tab.title;
  // Process AmazonURL
    url = (!/^https?:\/\//.test(url)) ? extractAmazonUrl(url) : url
  // 設定画面などで発生する Could not establish connection. Receiving end does not exist. の対策
  if (!/^https?:\/\//.test(url)) return null
  // 選択中のテキストを取得
  chrome.tabs.sendMessage(tab.id, { command: 'getSelection' })
    .then(selectionText => {
      const text = menuType
        .replace(/\\n/g, '\n')
        .replace(/\\r/g, '\r')
        .replace(/\\f/g, '\f')
        .replace(/\\t/g, '\t')
        .replace(/{title}/g, title)
        .replace(/{url}/g, url)
        .replace(/{copy}/g, selectionText)
        chrome.tabs.sendMessage(tab.id, {command: 'copyText', text: text})
    })
    .catch( error => console.log('error:', error))
})
