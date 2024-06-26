const copyText = text => {
  let copyTextArea = document.querySelector("#copy-textarea");
  copyTextArea.textContent = text;
  copyTextArea.select();
  document.execCommand('copy');
}

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

const showCopied = _ => {
  let copied = document.querySelector("#copied");
  copied.classList.remove("fadeout");
  setTimeout(_ => copied.classList.add("fadeout"), 300);
}

const copyUrl = menuType => {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    // DevToolsのエラー対策
    if (tabs[0] == null) {
      document.querySelector("#DevToolsOpened").classList.remove("d-none");
      return;
    } else {
      document.querySelector("#DevToolsOpened").classList.add("d-none");
    }
    let url = tabs[0].url;
    const title = tabs[0].title;

    // Process AmazonURL
    url = (/^https?:\/\//.test(url)) ? extractAmazonUrl(url) : url

    // 選択中のテキストを取得
    chrome.tabs.sendMessage(tabs[0].id, { command: 'getSelection' })
      .then(selectionText => {
        const text = menuType
          .replace(/\\n/g, '\n')
          .replace(/\\r/g, '\r')
          .replace(/\\f/g, '\f')
          .replace(/\\t/g, '\t')
          .replace(/{title}/g, title)
          .replace(/{url}/g, url)
          .replace(/{copy}/g, selectionText)
        copyText(text)
        showCopied()
      })
      .catch( error => {
        // ストアや設定画面などエラーを発するページの処理
        // 1. Could not establish connection. Receiving end does not exist.
        // 2. Error handling response: TypeError: Failed to construct 'URL': Invalid URL
        const text = menuType
          .replace(/\\n/g, '\n')
          .replace(/\\r/g, '\r')
          .replace(/\\f/g, '\f')
          .replace(/\\t/g, '\t')
          .replace(/{title}/g, title)
          .replace(/{url}/g, url)
          .replace(/{copy}/g, '')
        copyText(text)
        showCopied()
        console.log('error:', error)
      })
  })
}

const onInit = _ => {
  chrome.storage.sync.get(value => {
    const valueData = value['simpleUrlCopy'];
    // ローカル上にしかない場合
    if (valueData == null || valueData.length === 0) {
      chrome.storage.local.get(value => {
        const localValueData = value['simpleUrlCopy'];
        const localSettingAry = getSettingAry(localValueData);
        const localMenuType = localSettingAry[0][1];
        copyUrl(localMenuType);
        // オンライン上に保存する
        chrome.storage.sync.set({'simpleUrlCopy': localSettingAry})
      });
    }
    // オンライン上にある場合
    else {
      const settingAry = getSettingAry(valueData);
      const menuType = settingAry[0][1];
      copyUrl(menuType);
    }
  })
}

const onClickCopyMenu = elm => {
  const menuType = elm.dataset.text;
  copyUrl(menuType);
}

document.addEventListener("DOMContentLoaded", onInit);

const escapeHtml = str => {
  const rep = str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
  return rep;
}
const getSettingAry = ary => {
  if (ary == null || ary.length === 0) return DEFAULT_SETTING;
  return ary;
}
const getButtonHtml = ary => {
  const buttonHtml = ary.map(val => {
    const label = escapeHtml(val[0]);
    const text = escapeHtml(val[1]);
    const checked = (val[2]) ? 'checked' : '';
    const html = BUTTON_HTML.replace(/{label}/g, label).replace(/{text}/g, text);
    if (checked) return html;
    return '';
  }).join('');
  return buttonHtml;
}
chrome.storage.sync.get(value => {
  const valueData = value['simpleUrlCopy'];
  // ローカル上にしかない場合
  if (valueData == null || valueData.length === 0) {
    chrome.storage.local.get(localValue => {
      const localValueData = localValue['simpleUrlCopy'];
      const localSettingAry = getSettingAry(localValueData);
      const buttonHtml = getButtonHtml(localSettingAry);
      const menuElement = document.querySelector('#menu');
      menuElement.innerHTML = buttonHtml;
      // オンライン上に保存する
      chrome.storage.sync.set({'simpleUrlCopy': localSettingAry})
    });
  }
  // オンライン上にある場合
  else {
    const settingAry = getSettingAry(valueData);
    const buttonHtml = getButtonHtml(settingAry);
    const menuElement = document.querySelector('#menu');
    menuElement.innerHTML = buttonHtml;
  }
});
document.querySelector('#menu').addEventListener('click', e => {
  const target = e.target || e.srcElement;
  if (target.localName === 'button') onClickCopyMenu(target);
});
document.getElementById('setting').onclick = _ => {
  chrome.runtime.openOptionsPage()
};