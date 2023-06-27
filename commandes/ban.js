const Discord = require("discord.js")

module.exports = {

    name: "ban",
    description: "ban un membre",
    permission: Discord.PermissionFlagsBits.BanMembers,
    category: "Modérations",
    dm: false,
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre a bannir",
            autocomplete: false,
            required: true
        }, {
            type: "string",
            name: "raison",
            description: "La raison du bannisement",
            autocomplete: false,
            required: false
        }
    ],

    async run(bot, message, args) {

        try {

            let user = args.getUser("membre")
            if(!user) return message.reply("Pas de membre à bannir !")
            let member = message.guild.members.cache.get(user.id)

            let reason = args.getString("raison")
            if(!reason) reason = "Pas de raison fournie.";

            if(message.user.id === user.id) return message.reply("Essaie pas de te bannir couillon !")
            if((await message.guild.fetchOwner()).id === user.id) return message.reply("Ne ban pas le propriétaire du serveur !") 
            if(member && !member.bannable) return message.reply("Je ne peux pas bannir ce membre !")
            if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peux pas bannir ce membre !")
            if((await message.guild.bans.fetch()).get(user.id)) return message.reply("Ce membre est déjà banni de ce serveur !")

            try {await user.send(`Tu as été banni du serveur ${message.guild.name} par ${message.user.tag} pour la raison suivantes: \`${reason}\``)} catch(err) {}

            await message.reply(`${message.user} a banni ${user.tag} pour la raison suivantes : \`${reason}\``)

            await message.guild.bans.create(user.id, {reason: reason})

        } catch (err) {

            return message.reply("Pas de membre à bannir !")
        }
    }
}