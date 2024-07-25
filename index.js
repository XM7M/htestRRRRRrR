const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });

setInterval(() => {
  if (!client || !client.user) {
    console.log("Client not logged in");
    console.log("Restarting project");
    process.exit(1);
  }
}, 1000);

client.on("ready", async () => {
  console.log(`${client.user.username} is ready!`);
});

// ثبات فويس 24 ساعه v13 بدون اي مشاكل
const { joinVoiceChannel } = require("@discordjs/voice");
client.on("ready", () => {
  setInterval(async () => {
    try {
      const channel = await client.channels.fetch(process.env.channel);
      const VoiceConnection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        selfMute: true,
        selfDeaf: true,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });
    } catch (error) {
      console.error('Error joining voice channel:', error);
    }
  }, 1000);
});

client.login(process.env.token);
