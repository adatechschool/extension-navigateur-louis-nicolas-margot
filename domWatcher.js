MutationObserver = window.MutationObserver// eslint-disable-next-line no-undef
const port = chrome.runtime.connect({ name: "domChangeNotification" });



const observer = new MutationObserver(function (mutations, observer) {
    // fired when a mutation occurs
    console.log(mutations, observer);
    port.postMessage({ alert: 'DOM change' })
    // ...
});

observer.observe(document, {
    subtree: true,
    attributes: true
    //...
});

