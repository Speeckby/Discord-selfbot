const fs = require('fs');

module.exports = {
    get : function () {
        try {
            const data = fs.readFileSync('config.json', 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Erreur de lecture du fichier config.json:', error);
            return null;
        }
    },
    update : function (config) {
        fs.writeFileSync('config.json', JSON.stringify(config, null, 4), 'utf8', (err) => {
            if (err) {
                console.error(`Erreur d'écriture sur le fichier config.json :`, err);
                return;
            }
        });
    }
}