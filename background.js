//récupére tout ce qu'il faut pour faire l'appel d'api
import MCInfos from './domainInfos/providers/meaningCloud.js'
// récupére ma clé personnelle d'API
import mcKey from './domainInfos/providers/key.js'

import catEn from './domainInfos/categoriesLists/catEn.js'
import catFr from './domainInfos/categoriesLists/catFr.js'

const categories = {
    categoriesEn: catEn.conceptSet.slice(0, 16).map(item => item.prefLabel),
    categoriesFr: catFr.conceptSet.slice(0, 16).map(item => item.prefLabel)
}
console.log(categories)

async function getPageCategories(url, key, lang) {
    console.log('woooh yeah')
    //crée un objet qui pourra faire l'appel d'API à partir de l'url qu'on lui donne
    let infos = new MCInfos(url, key, lang)
    // lance l'appel d'API et attends la réponse
    let cats = infos.getMCInfos()
    console.log(cats)
    return cats
}


function debounce(func, timeout) {
    let timer;
    return (...args) => {
        if (!timer) {
            func.apply(this, args);
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = undefined;
        }, timeout);
    };
}
// define what element should be observed by the observer
// and what types of mutations trigger the callback

// eslint-disable-next-line no-undef
chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        // eslint-disable-next-line no-undef
        let lang = await chrome.tabs.detectLanguage(tabId)
        console.log(lang)
        let currentTabUrl = tab.url
        console.log(currentTabUrl)
        getPageCategories(currentTabUrl, mcKey, lang)
        // eslint-disable-next-line no-undef
        chrome.runtime.onConnect.addListener(function (port) {
            console.assert(port.name === "domChangeNotification");
            port.onMessage.addListener(function (msg) {
                if (msg.alert === 'DOM change') {
                    port.postMessage({ acknowledgment: "event registered" });
                    console.log(msg.alert)
                }

            });
        });
    }
})




