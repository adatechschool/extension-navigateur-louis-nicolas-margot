// utilitaire de requêtes API
import axios from "axios"

// "classe", càd une super-fonction/objet qui a ses propres méthodes
class MCInfos {
    // le constructeur prends les données qu'on lui file en paramètre
    constructor(urlOfPage, mCkey) {
        this.url = urlOfPage
        this.key = mCkey

        // l'API exige des données en format 'formulaire', tout ce qui suit remplace enfait les headers d'une requête classique
        this.form = new FormData();
        this.form.append('url', this.url);
        this.form.append('Content-Type', 'multipart/form-data');
        this.form.append('key', this.key);
        this.form.append('verbose', 'y');
        this.form.append('expand_hierarchy', 'p');
        this.form.append('model', 'IPTC_fr');
        this.form.append('of', 'json')
    }

    // méthode pour lancer la requête
    getMCInfos() {
        // on 'return' ici pour éviter des problèmes de async dans script.js (c'est ça que script.js récupère quand on fait 'infos.getMCinfos()')
        return axios.post('https://api.meaningcloud.com/class-2.0', this.form)
            .then((data) => {
                this.data = data.data.category_list
                // return final
                return this.data
            })
            .catch((error) => {
                // en cas d’échec de la requête
                console.log(error);
            })

    }
}

export default MCInfos;


