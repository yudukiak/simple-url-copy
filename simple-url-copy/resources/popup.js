const copyText = text => {
  let copyTextArea = document.querySelector("#copy-textarea");
  copyTextArea.textContent = text;
  copyTextArea.select();
  document.execCommand('copy');
}

const showCopied = _ => {
  let copied = document.querySelector("#copied");
  copied.classList.remove("fadeout");
  setTimeout(_ => copied.classList.add("fadeout"), 300);
}

const copyUrl = menuType => {
  chrome.tabs.query({
    active: true,
    currentWindow: true,
    lastFocusedWindow: true
  }, function(tabs) {
    // DevToolsのエラー対策
    if (tabs[0] == null) {
      document.querySelector("#DevToolsOpened").classList.remove("d-none");
      return;
    } else {
      document.querySelector("#DevToolsOpened").classList.add("d-none");
    }
    copyText(formatText(menuType,tabs[0].title,tabs[0].url));
    showCopied();
  })
}

const onInit = _ => {
  loadSettings(settings => {
    copyUrl(settings[0].format);
  });
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
loadSettingsArray(settingAry => {
  document.querySelector('#menu').innerHTML = getButtonHtml(settingAry);
});
document.querySelector('#menu').addEventListener('click', e => {
  const target = e.target || e.srcElement;
  if (target.localName === 'button') onClickCopyMenu(target);
});
document.getElementById('setting').onclick = _ => {
  chrome.runtime.openOptionsPage()
};
