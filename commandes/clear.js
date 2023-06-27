const Discord = require("discord.js");

module.exports = {

    name: "clear",
    description: "Supprimer un nombre défini de messages dans un channel",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    category: "Modérations",
    dm: false,
    options: [
        {
            type: "number",
            name: "number",
            description: "Le nombre de messages à supprimer.",
            autocomplete: false,
            required: true
        }, {
            type: "channel",
            name: "channel",
            description: "  Le channel où supprimer les messages.",
            autocomplete: false,
            required: false
        }
    ],

    async run(client, message, args) {

        let channel = args.getChannel("channel")
        if (!channel) channel = message.channel;
        if (channel.id !== message.channel.id && !message.guild.channels.cache.get(channel.id)) return message.reply("Pas de channel trouvé !")

        let number = args.getNumber("number") + 1
        if (parseInt(number) <= 0 || parseInt(number) > 100) return message.reply("Il faut un number entre 0 et 100 inclut !")

        try {
            let messages = await channel.bulkDelete(parseInt(number))

            const clearCommandEmbed = new Discord.EmbedBuilder()
                .setColor("#fffff")
                .setTitle(`Template Bot - Modération`)
                .addFields({ name: 'Nombre de messages supprimé', value: `${messages.size}` })
                .addFields({ name: 'Salon', value: `${channel}` })
                .setFooter({ text: `Demandé par ${message.user.tag}`})
            await message.reply({ embeds: [clearCommandEmbed] })

        } catch (err) {

            let messages = [...(await channel.messages.fetch()).filter(msg => !msg.interaction && (Date.now() - msg.createdAt) <= 1209600000).values()]
            if (messages.length <= 0) return message.reply({ content: "Aucun message à supprimer car ils datent tous de plus de 14 jours !", ephemeral: true })
            await channel.bulkDelete(messages)

            const clearCommandEmbed = new Discord.EmbedBuilder()
                .setColor(client.defaultColor)
                .setTitle(`${message.guild.name} - Commande ${this.name}`)
                .setDescription(this.description)
                .addFields({ name: 'Nombre de messages supprimé', value: `${messages.size}` })
                .addFields({ name: 'Salon', value: `${channel}` })
                .setFooter({ text: `Demandé par ${message.user.tag}` })
            await message.reply({ embeds: [clearCommandEmbed] })
            await channel.bulkDelete(clearCommandEmbed)
        }
    }
}