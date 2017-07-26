const request = require('request');
const jokeURL = 'http://api.icndb.com/jokes/random';

module.exports = (

  function(channel) {
    request(jokeURL, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        var response = JSON.parse(body);
        channel.sendMessage(response.value.joke);
      }
      else {
        channel.sendMessage('Unable to look up Chuck Norris joke.');
      }
    });
  }

)
