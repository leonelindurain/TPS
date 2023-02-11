// ----------------- Chat ------------------------------- //

const renderChat = (chats) => {

    let messagesChat = document.querySelector('#messagesChat');
    let html = chats.map((msj => {
        return `<tr>
                    <td class="text-primary fw-bold px-2">${msj.email}</td>
                    <td class="text-danger px-2">[${msj.timestamp}]:</td>
                    <td class="text-success fst-italic px-2">${msj.text}</td> 
                </tr>
                `
    }))
    messagesChat.innerHTML = html.join(' ');
}

const addMessage = (evt) => {
    const email = document.querySelector('#email').value;

    const text = document.querySelector('#text').value;
    const dateMessage = dateFns.format(new Date(), 'DD/MM/YYYY HH:mm:ss');

    let messageComplete = {

        email: email,
        type: 'usuario',
        timestamp: dateMessage,
        text: text
    };

    document.querySelector('#text').value = ""

    console.log(messageComplete);

    socket.emit('messageChat-new', messageComplete, (id) => { // callback para obtener el id del mensaje
        console.log(id);
    });

    return false;
}

// const PORT = 8080

const socket = io().connect()     

socket.on('message-server', (data) => {
    console.log(data)
})

socket.on('messageChat-server', (chats) => {
    console.log(chats);
    renderChat(chats)
})

let emailId = email.innerHTML

// ---------- Pedir productos al servidor -----------------------//
getProductsCart = async () => {
    
    console.log("Info en Front:",emailId);
    await fetch(`https://vacuous-temper-production.up.railway.app/carrito/${emailId}`)
        .then(res => res.json())
        .then(data => {
            console.log("Esto vuelve del server:", data);
            renderCart(data.products)
        });
}

getProductsCart();

// --------- Renderizar productos del carrito --------------------//
const renderCart = (products) => {
    let list = document.querySelector('#list');
    let html = products.map((prod => {
        return `<tr>
                    <td  class="text-center">
                        ${prod.description}
                    </td>
                    <td  class="text-center">
                        $ ${prod.price} 
                    </td>
                    <td class="text-center">
                        <img src=${prod.thumbnail} width="50" height="50">
                    </td>
                </tr>`
    }))
    list.innerHTML = html.join(' ');
}

// -------------- Enviar pedido a Server -------------- //
let sendOrder = document.getElementById('sendOrder')
let cartBody = document.querySelector('#cartBody');

sendOrder.addEventListener('click', async () => {

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            emailId,
        }),
    };

    fetch(`https://vacuous-temper-production.up.railway.app/ordenes`, requestOptions)
        .then(res => res.json())
        .then(data => {
            let html = `
    <div class="container col-8 align-self-center border mt-3 bg-light p-3">
        <h2>${data.mensaje}</h2>
    </div>
    `;
            cartBody.innerHTML = html;
        })
});

// --------------------- Login ----------------------------------//

const logoutButton = document.getElementById('logoutButton')

logoutButton.addEventListener('click', () => {
    fetch(`https://vacuous-temper-production.up.railway.app/logout`)
        .then(res => res.json())
        .then(data => {
            let html = `
        <div class="container col-8 align-self-center border mt-3 bg-light p-3">
            <h2>Hasta la próxima ${data.name} </h2>
        </div>
        `;
            container.innerHTML = html;
            setTimeout(() => {
                location.href = '/login'
            }, 2000)
        })
});










