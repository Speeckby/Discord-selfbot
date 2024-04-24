const config = require("../config.json");
const fn = require('../fn/roll.js')
module.exports = async client => {
    
    client.class = new Object()
    
    if (config.mudae.on) {
        const Mudae = require("../class/mudae");
        const channel = client.channels.cache.get(config.channel)

        async function send_tu(channel) {
            try {
                return await channel.sendSlash('432610292342587392', 'tu');
            } catch (e) {
                console.log(e)
                return send_tu();
            }
        }
        tu = await send_tu(channel)
        client.class.mudae = await new Mudae(tu.content)
        for (let serv of config.mudae.channel_autoclaim) {
            if (serv != config.channel) {
                const channel = client.channels.cache.get(serv) 
                message = await send_tu(channel)
                client.class.mudae.ajouter_serv(serv,message.content)
            }
        }
        client.class.mudae.creer_ordre()
        fn(client)
    }
}