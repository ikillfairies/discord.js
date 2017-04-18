const request = require('request');
const secrets = require('../secrets');

const tradierURL = 'https://sandbox.tradier.com/v1/markets/options/expirations';
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
                symbol: ticker
            }
        };
        request(options, (error, response, body) => {
            try {
                if (!error && response.statusCode === 200) {
                    var response = JSON.parse(body).expirations.date;
                    response = String(response);
                    response = ticker + ' option expiration dates: ```' + response.replace(/,/g, '\n') + '```';
                    channel.sendMessage(response);
                }
                else {
                    channel.sendMessage('Got an error: ', error, ', status code: ', response);
                }
            }
            catch(err) {
                channel.sendMessage('Unable to look up ' + ticker + '.');
            }
        });
    }

)
