chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const data = message.data
  if (data === 'getSelection') {
    // 選択中のテキストを取得
    const selectionText = window.getSelection().toString()
    // 返却
    sendResponse(selectionText)
  }
})