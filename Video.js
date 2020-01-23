const youtubedl = require('youtube-dl');
const fs = require('fs');
const os = require('os');
const process = require('process');
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
        return new Promise((resolve, reject) => {
            youtubedl.getInfo(this.url, [], (err, info) => {
                if (err) reject(err);
                this.info = info;
                resolve(info);
            });
        });
    };

    download(folder = null){
        if(folder === undefined || folder === null){
            const home = process.env.HOME
            const downloadDirectory = home + '/Downloads';
            let file = this.info._filename;
            file = file.replace(/\s/g,'');
            const filepath = `${downloadDirectory}/${file}`;
            // debugger
            fs.realpath(filepath, (err, resolvedPath)=>{
                youtubedl(this.url).pipe(fs.createWriteStream(file));
            })
        }
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