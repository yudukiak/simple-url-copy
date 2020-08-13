const getSettingAry = ary => (ary == null || ary.length === 0) ? DEFAULT_SETTING : ary;

const loadSetting = (callback) => {
  chrome.storage.local.get(value => {
    const s = getSettingAry(value['simpleUrlCopy']).map(config => {
      return {
        enable: `${config[2]}`,
        format: config[1],
        shortener: 'goo.gl',
        key: config[3]
      };
    });
    callback(s);
  });
}

const getSettingByKey = (keystr, callback) => {
  loadSetting(settings => {
    callback(settings.find(s => s.key==keystr && s.enable=='true'))
  });
}
