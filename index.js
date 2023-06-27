const Discord = require('discord.js')
const Intents = new Discord.IntentsBitField(3276799)
const bot = new Discord.Client({intents: 3276799})
const LoadCommands = require("./loader/loaderCommands")
const loadEvents = require('./loader/loadEvents')
const config = require("./config")

bot.commands = new Discord.Collection()
bot.function = {
    createId: require('./function/createid')
}

bot.login(config.token)
LoadCommands(bot)
loadEvents(bot)