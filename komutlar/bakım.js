const Discord = require("discord.js");
const { JsonDatabase } = require(`wio.db`);
const db = new JsonDatabase(`Database`);
const emojiler = require(`../emojiler.json`)
const ayarlar = require(`../ayarlar.json`)
const moment = require("moment");
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
  message.delete({timeout: 5000})
if(message.author.id !== '451474544255959071') return;
  const bakımaldıkabooooo = args[0];
  const sebep = args.slice(1).join(" ");
  if (bakımaldıkabooooo == "aç") {
    if (!sebep) return message.channel.send("Sebep Belirtin.");
    db.set(`bakımsüre_`, Date.now());
    db.set(`bakım_`, sebep);
    return message.channel
      .send(
 new Discord.MessageEmbed()
           .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
           .setDescription(`**Başarılı Şekilde \`${sebep}\` Sebebi İle Bakım Alındı**`)
           .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
           .setTimestamp()
           .setFooter(client.user.username, client.user.avatarURL())
           .setColor(message.guild.me.displayColor)
      )
  } else if (bakımaldıkabooooo == "kapat") {

    let aylartoplam = {
      "01": "Ocak",
      "02": "Şubat",
      "03": "Mart",
      "04": "Nisan",
      "05": "Mayıs",
      "06": "Haziran",
      "07": "Temmuz",
      "08": "Ağustos",
      "09": "Eylül",
      "10": "Ekim",
      "11": "Kasım",
      "12": "Aralık"
    };
    let aylar = aylartoplam;
    let rol = "";

    require("moment-duration-format");
    let wensj = db.get(`bakımsüre_`);
    const duration = moment
      .duration(Date.now() - wensj)
      .format(" D [gün], H [saat], m [dakika], s [saniye]");

    return embed(`
**:question: | Bakımdan çıkartmak istediğinize emin misiniz**

> Sebep: \`${db.get(`bakım_`)}\`
> Bakıma Alınma Tarihi: \`${moment(wensj).format("DD")} ${
      aylar[moment(wensj).format("MM")]
    } ${moment(wensj).format("YYYY HH:mm:ss")}\`
    `).then(async msg => {
      await msg.react("✅");
      await msg.react("❌");
      const filter = (reaction, user) => {
        return (
          ["✅", "❌"].includes(reaction.emoji.name) &&
          user.id === message.author.id
        );
      };

      msg
        .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
        .then(collected => {
          const reaction = collected.first();

          if (reaction.emoji.name === "✅") {
            db.delete(`bakımsüre_`);
            db.delete(`bakım_`);
            let embed = new Discord.MessageEmbed()
           .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
           .setDescription(`${emojiler.onay} **| Bakım Başarılı Şekilde Kapandı.**`)
           .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
           .setTimestamp()
           .setFooter(client.user.username, client.user.avatarURL())
           .setColor(message.guild.me.displayColor)
            msg.edit(embed);
          } else {
            let embed = new Discord.MessageEmbed()
           .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
           .setDescription(`${emojiler.onay} **| İşlem Başarılı Şekilde İptal Edildi.**`)
           .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
           .setTimestamp()
           .setFooter(client.user.username, client.user.avatarURL())
           .setColor(message.guild.me.displayColor)
            msg.edit(embed);
          }
        })
        .catch(err => {
            let embed = new Discord.MessageEmbed()
           .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
           .setDescription(`${emojiler.onay} **| İşlem Başarılı Şekilde İptal Edildi.**`)
           .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
           .setTimestamp()
           .setFooter(client.user.username, client.user.avatarURL())
           .setColor(message.guild.me.displayColor)
            msg.edit(embed);
        });
    });
  } else {
    return message.channel.send(
      new Discord.MessageEmbed()
           .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
           .setDescription(`**Geçersiz Argüman (\`${ayarlar.prefix}bakım aç Sebep\`) | (\`${ayarlar.prefix}bakım kapat\`)**`)
           .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
           .setTimestamp()
           .setFooter(client.user.username, client.user.avatarURL())
           .setColor(message.guild.me.displayColor))
  }
  async function embed(text) {
   
    const embed = new Discord.MessageEmbed()
           .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
           .setDescription(`${text}`)
           .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
           .setTimestamp()
           .setFooter(client.user.username, client.user.avatarURL())
           .setColor(message.guild.me.displayColor)
    let msg = await message.channel.send(embed);
    return msg;
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["bakım"],
  permLevel: "BOT_OWNER"
};

exports.help = {
  name: "bakım",
  desciption: "Levian Bot List Sistemi",
  usage: "Levian Bot List Sistemi"
};
