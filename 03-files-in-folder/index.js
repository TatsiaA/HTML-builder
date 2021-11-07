const fs = require('fs');
const path = require('path');
const secretFolder = path.join(__dirname, 'secret-folder');

let stats = fs.stat(path.join(__dirname, 'secret-folder', 'text.txt'), (err, stats) => {
     if (err) throw err;
     console.log(stats.isFile());
     console.log(stats.size);
   });
   //let fileSizeInBytes = stats.size;
   
   
fs.readdir(secretFolder, {withFileTypes: true}, (err, files) => {
  if (err) throw err;  
  files.forEach(file => {
    if (file.isFile()) {
      
    fs.stat(path.join(secretFolder, file.name), (err, stats)=> {
      if (err) throw err;
      //console.log(file);  
        let a = path.parse(file.name).ext.slice(1);        
        let name = path.parse(file.name).name;
        let size = stats.size / 1024;
        console.log(`${name} - ${a} - ${size} kb`);  
       /* let size1 = stats.size;
        
        let ext = path.extname(file.name);
        let basename = path.basename(file.name, ext);
        console.log(`${basename} - ${ext.slice(1)} - ${size1}`);
        
        */
    })
    };
  });
});

