const { Client, WebEmbed } = require('discord.js-selfbot-v13');
const client = new Client();

client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);
})

client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);
});

client.on('messageCreate', message => {
  if (message.content == 'embed_hidden_url' && message.author.id == 1020053727677263892) {
    const embed = new WebEmbed()
      .setAuthor({ name: 'hello', url: 'https://google.com' })
      .setColor('RED')
      .setDescription('description uh')
      .setProvider({ name: 'provider', url: 'https://google.com' })
      .setTitle('This is Title')
      .setURL('https://google.com')
      .setImage('https://i.ytimg.com/vi/iBP8HambzpY/maxresdefault.jpg')
      .setRedirect('https://www.youtube.com/watch?v=iBP8HambzpY')
      .setVideo('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
    message.channel.send({
      content: `Hello world ${WebEmbed.hiddenEmbed}${embed}`,
    });
  }
  if (message.content == 'embed') {
    const embed = new WebEmbed()
      .setAuthor({ name: 'hello', url: 'https://google.com' })
      .setColor('RED')
      .setDescription('description uh')
      .setProvider({ name: 'provider', url: 'https://google.com' })
      .setTitle('This is Title')
      .setURL('https://google.com')
      .setImage('https://i.ytimg.com/vi/iBP8HambzpY/maxresdefault.jpg')
      .setRedirect('https://www.youtube.com/watch?v=iBP8HambzpY')
      .setVideo('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
    message.channel.send({
      content: `${embed}`,
    });
  }
});
client.login('MTAyMDA1MzcyNzY3NzI2Mzg5Mg.GtjVRi.MHaPeLeYlvr1pVC8szDQi5O-hgPD4IXpIHn9YM');