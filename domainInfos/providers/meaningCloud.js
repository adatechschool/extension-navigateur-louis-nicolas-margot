// utilitaire de requêtes API

// "classe", càd une super-fonction/objet qui a ses propres méthodes
class MCInfos {
    // le constructeur prends les données qu'on lui file en paramètre
    constructor(urlOfPage, mcKey, lang) {
        this.url = urlOfPage
        this.key = mcKey
        this.lang = lang

        // l'API exige des données en format 'formulaire', tout ce qui suit remplace enfait les headers d'une requête classique
        this.form = new FormData();
        this.form.append('url', this.url);
        this.form.append('key', this.key);
        this.form.append('verbose', 'y');
        this.form.append('expand_hierarchy', 'p')
        this.form.append('of', 'json');
        this.form.append('model', `IPTC_${this.lang}`);
    }

    // méthode pour lancer la requête
    getMCInfos() {
        // on 'return' ici pour éviter des problèmes de async dans background.js (c'est ça que background.js récupère quand on fait 'infos.getMCinfos()')
        fetch('https://api.meaningcloud.com/class-2.0', { method: 'post', body: this.form, redirect: 'follow' })
            .then((response) => {
                return response
            })
            .then((responseJSON) => {
                console.log(responseJSON)
            })
    }
}

export default MCInfos;


