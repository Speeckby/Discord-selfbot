const config = require("../config.json");

module.exports = class Mudae {
     constructor(message) {
        this.recuperer_infos(message)
        this.time = Date.now()
    }

    recuperer_infos(message) {
        let next_daily = false
        let next_poke = false
        let next_roll = false 
        let next_claim = false

        if (config.mudae.daily) {
            if (message.includes("$daily est disponible !")) {
                next_daily = 0
            } else {
                next_daily = message.split("$daily reset dans ")[1].split("min.")[0].split("**")
                next_daily = this.calcul_time(next_daily[1])
            }
        }
        if (config.mudae.autoclaim) {
            if (config.mudae.channel_autoclaim.length == 0) {
                console.log("Aucun salon spécifié pour l'auto-claim")
            }else {
                this.claim = {}
                next_roll = {}
                next_claim = {}
                if (config.mudae.channel_autoclaim.includes(config.channel)) {
                    
                    let roll2 = undefined
                    let next_claim2 = undefined
                    if (parseInt(message.split("Vous avez **")[1].split("**")[0]) != 0) {
                        roll2 = 0
                    } else {
                        roll2 = message.split("Prochain rolls reset dans ")[1].split("min.")[0].split("**")
                        roll2 = this.calcul_time(roll2[1])%3600000
                    }   
                    if (message.includes("Le prochain reset est dans ")) {
                        next_claim2 = message.split("Le prochain reset est dans ")[1].split("min.")[0].split("**")
                        this.claim[config.channel] = false
                    } else { 
                        next_claim2 = message.split("remarier : ")[1].split("min.")[0].split("**")
                        this.claim[config.channel] = true
                    }
                    next_claim2 =  this.calcul_time(next_claim2[1])/3600000
                    if (next_claim2 == 1 ) {
                        next_claim2 = 0
                    } else if (next_claim2 == 2 ) {
                        next_claim2 = 1
                    } else if (next_claim2 == 3 || (Math.floor(next_claim2) == 0 & roll2 != 0)) {
                        next_claim2 = 2
                        this.claim[config.channel] = false
                    } else if (roll2 == 0) {
                        next_claim2 = Math.floor(next_claim2) 
                    } else {
                        next_claim2 = Math.floor(next_claim2) -1
                    }
                
                    next_claim[config.channel] = next_claim2
                    next_roll[config.channel] = roll2
                }
            }
        }
        
        if (config.mudae.poke) {
            if (message.includes("$p est disponible !")) {
                next_poke = 0
            } else {
                next_poke = message.split("$p : ")[1].split("min.")[0].split("**")
                next_poke = this.calcul_time(next_poke[1])
            }
        }
        
        this.next_daily = next_daily
        this.next_poke = next_poke
        this.next_roll = next_roll
        this.claim_reset = next_claim
    }
    
    ajouter_serv(serv, message) {
        let roll2 = undefined
        let next_claim2 = undefined

        if (parseInt(message.split("Vous avez **")[1].split("**")[0]) != 0) {
            roll2 = 0
        } else {
            roll2 = message.split("Prochain rolls reset dans ")[1].split("min.")[0].split("**")
            roll2 = this.calcul_time(roll2[1])%3600000
        }   
        if (message.includes("Le prochain reset est dans ")) {
            next_claim2 = message.split("Le prochain reset est dans ")[1].split("min.")[0].split("**")
            this.claim[serv] = false
        } else { 
            next_claim2 = message.split("remarier : ")[1].split("min.")[0].split("**")
            this.claim[serv] = true
        }
        next_claim2 =  this.calcul_time(next_claim2[1])/3600000
        if (next_claim2 == 1 ) {
            next_claim2 = 0
        } else if (next_claim2 == 2 ) {
            next_claim2 = 1
        } else if (next_claim2 == 3 || (Math.floor(next_claim2) == 0 & roll2 != 0)) {
            next_claim2 = 2
            this.claim[serv] = false
        } else  if (roll2 == 0) {
            next_claim2 = Math.floor(next_claim2)
        } else {
            next_claim2 = Math.floor(next_claim2) -1
        }

        this.claim_reset[serv] = next_claim2

        if (!this.next_roll) {
            return roll2
        }

        this.next_roll[serv] = roll2
    }

    calcul_time(time) {
        if (isNaN(time)) {
            time = time.split("h ")
            return (parseInt(time[1]) + parseInt(time[0]) * 60)*60000
        } else {
            return parseInt(time)*60000
        }
    }

    creer_ordre() {
        if (!this.ordre) {
            var ordre = []

            if (config.mudae.daily){
                ordre.push({ name : "daily", value: this.next_daily, function : () => this.daily()})
            }
            if (config.mudae.poke) {
                ordre.push({name : "pokemon", value: this.next_poke, function : () => this.pokemon()})
            }
            if (config.mudae.autoclaim) {
                for (let i = 0; i < config.mudae.channel_autoclaim.length; i++) {
                    let serv = config.mudae.channel_autoclaim[i]
                    ordre.push({ name : "roll", value: this.next_roll[serv], function : (client) => this.roll(client), serv : serv})
                }
            }
            delete this.next_roll;
            delete this.next_daily;
            delete this.next_poke;
            this.ordre = ordre
        } 

        this.ordre.sort((a, b) => a.value - b.value);
        
    }

    verifier_timer(client) {
        if (this.time + this.ordre[0].value < Date.now()) {
            return this.ordre[0].function(client)
        } 
        else {
            return this.ordre[0].value
        }
    }

    daily() {
        this.ordre.splice(0, 1)
        for (let i=0; i<this.ordre.length; i++) {
            this.ordre[i]["value"] -=  Date.now() - this.time
        }
        this.time = Date.now()
        this.ordre.push({ name: "daily", value: 72000000, function :() => this.daily()})
        this.creer_ordre()
        return '$daily'
    }

    pokemon() {
        this.ordre.splice(0, 1)
        for (let i=0; i<this.ordre.length; i++) {
            this.ordre[i]["value"] -=  Date.now() - this.time
        }
        this.time = Date.now()
        this.ordre.push({ name: "pokemon", value: 7200000, function :() => this.pokemon()})
        this.creer_ordre()
        return '$p'
    }

    roll(client) {
        let serv = this.ordre[0].serv
        this.ordre.splice(0, 1)
        for (let i=0; i<this.ordre.length; i++) {
            this.ordre[i]["value"] -=  Date.now() - this.time
        }
        this.time = Date.now()
        this.ordre.push({ name: "roll", value: 3600000, function :(client) => this.roll(client), serv : serv})
        this.creer_ordre()
        this.rolls(18, client, serv)
        return ;
    }

    async rolls(number, client, serv) {
        const channel = client.channels.cache.get(serv)
        let liste = [undefined,0]

        for (let i = 0; i < number; i++) {
            try {
                let roll = await channel.sendSlash('432610292342587392', 'ma');
                               
                if (roll.embeds[0] == undefined) {
                    number = 0;
                    
                } else {
					let react = true;
                    let value = parseInt(roll.embeds[0].description.split("\n")[roll.embeds[0].description.split("\n").length -1].split("**")[1]);

                    if (roll.embeds[0].footer) {
                        if (roll.embeds[0].footer.iconURL) { // si react kakera 
                            console.log('kakera', serv)
                            react = false 
                            if (roll.components[0]){
                                for (let j = 0; j < roll.components[0].components.length; j ++) {
                                    await roll.clickButton({ Y : 0, X : j})
                                }
                            }
                        }else if (value > liste[1] & this.claim[serv] == false) {

                        liste = [roll, value]
                    	}  
                    }
                    if ((value > 200 || roll.content != "") & react) {
                        console.log('200 gg', serv, react)
                        if (roll.components[0]){
                            for (let j = 0; j < roll.components[0].components.length; j ++) {
                                await roll.clickButton({ Y : 0, X : j})
                            }
                            this.claim[serv] = true
                        }
                    } else if (value > liste[1] & this.claim[serv] == false) {

                        liste = [roll, value]
                    }
                }
            } catch (e) {
                console.error('Error message:', e);
                number += 1
            }
        }
        if (this.claim_reset[serv] == 0) {
            this.claim_reset[serv] = 2
            if (this.claim[serv] == false) {
                await liste[0].clickButton({ Y : 0, X : 0})
            }
            this.claim[serv] = false
        } else {
            this.claim_reset[serv] -= 1
        }
        console.log(number, 'rolls effectués.');
    }
}