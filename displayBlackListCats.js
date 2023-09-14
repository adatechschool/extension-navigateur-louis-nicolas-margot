let judgmentalCatBox = document.createElement('div')
judgmentalCatBox.id = 'catBoxBlacklist'
judgmentalCatBox.setAttribute('class', 'catBox in')
judgmentalCatBox.innerHTML = '<img id="judgmentalCat" src="https://imagizer.imageshack.com/img922/3968/uva95c.png"></img><p class="catPhrase">Pfff... C\'est naze...</p>'
document.body.appendChild(judgmentalCatBox)
setTimeout(() => {
    judgmentalCatBox.classList.toggle('in')
    judgmentalCatBox.classList.toggle('out')
}, 3000);
setTimeout(() => {
    document.body.removeChild(judgmentalCatBox)
}, 4000)

