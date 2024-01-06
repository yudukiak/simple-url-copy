chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const command = message.command
  // 選択中のテキストを取得
  if (command === 'getSelection') {
    const selectionText = window.getSelection().toString()
    sendResponse(selectionText)
    return selectionText
  }
  // クリップボードに保存
  if (command === 'copyText') {
    navigator.clipboard.writeText(message.text).then(_ => {}, _ => {})
  }
})