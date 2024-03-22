const config = require("../config.json");

module.exports = client => {
    
    client.class = new Object()
    
    if (config.mudae.on) {
        const Mudae = require("../class/mudae");
        const channel = client.channels.cache.get(config.channel)
        
      
        channel.send("$tu")
        setInterval(() => {
        if (!("mudae" in client.class)) {
            channel.send("$tu")
        }else {
            return;
            }
        }, 3000)    
        
          
        client.class.mudae = new Mudae(client.class.mudae)
    }
}