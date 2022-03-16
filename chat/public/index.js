const socket = io();

let user;

let chatBox = document.getElementById('chatBox');
Swal.fire({
    title:"Identificate",
    input:"text",
    text:"Ingresa el Usuario",
    inputValidator:(value) =>{
        return !value && 'Necesitas ID'
    },
    allowOutsideClick:false
}).then(result=>{
    user=result.value;
    socket.emit('registered',user);
})

chatBox.addEventListener('keyup',(evt)=>{
    if(evt.key==="Enter"){
        if(chatBox.value.trim().length>0){
            socket.emit('message',{
                user:user,
                message:chatBox.value
            })
            chatBox.value="";
        }
    }
})

socket.on('log', (data) => {
    console.log(data);
    let chat=document.getElementById('historychat');
    let messages = "";
    data.forEach(message => {
        messages = messages + `${message.user} dice: ${message.message}`+ "";
    })
    chat.innerHTML = messages;
})


// socket.on('newUser',(data)=>{
//     Swal.fire({
//         icon:"success",
//         text:"Usuario Nuevo hablale",
//         toast: true,
//         position: "top-right",
//     })
// })