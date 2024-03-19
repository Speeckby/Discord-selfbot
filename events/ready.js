const loadCommands = require("../loaders/loadCommands.js")
const Mudae = require("../timers/mudae.js");

  
function verifier_timers(client) {
  value =a.verifier_timer()
  if (value != undefined) {
    const channel = client.channels.cache.get("1099737720026300576");
    channel.send({
       content: value
     })
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
  function timers() {
    setTimeout(() => {
      verifier_timers(client);
      setTimeout(timers, 30000 + Math.floor(Math.random() * 100));
    }, 10);
  }
  timers()
}