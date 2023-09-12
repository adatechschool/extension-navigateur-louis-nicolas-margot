class CatObj {
    constructor(catsEn, catsFr) {
        this.en = catsEn.conceptSet.slice(0, 16).map(item => item.prefLabel);
        this.fr = this.parseCatFr(catsFr);
        this.goodCats
        this.badCats
    }
    setCats(goodArr, badArr) {
        this.goodCats = Array.from(goodArr, el => this.en[el]);
        this.goodCats.concat(Array.from(goodArr, el => this.fr[el]));

        this.badCats = Array.from(badArr, el => this.en[el]);
        this.badCats.concat(Array.from(badArr, el => this.fr[el]));
    }

    areCatsGood(tabCats) {
        let good = 0
        let bad = 0
        console.log(typeof (tabCats.category_list))
        console.log(tabCats.category_list)

        this.goodCats.forEach(cat => {
            if (tabCats.category_list.some(el => {
                console.log(el.label + ' vs ' + cat.enUS)
                el.label.includes(cat.enUS)
            })) {
                good++
            } else { bad++ }
        })

        if (good >= bad) {
            console.log('good: ' + good + 'bad: ' + bad)
            return true
        } else {
            console.log('good: ' + good + 'bad: ' + bad)
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
        return filtered.map(item => item.prefLabel)
    }
}

export default CatObj

