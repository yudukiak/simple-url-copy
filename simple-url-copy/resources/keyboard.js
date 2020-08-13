function keyCodeToString(key, ctrlKey, shiftKey, altKey, metaKey)
{
    var str = '';

    str += ctrlKey  ? 'CTRL + '    : '';
    str += shiftKey ? 'SHIFT + '   : '';
    str += altKey   ? 'ALT + '     : '';
    str += metaKey  ? 'COMMAND + ' : '';

    var special_keys = getSpecialKeys();

    if (isSpecialKey(key))
	str += special_keys[key];
    else
	str += String.fromCharCode(key);
    
    return str;
}

function getSpecialKeys()
{
    var special_keys = {};

    special_keys[46] = 'Del';
    for (var i = 0; i < 12; i++)
	special_keys[i + 112] = 'F' + (i + 1);

    return special_keys;
}

function isEscape(key)
{
    return key === 27;
}

function isReturn(key)
{
    return key === 13;
}

function isAlpha(key)
{
    return (65 <= key) && (key <= 90);
}

function isNumber(key)
{
    return (48 <= key) && (key <= 57);
}

function isAlphaNum(key)
{
    return isAlpha(key) || isNumber(key);
}

function isSpecialKey(key)
{
    var special_keys = getSpecialKeys();
    return !!(special_keys[key]);
}
