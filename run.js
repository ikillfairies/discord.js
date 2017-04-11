const Discord = require('discord.js');
const client = new Discord.Client();

const secrets = require('./secrets');
const token = secrets.token;

const commands = require('./commands.js');
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
    text = message.content.toLowerCase(); // To do: Find a better way to handle case sensitivity

    if (text.includes('stock')) {
        commands.getStockPrice(channel, text);
    }

    if (text === 'uptime') {
        channel.sendMessage(commands.uptime(client, startTime));
    }

    // lol joe
    if (text.includes(botOwner.toString().toLowerCase()) && message.author.username != 'Shitty-Bot') {
        commands.insult(channel, botOwner.toString());
    }

    if (text === '/shutdown') {
        channel.sendMessage('Shutting down.');
        client.destroy();
    }

});

client.login(token);
