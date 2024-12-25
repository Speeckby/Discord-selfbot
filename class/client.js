const {Client} = require('discord.js-selfbot-v13')
const {readdirSync} = require('fs');
const { blue } = require("colors");
const update = require('../update.js')

module.exports = class Selfbot extends Client {
    constructor(color = "#a14ca8", prefix = "-") {
        super();
        this.color = color
        this.prefix = prefix
    }

    async start() {
        let restart = await update()
        if (restart) {
            return "restart"
        }
        this.loadCommands()
        this.loadEvents()

        this.login(process.env.TOKEN)

        const Promesse = new Promise((resolve, reject) => {
            this.stop = resolve;
        })
        
        return await Promesse
    }

    loadCommands() {
        this.commands = new Object()
    
        readdirSync("./commands/").forEach(dir => {
            const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
        
            for (let file of commands) {
                let pull = require(`../commands/${dir}/${file}`);
        
                if (pull.name) {
                    this.commands[pull.name] = [pull, dir];
                }
            } 
        })
    }

    loadEvents() {
        
        readdirSync("./events")
            .filter(f => f.endsWith(".js"))
            .forEach(async file => {
        
                let event = require(`../events/${file}`)
        
                this.on(file.split('.js').join(''), event.bind(null, this))
        
                console.log(blue(`[setup] event ${file} load`))
            })
    }
}