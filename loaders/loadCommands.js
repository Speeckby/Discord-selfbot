const fs = require('fs')

module.exports = async (client) => {

    client.fn.log(client, "LOADERS", `loading Commands`)
    
    fs.readdirSync("./commands")
    .filter(f => f.endsWith(".js"))
    .forEach(async file => {

        let command = require(`../commands/${file}`)
        if (!command.name || typeof command.name !== "string") throw new TypeError(`La commande du fichier ${file} n'a pas de nom`)
        client.commands.set(command.name, command)   
    })
}