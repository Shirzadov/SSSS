const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const { JsonDatabase } = require(`wio.db`);
const db = new JsonDatabase(`Database`);
const emojiler = require(`../emojiler.json`)
const moment = require('moment')
module.exports = async message => {
  let client = message.client;
  let prefix = ayarlar.prefix;
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0].slice(prefix.length);
  let params = message.content.split(" ").slice(1);

  let cmd;

  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  } //yardım menüsünü sana kitliyorum
  if (cmd) {   
    if(cmd.conf.permLevel == "BOT_OWNER") if(!ayarlar.sahip.includes(message.author.id)) return;
    if(cmd.conf.permLevel !== 0) if(cmd.conf.permLevel !== "BOT_OWNER") if(!message.member.hasPermission(cmd.conf.permLevel)) return;
    let kural1 = db.fetch("kural")
 let kural = db.fetch(`kural_${message.author.id}`)
    if(!kural) {
    var embed = new Discord.MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
.setDescription(`
**Merhaba** 
**${message.author} ${client.user.username} Kullanmadan Önce Kuralları Oku!**

> **1. Komut Spamı Yapmayın!**

> **2. ${client.user.username}un Her Hangi Bir Alt Yapısını Çıkarmayın!**

> **3. ${client.user.username}da KaraListeye Girilicek Hareketler Yapmayın Yeter.**


> **Kuralları Kabul Etmek İçin Aşşağıdakı Emojiye Basınız İyi Kullanmalar**
  
> **Senden Önce Okuyan Kişi Sayısı:** \`${kural1}\``)
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()//❌ | Sunucuda sistem aktif değil.
      .setFooter(client.user.username, client.user.avatarURL())
      .setColor(message.guild.me.displayColor)
    message.channel.send({embed: embed}).then(msg =>{
    msg. react("☑️")
    const kurallarfilter = (reaction, user) => reaction.emoji.name === '☑️' && user.id === message.author.id
    const kurallar = msg.createReactionCollector(kurallarfilter)
    kurallar.on('collect', r => {
    msg.delete()
    var embed = new Discord.MessageEmbed()
              .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
.setDescription(`${emojiler.askm} **Kuralları Okuyup Kabul Ettiğin İçin Teşekkürler**`)
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()//❌ | Sunucuda sistem aktif değil.
      .setFooter(client.user.username, client.user.avatarURL())
      .setColor(message.guild.me.displayColor)
    message.channel.send(embed)
    db.set(`kural_${message.author.id}`, 1)
    db.add("kural", 1)
    })
    })
    return
    }
//--------------------------------------------------------------
    let kara = db.get(`kara_${message.author.id}`);
    let karalistealan = db.get(`karaalan_${message.author.id}`)
    let bakım = db.get(`bakım_`)
    let bakımalan = db.get(`bakımalan_${message.author.id}`)
    if (kara) {
      const hataembed = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
        .setDescription(`
> ${client.user.username}\`**da Kara Listeye Alınmışsın.**

> **Sebep**: \`${kara}\`

> **Destek Sunucusu:** [Tıkla!](https://discord.gg/QCsbfsV74d)`)
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()//❌ | Sunucuda sistem aktif değil.
      .setFooter(client.user.username, client.user.avatarURL())
      .setColor(message.guild.me.displayColor)
      message.channel.send(hataembed).then(m => m.delete({timeout: 10000}));
      return;  
    }
//--------------------------------------------------------------
    if (bakım) {
if (!ayarlar.sahip.includes(message.author.id) && !ayarlar.sahip.includes(message.author.id)) {
        require("moment-duration-format");
    let bayrakab = db.get(`bakımsüre_`);
    const duration = moment
      .duration(Date.now() - bayrakab)
      .format(" D [gün], H [saat], m [dakika], s [saniye]");
      
      const bakımembed = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayColor)
        .setDescription(`
> **Venue Bot Şuanda Bakımda**

> **Bakım Sebebi:** ${bakım}

> **Destek Sunucusu:** [Tıkla!](https://discord.gg/QCsbfsV74d)
`)

      message.channel.send(bakımembed).then(m => m.delete({timeout: 10000}));
      return;  
    }
    };
//--------------------------------------------------------------
    cmd.run(client, message, params);
  } //npm.dbli olcak kardesim
};
//--------------------------------------------------------------