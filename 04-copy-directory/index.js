const fs = require('fs');
//const { promises: fs } = require("fs")
const path = require("path")
let src = path.join(__dirname, 'files');
let dest = path.join(__dirname, 'files-copy');

const copyFiles = () => {
    fs.readdir(src, (err, files) => {
        if (err) throw err;
        files.forEach(file => {
            fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file), err => {
                if (err) throw err;
            });
        });
    });
};

const copyDir = () => {
    fs.mkdir(dest, (err) => {
       // if (err) throw err;
        
    });
     copyFiles();
     
}; 

const delDir = () => {
 
  fs.rm(dest, { recursive: true, force: true }, () => {
 //console.log('done');
  copyDir();
});
    
};

fs.stat(dest, function(err, stat) {
    if (!err) {
        //console.log('Директория есть');
    //  fs.rm(dest, { recursive: true, force: true }, () => console.log('done'));
    
        delDir();
        //console.log('Copied after delete');
    }
    else if (err.code === 'ENOENT') {
        //console.log('директории нет');
        //console.log('Copied');
        copyDir();
    };
    
});




/*

async function copyDir(src, dest) {

    await fs.mkdir(dest, { recursive: true, force: true });
    let entries = await fs.readdir(src, { withFileTypes: true });
    
    for (let entry of entries) {
        let srcPath = path.join(src, entry.name);
        let destPath = path.join(dest, entry.name);

        entry.isDirectory() ?
            await copyDir(srcPath, destPath) :
            await fs.copyFile(srcPath, destPath);
    };
};
/*copyDir(src, dest);


*/
