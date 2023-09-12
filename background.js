//récupére tout ce qu'il faut pour faire l'appel d'api
import MCInfos from './domainInfos/providers/meaningCloud.js'
// récupére ma clé personnelle d'API
import mcKey from './domainInfos/providers/key.js'

import catEn from './domainInfos/categoriesLists/catEn.js'
import catFr from './domainInfos/categoriesLists/catFr.js'

import blacklist from './blacklist.js'

console.log(blacklist)

const categories = {
    categoriesEn: catEn.conceptSet.slice(0, 16).map(item => item.prefLabel),
    categoriesFr: parseCatFr()
}

function parseCatFr() {
    let arr = []
    for (let i = 1; i < 10; i++) {
        arr.push(`0${i}000000`)
    }
    for (let i = 10; i < 17; i++) {
        arr.push(`${i}000000`)
    }
    let filtered = catFr.conceptSet.filter(item =>
        arr.some(el => item.qcode.includes(el))
    )
    console.log(filtered)
    return filtered.map(item => item.prefLabel)
}


console.log(categories)


async function getPageCategories(url, key, lang) {
    //crée un objet qui pourra faire l'appel d'API à partir de l'url qu'on lui donne
    let infos = new MCInfos(url, key, lang)
    // lance l'appel d'API et attends la réponse
    let cats = await infos.getMCInfos()
    console.log(cats)
    return cats
}
let tabCats
// eslint-disable-next-line no-undef
chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        // eslint-disable-next-line no-undef
        let lang = await chrome.tabs.detectLanguage(tabId)
        console.log(lang)
        let currentTabUrl = tab.url
        console.log(currentTabUrl)
        tabCats = getPageCategories(currentTabUrl, mcKey, lang);
    }
})

chrome.action.onClicked.addListener((tab) => {
    // const response =
    //     // eslint-disable-next-line no-undef
    //     await chrome.runtime.sendMessage({ categories: tabCats });
    // // do something with response here, not outside the function
    // console.log(response)
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['displayCats.js']
    })
        .then(() => console.log('script'))
});
// eslint-disable-next-line no-undef




