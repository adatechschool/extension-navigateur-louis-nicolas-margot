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


console.log(categories)
async function getPageCategories(url, key, lang) {
    //crée un objet qui pourra faire l'appel d'API à partir de l'url qu'on lui donne
    let infos = new MCInfos(url, key, lang)
    // lance l'appel d'API et attends la réponse
    return infos.getMCInfos()
}
// chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
//     if (changeInfo.status == 'complete') {
//         let currentTabUrl = tab.url
//         console.log(currentTabUrl)
//         let currentPageCategories = getPageCategories(currentTabUrl, mcKey, 'fr')
//         console.log(currentPageCategories)
//     }
// })
getPageCategories('https://www.jeuxvideo.com/news/1795111/starfield-pc-est-offert-si-vous-achetez-une-souris-dans-cette-grande-enseigne.htm', mcKey, 'fr')



