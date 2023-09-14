let happyCatBox = document.createElement('div')
happyCatBox.id = 'catBoxHappy'
happyCatBox.setAttribute('class', 'catBox in')
happyCatBox.innerHTML = '<img id="happyCat" src="https://imagizer.imageshack.com/img922/8920/rNrFhN.png"></img><p class="catPhrase">Sympa !</p>'
document.body.appendChild(happyCatBox)
setTimeout(() => {
    happyCatBox.classList.toggle('in')
    happyCatBox.classList.toggle('out')
}, 3000);
setTimeout(() => {
    document.body.removeChild(happyCatBox)
}, 4000)
