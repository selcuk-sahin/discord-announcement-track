require("dotenv").config();
const Discord = require("discord.js");
// const fetch = require("node-fetch");
const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Listen to new added message
// @todo make channelId programmable by command
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (isAnnouncementChannel(message.channel)) {
    fetchChannelMessages(message.channelId)
    await message.react("👀");
  }
});

client.login(process.env.TOKEN);

function fetchChannelMessages(channelId) {
  console.log("fetching messages in", channelId);
  // as Discord.Channel
  const channel = client.channels.cache.get(channelId);
  // console.log(channelMessages);
  channel.messages.fetch({ limit: 100 }).then(messages => {
    //Iterate through the messages here with the variable "messages".
    messages.forEach(message => console.log(message.content))
  })
}

// Helper fns

function isAnnouncementChannel(channel){
  if(channel.type === "GUILD_NEWS" || channel.type === "GUILD_NEWS_THREAD"){
    return true;
  }else if(channel.name.toLowerCase() === "announcement" ||  channel.name.toLowerCase() === "announcements"){
    return true;
  }
  return false;
}
