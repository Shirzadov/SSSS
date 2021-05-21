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
  const kara = args[0]; 
  const user =
    message.mentions.users.first() || client.users.cache.get(args[1]);
  const sebep = args.slice(2).join(" ");
  if (kara == "al") {
    if (!user)
      return message.channel.send("Bir üye etiketleyin ya da ID girin.");
    if (!sebep) return message.channel.send("Sebep Belirtin.");
    db.set(`karasüre_${user.id}`, Date.now());
    db.set(`karaalan_${user.id}`, message.author.id);
    db.set(`kara_${user.id}`, sebep);
    return message.channel
      .send(
        `**\`${user.tag}\` Kullanıcısı \`${sebep}\` sebebinden karalisteye alındı.**`
      )
      .then(
        client.channels.cache
          .get("id")
          .send(
            `**\`${user.tag}\` Kullanıcısı \`${sebep}\` sebebinden karalisteye alındı.**`
          )
      );
  } else if (kara == "çıkar") {
    if (!user)
      return message.channel.send("Bir üye etiketleyin ya da ID girin.");
    if (!db.get(`kara_${user.id}`))
      return message.reply("Bu kullanıcı zaten karalistede değil!");
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
    let wensj = db.get(`karasüre_${user.id}`);
    const duration = moment
      .duration(Date.now() - wensj)
      .format(" D [gün], H [saat], m [dakika], s [saniye]");

    return embed(`
**:question: | Karalisteden çıkartmak istediğinize emin misiniz**

> Sebep: \`${db.get(`kara_${user.id}`)}\`
> Kara Listeye Alan: \`${db.get(`karaalan_${user.id}`)}\`
> Kara Listeye Alınma Tarihi: \`${moment(wensj).format("DD")} ${
      aylar[moment(wensj).format("MM")]
    } ${moment(wensj).format("YYYY HH:mm:ss")}\`
> Kara Listede Geçen Süre: \`${duration}\`
    `).then(async wenbayrak => {
      await wenbayrak.react("✅");
      await wenbayrak.react("❌");
      const filter = (reaction, user) => {
        return (
          ["✅", "❌"].includes(reaction.emoji.name) &&
          user.id === message.author.id
        );
      };

      wenbayrak
        .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
        .then(collected => {
          const reaction = collected.first();

          if (reaction.emoji.name === "✅") {
            db.delete(`kara_${user.id}`);
            let bayrakwenqwe = new Discord.MessageEmbed()
              .setColor(message.guild.me.displayColor)
              .setAuthor(message.author.tag)
              .setThumbnail(client.user.avatarURL())
              .setDescription(`${user.tag} Karalisteden çıkartıldı!`);
            wenbayrak.edit(bayrakwenqwe);
          } else {
            let bayrakwenqwe = new Discord.MessageEmbed()
              .setColor(message.guild.me.displayColor)
              .setAuthor(message.author.tag)
              .setThumbnail(client.user.avatarURL())
              .setDescription(`İşlem iptal edildi!`);
            wenbayrak.edit(bayrakwenqwe);
          }
        })
        .catch(err => {
          let bayrakwenqwe = new Discord.MessageEmbed()
            .setColor(message.guild.me.displayColor)
            .setAuthor(message.author.tag)
            .setThumbnail(client.user.avatarURL())
            .setDescription(`İşlem iptal edildi!`);
          wenbayrak.edit(bayrakwenqwe);
        });
    });
  } else {
    return message.reply("Geçersiz argüman! Argümanlar: `al` `çıkar`");
  }
  async function embed(text) {
   
    const embed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayColor)
      .setThumbnail(message.author.avatarURL({ dynamic: true }))
      .setAuthor(
       
        message.author.tag,
        message.author.avatarURL({ dynamic: true })
      )
      .setDescription(`${text}`)
      .setTimestamp()
      .setFooter(client.user.username, client.user.avatarURL());
    let msg = await message.channel.send(embed);
    return msg;
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["karaliste", "kara-liste"],
  permLevel: "BOT_OWNER"
};

exports.help = {
  name: "karaliste",
  desciption: "WenSamita Neiva",
  usage: "Bayrak & WenSamita Neiva"
};
