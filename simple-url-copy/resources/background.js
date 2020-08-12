function copyToClipBoard(text)
{
    var input = document.getElementById('content');
    if (!input)
        return;

    input.value = text;
    input.select();

    document.execCommand('copy', false, null);
}

function onRequest(request, sender, sendResponse)
{
  console.log('onRequest');
    var format = getEnabledFormatByKey(request.keystr);
    if (!format) {
        sendResponse({});
        return;
    }

    sendResponse({});

    function sendRequest(request) {
        chrome.tabs.sendRequest(sender.tab.id, request);
    }

    var shortener = getShortenerByKey(request.keystr);
    parseFormat(
        format,
        request.values,
        sender.tab,
        sendRequest,
        function (text) {
            copyToClipBoard(text);
            notify(text + ' copied to clipboard', sendRequest);
        }
    );
}

const formatByCommand = (command) => {
  switch(command) {
    case 'scrapbox_style_copy': return '[${title} ${URL}]';
    case 'markdown_style_copy': return '[${title}](${URL})';
    case 'breaked_style_copy': return '${title}\n${URL}';
    default: return '${title} ${URL}';
  }
};

const onCommand = (command) => {
  console.log(`onCommand ${command}`);
  let format = formatByCommand(command);

  // sendResponse({});

  // function sendRequest(request) {
  //     chrome.tabs.sendRequest(sender.tab.id, request);
  // }

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

function init()
{
    // chrome.extension.onRequest.addListener(onRequest);
    chrome.commands.onCommand.addListener(onCommand);
}

// do initialization once the DOM has fully loaded
document.addEventListener('DOMContentLoaded', function () {
    console.log('Init Copy');
    init();
});
