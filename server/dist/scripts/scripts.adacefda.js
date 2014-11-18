"use strict";angular.module("clientApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","ngStorage"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/room/:id",{templateUrl:"views/room.html",controller:"RoomCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("clientApp").service("roomService",["$http","$log",function(a,b){var c={createARoom:function(c,d){return b.log("creating a room"),a.post("/rooms",{name:c,owner:d})},getRoom:function(c){return b.log("getting details for room"+c),a.get("/rooms/"+c)}};return c}]),angular.module("clientApp").factory("socket",["$rootScope",function(a){var b=io.connect();return{on:function(c,d){b.on(c,function(){var c=arguments;a.$apply(function(){d.apply(b,c)})})},emit:function(c,d,e){b.emit(c,d,function(){var c=arguments;a.$apply(function(){e&&e.apply(b,c)})})}}}]),angular.module("clientApp").controller("MainCtrl",["$scope","$log","$location","$localStorage","roomService",function(a,b,c,d,e){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.name=d.pkrplnr_name,a.createARoom=function(){void 0===a.name?b.log("no name defined"):(d.pkrplnr_name=a.name,e.createARoom(a.roomName,d.pkrplnr_name).then(function(d){a.getName=!1,b.log("room created successfully"),c.path("/room/"+d.data.id)}))},a.roomName=""}]),angular.module("clientApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("clientApp").controller("RoomCtrl",["$scope","$log","$routeParams","socket","$localStorage","$location","roomService",function(a,b,c,d,e,f,g){a.numbers=[0,.5,1,2,3,5,8,13,20,40,100,"?"],a.getName=!1,a.selectedNumber="",a.getRoomDetails=function(){if(void 0===e.pkrplnr_name)b.log("no name defined"),a.getName=!0;else{a.getName=!1;var f=c.id;a.room_id=f,a.isDisabled=!1,g.getRoom(f,a.name).then(function(c){b.log("room details retrieved"),a.room=c.data,a.isDisabled=!1,a.isOwner=c.data.owner===a.name,d.emit("join:room",{name:a.name,room_id:f,isOwner:a.isOwner})})}},a.returnHome=function(){d.emit("leave:room"),f.path("/")},a.isOwner=!1,a.showVotes=!1,a.revealVotes=function(){a.showVotes=!0,a.isDisabled=!0,d.emit("reveal:votes")},a.resetVotes=function(){a.showVotes=!1,a.isDisabled=!1,a.selectedNumber="",d.emit("reset:votes")},a.setName=function(){e.pkrplnr_name=a.name,a.getName=!1,a.getRoomDetails()},a.room_id,a.isDisabled=!1,a.name=e.pkrplnr_name,a.storage=e,a.voted=function(c){b.log("voting"),a.selectedNumber=c,d.emit("selected:number",{vote:c})},a.votes={},d.on("selected:number",function(b){a.votes[b.name]=b}),d.on("join:room",function(c){b.log(name+" is joining room"),a.votes=c,a.isDisabled=!1}),d.on("reveal:votes",function(){a.showVotes=!0,a.isDisabled=!0}),d.on("reset:votes",function(){a.showVotes=!1,a.selectedNumber=""})}]);