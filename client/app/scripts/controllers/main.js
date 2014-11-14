'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('MainCtrl', function ($scope, $log, $location, $localStorage, roomService) {
        $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

        $scope.name = $localStorage.pkrplnr_name;

        $scope.createARoom = function () {

            if ($scope.name === undefined) {
                $log.log("no name defined");
            } else {
                $localStorage.pkrplnr_name = $scope.name;
                //call server to create a room
                roomService.createARoom($scope.roomName, $localStorage.pkrplnr_name).then(function (response) {
                    $scope.getName = false;
                    $log.log("room created successfully");
                    $location.path("/room/" + response.data.id);
                });
            }
        }

        $scope.roomName = "";
    });