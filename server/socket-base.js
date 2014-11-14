var users = {};

var connectedUsers = {};

module.exports = function (io) { // io stuff here... io.on('conection..... 
    io.on('connection', function (socket) {
        console.log('a user connected');
        var name, room_id;
        socket.on('selected:number', function (data) {
            console.log("vote" + JSON.stringify(data));

            users[data.room_id + data.name] = {
                name: data.name,
                hasVoted: true,
                vote: data.vote,
                isOwner: data.isOwner
            }

            //            socket.broadcast.emit('selected:number', data);
            socket.broadcast.emit('join:room', users);

            socket.emit('join:room', users);
        });


        socket.on('join:room', function (data) {
            console.log(data.name + "has joined the room");
            console.log("joining: " + JSON.stringify(data));

            if (users[data.room_id] === undefined) {
                users[data.room_id] = {};
            }

            if (users[data.room_id][data.name] === undefined) {
                users[data.room_id][data.name] = {
                    name: data.name,
                    hasVoted: false,
                    isOwner: data.isOwner,
                    vote: 0
                };
            }

            name = data.room_id + data.name;

            if (connectedUsers[data.room_id] === undefined) {
                connectedUsers[data.room_id] = [];
            }

            connectedUsers[data.room_id].push(socket);

            console.log("socket id: " + connectedUsers[data.room_id][0]);
            
            //            socket.broadcast.emit('join:room', users[data.room_id]);
            for (var i in connectedUsers[data.room_id]) {
                connectedUsers[data.room_id][i].emit('join:room', users[data.room_id]);
            }
        });

        socket.on('disconnect', function () {
            console.log("user disconnected");
            delete users[name];
            socket.broadcast.emit('join:room', users);
        });


        socket.on('reveal:votes', function () {
            console.log("reveal votes");

            socket.broadcast.emit('reveal:votes');
        });


    });


};