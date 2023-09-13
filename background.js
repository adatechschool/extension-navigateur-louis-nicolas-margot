//récupére tout ce qu'il faut pour faire l'appel d'api
import MCInfos from './domainInfos/providers/meaningCloud.js'
// récupére ma clé personnelle d'API
import mcKey from './domainInfos/providers/key.js'

// objets js qui contiennent toutes les catégories
import catEn from './domainInfos/categoriesLists/catEn.js'
import catFr from './domainInfos/categoriesLists/catFr.js'

// liste noire de sites
import blacklist from './blacklist.js'

import CatObj from './domainInfos/categoriesLists/catObj.js'

const Cats = new CatObj(catEn, catFr);

let goodArr = [0, 3, 4, 5, 6, 10, 12, 13];
let badArr = [1, 2, 7, 8, 9, 11, 14, 15];

Cats.setCats(goodArr, badArr)

console.log(Cats)


async function getPageCategories(url, key, lang) {
    //crée un objet qui pourra faire l'appel d'API à partir de l'url qu'on lui donne
    let infos = new MCInfos(url, key, lang)
    // lance l'appel d'API et attends la réponse
    return infos.getMCInfos()
}

function alertMessage() {
    alert('Nan mais ça va pas ?')
}

function niceMessage() {
    alert("c'est bien, continue comme ça")
}

function pastopMessage() {
    alert("Mouais...")
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

        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["displayCats.js"]
        })

        // si c'est sur la liste noire
        if (blacklist.some(el => {

            currentTabUrl.includes(el)
        })) {
            console.log("étape 1")
            // envoie un message d'alerte
            // eslint-disable-next-line no-undef
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                func: alertMessage
            })
        } else {
            console.log("étape 2")

            let tabCats = await getPageCategories(currentTabUrl, mcKey, lang)
            console.log(tabCats)
            if (Cats.areCatsGood(tabCats, lang)) {
                console.log("gentil")

                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    func: niceMessage
                })
            } else {
                console.log("pô gentil")
                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    func: pastopMessage
                })
            }
        }
    }
})




