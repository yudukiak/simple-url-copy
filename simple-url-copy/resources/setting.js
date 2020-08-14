const getSettingAry = ary => (ary == null || ary.length === 0) ? DEFAULT_SETTING : ary;

const loadSettingsArray = (callback) => {
  chrome.storage.sync.get(value => { callback(getSettingAry(value['customUrlCopySettings'])) });
}

const loadSettings = (callback) => {
  loadSettingsArray(value => {
    const s = value.map(config => {
      return {
        title: config[0],
        format: config[1],
        enable: config[2],
        key: config[3]
      };
    });
    callback(s);
  });
}

const saveSettings = (value, callback) => {
    chrome.storage.sync.set({'customUrlCopySettings': value}, callback);
}

const getSettingByKey = (keystr, callback) => {
  loadSettings(settings => {
    callback(settings.find(s => s.key==keystr && s.enable))
  });
}
