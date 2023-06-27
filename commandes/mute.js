const Discord = require("discord.js")
const ms = require("ms")
module.exports = {

    name: "mute",
    description: "Mute un membre",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    category: "Modérations",
    dm: false,
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à Mute",
            autocomplete: false,
            required: true
        }, {
            type: "string",
            name: "temps",
            description: "Temps du Mute",
            autocomplete: false,
            required: true
        }, {
            type: "string",
            name: "raison",
            description: "Raison du Mute",
            autocomplete: false,
            required: false
        }
    ],
    
    async run(bot, message, args) {
        let user = args.getUser("membre")
        if(!user) return message.reply('Pas de membre')
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Pas de membre à mute !")

        let time = args.getString("temps")
        if(!time) return message.reply("Temps non mit")
        if(isNaN(ms(time))) return message.reply("Pas le bon format")

        if(ms(time) > 2419200000) return message.reply("Le mute peut pas aller au dela de 24 jours")

        let reason = args.getString("raison")
        if(!reason) reason = "Pas de raison fournie.";

        if(message.user.id === user.id) return message.reply("Te mute pas tous seul couillon !")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("Ne ban pas le propriétaire du serveur !") 
        if(!member.moderatable) return message.reply("Je peux pas faire sa !")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peux pas mute ce membre !")
        if(member.isCommunicationDisabled()) return message.reply('Membre déja mute')

        try {await user.send(`Tu a été mute du serveur ${message.guild.name} par ${message.user.tag} pendant ${time} pour la raison : \`${reason}\``)} catch(err) {}
            
        await message.reply(`${message.user} a mute ${user.tag} pendant ${time} pour la raison : \`${reason}\``)

        await member.timeout(ms(time), reason)
    }
}