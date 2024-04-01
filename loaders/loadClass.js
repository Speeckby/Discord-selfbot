const config = require("../config.json");

module.exports = async client => {
    
    client.class = new Object()
    
    if (config.mudae.on) {
        const Mudae = require("../class/mudae");
        const channel = client.channels.cache.get(config.channel)
        
        channel.send("$tu")
        
        const interval = await setInterval(() => {
            if (!("mudae" in client.class)) {
                channel.send("$tu")
            }else {
                client.class.mudae = new Mudae(client.class.mudae)
                clearInterval(interval);
                }
        }, 3000)    
    }
}