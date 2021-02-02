const Discord = require("discord.js");
require('dotenv').config();
const bot = new Discord.Client();
const client = new Discord.Client();
const TOKEN = process.env.TOKEN;

client.login(TOKEN);


bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});
//message read and send after the "ping" command
bot.on('message', msg => {
    if (msg.content === 'ping') {
        const taggedUser = msg.mentions.users.first();
        msg.reply( 'Hey ${taggedUser.username}' );
        

    } else if (msg.content.startsWith('!kick')) {
        if (msg.mentions.users.size) {
            msg.channel.send(`You wanted to kick: ${taggedUser.username}. you know your reasons i guess`);
        } else {
            msg.reply('Just enter a valid user! Baka! ');
        }
    }
});



const prefix = '/';
 
const fs = require('fs');
 
client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}
 

bot.once('ready', () => {
    console.log('Operation Astolfo Is Starting....');
});

bot.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
 
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
 
    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
    } else if (command == 'verify'){
        client.commands.get('verify').execute(message, args);
    } else if (command == 'rules'){
        client.commands.get('rules').execute(message, args, Discord);
    } else if (command == 'clear'){
        client.commands.get('clear').execute(message, args);
    } else if (command == 'kick'){
        client.commands.get('kick').execute(message, args);
    } else if (command == 'ban'){
        client.commands.get('ban').execute(message, args);
    } else if (command == 'mute'){
        client.commands.get('mute').execute(message, args);
    } else if (command == 'unmute'){
        client.commands.get('unmute').execute(message, args);
    }
});

bot.login(process.env.DISCORD_TOKEN);
