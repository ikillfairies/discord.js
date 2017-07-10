const Discord = require('discord.js');
const secrets = require('./secrets');
const commands = require('./commands');

const os = require('os');

const stockPattern = /\$[a-z]{1,5}/gi;
const portfolioPattern = /^(port)( [a-z]{1,5})*/gi;
const sendMessagePattern = /^(sendMessage )([0-9]{18})/gi;
const channelPattern = /[0-9]{18}/gi;

const client = new Discord.Client();
const botOwner = os.userInfo().username;

var botStatus;
var channel;
var text;

client.on('ready', () => {
    console.log(`${botOwner}\'s Shitty-Bot is online.`);
});

client.on('disconnect', () => {
    console.log('Shitty-Bot is disconnecting');
});

// Note: You must pass channel in explicitly when doing an asynch JSON request
client.on('message', message => {

    console.log('[' + message.channel.id + '] ' + message.author.username + ': ' + message.content);
    if (message.author.username === 'Shitty-Bot') return;

    channel = client.channels.get(message.channel.id);
    text = message.content.toLowerCase();
    botStatus = client.user.presence.status;

    if (text === 'wake up' && botStatus == 'dnd') {
        client.user.setStatus('online');
        channel.send('ok, back');
    }
    else if (botStatus == 'dnd') return;

    var match;
    if ((match = stockPattern.exec(text)) !== null) {
        var tickers = match[0].slice(1) + ',';
        while ((match = stockPattern.exec(text)) !== null) {
            tickers = tickers + match[0].slice(1) + ',';
        }
        tickers = tickers.substring(0, tickers.length - 1).toUpperCase();
        console.log(`Found stockPattern matches: ${tickers}`);
        commands.getStockPrice(channel, tickers);
    }

    if ((match = sendMessagePattern.exec(text)) !== null) {
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

    while ((match = portfolioPattern.exec(text)) !== null) {
        console.log('portfolio triggered');
        commands.portfolio(channel, text, message.author.id);
    }

    if (text === 'shutdown ' + botOwner.toLowerCase()) {
        channel.send(`${botOwner}\'s Shitty-Bot shutting down.`);
        client.destroy();
    }

    else if (text === 'go to sleep' && botStatus == 'online') {
        client.user.setStatus('dnd');
        channel.send('brb afk');
    }

    else if (text === 'status' || text === 'uptime') {
        channel.send(commands.botStatus(client, client.readyAt, botOwner));
    }

    else if (text.includes(botOwner.toString().toLowerCase())) {
        commands.elizabethanInsult(channel, botOwner);
    }

    else if (text.includes('options') && text.length < 14) {
        text = text.replace('options', '').replace(' ', '');
        console.log(text);
        commands.getOptionsChain(channel, text.toUpperCase());
    }

    else if (text.includes('expirations') && text.length < 18) {
        text = text.replace('expirations', '').replace(' ', '');
        console.log(text);
        commands.getOptionsExpirations(channel, text.toUpperCase());
    }

    else if (text.includes('price') && text.length < 10) {
        text = text.replace('price', '').replace(' ', '').toUpperCase();
        commands.getCryptoPrice(channel, text);
    }

});

client.login(secrets.token);
