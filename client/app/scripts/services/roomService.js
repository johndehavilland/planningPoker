angular.module('clientApp')
    .service('roomService', function ($http, $log) {
        var roomService = {
            createARoom: function (name, owner) {
                $log.log("creating a room");
                //call server to create a room
                return $http.post("/rooms", {
                    name: name,
                    owner: owner
                });
            },
            getRoom: function (id) {
                $log.log("getting details for room" + id);
                //call server to create a room
                return $http.get("/rooms/" + id);
            }
        };

        return roomService;
    });