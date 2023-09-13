let judgmentalCat = document.createElement('div')
judgmentalCat.id = 'catBoxHappy'
judgmentalCat.setAttribute('style', 'display: flex; position: fixed; top: 5vh; right: 3vw; width: 200px;, height: 300px; z-index: 999; flex-direction: column; justify-content: center; align-items: center; border-radius: 10px; background-color: white; box-shadow: 5px 5px 15px 1px rgba(0,0,0,0.36); border: 1px solid black; padding: 16px; box-sizing: border-box; gap: 8px;')
judgmentalCat.innerHTML = '<img id="chat2" src="https://imagizer.imageshack.com/img922/3968/uva95c.png" style="width: 150px;"></img><p style="font-size: 24px;">Pfff... C\'est naze...</p>'
document.body.appendChild(judgmentalCat)
setTimeout(() => {
    document.body.removeChild(judgmentalCat)
}, 5000);


