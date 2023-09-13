let happyCat = document.createElement('div')
happyCat.id = 'catBoxHappy'
happyCat.setAttribute('style', 'display: flex; position: fixed; top: 5vh; right: 3vw; width: 300px;, height: 450px; z-index: 999; flex-direction: column; justify-content: center; align-items: center; border-radius: 10px; background-color: white; box-shadow: 5px 5px 15px 1px rgba(0,0,0,0.36); padding: 16px; box-sizing: border-box; border: 1px solid black; gap: 8px;')
happyCat.innerHTML = '<img id="chat2" src="https://imagizer.imageshack.com/img922/8920/rNrFhN.png" style="width: 150px;"></img><p style="font-size: 32px;">Sympa !</p>'
document.body.appendChild(happyCat)
setTimeout(() => {
    document.body.removeChild(happyCat)
}, 5000);
