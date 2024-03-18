const loadCommands = require("../loaders/loadCommands.js")
const https = require('https');
const Mudae = require("./timers/mudae");

  
function verifier_timers(client) {
  for (let i=0;i < client.var.timers.length; i++) {
    client.var.timers[i].then(function(valeur) {
        if (valeur[3] < Date.now()) {
            const channel = client.channels.cache.get(valeur[4]);
            channel.send({
                content: valeur[2]
            });
            valeur[3] += valeur[5]
        }
    }).catch(function(erreur) {
        console.error("Une erreur s'est produite :", erreur);
    });
  }
}

  
module.exports = async client => {
    
    client.fn.log(client, "STARTING", `------------------`)
    client.fn.log(client, "STARTING", `Bot loading starts`)
    client.fn.log(client, "LOADERS", `loading Functions`)
    client.fn.log(client, "LOADERS", `loading Events`)
    
    
    await loadCommands(client)
    
    setTimeout(() => {
      client.fn.log(client, "LOADERS", `${client.user.tag} online`)
  }, 4000)
  
  
  a = new Mudae("1","10","6h 02")
  while (true) {
      a.verifier_timer(client)
  }
}