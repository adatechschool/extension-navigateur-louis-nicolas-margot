let chat2 = document.createElement('div')
chat2.id = 'box2'
chat2.setAttribute('style', 'position: fixed; top: 30%; left: 30%; width: 50%;, height: 50%; z-index: 999;  ')
chat2.innerHTML = '<img id="chat2" src="https://imagizer.imageshack.com/img923/4148/xpx2kI.png"></img><p style="font-size: 100px;">JE SUIS GENTIL</p>'
document.body.appendChild(chat2)
setTimeout(() => {
    document.body.removeChild(chat2)
}, 3000);
