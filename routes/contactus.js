var express = require('express');
var fs = require("fs");
var path = require("path");
var router = express.Router();

var filePath = path.join(__dirname, 'input.txt');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('contactus.html', { title: 'Contact Us'});
});

router.post('/', function (req, res) {
    req.assert('fullName', 'full name reqiured').notEmpty();
    req.assert('type', 'Type reqiured').notEmpty();
    req.assert('message', 'message reqiured').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        res.json(JSON.stringify(errors));
    } else { 
        console.log(req.body);
        var data = JSON.stringify(req.body);
        fs.writeFile(filePath, data, function (err, data) {
            if (err) {
                throw err;
            }
            console.log('Done');
        });
        
        res.json("Thank You!!")
    }

    
});

module.exports = router;