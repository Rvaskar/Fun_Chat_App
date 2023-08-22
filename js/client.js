const socket = io('http://localhost:8000')


//Get DOM elements in respective js variable
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector('.container')

//Audio that will play on receiving message
let  audio = new Audio('/Assets/ting.mp3');


//Function which will append event info in container
const append = (message, position)=>{
    const messageElement = document.createElement("div")
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
    if(position == 'left'){
        audio.play();
    }

}
 
//Ask new user for his/her name
const name = prompt("enter your name to join")
socket.emit('new-user-joined', name);

//Listen for messages from server and display them accordingly
socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'right')
})

//If server sends a message ,receive it
socket.on('receive', data =>{
    append(`${data.name} : ${data.message}`, 'left')
})

//If user leaves the chat, append the info to the container
socket.on('left', name =>{
    append(`${name} left the chat`, 'left')
})

//If the form get submitted send server to the message
form.addEventListener('submit', (e)=>{
    e.preventDefault();    //this is help to stop reload  page
    const message = messageInput.value;
    append(`you: ${message}`, 'right');
    socket.emit('send', message)
    messageInput.value=''   /// clear input after send msg
})



