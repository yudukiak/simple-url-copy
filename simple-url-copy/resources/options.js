const escapeHtml = str => {
  const rep = str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
  return rep;
}
const getTbodyHtml = ary => {
  const tdHtml = ary.map(val => {
    const label = escapeHtml(val[0]);
    const text = escapeHtml(val[1]);
    const key = val[3] ? val[3] : '';
    const checked = (val[2]) ? 'checked' : '';
    const trClassName = (val[2]) ? '' : 'unchecked';
    const html = TD_HTML
      .replace(/{label}/g, label)
      .replace(/{text}/g, text)
      .replace(/{checked}/g, checked)
      .replace(/{key}/g, key)
      .replace(/{trClassName}/g, trClassName);
    return html;
  }).join('');
  return `<tbody>${TH_HTML}</tbody><tbody>${tdHtml}</tbody>`;
}
const setMakeButtonColor = color => {
  const colorName = (color == null || color === '') ? 'secondary' : color;
  document.getElementById('save').className = `${colorName}-button`;
}
const setSortable = _ => {
  const sortable = Sortable.create(document.querySelector('#menu > table > tbody:last-child'), {
    group: 'list',
    handle: '[data-list="move"]',
    animation: 100,
    onUpdate: () => setMakeButtonColor('primary')
  });
}

loadSettingsArray(settingAry => {
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
    confirmButtonText: '初期化します',
    onAfterClose: () => document.activeElement.blur()
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
  const tbodyElement = document.querySelector('#menu > table > tbody:last-child');
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
    const key = elm.querySelector('[name="key"]').value;
    return [label, text, checked, key];
  }).filter(v => v);
  Swal.fire({
    title: '設定を保存します',
    text: 'よろしいですか？',
    showCancelButton: true,
    confirmButtonText: '保存します',
    onAfterClose: () => {
      document.activeElement.blur();
    }
  }).then(result => {
    if (!result.value) return;
    saveSettings(tableRowsAry, () => {
      setMakeButtonColor('');
      Swal.fire({
        title: '設定の保存が完了しました',
        onAfterClose: () => document.activeElement.blur()
      });
    });
  });
};
document.getElementById('export').onclick = _ => {
  loadSettingsArray(settingAry => {
    const textarea = document.createElement('textarea');
    textarea.textContent = JSON.stringify(settingAry);
    const body = document.getElementsByTagName('body')[0];
    body.appendChild(textarea);
    textarea.select();
    const res = document.execCommand('copy');
    body.removeChild(textarea);
    if (!res) return;
    Swal.fire({
      title: '設定のコピーをしました',
      onAfterClose: () => document.activeElement.blur()
    });
  });
};
document.getElementById('import').onclick = _ => {
  Swal.fire({
    title: '設定をインポートします',
    text: 'JSONを記入してください',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off',
      autocorrect: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'インポートする',
    preConfirm: (json) => {
      try {
        const ary = JSON.parse(json);
        if (toString.call(ary) === '[object Array]') {
          if (ary.length > 0 && ary[0].length === 4) {
            return ary;
          } else {
            Swal.showValidationMessage('JSONの形式が異なります');
          }
        } else {
          Swal.showValidationMessage('JSONを入力してください');
        }
      } catch (e) {
        const h = escapeHtml(String(e));
        Swal.showValidationMessage(`JSONを入力してください<br>${h}`);
      }
    },
    allowOutsideClick: () => !Swal.isLoading(),
    onAfterClose: () => document.activeElement.blur()
  }).then(result => {
    if (!result.value) return;
    const valueData = result.value;
    const settingAry = getSettingAry(valueData);
    const tbodyHtml = getTbodyHtml(settingAry);
    const tableElement = document.querySelector('#menu > table');
    tableElement.innerHTML = tbodyHtml;
    setSortable();
    setMakeButtonColor('primary');
  });
};
document.querySelector('#menu > table').addEventListener('change', e => {
  const target = e.target || e.srcElement;
  if (target.localName === 'input') setMakeButtonColor('primary');
  if (target.type === 'checkbox' && !target.checked) {
    target.parentNode.parentNode.className = 'unchecked';
  } else if (target.type === 'checkbox' && target.checked) {
    target.parentNode.parentNode.className = '';
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
      confirmButtonText: '削除します',
    }).then(result => {
      if (!result.value) return;
      tr.parentNode.removeChild(tr);
      setMakeButtonColor('primary');
    });
  }
});
