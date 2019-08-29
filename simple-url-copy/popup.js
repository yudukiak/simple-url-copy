
const AMAZON_HOST = "www.amazon.co.jp";

const copyText = text => {
    let copyTextArea = document.querySelector("#copy-textarea");
    copyTextArea.textContent = text;
    copyTextArea.select();
    document.execCommand('copy');
}

const extractAmazonUrl = rawUrl => {
    const url = new URL(rawUrl);
    if (url.host == AMAZON_HOST && url.pathname.match(/\/dp\/[A-Za-z0-9]/)) {
        newUrl = url.origin + url.pathname.replace(/(^\S+)(\/dp\/[A-Za-z0-9]{10})(.*)/, '$2');
        return newUrl;
    } else {
        return rawUrl;
    }
}

const showCopied = _ => {
    let copied = document.querySelector("#copied");
    copied.classList.remove("fadeout");
    setTimeout(_ => copied.classList.add("fadeout"), 300);
}

const copyUrl = menuType => {
    chrome.tabs.query({ active: true, currentWindow: true, lastFocusedWindow: true }, function (tabs) {
        let url = tabs[0].url;
        const title = tabs[0].title;

        // Process AmazonURL
        url = extractAmazonUrl(url);

        let text;
        switch (menuType) {
            case "markdown":
                text = `[${title}](${url})`
                break;
            case "backlog":
                text = `[[${title}:${url}]]`
                break;
            case "onlyUrl":
                text = `${url}`
                break;
            case "simpleBreak":
                text = `${title}\n${url}`
                break;
            case "simple":
                text = `${title} ${url}`
                break;
        }
        copyText(text);
        showCopied();
    })
}

const onInit = _ => {
    // First copy simple
    copyUrl("simple");
    document.querySelectorAll(".bettercopy-menu").forEach(el => {
        el.addEventListener("click", onClickCopyMenu);
    });
}


const onClickCopyMenu = function (evt) {
    const menuType = this.id;
    copyUrl(menuType);
}

document.addEventListener("DOMContentLoaded", onInit);