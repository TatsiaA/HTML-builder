const { stdout, stdin } = process;
const fs = require('fs');
const path = require('path');

fs.writeFile(path.join('./02-write-file/file.txt'), '', function(err){
    if(err) throw err;
    
    stdout.write('Hello!\n');
    stdin.on('data', data => {
        let str = data.toString().trim();
        if (str === 'exit') {
            stdout.write('Good bye!');
            // удаляем файл file.txt
            fs.unlink(path.join('./02-write-file/file.txt'), function(err){
                if(err) throw err;            
            });
            // завершаем процесс
            process.exit();
            
        } else {
            fs.appendFile(path.join('./02-write-file/file.txt'), data, function(err){
                if(err) throw err;
            });
        }
    })
    
    process.on('SIGINT', function () {
        console.log('Bye!');      
        
        fs.unlink(path.join('./02-write-file/file.txt'), function(err){
            if(err) throw err;            
        });
        process.exit();
      });
        
   
    
});