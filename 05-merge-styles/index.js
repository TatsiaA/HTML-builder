const fs = require('fs');
const path = require('path');

let src = path.join(__dirname, 'styles');
let dest = path.join(__dirname, 'project-dist', 'bundle.css');

const fillFile = () => {
    fs.readdir(src, (err, files) => {
        if (err) throw err;
        files.forEach(file =>{
            fs.stat(path.join(__dirname, 'styles', file), (err, stats) => {
                if (err) throw err;
                if (stats.isFile()) {
                    if (file.slice(-3) == 'css') {
                        fs.readFile(path.join(__dirname, 'styles', file),
                        (err, data) => {
                            if (err) throw err;
                            fs.appendFile(dest, data, (err, ) => {
                                if (err) throw err;
                            });
                        });
                    };
                };
            });
        });
    });
};

const delDir = () => {
 
    fs.rm(dest, { recursive: true, force: true }, () => {
  // console.log('done');   
  });
  fillFile();      
  };

  fs.stat(dest, function(err, stat) {
    if (!err) {
        //console.log('bundle.css есть');
    //  fs.rm(dest, { recursive: true, force: true }, () => console.log('done'));
        delDir();        
    }
    else if (err.code === 'ENOENT') {
       // console.log('Файла нет. Будет создан');        
        fillFile();
    } else {
        console.log('Error');
    };
    
});

