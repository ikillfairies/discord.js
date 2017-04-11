const request = require('request');
const stockURL = 'http://finance.google.com/finance/info?client=ig&q=';
const insultURL = 'http://quandyfactory.com/insult/json';

// Note: You must pass channel in explicitly when doing an asynch JSON request
module.exports = {
    // See http://www.jarloo.com/real-time-google-stock-api/ for API documentation
    // To do: Get a better API, this one blows
    getStockPrice: function(channel, ticker) {
        ticker = ticker.replace(' ', '');
        ticker = ticker.replace('stock', '');
        ticker = ticker.toUpperCase();
        if (ticker.length < 6) {
            request(stockURL + ticker, (error, response, body) => {
                try {
                    var parsedBody = body.split('[')[1].split(']')[0];
                    if (!error && response.statusCode === 200) {
                        var response = JSON.parse(parsedBody);
                        channel.sendMessage('Last price for ' + ticker + ': ' + response.l);
                    }
                    else {
                        channel.sendMessage('Got an error: ', error, ', status code: ', response);
                    }
                }
                catch(err) {
                    channel.sendMessage('Unable to look up "' + ticker + '".');
                }
            },

                // Uptime - tell me how long the bot's been online, or more importantly if it's actually online
                uptime: function(client) {
                    // To do: make this fancier and actually tell you what time the bot came online
                    var uptime = client.uptime / 1000;
                    return 'Online for ' + uptime + ' seconds.';
                },

                // Insult - generate an Elizabethan insult and send it
                insult: function(channel, owner) {
                    console.log('Retrieving an Elizabethan insult');
                    request(insultURL, (error, response, body) => {
                        if (!error && response.statusCode === 200) {
                            var response = JSON.parse(body);
                            channel.sendMessage(`${owner}, ` + response.insult);
                        }
                        else {
                            channel.sendMessage('Got an error: ', error, ', status code: ', response);
                        }
                    })
                },

                kill: function(client) {
                    client.destroy();
                }
        },

            // Tell me how long the bot's been online, or more importantly if it's actually online
            uptime: function(client, startTime) {
                var uptime = client.uptime / 1000;
                return `Online for ${uptime} seconds since ${startTime.toUTCString()}.`;
            },

            // generate an Elizabethan insult and send it (to joe)
            insultJoe: function(channel) {
                console.log('Retrieving an Elizabethan insult');
                request(insultURL, (error, response, body) => {
                    if (!error && response.statusCode === 200) {
                        var response = JSON.parse(body);
                        channel.sendMessage('Joe, ' + response.insult);
                    }
                    else {
                        channel.sendMessage('Got an error: ', error, ', status code: ', response);
                    }
                })
            }

    }
