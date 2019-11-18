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
const getTbodyHtml = ary => {
  const tdHtml = ary.map(val => {
    const label = escapeHtml(val[0]);
    const text = escapeHtml(val[1]);
    const checked = (val[2]) ? 'checked' : '';
    const trClassName = (val[2]) ? '' : 'unchecked';
    const html = TD_HTML
      .replace(/{label}/g, label)
      .replace(/{text}/g, text)
      .replace(/{checked}/g, checked)
      .replace(/{trClassName}/g, trClassName);
    return html;
  }).join('');
  return `<tbody>${TH_HTML}${tdHtml}</tbody>`;
}
const setMakeButtonColor = color => {
  const colorName = (color == null || color === '') ? 'secondary' : color;
  document.getElementById('save').className = `${colorName}-button`;
}
const setSortable = _ => {
  let sortable = Sortable.create(document.querySelector('#menu > table > tbody'), {
    group: 'list',
    handle: '[data-list="move"]',
    animation: 100,
    onUpdate: () => setMakeButtonColor('primary')
  });
}

chrome.storage.local.get(value => {
  const valueData = value['simpleUrlCopy'];
  const settingAry = getSettingAry(valueData);
  const tbodyHtml = getTbodyHtml(settingAry);
  const tableElement = document.querySelector('#menu > table');
  tableElement.innerHTML = tbodyHtml;
  setSortable();
});

document.getElementById('reset').onclick = _ => {
  Swal.fire({
    title: '設定を初期化します',
    text: 'よろしいですか？',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '初期化します', // Yes, factory reset!
    onAfterClose:  () => {
      document.activeElement.blur();
    }
  }).then(result => {
    if (!result.value) return;
    const settingAry = getSettingAry();
    const tbodyHtml = getTbodyHtml(settingAry);
    const tableElement = document.querySelector('#menu > table');
    tableElement.innerHTML = tbodyHtml;
    setMakeButtonColor('primary');
  });
};
document.getElementById('add').onclick = _ => {
  const tbodyElement = document.querySelector('#menu > table > tbody');
  const html = TD_HTML.replace(/{(label|text|checked)}/g, '').replace(/{trClassName}/g, 'unchecked');
  const dummyElement = document.createElement('tbody');
  dummyElement.innerHTML = html;
  tbodyElement.append(dummyElement.firstElementChild);
  setMakeButtonColor('primary');
};
document.getElementById('save').onclick = _ => {
  const tableRows = document.querySelectorAll('#menu > table > tbody > tr');
  const tableRowsAry = Array.from(tableRows).map(elm => {
    const labelElm = elm.querySelector('[name="label"]');
    if (labelElm == null) return null;
    const label = labelElm.value;
    const text = elm.querySelector('[name="text"]').value;
    const checked = elm.querySelector('[name="enabled"]').checked;
    return [label, text, checked];
  }).filter(v => v);
  Swal.fire({
    title: '設定を保存します',
    text: 'よろしいですか？',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '保存します',
  }).then(result => {
    if (!result.value) return;
    chrome.storage.local.set({
      'simpleUrlCopy': tableRowsAry
    }, () => {
      setMakeButtonColor('');
      Swal.fire({
        title: '設定の保存が完了しました',
        onAfterClose: () => {
          document.activeElement.blur();
        }
      });
    });
  });
};
document.querySelector('#menu > table').addEventListener('change', e => {
  const target = e.target || e.srcElement;
  console.log('target', target.checked);
  if (target.localName === 'input') setMakeButtonColor('primary');
  if (target.type === 'checkbox' && !target.checked) {
    target.parentNode.parentNode.className = 'unchecked';
    console.log('iro', target.parentNode.parentNode);
  } else if (target.type === 'checkbox' && target.checked) {
    target.parentNode.parentNode.className = '';
    console.log('test', target.parentNode.parentNode);
  }
});
document.querySelector('#menu > table').addEventListener('click', e => {
  const target = e.target || e.srcElement;
  const parent = (() => {
    if (target.localName === 'path') return target.parentNode.parentNode;
    if (target.localName === 'svg') return target.parentNode;
    return null;
  })();
  if (parent == null) return;
  if (parent.dataset.list === 'delete') {
    const tr = parent.parentNode;
    const label = tr.querySelector('[name="label"]').value;
    const text = tr.querySelector('[name="text"]').value;
    Swal.fire({
      title: `「${label}」\nを削除します`,
      text: 'よろしいですか？',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '削除します', // Yes, delete it!
    }).then(result => {
      if (!result.value) return;
      tr.parentNode.removeChild(tr);
      setMakeButtonColor('primary');
      //Swal.fire('削除が完了しました');
    });
  }
});
