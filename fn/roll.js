const config = require("../config.json");

function verifier_timers(client) {
    let b = client.class.mudae.verifier_timer(client) 
    if (isNaN(b)) {
      const channel = client.channels.cache.get(config.channel)
      channel.send(b)
      return verifier_timers(client)
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