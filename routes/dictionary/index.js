const fs = require('fs')

let dic = fs.readdirSync('./routes/translation');
let rawlang = fs.readFileSync('./routes/coreLanguage.txt').toString();
let getLang = rawlang.split('\n');
let language = []
for (let langFile of dic) {
    let lang = fs.readFileSync(`./routes/translation/${langFile}`).toString();
    let cleanLang = lang.split('\n');
    let index = 0;
    fs.appendFileSync(`./routes/dictionary/${langFile}.js`, 'const translator = { \n')
    for (let _ of [...Array(379)]) {
        fs.appendFileSync(`./routes/dictionary/${langFile}.js`, `"${getLang[index].trim()}" : "${cleanLang[index].trim()}",\n`);
        ++index;
    }
    fs.appendFileSync(`./routes/dictionary/${langFile}.js`, '}; \n')
    fs.appendFileSync(`./routes/dictionary/${langFile}.js`, 'export default translator')
}