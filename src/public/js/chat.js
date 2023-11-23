const socketClient = io()

username = document.getElementById('first_name_user').innerText;

sendMessage = () => {
    const body = {
        user: username,
        message: document.getElementById('message').value
    }
    fetch('/api/messages/', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(result => result.json())
        .then(result => {
            if (result.status === 'error') throw new Error(result.error)
            socketClient.emit('messageList', result.payload)
            
            document.getElementById('message').value = ""
        })
        .catch(err => alert(`Ocurrió un error ${err}`))
}


socketClient.on("updatedMessages", data => {
    const msgContainer = document.querySelector('.chat');
    msgContainer.innerHTML = `
    <form>
        <label for="message">Mensaje:</label>
        <input type="text" class="form-control custom-input" id="message" name="message" required>
        <button id="createMsg" type="button" class="btn custom-button" onclick="sendMessage()">Enviar
            Mensaje</button>
    </form>
    `;
    data.forEach(msg => {
        const div = document.createElement('div');
        div.classList.add('messageItem');
        div.innerHTML = `
        <div class="messageItem">
        <div class="user">>>>${msg.user}:</div>
            <div class="message">${msg.message}</div>
        </div> 
        `;
        msgContainer.appendChild(div);
    });
});

