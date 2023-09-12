//récupére tout ce qu'il faut pour faire l'appel d'api
import MCInfos from './domainInfos/providers/meaningCloud.js'
// récupére ma clé personnelle d'API
import mcKey from './domainInfos/providers/key.js'

// objets js qui contiennent toutes les catégories
import catEn from './domainInfos/categoriesLists/catEn.js'
import catFr from './domainInfos/categoriesLists/catFr.js'

// liste noire de sites
import blacklist from './blacklist.js'

function parseCatFr() {
    // tableau vide
    let arr = []
    for (let i = 1; i < 10; i++) {
        // on se base sur les "qcode" qui vont de 0100... à 16000..
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

// 16 principales catégories en anglais et en français
const categories = {
    // on prends les 16 premières elles sont dans l'ordre
    categoriesEn: catEn.conceptSet.slice(0, 16).map(item => item.prefLabel),
    //pas dans l'ordre donc un peu plus compliqué
    categoriesFr: parseCatFr()
}

console.log(categories)

// numéros catégories "bien" présélectionnées
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

async function getPageCategories(url, key, lang) {
    //crée un objet qui pourra faire l'appel d'API à partir de l'url qu'on lui donne
    let infos = new MCInfos(url, key, lang)
    // lance l'appel d'API et attends la réponse
    let cats = await infos.getMCInfos()
    return cats
}

function alertMessage() {
    alert('Nan mais ça va pas ?')
}

function niceMessage() {
    alert("c'est bien, continue comme ça")
}

// lorsqu'un onglet est ouvert ou rafraichi
// eslint-disable-next-line no-undef
chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
    // si il est bien chargé
    if (changeInfo.status == 'complete') {
        // on récupère la langue
        // eslint-disable-next-line no-undef
        let lang = await chrome.tabs.detectLanguage(tabId)

        //on récupère l'url
        let currentTabUrl = tab.url
        console.log(currentTabUrl)

        // si c'est sur la liste noire
        if (blacklist.some(el => currentTabUrl.includes(el))) {
            // envoie un message d'alerte
            // eslint-disable-next-line no-undef
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                func: alertMessage
            })
                .then(() => console.log('script'))
        } else {
            // sinon, fait un appel d'api pour voir quel type de contenu c'est
            let tabCats = getPageCategories(currentTabUrl, mcKey, lang);
            // si ça matche avec badCategories
        }
    }
})




