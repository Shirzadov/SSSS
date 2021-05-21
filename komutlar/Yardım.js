const Discord = require("discord.js");
const { JsonDatabase } = require(`wio.db`);
const db = new JsonDatabase(`Database`);
const emojiler = require(`../emojiler.json`)
const ayarlar = require(`../ayarlar.json`)

exports.run = async (client, message, args) => {
const embed = new Discord.MessageEmbed()
.setColor(message.guild.me.displayColor)
.setAuthor(client.user.username, client.user.avatarURL())
.setThumbnail(client.user.avatarURL())
.setFooter(client.user.username, client.user.avatarURL())
.setTimestamp()
.setDescription(`
**${ayarlar.prefix}botlist**
Botlist Sistemini Ayarlarlarsınız.

**${ayarlar.prefix}grafik**
Sunucuda Sistem Açık Olduğu Sürede Kaç Bot Onaylanmış Reddedilmiş Sayılarını Gösterir.

**${ayarlar.prefix}onay-bekleyenler**
Yetkili Komutudur Onay Bekleyen Botları Sıralar Ve Davet Linkini Gömülü Şekilde Yanında Verir.

**${ayarlar.prefix}bot-ekle**
Sunucuda Sisteme Bot Eklersiniz.

**${ayarlar.prefix}bot-onayla**
Sunucuda Sisteme Eklenmiş Botu Onaylar.

**${ayarlar.prefix}bot-reddet**
Sunucuda Sisteme Eklenmiş Botu Reddeder.

**${ayarlar.prefix}bot-sil**
Daha Önce Sisteme Eklenmiş Botu Sistemden Siler.

**${ayarlar.prefix}bot-bilgi**
IDsini Belirttiğiniz Botun Onay Durumunu Atar.

**${ayarlar.prefix}botlist-mesaj**
Bot Ekle Kanalına Hazır Mesaj Atar.

[Davet Et](https://discordapp.com/oauth2/authorize?client_id=840338788785455115&scope=bot&permissions=8) | [Destek Sunucusu](https://discord.gg/6E4Dr3Pb9Z)

`)
message.channel.send(embed).then(async annengeliyorkac=> {
/*await annengeliyorkac.react('⏪')
await annengeliyorkac.react('🤝')
await annengeliyorkac.react('⏩')


 let filter = (reaction, user) =>
            user.id !== message.client.user.id && user.id === message.author.id;

          var collector = annengeliyorkac.createReactionCollector(filter, {
            time: 120000
          });

annengeliyorkac;
collector.on("collect", async (reaction, user) => {
switch (reaction.emoji.name) {
case "⏪":
reaction.users.remove(user).catch(console.error);
let embed2 = new Discord.MessageEmbed()
.setColor(message.guild.me.displayColor)
.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
.setThumbnail(client.user.avatarURL())
.setFooter(client.user.username, client.user.avatarURL())
.setTimestamp()
.setDescription(``)
annengeliyorkac.edit(embed2)
break;
    
  case "⏩":
reaction.users.remove(user).catch(console.error);
let embed3 = new Discord.MessageEmbed()
.setColor(message.guild.me.displayColor)
.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
.setThumbnail(client.user.avatarURL())
.setFooter(client.user.username, client.user.avatarURL())
.setTimestamp()
.setDescription(``)
annengeliyorkac.edit(embed3)
break;
  case "🤝":
annengeliyorkac.delete()
break;
};
});       
});
};
*/
})
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yardım','help'],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  desciption: 'Levian AB Büyüksün',
  usage: 'Levian AB Büyüksün'
};