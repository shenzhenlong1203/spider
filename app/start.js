var request = require('request');
var fs = require('fs');
var async = require('async');
var dataImage = require('./data.js');

var eyeUrl = "http://api.eyekey.com/face/Check/checking";

var options = {
    "app_id": "f89ae61fd63d4a63842277e9144a6bd2",
    "app_key": "af1cd33549c54b27ae24aeb041865da2",
    "url": "https://pic4.zhimg.com/43fda2d268bd17c561ab94d3cb8c80eb.jpg"
}

function face(item) {
    options.url = item.img;
    request.post({
        url: eyeUrl,
        form: options
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            try {
                if (data.face[0].attribute.gender === 'Female') {
                    console.log("正在下载" + item.img);
                    downLoadImg(item)
                }
            } catch (e) {
                console.log("验证失败" + item.img);
            }
        }
    })
}

function downLoadImg(image) {
    request.head(image.img, function (err, res, body) {
        if (err) {
            console.log(err);
        }
    });
    request(image.img).pipe(fs.createWriteStream('../image/' + image.name.trim() + Date.now() + '.' + image.img.substring(image.img.lastIndexOf(".") + 1, image.img.length)));
}

function startDownLoad(dataImage) {
    //控制并发量,在5个以内
    async.eachLimit(dataImage, 5, function (item, callback) {
        face(item);
        callback();
    }, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('success!');
        }
    });
}

startDownLoad(dataImage);

