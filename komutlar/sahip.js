const Discord = require("discord.js");
const { JsonDatabase } = require(`wio.db`);
const db = new JsonDatabase(`Database`);
const emojiler = require(`../emojiler.json`)
const ayarlar = require("../ayarlar.json");
exports.run = async (client, message, args) => {
      if (!message.guild.me.hasPermission('ADMINISTRATOR')) return message.author.send(
    new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
      .setDescription(`${emojiler.olumsuz} **| Botu Kullanmadan Önce Lütfen \`Yönetici\` Yetkisi Veriniz**`)
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()//❌ | Sunucuda sistem aktif değil.
      .setFooter(client.user.username, client.user.avatarURL())
      .setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
//----------------------------------------------------------------------
  message.delete({timeout: 0})

  if(!message.member.permissions.has(`ADMINISTRATOR`)) return message.author.send(
  	new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
      .setDescription(`${emojiler.olumsuz} **| Bu Komut İçin \`Yönetici\` Yetkisine Sahip Olmalısınız**`)
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()
      .setFooter(client.user.username, client.user.avatarURL())
      .setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 60000}));
//----------------------------------------------------------------------

     const embed = new Discord.MessageEmbed()
     .setColor(message.guild.me.displayColor)
     .setAuthor(client.user.username, client.user.avatarURL())
     .setThumbnail(message.guild.iconURL({dynamic: true}))
	   .setDescription(`
> **Çekiliş Rolünü Almak İçin 🎉 Tepkisine Tıklayın.**

> **Bot Bildirişleri İçin 🔔 Tepkisine Tıklayın.**

> **Partner Kanallarını Görmek İçin <:partner:840406660148625438> Tepkisine Tıklayın.**
`)
	   .setTimestamp()
     .setFooter(client.user.username, client.user.avatarURL())
	    return message.channel.send(embed)
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "samet",
  desciption: "Levian Bot List Sistemi",
  usage: "Levian Bot List Sistemi"
};
