const toast = {
    element: null,
    timer: null,

    create: function () {
      this.element = document.createElement('div');
      this.element.classList.add('toast');
      document.body.appendChild(this.element);
    },

    show: function (text) {
      if (!this.element) this.create();
      this.element.innerText = text;
      clearTimeout(this.timer);
      this.element.classList.remove('hide');
      this.timer = setTimeout(() => toast.hide(), 600);
    },

    hide: function () {
      this.element.classList.add('hide');
    }
};

const init = () => {
  loadSettings(settings => {
    for (let setting of settings.filter(s => s.enable && s.key)) {
      hotkeys(setting.key, (e,h) => {
        const text = copyUrl(setting.format);
        toast.show(`Copied!: ${text}`);
      });
    }
  });
};

setTimeout(init, 500);
