const request = require('request');
const stockURL = 'http://finance.google.com/finance/info?client=ig&q=';

module.exports = (

    // See http://www.jarloo.com/real-time-google-stock-api/ for API documentation
    // To do: Get a better API, this one blows
    function(channel, ticker) {
        request(stockURL + ticker.slice(1), (error, response, body) => {
            try {
                var parsedBody = body.split('[')[1].split(']')[0];
                if (!error && response.statusCode === 200) {
                    var response = JSON.parse(parsedBody);
                    channel.sendMessage(`${ticker}: ${response.l} (${response.cp}%)`)
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
