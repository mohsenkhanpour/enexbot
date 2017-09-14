var request = require("request");
var options = { method: 'GET',
    url: 'http://corpus.vocabulary.com/api/1.0/examples.json',
    qs: { query: "danger", 
    maxResults: '200', 
    domain: 'F' },
    json: true};

request(options, function (error, response, body) {
     if (body.result == null){
         return console.log( "No example found. Try a new word.");
    }
    else{
        body.result.sentences.forEach(function(sentences,i)
            {if (i <= 10) {
            console.log(sentences.sentence + sentences.volume.author )}
            });
       
        }});