const low = require('lowdb');
const getStockPrice = require('./getStockPrice.js');
const db = low('db.json');

db.defaults({portfolios: []}).write();

module.exports = (

    function(channel, text, userid) {
        //tokenize portfolio arguments
        var arrSymbols = text.split(' ');
        var portindex = db.get('portfolios').findIndex({user: userid}).value();
        console.log(portindex);
        if (portindex == -1) {
            if (arrSymbols.length == 1){
                channel.sendMessage('No portfolio found');
            } else {
                db.get('portfolios').push({user: userid, symbols: arrSymbols.slice(1)}).write();
                channel.sendMessage('inserted portfolio ' + arrSymbols.slice(1) + ' for user ' + channel.client.users.get(userid).username);
            }
        } else {
            if (arrSymbols.length == 1){
                var portfolio = db.get(`portfolios[${portindex}]`).value().symbols;
                getStockPrice(channel, portfolio.toString().toUpperCase());
            } else {
                db.set(`portfolios[${portindex}].symbols`, arrSymbols.slice(1)).write();
                channel.sendMessage('updated portfolio ' + arrSymbols.slice(1) + ' for user ' + channel.client.users.get(userid).username);
            }

        }

    }

)
