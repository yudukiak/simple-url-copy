var tooltip = {
    element: null,
    visible: false,
    timer: null,

    create: function () {
        this.element = document.createElement('div');
        this.element.setAttribute('style', 'position: fixed; top: 5px; left: 5px; text-align: center; min-height: 1.5em; z-index: 9999;');

        var div = document.createElement('div');
        div.setAttribute('style', 'font: bold 13px "Gill Sans", "Gill Sans MT", "Goudy Bookletter 1911", "Linux Libertine O", "Liberation Serif", Candara, serif; padding: 2px 15px; margin-top: 0; background: gray; border-color: white; color: white; text-align: center; border-left: 1px solid; border-right: 1px solid; border-bottom: 1px solid; border-top: 0; border-radius: 0 0 5px 5px; display: inline-block; line-height: 100%;');

        this.element.appendChild(div);
    },

    show: function (time) {
        clearTimeout(this.timer);
        if (!this.visible) {
            this.visible = true;
            document.body.appendChild(this.element);
        }
        this.element.style.opacity = 1;
        this.timer = setTimeout(function () { tooltip.hide(); }, 600);
    },

    hide: function () {
        this.element.style.transition = '0.8s';
        this.element.style.opacity = 0;
        this.visible = false;
    },

    setText: function (text) {
        this.element.firstChild.innerText = text;
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
        tooltip.setText(`Copied!: ${text}`);
        tooltip.show(1500);
      }
    });
}
const init = () => {
  tooltip.create();
  window.addEventListener("keydown", keyDownEventListener);
  window.addEventListener("keyup", keyUpEventListener);
};
init();
