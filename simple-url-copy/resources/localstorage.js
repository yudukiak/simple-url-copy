function getDefaultShortcuts()
{
    return [
	{
	    enable    : 'true',
	    format    : '${title} ${URL}',
	    shortener : 'goo.gl',
	    key       : 'C'
	},
	{
	    enable    : 'true',
	    format    : '<a href="${URL}">${title}</a>',
	    shortener : 'goo.gl',
	    key       : 'V'
	}
    ];
}

function getDefaultShortcut()
{
    var shortcut = getDefaultShortcuts()[0];
    shortcut.enable = 'false';
    return shortcut;
}

function setDefaultShortcuts()
{
    setShortcuts(getDefaultShortcuts());
}

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

function getNumberOfShortcuts()
{
    return Object.keys(getShortcuts()).length;
}

function getShortcutIndexByKey(keystr)
{
    var s = getShortcuts();


    for (var i = 0; i < s.length; i++)
	if (s[i]['key'] == keystr)
	    return i;

    return false;
}

function getShortcutByKey(keystr)
{
    var s = getShortcuts();
    var index = getShortcutIndexByKey(keystr);

    if (index !== false)
	return s[index];
    else
	return false;
}

function getEnabledShortcutIndexByKey(keystr)
{
    var s = getShortcuts();

    for (var i = 0; i < s.length; i++)
	if (s[i]['key'] == keystr && s[i]['enable'] == 'true')
	    return i;

    return false;
}

function getEnabledFormatByKey(keystr)
{
    var index = getEnabledShortcutIndexByKey(keystr);

    if (index !== false)
	return getShortcutItem(index, 'format');
    else
	return false;
}

function getShortenerByKey(keystr)
{
    var index = getEnabledShortcutIndexByKey(keystr);

    if (index !== false)
	return getShortcutItem(index, 'shortener');
    else
	return false;
}

function setShortcuts(shortcuts)
{
    if (!supportsLocalStorage())
	return false;

    localStorage.setItem('shortcuts', JSON.stringify(shortcuts));
}

function getShortcutItem(index, name)
{
    var s = getShortcuts();
    return s[index][name];
}

function setShortcutItem(index, name, value)
{
    var s = getShortcuts();
    s[index][name] = value;
    setShortcuts(s);
}

function addShortcut(index, shortcut)
{
    var s = getShortcuts();
    s.splice(index, 0, shortcut);
    setShortcuts(s);
}

function copyShortcut(srcIndex, destIndex)
{
    var s = getShortcuts();
    var src = s[srcIndex];

    var copy = {};
    for (var i in src)
	copy[i] = src[i];
    copy['enable'] = 'false';

    s.splice(destIndex, 0, copy);
    setShortcuts(s);
}

function moveShortcut(srcIndex, destIndex)
{
    var s = getShortcuts();
    var src = s[srcIndex];

    s.splice(srcIndex, 1);
    s.splice(destIndex, 0, src);
    setShortcuts(s);
}

function deleteShortcut(index)
{
    var s = getShortcuts();
    s.splice(index, 1);
    setShortcuts(s);
}

function getDefaultShortenersSetting()
{
    return {
	'goo.gl': {
	    status: 'noaccess',
	    message: 'No Access Granted',
	    site: 'http://goo.gl/',
	    url: 'https://www.googleapis.com/urlshortener/v1/url',
	    tokens: {}
	}
    };
}

function getShortenersSetting()
{
    var s = localStorage.getItem('shorteners');

    if (s == null)
	s = getDefaultShortenersSetting();
    else
	s = JSON.parse(s);

    return s;
}

function setShortenersSetting(setting)
{
    if (!supportsLocalStorage())
	return false;

    localStorage.setItem('shorteners', JSON.stringify(setting));
}


function getShortenerItem(shortener, name)
{
    var s = getShortenersSetting();

    if (!s[shortener])
	return null;

    return s[shortener][name];
}

function setShortenerItem(shortener, name, value)
{
    var s = getShortenersSetting();

    if (!s[shortener])
	return null;

    s[shortener][name] = value;
    setShortenersSetting(s);
}

function supportsLocalStorage()
{
    try {
	return 'localStorage' in window && window['localStorage'] != null;
    } catch (e) {
	alert('localStorage must be enabled for changing options');
	return false;
    }

    return true;
}

function getDefaultContextMenusSetting()
{
    return {
	enable: 'true',
	format: '${format}'
    };
}

function getContextMenusSetting()
{
    var s = localStorage.getItem('contextMenus');

    if (s == null)
	s = getDefaultContextMenusSetting();
    else
	s = JSON.parse(s);

    return s;
}

function getContextMenusEnabled()
{
    var s = getContextMenusSetting();
    return s.enable;
}

function getContextMenusFormat()
{
    var s = getContextMenusSetting();
    return s.format;
}

function setContextMenusSetting(s)
{
    if (!supportsLocalStorage())
	return false;

    localStorage.setItem('contextMenus', JSON.stringify(s));
}

function setContextMenusEnable(enable)
{
    var s = getContextMenusSetting();
    s.enable = enable;
    setContextMenusSetting(s);
}

function setContextMenusFormat(format)
{
    var s = getContextMenusSetting();
    s.format = format;
    setContextMenusSetting(s);
}

function getDefaultNotificationsSetting()
{
    return {
	style: 'tooltip',
	time: '1.5'
    };
}

function getNotificationsStyles()
{
    return [
	'none', 'tooltip', 'web'
    ];
}

function getNotificationsSetting()
{
    var s = localStorage.getItem('notifications');

    if (s == null)
	s = getDefaultNotificationsSetting();
    else
	s = JSON.parse(s);

    return s;
}

function getNotificationsStyle()
{
    var s = getNotificationsSetting();
    return s['style'];
}

function setNotificationsStyle(style)
{
    var s = getNotificationsSetting();

    s['style'] = style;
    setNotificationsSetting(s);
}

function getNotificationsTime()
{
    var s = getNotificationsSetting();
    return parseFloat(s['time']);
}

function setNotificationsTime(time)
{
    var s = getNotificationsSetting();

    s['time'] = time;
    setNotificationsSetting(s);
}

function setNotificationsSetting(s)
{
    if (!supportsLocalStorage())
	return false;

    localStorage.setItem('notifications', JSON.stringify(s));
}
