const fs = require('fs');
const path = require('path');
const fsp = require('fs/promises');
let srccss = path.join(__dirname, 'styles');
let destcss = path.join(__dirname, 'project-dist', 'style.css');
let dest = path.join(__dirname, 'project-dist/');
let srcAssets = path.join(__dirname, 'assets');
let destAssets = path.join(__dirname, 'project-dist/assets/');
let templateFile = path.join(__dirname, 'template.html');
let components = path.join(__dirname, 'components/');
//console.log(path.join(__dirname, 'assets'));

// Delete folder

async function delFolder(mainFolder) {
  await fsp.rm(mainFolder, { recursive: true, force: true });
    console.log('Папка удалена!'); 
         
  };
 // delFolder(dest);


// Create folder

 async function createFolder(mainFolder) {
  await fsp.mkdir(mainFolder);
    console.log('Папка создана!');
};
//createFolder(dest);

// Проверяем, есть ли папка 'project-dist' и создаем
// async function readFolder(mainFolder) {
  
//     try {
//         await fsp.readdir(mainFolder, {withFileTypes: true});
//         console.log('Папка есть');
//         delFolder(mainFolder); 

//         } catch (err) {
//         console.error('Папки нет....');
//         delFolder(mainFolder);         
//     };
  
//     console.log('checked');
// };
async function readFolder(mainFolder) {

 try {
     await fsp.stat(mainFolder);
       
     await delFolder(mainFolder);
   
    
    } catch (err) {
        //console.log('Будет создана папка');
    }
    
};

//readFolder(dest);


// Copy Assets

async function copyAssets (dir1, dir2) {
    const entries = await fsp.readdir(dir1, {withFileTypes: true, force: true});
    await fsp.mkdir(dir2, {recursive: true}, err => {
        if (err) throw err;
        copyAssets(srcAssets, destAssets);
    });
    for(let entry of entries) {
        const srcPath = path.join(dir1, entry.name);
        const destPath = path.join(dir2, entry.name);
        if (entry.isDirectory()) {
            copyAssets(srcPath, destPath);
        } else {
            await fsp.copyFile(srcPath, destPath);
        };
    };
};

// create file style.css

const fillFile = () => {
    fs.readdir(srccss, (err, files) => {
        if (err) throw err;
        files.forEach(file => {
            fs.stat(path.join(__dirname, 'styles', file), (err, stats) => {
                if (err) throw err;
                if (stats.isFile()) {
                    if (file.slice(-3) == 'css') {
                        fs.readFile(path.join(__dirname, 'styles', file),
                        (err, data) => {
                            if (err) throw err;
                            fs.appendFile(destcss, data, (err, ) => {
                                if (err) throw err;
                            });
                        });
                    };
                };
            });
        });
    });
};

async function addHtmlFile() {
    let template = await fsp.readFile(templateFile, 'utf8');
    let items = await fsp.readdir(components);
    let sub = [];

    for await (let item of items) {
        const part = await fsp.readFile(`${components}${item}`, 'utf8');
        const fileName = item.replace('.html','');
        //console.log(fileName);
        sub.push([fileName, part]);
        
    }
    for (const [sample, textForSample] of sub) {
        template = template.replace(`{{${sample}}}`, textForSample);
    }
    await fsp.writeFile(`${dest}index.html`, template);
};
//addHtmlFile();

async function go() {
    await readFolder(dest);
     await createFolder(dest);
     await copyAssets(srcAssets, destAssets);
     await fillFile();
     await addHtmlFile();
}

go();
 









