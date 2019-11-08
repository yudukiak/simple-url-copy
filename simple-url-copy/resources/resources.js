const DEFAULT_SETTING = [
  ["Simple (Title URL)", "{title} {url}", true],
  ["Simple /w Breakline", "{title}\\n{url}", true],
  ["Bold /w Breakline", "**{title}**\\n{url}", false],
  ["URL Only", "{url}", true],
  ["Title Only", "{title}", false],
  ["Markdown Style", "[{title}]({url})", true],
  ["Backlog Style", "[[{title}:{url}]]", true],
  ["Textile Style", "\"{title}\":{url}", false],
  ["Org mode Style", "[[{url}][{title}]]", false],
];

const AMAZON_HOST = 'www.amazon.co.jp';

const TH_HTML =
  '<tr>' +
  '<th></th>' +
  '<th>label</th>' +
  '<th>text</th>' +
  '<th>enabled</th>' +
  '<th>delete</th>' +
  '</tr>';

const TD_HTML =
  '<tr class="{trClassName}">' +
  '<td data-list="move"><svg viewBox="0 0 512 512"><path d="M512 256l-114-74v42H288V114h42L256 0l-74 114h42v110H114v-42L0 256l114 74v-42h110v110h-42l74 114 74-114h-42V288h110v42z" /></svg></td>' +
  '<td><input type="text" name="label" value="{label}"></td>' +
  '<td><input type="text" name="text" value="{text}"></td>' +
  '<td><input type="checkbox" name="enabled" {checked}></td>' +
  '<td data-list="delete"><svg viewBox="0 0 512 512"><path d="M512 71L441 0 256 185 71 0 0 71l185 185L0 441l71 71 185-185 185 185 71-71-185-185z" /></svg></td>' +
  '</tr>';

const BUTTON_HTML = '<button class="primary-button bettercopy-menu" data-text="{text}">{label}</button>';
