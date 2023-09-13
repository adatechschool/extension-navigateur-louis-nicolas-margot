let chat = document.createElement('div')
chat.id = 'box'
chat.setAttribute('style', 'position: fixed; top: 0; left: 0; width: 300px;, height: 200px;')
chat.innerHTML = '<html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Display cats in the browser</title></head><body><img id="chat" src="https://imagizer.imageshack.com/img923/5786/4thk8Y.png"></img></body></html>'
document.body.appendChild(chat)