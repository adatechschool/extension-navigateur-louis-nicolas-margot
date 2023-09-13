// "classe", càd une super-fonction/objet qui a ses propres méthodes
class MCInfos {
    // le constructeur prends les données qu'on lui file en paramètre
    constructor(urlOfPage, mcKey, lang) {
        this.url = urlOfPage
        this.key = mcKey
        this.lang = lang
        this.model = `IPTC_${this.lang}`

        // l'API exige des données en format 'formulaire', tout ce qui suit remplace enfait les headers d'une requête classique
        this.form = new FormData();
        this.form.append('url', this.url);
        this.form.append('key', this.key);
        this.form.append('verbose', 'y');
        this.form.append('expand_hierarchy', 'p')
        this.form.append('model', this.model)
    }

    // méthode pour lancer la requête
    getMCInfos() {
        return fetch('https://api.meaningcloud.com/class-2.0', { method: 'post', body: this.form, redirect: 'follow' })
            .then((response) => {
                return response.json()
            })
            .then((responseJSON) => {
                return responseJSON.category_list
            })
    }
}

export default MCInfos;


