const fs = require('fs'), path = require('path'),
    { green } = require('colors'),
    dontDelete = ["node_modules", ".env", "config.json", "package-lock.json"];

async function downloadFile(filePath, localPath) {
    const response = await (await fetch("https://raw.githubusercontent.com/speeckby/Discord-selfbot/main/" + filePath)).text();

    const fileName = path.basename(filePath);
    fs.writeFileSync(path.join(localPath, fileName), response);
}

async function fetchRepositoryContents( currentPath = '', localPath = './') {
    let length = 0;
    const response = await (await fetch("https://api.github.com/repos/speeckby/Discord-selfbot/contents/"+currentPath)).json()

    let length_max = response.length;
    if (!fs.existsSync(localPath)) {
        fs.mkdirSync(localPath, { recursive: true });
    }

    for (const item of response) {
        if (localPath === './') {
            process.stdout.write(green(`\rInstallation de la nouvelle version... ${Math.round(length / length_max * 100)}% `))
            length++;
        }
        if (item.type === 'dir') {
            const subDirPath = path.join(localPath, item.name);
            await fetchRepositoryContents(item.path, subDirPath);
        } else if (item.type === 'file' && !dontDelete.includes(item.name)) {
            await downloadFile(item.path, localPath);
        }
    }
}
async function fetchVersion() {
    const response = await JSON.parse(await (await fetch("https://raw.githubusercontent.com/speeckby/Discord-selfbot/main/package.json")).text());

    return response.version;
}

module.exports = async () => {
    try {
        const package = require('./package.json');
        let new_version = await fetchVersion();
        if (new_version > package.version) {
            console.log(green(`Nouvelle version disponible : ↑ ${new_version} ↑`))
            let length = 0;
            let length_max = fs.readdirSync('./').length;
            for (const file of fs.readdirSync('./')) {
                length++;
                process.stdout.write(green(`\rSuppression des anciens fichiers... ${Math.round(length / length_max * 100)}% `))
                if (!dontDelete.includes(file)) {
                    fs.rmSync(file, { recursive: true, force: true });
                }
            }
            process.stdout.write(green(`\rSuppression des anciens fichiers... 100% `))
            console.log()


            await fetchRepositoryContents();
            process.stdout.write(green(`\rInstallation de la nouvelle version... 100% `))
            console.log()
            console.log(green(`Mise à jour terminée !`))
            return true
        } else {
            return false
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}