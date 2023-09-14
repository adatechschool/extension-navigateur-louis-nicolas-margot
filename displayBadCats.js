let boredCatBox = document.createElement('div')
boredCatBox.id = 'catBoxHappy'
boredCatBox.setAttribute('class', 'catBox in')
boredCatBox.innerHTML = '<img id="boredCat" src="https://imagizer.imageshack.com/img922/1173/nkthCQ.png"></img><p class="catPhrase">Meh...</p>'
document.body.appendChild(boredCatBox)
setTimeout(() => {
    boredCatBox.classList.toggle('in')
    boredCatBox.classList.toggle('out')}, 3000);
setTimeout(() => {
    document.body.removeChild(boredCatBox)
}, 4000)


