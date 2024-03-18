const config = require("../config.json");

module.exports = class Mudae {
    constructor(next_daily, next_pokemon,next_vote) {
        this.channel = config.channel
        this.next_daily = this.calcul_time(next_daily)
        this.next_pokemon = this.calcul_time(next_pokemon)
        this.next_vote = this.calcul_time(next_vote)
        this.ordre = this.creer_ordre()
        this.time = Date.now()
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
        var ordre = [
            { name: "daily", value: this.next_daily, function : (client) => this.daily(client)},
            { name: "pokemon", value: this.next_pokemon, function : (client) => this.pokemon(client)},
            { name: "vote", value: this.next_vote, function : (client) => this.vote(client)},
        ].sort((a, b) => a.value - b.value);
        return ordre
    }

    verifier_timer(client) {
        if (this.time + this.ordre[0].value < Date.now()) {
            this.ordre[0].function(client)
            console.log(this.ordre)
        } else {
            return 
        }
    }

    daily(client) {
        console.log(client.channels)
        const channel = client.channels.cache.get("1099737720026300576");
        console.log(channel)
        delete this.ordre[0]
        for (let i=0; i<this.ordre.length; i++) {
            this.ordre[i].value += this.time - Date.now()
        }
        this.time = Date.now()
        this.next_daily = 100000
        this.ordre.push({ name: "daily", value: this.next_daily, function :() => this.daily()})
    }

    pokemon() {

    }

    vote() {

    }
}