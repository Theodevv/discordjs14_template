const Discord = require("discord.js")

module.exports = {

    name: "unban",
    description: "unban un membre",
    permission: Discord.PermissionFlagsBits.BanMembers,
    category: "Modérations",
    dm: false,
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre a débannir",
            autocomplete: false,
            required: true
        }, {
            type: "string",
            name: "raison",
            description: "La raison du débannisement",
            autocomplete: false,
            required: false
        }
    ],

    async run(bot, message, args) {

        try {

            let user = args.getUser("membre")
            if(!user) return message.reply("Pas de membre à débannir !")

            let reason = args.getString("raison")
            if(!reason) reason = "Pas de raison fournie.";

            if(!(await message.guild.bans.fetch()).get(user.id)) return message.reply("Ce membre n'est pas bannis")

            try {await user.send(`Tu as été unban du serveur par ${message.user.tag} pour la raison suivantes: \`${reason}\``)} catch(err) {}
            await message.reply(`${message.user} a unban ${user.tag} pour la raison suivantes: \`${reason}\``)

            await message.guild.members.unban(user, reason)

        } catch (err) {

            return message.reply("Pas de membre à débannir !")
        }
    }
}