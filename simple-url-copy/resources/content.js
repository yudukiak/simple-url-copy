const tooltip = {
    element: null,
    timer: null,

    create: function () {
      this.element = document.createElement('div');
      this.element.setAttribute('style', 'position: fixed; top: 5px; left: 5px; text-align: center; min-height: 1.5em; z-index: 9999;');

      var div = document.createElement('div');
      div.setAttribute('style', 'padding: 2px 15px; margin-top: 0; background: gray; border-color: white; color: white; text-align: center; border-left: 1px solid; border-right: 1px solid; border-bottom: 1px solid; border-top: 0; border-radius: 0 0 5px 5px; display: inline-block; line-height: 100%;');

      this.element.appendChild(div);
      document.body.appendChild(this.element);
    },

    show: function (text) {
      if (!this.element) this.create();
      this.element.firstChild.innerText = text;
      clearTimeout(this.timer);
      this.visible = true;
      this.element.style.transition = '0s';
      this.element.style.opacity = 1;
      this.timer = setTimeout(() => tooltip.hide(), 600);
    },

    hide: function () {
      this.element.style.transition = '0.8s';
      this.element.style.opacity = 0;
      this.visible = false;
    }
};

var cmdKeys = {}; // keys pushed with command key
function isValidElem(elem)
{
    var invalid_elems = [
        'input',
        'textarea',
        'select',
        'object'
    ];

    var name = elem.tagName.toLowerCase();
    for (var i = 0; i < invalid_elems.length; i++)
        if (name == invalid_elems[i])
            return false;
    return true;
}

function keyDownEventListener(e)
{
    if (tooltip.visible || !isValidElem(e.target))
        return;

    var key = e.which;

    if (!(isAlphaNum(key) || isSpecialKey(key)))
        return;

    // e.metaKey is correct only on keydown event
    if (e.metaKey && !cmdKeys.which) {
        cmdKeys.which = key;
        cmdKeys.ctrlKey = e.ctrlKey;
        cmdKeys.shiftKey = e.shiftKey;
        cmdKeys.altKey = e.altKey;
        cmdKeys.metaKey = true;
    }
}

function keyUpEventListener(e)
{
    if (tooltip.visible || !isValidElem(e.target))
        return;

    var selection = window.getSelection();
    var text = selection ? selection.toString() : '';

    var keys = {
        which: null,
        ctrlKey: null,
        shiftKey: null,
        altKey: null,
        metaKey: null
    };

    if (cmdKeys.which)
        keys = cmdKeys;
    else
        for (var i in keys)
            keys[i] = e[i];

    cmdKeys = {};

    var keystr = keyCodeToString(
        keys.which,
        keys.ctrlKey,
        keys.shiftKey,
        keys.altKey,
        keys.metaKey
    );

    if (text != '')
        if (keystr == 'COMMAND + C' ||
            keystr == 'CTRL + C')
            return;

    console.log(`key: ${keystr}, text: ${text}`);
    getSettingByKey(keystr, setting => {
      if (setting) {
        const text = copyUrl(setting.format);
        tooltip.show(`Copied!: ${text}`);
      }
    });
}
const init = () => {
  window.addEventListener("keydown", keyDownEventListener);
  window.addEventListener("keyup", keyUpEventListener);
};
init();
