var http = require("http");
var https = require("https");

/**
 * getJSON:  REST get request returning JSON object(s)
 * @param options: http options object
 * @param callback: callback to pass the results JSON object(s) back
 */



//Load the request module
var request = require('request');

//Lets configure and request
module.exports.downloadMenu = function(req, res, next) {
    var options = {
        url: 'https://api.locu.com/v2/venue/search',
        method: 'POST',
        headers: { //We can define headers too
            'Content-Type': 'application/JSON',

        },
        body: JSON.stringify({
          "api_key" : "2968d9e099921eda3f7a5ee412ae10cc24ad74e0",
          "fields" : [ "name", "location", "menus" ],
          "venue_queries" : [
            {
              "name" : req.body.name,
              "location": { "postal_code" : req.body.postal_code },
              "menus" : {"$present": true}
            }
          ]
        })
    };
    request(options, function(error, response, body){
        if(error) {
            console.log(error);
        } else {
            console.log(response.statusCode, body);
            res.menu = body;
            next();
        }
    });
    
}