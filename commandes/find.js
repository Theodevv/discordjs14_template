const Discord = require("discord.js")

module.exports = {
    name: "find",
    description: "Permet de chercher un membre en vocal dans le serveur",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    category: "Modérations",
    dm: false,
    options: [
            {
                type: "user",
                name: "member",
                description: "L’utilisateur en vocal",
                required: true,
                autocomplete: false
           }
        ],

    async run(client, message, args) {

        const member = message.guild.members.cache.get(args.getUser("member").id)
        if (!member) return message.reply({ content: `Veuillez mettre un membre valide !`, ephemeral: true });

        let embed = new Discord.EmbedBuilder()
            .setColor("#2f3136")
            .setDescription(member.voice.channel ? `**${member.user.tag}** est dans le vocal <#${member.voice.channel.id}>` : `**${member.user.tag}** n'est pas en vocal`,)
        
        message.reply({ embeds: [embed] })
    }
}