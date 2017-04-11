const Discord = require('discord.js');
const client = new Discord.Client();

const secrets = require('./secrets');
const token = secrets.token;

const commands = require('./commands.js');
var botOwner = String(process.argv.slice(2));

var channel;
var text;
var startTime;

client.on('ready', () => {
    startTime = new Date();
    channel = client.channels.find('name', 'status');
    console.log('Shitty-Bot is online.');
    if (botOwner === '') {
        botOwner = "Jeff";
    }
    channel.sendMessage(`${botOwner}\'s Shitty-Bot is online.`);
});

client.on('disconnect', () => {
    channel = client.channels.find('name', 'status');
    console.log('Shitty-Bot is disconnecting');
    channel.sendMessage(`${botOwner}\'s Shitty-Bot is disconnecting.`);
});

client.on('message', message => {

    console.log(message.channel.id + ' > ' + message.author.username + ' > ' + message.content);

    channel = client.channels.get(message.channel.id); // Switch to the channel the last message was sent from
    text = message.content.toLowerCase(); // To do: Find a better way to handle case sensitivity
    
    if (text === '/shutdown ' + botOwner.toLowerCase()) {
        channel.sendMessage(`${botOwner}\'s Shitty-Bot Shutting down.`);
        client.destroy();
    }
    
    else if (text.includes('stock')) {
        commands.getStockPrice(channel, text);
    }

    else if (text === 'uptime') {
        channel.sendMessage(commands.uptime(client, startTime));
    }

    else if (text.includes(botOwner.toLowerCase()) && message.author.username != 'Shitty-Bot') {
        commands.insult(channel, botOwner);
    }

});

client.login(token);
