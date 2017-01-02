var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var assert = require('assert');
var fs = require('fs');

var MongoClient = mongodb.MongoClient;
const request = require('request'),url = 'http://s3.amazonaws.com/vodassets/showcase.json'

var mongoURL = 'mongodb://localhost:27017/s3_amazon';

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

request(url, function(error, response, body) {
    if (!error && response.statusCode === 200) {

        const fbResponse = JSON.parse(body);

        fs.writeFile('response.json', body, function (err) {
            if (err){
                console.log(err)
            }
            else
                {
                insertCollection();
            }
        });

    } else {
        console.log("Got an error: ", error, ", status code: ", response.statusCode)
    }
});


router.get('/getShowcase', function(req,res){
    MongoClient.connect(mongoURL, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('showCase');
            collection.find().toArray(function(err, docs){
                // var obj = JSON.stringify(docs);
                // res.send(obj);

                var response = new Object();
                response.data = docs;
                response.message = "success";
                response.success = true;
                res.send(response);

            });

            db.close();
        }
    });
});

function insertCollection() {
    MongoClient.connect(mongoURL, function(err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        fs.readFile('response.json', 'utf8', function (err, data) {
            if (err){
                throw err;
            }
            else{
                var json = JSON.parse(data);
                var collection = db.collection('showCase');
                collection.remove({});
                collection.insert(json, function (err, doc) {
                    db.close();
                    if (err) {
                        throw err;
                    }
                    else{
                        console.log('inserted');
                    }
                });
            }

        });

    });
}

module.exports = router;
