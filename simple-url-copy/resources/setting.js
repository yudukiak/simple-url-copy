const getSettingAry = ary => {
  if (ary == null || ary.length === 0) return DEFAULT_SETTING;
  return ary;
}
const loadSetting = (callback) => {
  chrome.storage.local.get(value => {
    callback(getSettingAry(value['simpleUrlCopy']));
  });
}
