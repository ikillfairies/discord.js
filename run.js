const Discord = require('discord.js');
const secrets = require('./secrets');
const commands = require('./commands');
const os = require('os');

const client = new Discord.Client();
const botOwner = os.userInfo().username;

const channelPattern = /[0-9]{18}/gi;
const chuckNorrisJoke = /^(chuck norris)/gi;
const evalPattern = /^(eval )/gi;
const startNotificationPattern = /^(notify when )/gi;
const stopNotificationPattern = /^(stop notifications)/gi;
const portfolioPattern = /^(port)( [a-z]{1,5})*/gi;
const sendMessagePattern = /^(sendMessage )([0-9]{18})/gi;
const stockPattern = /\$[a-z]{1,5}/gi;

var botStatus;
var channel;
var notification;
var timeout = 5000;
var text;

client.on('ready', () => {
    console.log(`${botOwner}\'s Shitty-Bot is online.`);
});

client.on('disconnect', () => {
    console.log('Shitty-Bot is disconnecting');
});

// Note: You must pass channel in explicitly when doing an asynch JSON request
client.on('message', message => {

    // Message logging, don't touch this
    console.log('[' + message.channel.id + '] ' + message.author.username + ': ' + message.content);
    if (message.author.username === 'Shitty-Bot') return;

    // Set channel context based on last message received
    channel = client.channels.get(message.channel.id);
    text = message.content;
    botStatus = client.user.presence.status;

    // Sleep command
    if (text === 'wake up' && botStatus == 'dnd') {
        client.user.setStatus('online');
        channel.send('ok, back');
    }
    else if (botStatus == 'dnd') return;

    var match;

    if ((match = startNotificationPattern.exec(text)) != null) {
        var notificationText = text.replace(match[0], '');
        var notificationChannel = channel;
        if (notification == undefined || notification._idleTimeout == -1) {
            notification = setInterval(function() {
                commands.checkPrice(notification, commands, notificationChannel, notificationText);
            }, timeout);
            commands.checkPrice(notification, commands, notificationChannel, notificationText);
        }
        else channel.send('Stop existing notification before starting a new with `stop notifications`.')
        startNotificationPattern.lastIndex = 0;
    }
    else if (notification != undefined && notification._idleTimeout != -1 && stopNotificationPattern.exec(text) != null) {
        channel.send('Ok');
        clearInterval(notification);
    }

    else if ((match = stockPattern.exec(text)) != null) {
        var tickers = match[0].slice(1) + ',';
        while ((match = stockPattern.exec(text)) != null) {
            tickers = tickers + match[0].slice(1) + ',';
        }
        tickers = tickers.substring(0, tickers.length - 1).toUpperCase();
        console.log(`Found stockPattern matches: ${tickers}`);
        commands.getStockPrice(channel, tickers);
    }
    else if ((match = sendMessagePattern.exec(text)) != null) {
        var channelID = channelPattern.exec(text)[0];
        var sendToChannel = client.channels.get(channelID);
        if (sendToChannel != undefined) {
            sendToChannel.send(text.replace(match[0], ''));
        }
        else {
            channel.send(String(sendToChannelID) + ' is not a valid channel.');
        }
        sendMessagePattern.lastIndex = 0;
        channelPattern.lastIndex = 0;
    }
    else if ((match = portfolioPattern.exec(text)) != null) {
        console.log('portfolio triggered');
        commands.portfolio(channel, text, message.author.id);
    }

    if (chuckNorrisJoke.exec(text) != null) {
        commands.chuckNorrisJoke(channel);
    }

    // This is dangerous, shouldn't really have it but yolo
    if ((message.author.id == '162024171935760384') && ((match = evalPattern.exec(text)) != null)) {
        try {
            eval(text.replace(match[0], ''));
        }
        catch(err) {
            channel.send('Error: ' + err);
        }
    }

    if (text.toLowerCase() === 'shutdown ' + botOwner.toLowerCase()) {
        channel.send(`${botOwner}\'s Shitty-Bot shutting down.`);
        client.destroy();
    }

    else if (text.toLowerCase() === 'go to sleep' && botStatus == 'online') {
        client.user.setStatus('dnd');
        channel.send('brb afk');
    }

    else if (text.toLowerCase() === 'status' || text.toLowerCase() === 'uptime') {
        channel.send(commands.botStatus(client, client.readyAt, botOwner));
    }

    else if (text.includes(botOwner.toString().toLowerCase())) {
        commands.elizabethanInsult(channel, botOwner);
    }

    else if (text.includes('price') && text.length < 10) {
        text = text.replace('price', '').replace(' ', '').toUpperCase();
        commands.getCryptoPrice(channel, text);
    }

});

client.login(secrets.token);
