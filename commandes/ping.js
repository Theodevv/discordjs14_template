const Discord = require("discord.js");

module.exports = {
    name: "ping",
    description: "Affiche la latence du bot",
    permission: Discord.PermissionFlagsBits.Administrator,
    category: "Modérations",
    dm: true,

    async run(bot, interaction) {
        await interaction.reply(`Ping : \`${bot.ws.ping}\` ms`);
    },
};