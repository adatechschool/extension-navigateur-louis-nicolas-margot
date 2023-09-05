//récupére tout ce qu'il faut pour faire l'appel d'api
import MCInfos from './domainInfos/providers/meaningCloud.js'

// récupére ma clé personnelle d'API
import mCkey from './domainInfos/providers/key.js'

const categories = {}
//crée un objet qui pourra faire l'appel d'API à partir de l'url qu'on lui donne
async function getCategories() {
    let infos = new MCInfos('https://wesodonnell.medium.com/ukraine-now-using-cardboard-drones-to-devastate-russian-airfields-a344bb7b9b14', mCkey)

    // lance l'appel d'API et attends la réponse
    const categories = await infos.getMCInfos()
    console.log(categories)
}

getCategories()



