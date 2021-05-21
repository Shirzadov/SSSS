const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const Jimp = require("jimp");
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase("Database");
const emojiler = require(`./emojiler.json`)
const moment = require("moment");
require("./util/eventLoader")(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);

    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.login(ayarlar.token);

// URL MAİN //
/*client.on('ready', () => {
const wenbayrak = 604800017
setInterval(() => {
  client.guilds.cache.forEach(wen => {
    const url = db.fetch(`url_${wen.id}`)
    if(!url) return;
    let süre = db.get(`1hafta_${wen.id}`)
    if(!süre) return;
    let neiva = Date.now() - süre
    if(neiva < wenbayrak) {
      db.delete(`url_${wen.id}`);
      db.delete(`1hafta_${wen.id}`)
client.channels.cache.get('id').send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`
**:white_check_mark: | ${wen.name} Sunucusundaki \`${url}\` Urlsi Sıfırlandı.**
`))
}
  })
}, 5000)
});  */
// URL MAİN //

client.on('guildMemberRemove', async member => {
  member.guild.members.cache.filter(s => db.fetch(`serverData.${member.guild.id}.botsData.${s.id}`)).forEach(x => {
      let bot = db.fetch(`serverData.${member.guild.id}.botsData.${x.id}`);
      let memberData = client.users.fetch(bot.owner)
    if(bot){
    if(bot.owner == member.id){
             member.guild.members.ban(x, {reason: "Sahip Sunucudan Ayrıldı."})
       db.set(`serverData.${member.guild.id}.botsData.${x.id}.status`, "`Reddedildi` <:minus:839982244545429514>")
       db.set(`serverData.${member.guild.id}.botsData.${x.id}.redReason`, "Sahip Sunucudan Ayrıldı.")
   /* let banlog = db.fetch(`banlog_${member.guild.id}`)
    let banlog2 = banlog.id
       client.channels.cache.get(banlog2).send(
    

        new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription(`${emojiler.olumsuz} **| <@${bot.owner}> <@${x.id}> **`)
      .setTimestamp()
      .setFooter(client.user.username, client.user.avatarURL())
      .setColor(member.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));*/
       
    }
    }
  })
})


client.on('message', async message => {
if (message.content === '+a') { 
  client.emit('guildMemberRemove', message.member || await message.guild.fetchMember(message.author));
    }
});
