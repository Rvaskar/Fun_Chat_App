//Node server which will handel network connection

const io = require('socket.io')(8000)  //here we import first socket.io which we install using npm i socket.io   and use 8000  (any port we want)



const users = {};   

//here all the we pass as string it's a all event we can name as what we want

io.on('connection', socket =>{    //io.on is socket.io instance it will listen different socket connection  eg=> any one connect app it will listen by<
    socket.on('new-user-joined', name =>{   // if something movement happen with any user what will do this decide by socket.on
        users[socket.id] = name;
        // console.log("new user: ", name);
        socket.broadcast.emit('user-joined', name)  //when new user join it will tell all other that new user join or send name

    });
    socket.on('send', message =>{   //if any any user send the message it will receive by others (broadcast to others)
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });


    socket.on('disconnect', message =>{   //if any any user send the message it will receive by others
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id];    //socket id means every user have in unique id some time there will be duplicate na
    });
});
