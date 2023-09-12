//récupére tout ce qu'il faut pour faire l'appel d'api
import MCInfos from './domainInfos/providers/meaningCloud.js'
// récupére ma clé personnelle d'API
import mcKey from './domainInfos/providers/key.js'

import catEn from './domainInfos/categoriesLists/catEn.js'
import catFr from './domainInfos/categoriesLists/catFr.js'



const categories = {
    categoriesEn: catEn.conceptSet.slice(0, 16).map(item => item.prefLabel),
    categoriesFr: parseCatFr()
}

let goodCat = [0, 3, 4, 5, 6, 10, 12, 13];
const goodCategories = [];
goodCat.forEach(el => goodCategories.push(categories.categoriesEn[el]));
goodCat.forEach(el => goodCategories.push(categories.categoriesFr[el]));

console.log(goodCategories);

let badCat = [1, 2, 7, 8, 9, 11, 14, 15];
const badCategories = [];
badCat.forEach(el => badCategories.push(categories.categoriesEn[el]));
badCat.forEach(el => badCategories.push(categories.categoriesFr[el]));

console.log(badCategories);


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
    }
});


