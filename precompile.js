const fs = require('fs')

let buildDir = process.argv[2] + "/build"
if (!fs.existsSync(buildDir)){
    fs.mkdirSync(buildDir);
}

fs.readdir(process.argv[2], (err, files) => {
    files.filter(name => {
        return ('cdc' === name.split('.')[1])
    }).forEach(name => {
        const data = `module.exports = ` + `\`` + fs.readFileSync(process.argv[2] + "/" + name, 'utf8') + `\``
        try {
                fs.writeFileSync(buildDir + "/" +name.split('.')[0] + '.js', data)
            }
        catch (err) {
            console.error(err)
        }
    })
  });