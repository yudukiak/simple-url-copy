const extractAmazonUrl = rawUrl => {
  const url = new URL(rawUrl);
  if (url.host == AMAZON_HOST) {
    if (url.pathname.match(/\/dp\/[A-Za-z0-9]/)) {
      newUrl = url.origin + url.pathname.replace(/(^\S+)(\/dp\/[A-Za-z0-9]{10})(.*)/, '$2');
      return newUrl;
    } else if (url.pathname.match(/\/gp\/product\/[A-Za-z0-9]/)) {
      newUrl = url.origin + url.pathname.replace(/(^\S+)?(\/gp\/product\/[A-Za-z0-9]{10})(.*)/, '$2');
      return newUrl;
    } else if (url.pathname.match(/\/gp\/aw\/d\/[A-Za-z0-9]/)) {
      newUrl = url.origin + url.pathname.replace(/(^\S+)?(\/gp\/aw\/d\/[A-Za-z0-9]{10})(.*)/, '$2');
      return newUrl;
    } else {
      return rawUrl;
    }
  } else {
    return rawUrl;
  }
}

const formatText = (format, title, base_url) => {
  const url = extractAmazonUrl(base_url);
  let decoded = url;
  try {
    decoded = decodeURI(decoded);
  } catch (e) { // catches a malformed URI
    console.error(e);
  }
  return format
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\f/g, '\f')
    .replace(/\\t/g, '\t')
    .replace(/{title}/g, title)
    .replace(/{url}/g, url)
    .replace(/{durl}/g, decoded);
}
