const {blue} = require('colors');
const config = require("../config.json");

module.exports = async (client) => {
    
    client.class = new Object()
    
    if (config.mudae.on == true) {
        const Mudae = require("../class/mudae");
        const channel = client.channels.cache.get(config.channel)
        
        function recuperer_tu(callback) {
            setTimeout(function() {
                channel.send("$tu")
                setTimeout(function() {
                    if (!("mudae" in client.class)) {
                        recuperer_tu()
                    }else {
                        callback(); 
                    }
                }, 1000);
            }, 1000);
        }
        recuperer_tu(function () {
            client.class.mudae = new Mudae(client.class.mudae)
        });
    }
}