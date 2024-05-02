const {readdirSync} = require('fs');

module.exports = async client => {
    
    client.commands = new Object()
    
    readdirSync("./commands/").forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
    
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
    
            if (pull.name) {
                client.commands[pull.name] = [pull, dir];
            }
        } 
    })
};