// Include Express
var express = require('express');
// Initialize the Router
var router = express.Router();

var _room = {};

function isEmpty(obj) {
    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length && obj.length > 0) return false;
    if (obj.length === 0) return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and toValue enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

// Setup the Route
router.post('/', function (req, res) {

    // show the request body in the command line
    console.log(req.body);

    var lower = 0;
    var upper = 10000000000;

    var random = Math.floor(Math.random() * (upper - lower)) + lower;

    var body = req.body;

    if (isEmpty(body.name) || isEmpty(body.owner)) {
        res.status(404).send('Not found');
    } else {

        //store in db
        _room.id = random;
        _room.name = body.name;
        _room.owner = body.owner;

        // return a json response to angular
        res.json(_room);
    }
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