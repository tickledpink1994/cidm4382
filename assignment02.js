var express = require('express');
var app = express();

//all 'pages' must return 
//the start of an html document
//[optional] some content
//the main menu
//the end of an html document
var startDoc = "<!DOCTYPE html><html><body>";
var endDoc = "</body></html>";
var menu = "<a href='fortune'>Get Your Fortune</a></br>"
            + "<a href='/horoscope'>Get Todays Horoscope</a>";


//this is the main page, traditionally named index
app.use("/index", function(req,res){
    var mainscreen = startDoc + menu + endDoc;
    res.end(mainscreen);
});


//display the user a random fortune
app.use("/fortune", function(req, res) {
    readfortunes(function(data)
    {
        var fortune = getrandomfortune(data) + "\n";
        res.end(startDoc + "<p>" + fortune + "</p>" + menu + endDoc);
    });
});


//get the users birthdate so we can display the horsocope
app.use("/horoscope", function(req,res){
    //and yah... Its bed time.
    res.end(startDoc + "<p>503: Out of Resources</br>" 
        + "The college student in question has run out of gas."
        + "  Our apologies for the inconvience.</p>"
        + menu + endDoc);
    //The amount of time each task takes is growing expontentionally to the time I continue to stay up.
});

//don't forget that Cloud9 requires process.env.PORT to work
app.listen(process.env.PORT);
module.exports = app;


function readfortunes(callback){
    var fs = require('fs');
    return fs.readFile("fortunes.txt", 'utf8', function (err, data){
        //var fortuneError = "404 Fortune Not Found.";
        if (err) {
            return;
        }
        callback(data);
    });
}

function getrandomfortune(data){
    var arrData = data.split("\n");
    var linecount = arrData.length;
    var randIndex = Math.random() * (linecount);
    var fortuneline = arrData[Math.floor(randIndex)];
    return fortuneline;
}

