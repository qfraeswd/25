const moment = require("moment")
const fs = require("fs")

client.on("guildMemberAdd", member => {
let welcomer = member.guild.channels.find('name', `welcome`)
let memberavatar = member.user.avatarURL
if (!welcomer) return;
if(welcomer) {
moment.locale('ar-ly');
var mrx = member.user;
let mrxembed = new Discord.RichEmbed()
.setTitle(mrx.username,`#${mrx.discriminator}`)
.addField('» Joined Discord ago',`${moment(member.user.createdAt).format('D/M/YYYY h:mm a')} **\n** \`${moment(member.user.createdAt).fromNow()}\``,true)            
.addField('» Your Number',`${member.guild.memberCount}`,true)
.setThumbnail(mrx.avatarURL)
.setFooter("Zombie Games.")
welcomer.send({embed:mrxembed});          
}})

client.on('guildMemberAdd', member => {
member.guild.fetchInvites().then(guildInvites => {
const ei = invites[member.guild.id];
invites[member.guild.id] = guildInvites;
const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
const inviter = client.users.get(invite.inviter.id);
const logChannel = member.guild.channels.find(channel => channel.name === `main-chat`);
if(!logChannel) return;
setTimeout(() => {
logChannel.send(`Invited By: <@${inviter.id}>`);
},2000)
});
});

client.on('guildMemberAdd',async member => {
const Canvas = require('canvas');
const jimp = require('jimp');
const w = ['./welcome_4.png'];
let Image = Canvas.Image,
    canvas = new Canvas(800, 300),
    ctx = canvas.getContext('2d');
ctx.patternQuality = 'bilinear';
ctx.filter = 'bilinear';
ctx.antialias = 'subpixel';
ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
ctx.shadowOffsetY = 2;
ctx.shadowBlur = 2;
ctx.stroke();
ctx.beginPath();

fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function (err, Background) {
    if (err) return console.log(err);
    let BG = Canvas.Image;
    let ground = new Image;
    ground.src = Background;
    ctx.drawImage(ground, 0, 0, 800, 300);

})

        let url = member.user.displayAvatarURL.endsWith(".webp") ? member.user.displayAvatarURL.slice(5, -20) + ".png" : member.user.displayAvatarURL;
        jimp.read(url, (err, ava) => {
            if (err) return console.log(err);
            ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
         if (err) return console.log(err);

  ctx.font = '36px Arial';
  ctx.fontSize = '72px';
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.fillText(member.user.username, 545, 177);
 
  ctx.font = '16px Arial Bold';
  ctx.fontSize = '72px';
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.fillText(`${member.guild.memberCount} Members`, 580, 200);
 
  let Avatar = Canvas.Image;
  let ava = new Avatar;
  ava.src = buf;
  ctx.beginPath();
  ctx.arc(169.5, 148, 126.9, -100, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(ava, 36, 21, 260, 260);
   
  let c = member.guild.channels.find('name', `روم الترحيب`)
  if(!c) return;
  c.sendFile(canvas.toBuffer());

});
});
});

const invites = {};

const wait = require('util').promisify(setTimeout);

client.on('ready', () => {
wait(1000);

client.guilds.forEach(g => {
g.fetchInvites().then(guildInvites => {
invites[g.id] = guildInvites;
});
});
});