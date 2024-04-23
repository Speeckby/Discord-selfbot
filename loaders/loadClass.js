const config = require("../config.json");
const fn = require('../fn/roll.js')
module.exports = async client => {
    
    client.class = new Object()
    
    if (config.mudae.on) {
        const Mudae = require("../class/mudae");
        const channel = client.channels.cache.get(config.channel)

        async function send_tu() {
            try {
                return await channel.sendSlash('432610292342587392', 'tu');
            } catch (e) {
                console.log(e)
                return send_tu();
            }
        }
        tu = await send_tu()
        client.class.mudae = await new Mudae(tu.content,client)
        fn(client)
    }
}