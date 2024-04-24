const config = require("../config.json");

async function  verifier_timers(client) {
    let b = await client.class.mudae.verifier_timer(client) 
    if (isNaN(b) & b != undefined) {
      const channel = client.channels.cache.get(config.channel)
      await channel.send(b)
      return await verifier_timers(client)
    } else if (b == undefined) {
      return 0
    } else {
      return b
    }
  }
  
    
  module.exports = async client => {    
    function timers() {
      setTimeout(() => {
        let a  = verifier_timers(client);
        setTimeout(timers, a + Math.floor(Math.random() * 100));
      }, 10);
    }
    timers()
  }