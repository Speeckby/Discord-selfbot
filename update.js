const github = require('@actions/github'),
    fs = require('fs'), path = require('path'),
    octokit = github.getOctokit(process.env.GITHUB_TOKEN),
    { green } = require('colors'),
    dontDelete = ["node_modules", ".env", "config.json", "package-lock.json", "start.js"];

async function downloadFile(filePath, localPath) {
    const response = await octokit.rest.repos.getContent({
        owner: "Speeckby",
        repo : "Discord-selfbot",
        path: filePath,
    });

    const content = Buffer.from(response.data.content, 'base64').toString('utf-8');
    const fileName = path.basename(filePath);
    fs.writeFileSync(path.join(localPath, fileName), content);
}

async function fetchRepositoryContents( currentPath = '', localPath = './') {
    let length = 0;
    const response = await octokit.rest.repos.getContent({
        owner : "Speeckby",
        repo : "Discord-selfbot",
        path: currentPath,
    });

    let length_max = response.data.length;
    if (!fs.existsSync(localPath)) {
        fs.mkdirSync(localPath, { recursive: true });
    }

    for (const item of response.data) {
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
    const response = await octokit.rest.repos.getContent({
        owner : "Speeckby",
        repo : "Discord-selfbot",
        path : 'package.json',
    });

    const content = Buffer.from(response.data.content, 'base64').toString('utf-8');
    return JSON.parse(content).version;
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
            delete require.cache[require.resolve('./package.json')];
            return true
        } else {
            delete require.cache[require.resolve('./package.json')];
            return false
        }

    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}