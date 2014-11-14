// Include Express
var express = require('express');
// Initialize the Router
var router = express.Router();

var _room = {};

// Setup the Route
router.post('/', function (req, res) {

    // show the request body in the command line
    console.log(req.body);
  
    var lower = 0;
    var upper = 10000000000;

    var random = Math.floor(Math.random() * (upper - lower)) + lower;

    var body = req.body;

    //store in db
    _room.id = random;
    _room.name = body.name;
    _room.owner = body.owner;

    // return a json response to angular
    res.json(_room);
});

router.get('/:id', function (req, res) {
    // show the request body in the command line
    console.log(req.body);
    var id = req.params[0];
    var name = req.params[1];

    //check for room in db


    res.json(_room);
});


// Expose the module
module.exports = router;