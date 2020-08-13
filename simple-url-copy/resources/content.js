const onRequest = () => {
  console.log(`${document.title} - ${document.URL}`);
};
const init = () => {
  console.log('content');
  // document.
  document.onkeydown = onRequest;
  document.onkeyup = onRequest;
  window.addEventListener("keydown", function(e){
      console.log(e);
      execCopy('');
      // console.log(`${document.title} - ${document.URL}`);
      //     //Ctrl+Entrが押されたとき、alert();
      // if(e.ctrlKey && e.keyCode === 13){
      //     alert();
      // }
  });
  // chrome.extension.onRequest.addListener(onRequest);
  // chrome.extension.sendRequest(
  //     {
  //         keystr: keystr,
  //         values: {
  //             url: document.URL,
  //             title: document.title,
  //             text: text
  //         }
  //     }
  // );
};
init();
