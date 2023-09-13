// classe pour la gestion des requêtes API
import MCInfos from './domainInfos/providers/meaningCloud.js'
// récupére ma clé personnelle d'API ( c'est dans .gitignore donc
// vous aurez besoin de créer votre propre fichier key.js avec votre propre clé)
import mcKey from './domainInfos/providers/key.js'

// objets js qui contiennent toutes les catégories IPTC
import catEn from './domainInfos/categoriesLists/catEn.js'
import catFr from './domainInfos/categoriesLists/catFr.js'

// liste noire de sites
import blacklist from './blacklist.js'

// classe "Catégories" : permet de réorganiser les catégories selon nos besoin et de faire des comparaisons
import CatObj from './domainInfos/categoriesLists/catObj.js'

// on se créé un object Catégories
const Cats = new CatObj(catEn, catFr);

// on lui donne les indexs des catégories "bonnes" et "mauvaises"
let goodArr = [0, 3, 4, 5, 6, 10, 12, 13];
let badArr = [1, 2, 7, 8, 9, 11, 14, 15];

// ça va nous ranger ça bien tout seul
Cats.setCats(goodArr, badArr)
console.log(Cats)

// fonction pour lancer l'appel d'API et récupérer les catégories du site qu'on visite
async function getPageCategories(url, key, lang) {
    let infos = new MCInfos(url, key, lang)     //crée un objet à partir de la classe qu'on à importée
    return infos.getMCInfos()     // lance l'appel d'API et attends la réponse
}

// lorsqu'un onglet est ouvert ou rafraichi
// eslint-disable-next-line no-undef
chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {    // si il est bien chargé
        // eslint-disable-next-line no-undef
        let lang = await chrome.tabs.detectLanguage(tabId)         // on récupère la langue
        let currentTabUrl = tab.url         //on récupère l'url

        if (blacklist.some(el => {         // si c'est sur la liste noire
            currentTabUrl.includes(el)
        })) {
            // eslint-disable-next-line no-undef 
            chrome.scripting.executeScript({            // on affiche un truc pas sympa
                target: { tabId: tabId },
                files: ["displayBlackListCats.js"]
            })
        } else {
            let tabCats = await getPageCategories(currentTabUrl, mcKey, lang) // si c'est pas sur list noire, on lance la requête API

            if (tabCats != undefined) {
                if (Cats.areCatsGood(tabCats, lang)) {
                    // eslint-disable-next-line no-undef
                    chrome.scripting.executeScript({                 // si c'est good on affiche un truc sympa
                        target: { tabId: tabId },
                        files: ["displayGoodCats.js"]
                    })
                } else {
                    // eslint-disable-next-line no-undef
                    chrome.scripting.executeScript({                 // si c'est bof, on affiche un truc bof
                        target: { tabId: tabId },
                        files: ["displayBadCats.js"]
                    })
                }
            }
        }
    }
})




