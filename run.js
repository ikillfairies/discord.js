const Discord = require('discord.js');
const client = new Discord.Client();

const secrets = require('./secrets');
const token = secrets.token;

const commands = require('./commands.js');
var botOwner = process.argv.slice(2);

var channel;
var text;
<<<<<<< HEAD

client.on('ready', () => {
    channel = client.channels.find('name', 'status');
    console.log('Shitty-Bot is online.');
    channel.sendMessage(`${botOwner}\'s Shitty-Bot is online.`);
});

client.on('disconnect', () => {
    channel = client.channels.find('name', 'status');
    console.log('Shitty-Bot is disconnecting');
    channel.sendMessage(`${botOwner}\'s Shitty-Bot is disconnecting.`);
});

client.on('message', message => {

    // Log the conversation
    console.log(message.channel.id + ' > ' + message.author.username + ' > ' + message.content);

    // Switch to the channel the last message was sent from
    channel = client.channels.get(message.channel.id);

    // Let's use this for now, but maybe find a RegEx alternative for case insensitive string matching
    text = message.content.toLowerCase();

    // Handle stock requests
    if (text.includes('stock')) {
        commands.stock(channel, text);
    }

    // Respond to uptime request
    if (text === 'uptime') {
        channel.sendMessage(commands.uptime(client));
    }
    // lol joe
    if (text.includes(botOwner.toString().toLowerCase()) && message.author.username != 'Shitty-Bot') {
        commands.insult(channel, botOwner.toString());
    }

    if (text === '/exit') {
        commands.kill(client);
    }

=======
var startTime;

client.on('ready', () => {
  startTime = new Date();
  console.log('Shitty-Bot online');
});

client.on('disconnect', () => {
  startTime = new Date();
  console.log('Shitty-Bot offline');
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
  
  if (text.includes('joe') && message.author.username != 'Shitty-Bot') {
    commands.insultJoe(channel);
  }
  
  if (text === '/shutdown') {
    channel.sendMessage('Shutting down.');
    client.destroy(); 
  }
  
>>>>>>> 004d4359838142ba9babc96b1ac9cdfed7317941
});

client.login(token);
