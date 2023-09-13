let boredCat = document.createElement('div')
boredCat.id = 'catBoxHappy'
boredCat.setAttribute('style', 'display: flex; position: fixed; top: 5vh; right: 3vw; width: 200px;, height: 300px; z-index: 999; flex-direction: column; justify-content: center; align-items: center; border-radius: 10px; background-color: white; border: 1px solid black; padding: 16px; box-shadow: 5px 5px 15px 1px rgba(0,0,0,0.36); box-sizing: border-box; gap: 8px;')
boredCat.innerHTML = '<img id="chat2" src="https://imagizer.imageshack.com/img922/1173/nkthCQ.png" style="width: 150px"></img><p style="font-size: 32px;">Meh...</p>'
document.body.appendChild(boredCat)
setTimeout(() => {
    document.body.removeChild(boredCat)
}, 5000);


