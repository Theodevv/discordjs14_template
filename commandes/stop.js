const Discord = require("discord.js");

module.exports = {
    name: 'stop',
    permission: Discord.PermissionFlagsBits.Administrator,
    description: 'Permet de stopper le bot',
    category: "Modérations",
    dm: true,

    async run(bot, interaction) {
        await interaction.reply({ content: 'Le bot a été stoppé', ephemeral: true });
        console.log('Le bot a été stoppé');
        return process.exit();
    },
};