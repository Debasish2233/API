var https = require('follow-redirects').https;
var fs = require('fs');

var options = {
  'method': 'GET',
  'hostname': 'api.dictionaryapi.dev',
  'path': '/api/v2/entries/en/prince',
  'headers': {},
  'maxRedirects': 20
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    var response = JSON.parse(body.toString());

    response.forEach((entry) => {
      console.log(`Word: ${entry.word}`);
      
      entry.meanings.forEach((meaning) => {
        console.log(`Part of Speech: ${meaning.partOfSpeech}`);
        
        meaning.definitions.forEach((definition, index) => {
          console.log(`Definition ${index + 1}: ${definition.definition}`);
          
          if (definition.synonyms && definition.synonyms.length > 0) {
            console.log(`Synonyms: ${definition.synonyms.join(', ')}`);
          }
        });
      });
    });
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

req.end();