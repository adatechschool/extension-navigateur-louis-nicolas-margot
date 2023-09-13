let chat3 = document.createElement('div')
chat3.id = 'box3'
chat3.setAttribute('style', 'position: fixed; top: 40vh; left: 30vw; width: 50%;, height: 50%; z-index: 999;')
chat3.innerHTML = '<img id="chat3" src="https://imagizer.imageshack.com/img923/1725/lyJv6k.png"></img><p>OLA</p>'
document.body.appendChild(chat3)
setTimeout(() => {
    document.body.removeChild(chat3)
}, 3000);

