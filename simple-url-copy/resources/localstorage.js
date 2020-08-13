function getShortcuts()
{
  // TODO: load
  const s = DEFAULT_SETTING.map(config => {
    return {
      enable: `${config[2]}`,
      format: config[1],
      shortener: 'goo.gl',
      key: config[3]
    };
  });
  console.log(s);
  return s;
}

const getShortcutByKey = (keystr) => getShortcuts().find(s => s.key==keystr && s.enable=='true');

const getEnabledFormatByKey = (keystr) => {
  const shortcut = getShortcutByKey(keystr);
  return shortcut ? shortcut.format : false;
}
