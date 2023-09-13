
class CatObj {
    constructor(catsEn, catsFr) {
        // tchak tchak on découpe les catégories et on en garde 16 principales
        this.en = catsEn.conceptSet.slice(0, 16).map(item => item.prefLabel.enUS);
        // plus compliqué donc on à une fonction pour
        this.fr = this.parseCatFr(catsFr);
        // on déclare mais on assigne pas
        this.goodCats
        this.badCats
    }

    // méthode pour assigner les "bonnes" et "mauvaises" catégories
    setCats(goodArr, badArr) {
        this.goodCatsEn = Array.from(goodArr, el => this.en[el]);
        this.goodCatsFr = Array.from(goodArr, el => this.fr[el]);

        this.badCatsEn = Array.from(badArr, el => this.en[el]);
        this.badCatsFr = Array.from(badArr, el => this.fr[el]);
    }

    // méthode qui gère les comparaisons
    areCatsGood(tabCats, lang) {
        // la comparaison est lancée ici mais on envoie pas les mêmes listes de catégories selon la langue (évite des répétitions de code)
        let scoring = () => {
            if (lang == 'fr') {
                return this.compare(tabCats, [this.goodCatsFr, this.badCatsFr])
            }
            else { return this.compare(tabCats, [this.goodCatsEn, this.badCatsEn]) }
        }

        // on calcule bip bip boop 🤖
        let score = scoring()
        if (score > 0) {
            console.log('good: ' + score)
            return true
        } else {
            console.log('bad: ' + score)
            return false
        }
    }

    // méthode de comparaison
    compare(tabCats, catsToCompare) {
        console.log(tabCats)

        // on met un score qui doit être positif pour que la page soit considérée comme "bien"
        let score = 0;

        //on compare avec la liste des bonnes
        // pour chaque catégorie "bonne"
        catsToCompare[0].forEach(catFromList => {
            // on regarde toutes les catégories renvoyées par l'API
            tabCats.forEach(catFromAPI => {
                // si ça matche
                if (catFromAPI.label.includes(catFromList)) {
                    console.log('good, +1')
                    // + 1 point
                    score++
                }
            })

        })

        // pareil avec les mauvaises
        catsToCompare[1].forEach(catFromList => {
            tabCats.forEach(catFromAPI => {
                if (catFromAPI.label.includes(catFromList)) {
                    console.log('bad, -1')
                    // - 1 point
                    score--
                }
            })

        })
        return score
    }

    // méthode pour parser les catégories FR qui sont pas rangées dans le même ordre que les EN..
    parseCatFr(catsFr) {
        // tableau vide
        let arr = []
        for (let i = 1; i < 10; i++) {
            // on se base sur les "qcode" qui vont de 0100... à 16000..
            arr.push(`0${i}000000`)
        }
        for (let i = 10; i < 17; i++) {
            arr.push(`${i}000000`)
        }
        let filtered = catsFr.conceptSet.filter(item =>
            arr.some(el => item.qcode.includes(el))
        )
        console.log(filtered)
        return filtered.map(item => item.prefLabel.fr)
    }
}

export default CatObj

