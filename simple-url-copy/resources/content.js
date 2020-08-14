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

loadSetting(settings => {
  for (let setting of settings) {
    Mousetrap.bind(setting.key, () => {
      const text = copyUrl(setting.format);
      tooltip.show(`Copied!: ${text}`);
    });
  }
});
