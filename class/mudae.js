const config = require("../config.json");

module.exports = class Mudae {
    constructor(message) {
        this.channel = config.channel
        console.log(this.recuperer_infos(message))
    }

    recuperer_infos(message) {
        let next_daily = false
        let next_poke = false
        let next_dk = false

        if (config.mudae.daily) {
            if (message.includes("$daily est disponible !")) {
                next_daily = 0
            } else {
                next_daily = message.split("$daily reset dans ")[1].split("min.")[0].split("**")
                next_daily = this.calcul_time(next_daily[1])
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
        

        return next_daily, next_poke
    }
    
    calcul_time(time) {
        if (isNaN(time)) {
            time = time.split("h ")
            return (parseInt(time[1]) + parseInt(time[0]) * 60)*60000
        } else {
            return parseInt(time)*60000
        }
    }

    creer_ordre(creer = false) {
        if (creer == false) {
            var ordre = [
                { name: "daily", value: this.next_daily, function : () => this.daily()},
                { name: "pokemon", value: this.next_pokemon, function : () => this.pokemon()},
                { name: "vote", value: this.next_vote, function : () => this.vote()},
            ].sort((a, b) => a.value - b.value);
            return ordre
        } else {
            this.ordre.sort((a, b) => a.value - b.value);
        }
    }

    verifier_timer() {
        if (this.time + this.ordre[0].value < Date.now()) {
            return this.ordre[0].function()
        } 
    }

    daily() {
        this.ordre.splice(0, 1)
        for (let i=0; i<this.ordre.length; i++) {
            this.ordre[i]["value"] -=  Date.now() - this.time
        }
        this.time = Date.now()
        this.ordre.push({ name: "daily", value: 72000000, function :() => this.daily()})
        this.creer_ordre(true)
        return '$daily'
    }

    pokemon() {
        this.ordre.splice(0, 1)
        for (let i=0; i<this.ordre.length; i++) {
            this.ordre[i]["value"] -=  Date.now() - this.time
        }
        this.time = Date.now()
        this.ordre.push({ name: "pokemon", value: 72000000, function :() => this.pokemon()})
        this.creer_ordre(true)
        return '$p'
    }

    vote() {

    }
}