'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('RoomCtrl', function ($scope, $log, $routeParams, socket, $localStorage, $location, roomService) {
        $scope.numbers = [0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100, '?'];


        $scope.getName = false;

        $scope.selectedNumber = "";
    
        $scope.getRoomDetails = function () {

            if ($localStorage.pkrplnr_name === undefined) {
                $log.log("no name defined");
                $scope.getName = true;
            } else {
                $scope.getName = false;
                var id = $routeParams.id;
                $scope.room_id = id;
                $scope.isDisabled = false;
                //call server to get room details
                roomService.getRoom(id, $scope.name).then(function (response) {
                    $log.log("room details retrieved");

                    $scope.room = response.data;
                    $scope.isDisabled = false;
                    $scope.isOwner = response.data.owner === $scope.name

                    socket.emit('join:room', {
                        name: $scope.name,
                        room_id: id,
                        isOwner: $scope.isOwner
                    });

                });
            }
        }
        
        $scope.returnHome = function(){
            socket.emit('leave:room');
            $location.path("/");
        }

        $scope.isOwner = false;

        $scope.showVotes = false;

        $scope.revealVotes = function () {
            $scope.showVotes = true;
            $scope.isDisabled = true;
            socket.emit('reveal:votes');
        }

        $scope.resetVotes = function () {
            $scope.showVotes = false;
            $scope.isDisabled = false;
            $scope.selectedNumber = "";
            socket.emit('reset:votes');
        }

        $scope.setName = function () {
            $localStorage.pkrplnr_name = $scope.name;
            $scope.getName = false;
            $scope.getRoomDetails();
        }

        $scope.room_id;

       // $scope.selectedNumber = "";

        $scope.isDisabled = false;

        $scope.name = $localStorage.pkrplnr_name;

        $scope.storage = $localStorage;

        $scope.voted = function (number) {

            $log.log("voting");

            $scope.selectedNumber = number;

            socket.emit('selected:number', {
                vote: number
            });
        };

        $scope.votes = {};

        socket.on('selected:number', function (data) {
            $scope.votes[data.name] = data;

        });

        socket.on('join:room', function (users) {
            $log.log(name + " is joining room");
            $scope.votes = users;
            $scope.isDisabled = false;
            

        });

        socket.on('reveal:votes', function () {
            $scope.showVotes = true;
            $scope.isDisabled = true;

        });

        socket.on('reset:votes', function () {
            $scope.showVotes = false;
            
            $scope.selectedNumber = "";

        });




    });