const secretFolder = './03-files-in-folder/secret-folder';
const fs = require('fs');
const path = require('path');
fs.readdir(secretFolder, {withFileTypes: true}, (err, files) => {
  if (err) throw err;  
  files.forEach(file => {
    if (file.isFile()) {
        
    fs.stat(secretFolder, file, (err, stats)=> {
      
     /*   let a = path.parse(file.name).ext.slice(1);        
        let name = path.parse(file.name).name;
        let size = file.size;
        console.log(`${name} - ${a} - ${size}`);  */
        let size1 = stats.size;
        let ext = path.extname(file.name);
        let basename = path.basename(file.name, ext);
        console.log(`${basename} - ${ext.slice(1)} - ${size1}`);
        //console.log(stats);
        //let fullName = {file, stats};
        //console.log(fullName);
    })
    };
  });
});
