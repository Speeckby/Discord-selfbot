const fs = require('fs');
const path = require('path');

module.exports = async (client,interaction,message) => {
  if (!fs.existsSync(path.join(__dirname, `../commands/${interaction}.js`))) {
    return
  }
  const fileURL = new URL(`file://${path.join(__dirname, '../commands', `${interaction}.js`)}`);
  command = await import(fileURL);
  command.default.run(client, message);
  client.fn.log(client, 'INFO', `commande ${interaction} traité`);

};
