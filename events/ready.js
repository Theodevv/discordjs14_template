const { Discord, IntentsBitField, ActivityType } = require('discord.js');
const loadSlashCommands = require("../loader/loadSlashCommands")

let status = [
    {
      name: 'avec les membres', //* Joue a
    },
    {
      name: 'les membres',
      type: ActivityType.Watching, //* Regarde
    },
    {
      name: 'tout les membres',
      type: ActivityType.Listening, //* Écoute
    },
];

module.exports =  async bot => {

    await loadSlashCommands(bot)

    console.log(`${bot.user.tag} est bien en ligne !`)

    bot.user.setStatus('dnd'); //* Status : Ne pas déranger
    setInterval(() => {
        let random = Math.floor(Math.random() * status.length);
        bot.user.setActivity(status[random]);
    }, 10000);
}