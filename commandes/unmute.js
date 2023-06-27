const Discord = require("discord.js")
const ms = require("ms")
module.exports = {

    name: "unemute",
    description: "UnMute un membre",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    category: "Modérations",
    dm: false,
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à UnMute",
            autocomplete: false,
            required: true
        }, {
            type: "string",
            name: "raison",
            description: "Raison du UnMute",
            autocomplete: false,
            required: false
        }
    ],
    
    async run(bot, message, args) {
        let user = args.getUser("membre")
        if(!user) return message.reply('Pas de membre')
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Pas de membre à unmute !")

        let reason = args.getString("raison")
        if(!reason) reason = "Pas de raison fournie.";

        if(!member.moderatable) return message.reply("Je peux pas faire sa !")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peux pas mute ce membre !")
        if(member.isCommunicationDisabled()) return message.reply('Membre n\'est pas mute')

        try {await user.send(`Vous avez été unmute par ${message.user.tag} pour la raison suivantes: \`${reason}\``)} catch (err) {}
        await message.reply(`${message.user} a unmute ${user.tag} pour la raison suivantes: \`${reason}\``)
        await member.timeout(null, reason)
    }
}