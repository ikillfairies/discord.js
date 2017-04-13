const Discord = require('discord.js');
const secrets = require('./secrets');
const commands = require('./commands');
const stockPattern = /(stock |\$)\$[a-z]{1,5}/gi;

const client = new Discord.Client();

var botOwner = String(process.argv.slice(2)) || 'Jeff';
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
    text = text = message.content.toLowerCase();
    botStatus = client.user.presence.status;

    if (text === 'wake up' && botStatus == 'dnd') {
        client.user.setStatus('online');
        channel.sendMessage('ok, back');
        botAsleep = false;
    }
    else if (botStatus == 'dnd') return;

    var match;
    while ((match = stockPattern.exec(text)) !== null) {
        console.log(`Found ${match[0]}`);
        commands.getStockPrice(channel, match[0].toUpperCase());
    }

    // Shutdown needs to go first, if shutdown is called ignore everything else
    if (text === '/shutdown ' + botOwner.toLowerCase()) {
        channel.sendMessage(`${botOwner}\'s Shitty-Bot Shutting down.`);
        client.destroy();
    }

    else if (text === 'go to sleep' && botStatus == 'online') {
        client.user.setStatus('dnd');
        channel.sendMessage('brb afk');
        botAsleep = true;
    }

    else if (text === 'status' || text === 'uptime') {
        channel.sendMessage(commands.botStatus(client, client.readyAt, botOwner));
    }
/*
    else if (text.includes('stock')) {
        text = '$' + text.replace('stock', '').replace(' ', '');
        if (text.length < 6) commands.getStockPrice(channel, text.toUpperCase());
    }
*/
    else if (text.includes(botOwner.toString().toLowerCase())) {
        commands.elizabethanInsult(channel, botOwner);
    }

});

client.login(secrets.token);
