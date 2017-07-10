const request = require('request');
const secrets = require('../secrets');
//api reference: https://developer.tradier.com/documentation
const tradierURL = 'https://sandbox.tradier.com/v1/markets/quotes';
const tradierToken = 'Bearer ' + secrets.tradierToken;

module.exports = (

    function(channel, ticker) {
        var message = '';
        var options = {
            url: tradierURL,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': tradierToken
            },
            form: {
                symbols: ticker
            }
        };
        request(options, (error, response, body) => {
            try {
                if (!error && response.statusCode === 200) {
                    var response = JSON.parse(body).quotes.quote;
                    if (response.length == undefined) {
                        message = `${response.symbol}: ${response.last} (${response.change_percentage}%)`;
                    }
                    else {
                        for (i = 0; i < response.length; i++) {
                            message = message + `${response[i].symbol}: ${response[i].last} (${response[i].change_percentage}%)\n`;
                        }
                    }
                    channel.sendMessage('```' + message + '```');
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
