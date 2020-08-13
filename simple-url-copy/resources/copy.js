const copyUrl = (format) => {
  const text = formatText(format,document.title,document.URL);
  copyToClipBoard(text);
  return text;
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
