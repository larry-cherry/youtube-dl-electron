const youtubedl = require('youtube-dl');
const fs = require('fs');

class Video {
    constructor(url = ''){
        this.url = url;
        this.info = {};
        this.downloadDirectory = '';
        if(url.length > 0){
            this.getInfo();
        }
    }

    getInfo(){
        youtubedl.getInfo(this.url, [], (err, info) => {
            if (err) throw err;
            this.info = info;
        });
    };

    download(){
        youtubedl(this.url).pipe(fs.createWriteStream('test.mp4'));
    };
}

exports.default = Video;

// Will be called when the download starts.
// video.on('info', function(info) {
//   console.log('Download started')
//   console.log('filename: ' + info._filename)
//   console.log('size: ' + info.size)
//   console.log(info);
// })
 
// video.pipe(fs.createWriteStream('myvideo.mp4'));