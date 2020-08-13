const copyUrl = (format) => {
  copyToClipBoard(formatText(format,document.title,document.URL));
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
