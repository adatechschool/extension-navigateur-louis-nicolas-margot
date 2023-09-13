// en chantier total, ne marche pas

class CatObj {
    constructor(catsEn, catsFr) {
        this.en = catsEn.conceptSet.slice(0, 16).map(item => item.prefLabel.enUS);
        this.fr = this.parseCatFr(catsFr);
        this.goodCats
        this.badCats
    }
    setCats(goodArr, badArr) {
        this.goodCatsEn = Array.from(goodArr, el => this.en[el]);
        this.goodCatsFr = Array.from(goodArr, el => this.fr[el]);

        this.badCatsEn = Array.from(badArr, el => this.en[el]);
        this.badCatsFr = Array.from(badArr, el => this.fr[el]);
    }

    compare(tabCats, catsToCompare) {
        console.log(tabCats)

        let score = 0;

        catsToCompare[0].forEach(cat => {
            if (tabCats.some(el => {
                el.label.includes(cat) 
            })) {
                score++
            }
        })

        catsToCompare[1].forEach(cat => {
            if (tabCats.some(el => {
                el.label.includes(cat)
            })) {
                score--
                console.log(score)
            }
        })
        return score
    }

    areCatsGood(tabCats, lang) {
        let scoring = () => {
            if (lang == 'fr') {
                return this.compare(tabCats, [this.goodCatsFr, this.badCatsFr])
            }
            else { return this.compare(tabCats, [this.goodCatsEn, this.badCatsEn]) }
        }

        let score = scoring()
        if (score > 0) {
            console.log('good: ' + score)
            return true
        } else {
            console.log('bad: ' + score)
            return false
        }
    }

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

