const Discord = require("discord.js");
const { JsonDatabase } = require(`wio.db`);
const db = new JsonDatabase(`Database`);
const emojiler = require(`../emojiler.json`)
const ayarlar = require(`../ayarlar.json`)
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
   let botlist = db.fetch(`botlist_${message.guild.id}`)
   if(!botlist) return message.channel.send(
    new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
      .setDescription(`${emojiler.olumsuz} **| Bu Sunucuda Sistem Aktif Değil. ${ayarlar.prefix}botlist**`)
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()//❌ | Sunucuda sistem aktif değil.
      .setFooter(client.user.username, client.user.avatarURL())
      .setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
//----------------------------------------------------------------------
     const embed = new Discord.MessageEmbed()
     .setColor(message.guild.me.displayColor)
     .setAuthor(client.user.username, client.user.avatarURL())
     
	 .setDescription(`
> **• ${emojiler.askm} ${message.guild.name} Sunucusunda Nasıl Bot Eklenir?**\n
> **• ${emojiler.plus} Bot Eklemek İçin: \`${ayarlar.prefix}bot-ekle <Bot İD>\` yazmanız yeterli olucaktır.**\n
> **• ${emojiler.onay} Botlarınız En Fazla 1 Gün İçerisinde Onaylanır Yetkilileri Rahatsız Etmeyiniz!**\n
> **• ${emojiler.olumsuz} Bot Sahibi Eğer Sunucudan Çıkarsa Bot Otomatik Olarak Engellenir.**`)
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
  name: "botlist-mesaj",
  desciption: "Levian Bot List Sistemi",
  usage: "Levian Bot List Sistemi"
};
