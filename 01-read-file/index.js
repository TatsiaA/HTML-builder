var fs = require('fs');
const path = require('path');
var stream = new fs.ReadStream(path.join('./01-read-file/text.txt'), {encoding: 'utf-8'});
stream.on('readable', function(){
    var data = stream.read();
    (data != null) ? console.log(data) : '';
   // console.log(data);
});

/*const fs = require('fs');
const path = require('path');

fs.readFile(
    path.join('01-read-file', 'text.txt'),
    'utf-8',
    (err, data) => {
        if (err) throw err;
        console.log(data);
    }
);
*/