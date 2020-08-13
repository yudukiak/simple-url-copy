const copyUrl = (format) => {
  const url = document.URL;
  const title = document.title;
  // Process AmazonURL
  // url = extractAmazonUrl(url);

  const text = format
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\f/g, '\f')
    .replace(/\\t/g, '\t')
    .replace(/{title}/g, title)
    .replace(/{url}/g, url);
  copyToClipBoard(text);
  // copyText(text);
  // showCopied();
};

function copyToClipBoard(text)
{
    var input=document.createElement("textarea");
    input.style.height=0;
    document.body.appendChild(input);
    input.value = text;
    input.select();
    document.execCommand('copy', false, null);
    document.body.removeChild(input);
}

const formatByCommand = (command) => {
  switch(command) {
    case 'scrapbox_style_copy' : return '[${title} ${URL}]';;
    case 'markdown_style_copy': return '[${title}](${URL})';
    case 'breaked_style_copy': return '${title}\n${URL}';
    default: return '${title} ${URL}';
  }
};

function parseFormat(format, values, tab, sendRequest, callback)
{
    var re;
    for (var i in values) {
        re = new RegExp('\\$\\{' + i + '\\}', 'ig');
        format = format.replace(re, escape(values[i]));
    }

    re = new RegExp('\\$\\{' + 'n' + '\\}', 'ig');
    format = format.replace(re, '\n');

    callback(unescape(format));
}

const execCopy = (format) => {
  // console.log(`onCommand ${command}`);
  // let format = formatByCommand(command);
  //
  const text = '';
  const values = {
            url: document.URL,
            title: document.title,
            text: text
        };

  parseFormat(
      format,
      values,
      null,//sender.tab,
      null,//sendRequest,
      function (text) {
          copyToClipBoard(text);
          // notify(text + ' copied to clipboard', sendRequest);
          console.log(text + ' copied to clipboard');
      }
  );
};
