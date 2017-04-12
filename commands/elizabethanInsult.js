const request = require('request');
const insultURL = 'http://quandyfactory.com/insult/json';

module.exports = (

    function(channel, owner) {
        console.log('Retrieving an Elizabethan insult');
        request(insultURL, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                var response = JSON.parse(body);
                channel.sendMessage(`${owner}, ` + response.insult);
            }
            else {
                channel.sendMessage('Got an error: ', error, ', status code: ', response);
            }
        });
    }

)
