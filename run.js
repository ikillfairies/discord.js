const Discord = require('discord.js');
const client = new Discord.Client();

const secrets = require('./secrets');
const token = secrets.token;

const commands = require('./commands.js');
const stockPatt = /\$[a-z]{1,5}/gi;
var botOwner = process.argv.slice(2);

var channel;
var text;
var startTime;

client.on('ready', () => {
    channel = client.channels.find('name', 'status');
    console.log('Shitty-Bot is online.');
    if (botOwner.toString() === ''){
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
    var text = '';
    if (message.author.username != 'Shitty-Bot') {
        text = message.content.toLowerCase(); // To do: Find a better way to handle case sensitivity
    }

    var match;
    while ((match = stockPatt.exec(text)) !== null){
        console.log(`found ${match[0]}`);
        commands.getStockPrice(channel, match[0]);
    }

    if (text === 'uptime') {
        channel.sendMessage(commands.uptime(client, startTime));
    }

    // lol joe
    if (text.includes(botOwner.toString().toLowerCase())) {
        commands.insult(channel, botOwner.toString());
    }

    if (text === '/shutdown') {
        channel.sendMessage(`${botOwner}\'s Shitty-Bot Shutting down.`);
        client.destroy();
    }

});

client.login(token);
