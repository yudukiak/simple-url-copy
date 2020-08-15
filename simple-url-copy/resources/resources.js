const DEFAULT_SETTING = [
  ["Simple (Title URL)", "{title} {url}", true, 'ctrl + shift + c'],
  ["Simple /w Breakline", "{title}\\n{url}", true, 'ctrl + shift + alt + c'],
  ["Bold /w Breakline", "**{title}** {url}", false, null],
  ["Title Only", "{title}", false, 'ctrl + shift + t'],
  ["URL Only", "{url}", true, 'ctrl + shift + u'],
  ["Decoded URL Only", "{durl}", false, 'ctrl + shift + d'],
  ["Markdown Style", "[{title}]({url})", true, 'ctrl + shift + m'],
  ["Scrapbox Style", "[{title} {url}]", false, 'ctrl + shift + s'],
  ["Backlog Style", "[[{title}:{url}]]", false, 'ctrl + shift + b'],
  ["Textile Style", "\"{title}\":{url}", false, null],
];

const AMAZON_HOST = 'www.amazon.co.jp';

const TH_HTML =
  '<tr>' +
  '<th></th>' +
  '<th>ラベル</th>' +
  '<th>フォーマット</th>' +
  '<th>有効</th>' +
  '<th>キー</th>' +
  '<th>削除</th>' +
  '</tr>';

const TD_HTML =
  '<tr class="{trClassName}">' +
  '<td data-list="move"><svg viewBox="0 0 512 512"><path d="M512 256l-114-74v42H288V114h42L256 0l-74 114h42v110H114v-42L0 256l114 74v-42h110v110h-42l74 114 74-114h-42V288h110v42z" /></svg></td>' +
  '<td><input type="text" name="label" value="{label}"></td>' +
  '<td><input type="text" name="text" value="{text}"></td>' +
  '<td><input type="checkbox" name="enabled" {checked}></td>' +
  '<td><input type="text" name="key" value="{key}"></td>' +
  '<td data-list="delete"><svg viewBox="0 0 512 512"><path d="M512 71L441 0 256 185 71 0 0 71l185 185L0 441l71 71 185-185 185 185 71-71-185-185z" /></svg></td>' +
  '</tr>';

const BUTTON_HTML = '<button class="primary-button bettercopy-menu" data-text="{text}">{label}</button>';
