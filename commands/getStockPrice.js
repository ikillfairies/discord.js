const request = require('request');
const secrets = require('../secrets');

const tradierURL = 'https://sandbox.tradier.com/v1/markets/quotes';
const tradierToken = 'Bearer ' + secrets.tradierToken;

module.exports = (

    function(channel, ticker) {
        var options = {
            url: tradierURL,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': tradierToken
            },
            form: {
                symbols: ticker.slice(1)
            }
        };
        request(options, (error, response, body) => {
            try {
                if (!error && response.statusCode === 200) {
                    var response = JSON.parse(body).quotes.quote;
                    console.log(response);
                    channel.sendMessage(`${ticker}: ${response.last} (${response.change_percentage}%)`);
                }
                else {
                    channel.sendMessage('Got an error: ', error, ', status code: ', response);
                }
            }
            catch(err) {
                channel.sendMessage('Unable to look up "' + ticker + '".');
            }
        });
    }

)
