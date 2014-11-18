var users = {};

module.exports = function (io) { // io stuff here... io.on('conection..... 
    io.on('connection', function (socket) {

        console.log('a user connected');

        var name, room_id;

        socket.on('selected:number', function (data) {

            console.log(socket.username + " has voted");

            var existingUser = users[socket.room][socket.username];

            if (existingUser === undefined) {
                console.log("user does not exist");
            }

            existingUser.hasVoted = true;
            existingUser.vote = data.vote;

            socket.broadcast.to(socket.room).emit('join:room', users[socket.room]);

            socket.emit('join:room', users[socket.room]);
        });


        socket.on('join:room', function (data) {

            console.log(data.name + " has joined the room");

            socket.username = data.name;
            socket.room = data.room_id;

            socket.join(data.room_id);

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

            socket.broadcast.to(data.room_id).emit('join:room', users[data.room_id]);

            socket.emit('join:room', users[data.room_id]);
        });

        socket.on('disconnect', function () {
            console.log(socket.username + " disconnected");

            if (typeof(users[socket.room]) !== 'undefined' && typeof(users[socket.room][socket.username]) !== 'undefined') {
                delete users[socket.room][socket.username];

                socket.broadcast.to(socket.room).emit('join:room', users[socket.room]);

                socket.leave(socket.room);
            }
        });

        
         socket.on('leave:room', function () {
            console.log(socket.username + " leaving room");

            if (typeof(users[socket.room]) !== 'undefined' && typeof(users[socket.room][socket.username]) !== 'undefined') {
                delete users[socket.room][socket.username];

                socket.broadcast.to(socket.room).emit('join:room', users[socket.room]);

                socket.leave(socket.room);
            }
        });


        socket.on('reveal:votes', function () {
            console.log("reveal votes");

            socket.broadcast.to(socket.room).emit('reveal:votes');
        });
        
        socket.on('reset:votes', function () {
            console.log("reset votes");
            for(var i in users[socket.room]){
                users[socket.room][i].hasVoted = false;
                users[socket.room][i].vote = "";
            }
//            socket.broadcast.to(socket.room).emit('reset:votes');
            socket.broadcast.to(socket.room).emit('join:room', users[socket.room]);

            socket.emit('join:room', users[socket.room]);
        });

    });
};