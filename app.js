//jshint esversion: 6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const PORT = 8080
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true})); 

app.get('/', function(req, res){
    //console.log("get");
    res.sendFile(__dirname + '/signup.html');
})

app.post('/', function(req, res){
    var name = req.body.inputName;
    var email = req.body.inputEmail;
    //console.log(req.body);
    //res.send("wertyq")
    const userDetails = {
        members:
        [
            {
                email_address: email,
                merge_fields:
                {
                    NAME: name
                },
                status: "subscribed"
            }
        ]
    }
    const jsonData = JSON.stringify(userDetails);
    //make reeq to mail chimpserver
    const url = "https://us19.api.mailchimp.com/3.0/lists/f80ce1ac73"
    const options = {
        method: "POST",
        auth: "rohan:<TODO: mask the api key>"
    }
    var request = https.request(url, options, function(response){
        if (response.statusCode == 200){
            res.sendFile(__dirname + '/success.html');
        }
        else{
            console.log("StausCode : ", response.statusCode);
            res.sendFile(__dirname + '/failure.html');
        }
        response.on("data", function(data){
            console.log("");
        });
    });
    request.write(jsonData);
    request.end();
});

app.listen(PORT, function(){
    console.log("Server is up...@", PORT)
});

//api key : masked
//list id : f80ce1ac73
