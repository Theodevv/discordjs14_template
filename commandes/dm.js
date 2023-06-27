const Discord = require("discord.js")
const { EmbedBuilder, TextInputBuilder, ModalBuilder, ActionRowBuilder, TextInputStyle } = require("discord.js")
 
module.exports = {
 
  name: "dm",
  description: "Le bot envoie un DM au membre choisis",
  permission: Discord.PermissionFlagsBits.Administrator,
  dm: false,
  category: "Modérations",
  options: [
    {
        type: "user",
        name: "membre",
        description: "Le membre à dm.",
        autocomplete: false,
        required: true
    }
],
 
  async run(bot, message, args) {

    let user = args.getUser("membre");
        if(!user) return message.reply("Pas de membre !")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Membre introuvable!")
 
    let Modal = new Discord.ModalBuilder()
    .setCustomId('report')
    .setTitle('Envoyer un DM.')

    let QueVeutTuDire = new Discord.TextInputBuilder()
    .setCustomId('dm')
    .setLabel("Que veut tu dire ?")
    .setRequired(true)
    .setPlaceholder('Indiquez ici le message à envoyé.')
    .setStyle(TextInputStyle.Paragraph)
  
    let ActionRow1 = new Discord.ActionRowBuilder().addComponents(QueVeutTuDire);
 
    Modal.addComponents(ActionRow1)
 
    await message.showModal(Modal)
 
    try {

      let reponse = await message.awaitModalSubmit({time: 300000})

      let QueDire = reponse.fields.getTextInputValue('dm')
  
      const EmbedDMEnvoyer = new Discord.EmbedBuilder()
      .setColor("#ffff")
      .setDescription(`**Le DM à correctement été envoyée !**`)

      await user.send({ content: QueDire });
   
      await reponse.reply({embeds: [EmbedDMEnvoyer], ephemeral: true})

    } catch (err) { return; }
  }
}