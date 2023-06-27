const Discord = require("discord.js")

module.exports = {

    name: "nuke",
    description: "Supprimer tout les messages du salon",
    permission: Discord.PermissionFlagsBits.ManageChannels,
    category: "Modérations",
    dm: false,
    options: [],

    async run(bot, message) {

        message.channel.clone().then(msg => msg.send(`${message.user} a balancé une nuke`))
        message.channel.delete()
    }
}