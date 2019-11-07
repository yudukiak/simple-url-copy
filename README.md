Simple URL Copy
=====

![demo](https://github.com/master/simple-url-copy/blob/master/assets/how_to_use.gif)

URLをコピーするのに使えるChromeの拡張です。

## インストール

## 特徴
- Simple and Fast
- MarkdownやBacklog、Textileなどのフォーマットに対応しています
- Optionから自分だけのフォーマットを登録することができます
- 不要なフォーマットは削除、もしくは非表示にすることができます
- 登録されたフォーマットは自由に並び替えができます
- 拡張をクリックしたとき、一番上に登録されているフォーマットでコピーされます
- ショートカットは<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>K</kbd>で簡単にコピーできます  
  Macの場合は<kbd>MacCtrl</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd>らしいです（未確認）

## 対応フォーマット
| ラベル                                    | スタイル             | 備考         |
| ----------------------------------------- | -------------------- | ------------ |
| Simple (Title URL)                        | `{title} {url}`      |              |
| Simple /w Breakline                       | `{title}\n{url}`     |              |
| Bold /w Breakline                         | `**{title}**\n{url}` | 初期は非表示 |
| URL Only                                  | `{url}`              |              |
| Title Only                                | `{title}`            | 初期は非表示 |
| Markdown Style                            | `[{title}]({url})`   |              |
| [Backlog](https://www.backlog.com/) Style | `[[{title}:{url}]]`  |              |
| [Textile](https://redmine.jp/) Style      | `"{title}":{url}`    | 初期は非表示 |
| [Org mode](https://orgmode.org/) Style    | `[[{url}][{title}]]` | 初期は非表示 |

### フォーマットの追加方法
- 「Simple URL Copy」のウィンドウ内にある「Option」、もしくはアイコン右クリックから表示される「オプション」をクリックすることでOptionを開けます  
  ![option](https://github.com/master/simple-url-copy/blob/master/assets/how_to_option.jpg)
- 「RESET」ボタン  
  フォーマットの設定を初期化します。初期化後、設定が保存されますのでご注意ください。
- 「ADD」ボタン  
  フォーマットの枠を1つ追加できます。
- 「SAVE」ボタン  
  フォーマットの設定を保存できます。何かしらの変更があった場合、青色のボタンになります。
- その他  
  フォーマットの並び替えは左側の十字をドラッグ＆ドロップで行えます。  
  enabledにチェックが入っていると有効、使用可能になります。  
  不要なフォーマットは右側の×印から行えます。

## YouTube
- 使い方  
  [![YouTube](https://img.youtube.com/vi/51qcKcOe-ls/mqdefault.jpg)](https://www.youtube.com/watch?v=51qcKcOe-ls)
- Option  
  [![YouTube](https://img.youtube.com/vi/Gsq4jFGd-BY/mqdefault.jpg)](https://www.youtube.com/watch?v=Gsq4jFGd-BY)

## forked from
- [ikedaosushi/simple-url-copy](https://github.com/ikedaosushi/simple-url-copy)
- [MISONLN41/simple-url-copy](https://github.com/MISONLN41/simple-url-copy)