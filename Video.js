const youtubedl = require('youtube-dl');
const fs = require('fs');
const os = require('os');
const process = require('process');
const path = require('path');
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
                if (err) {
                    debugger
                    reject(err);
                };
                this.info = info;
                resolve(info);
            });
        });
    };

    download(filepath = null){
        var output = filepath
        if (fs.existsSync(output)) {
            var downloaded = fs.statSync(output).size
        }
        // const video = youtubedl('https://www.youtube.com/watch?v=179MiZSibco',

        var video = youtubedl(this.url,
        
          // Optional arguments passed to youtube-dl.
          ['--format=18'],
        
          // start will be sent as a range header
          { start: downloaded, cwd: __dirname }
        )
        
        // Will be called when the download starts.
        video.on('info', function(info) {
          console.log('Download started')
          console.log('filename: ' + info._filename)
        
          // info.size will be the amount to download, add
          let total = info.size + downloaded
          console.log('size: ' + total)
        
          if (downloaded > 0) {
            // size will be the amount already downloaded
            console.log('resuming from: ' + downloaded)
        
            // display the remaining bytes to download
            console.log('remaining bytes: ' + info.size)
          }
        })

        video.pipe(fs.createWriteStream(output, { flags: 'a' }))

        // Will be called if download was already completed and there is nothing more to download.
        video.on('complete', function complete(info) {
          'use strict'
          console.log('filename: ' + info._filename + ' already downloaded.')
        })

        video.on('end', function() {
          console.log('finished downloading!')
        })
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