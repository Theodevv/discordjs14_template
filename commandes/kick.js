const Discord = require("discord.js")
module.exports = {

    name: "kick",
    description: "kick un membre",
    permission: Discord.PermissionFlagsBits.KickMembers,
    category: "Modérations",
    dm: false,
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à Kick",
            autocomplete: false,
            required: true
        }, {
            type: "string",
            name: "raison",
            description: "La raison du Kick",
            autocomplete: false,
            required: false
        }
    ],
    
    async run(bot, message, args) {

        try{

            let user = args.getUser("membre")
            if(!user) return message.reply("Pas de mambre à kick")
            let member = message.guild.members.cache.get(user.id)
            if(!member) return message.reply("Pas de membre à kick !")
            
            let reason = args.getString("raison")
            if(!reason) reason = "Pas de raison fournie.";

            if(message.user.id === user.id) return message .reply("Essaie pas de te kick !")
            if((await message.guild.fetchOwner()).id === user.id) return message.reply("Ne kick pas le propriétaire du serveur !")
            if(member && !member.bannable) return message.reply("Je ne peux pas kick ce membre !")
            if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peux pas kick ce membre !")

            try {await user.send(`Tu a été kick du serveur ${message.guild.name} par ${message.user.tag} pour la raison : \`${reason}\``)} catch(err) {}
            
            await message.reply(`${message.user} a kick ${user.tag} pour la raison : \`${reason}\``)

            await member.kick(reason)

         } catch (err) {

            return message.reply("Pas de membre à kick !")
        }
    }
}