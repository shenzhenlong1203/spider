var request = require('request');
var fs = require('fs');

var url = "https://www.zhihu.com/api/v4/members/ni-ba-tie-ren/followees?include=data%5B*%5D.answer_count%2Carticles_count%2Cgender%2Cfollower_count%2Cis_followed%2Cis_following%2Cbadge%5B%3F(type%3Dbest_answerer)%5D.topics&offset=0&limit=20";

var zurl = "https://www.zhihu.com/api/v4/members/demouser/followees?include=data%5B*%5D.answer_count%2Carticles_count%2Cgender%2Cfollower_count%2Cis_followed%2Cis_following%2Cbadge%5B%3F(type%3Dbest_answerer)%5D.topics&offset=0&limit=20";

var users = [];

var i = 0;

//request请求的options
var options = {
    url: url,
    headers: {
        "authorization": "Bearer Mi4xSUhDSkFRQUFBQUFBY01KSXdaM0tDeGNBQUFCaEFsVk5GVmNuV3dEWHRCX09IV2hzMnMta2hVQWxMU0RrTEo1VWRn|1513752853|ef345c997c972cef56751c1105027da876481072"
    }
}

function getDataList(url) {
    options.url = url;
    request.get(options, function(error, response, body) {
        if(!error && response.statusCode === 200) {
            var res = JSON.parse(response.body);
            var zhList = res.data;
            zhList.forEach(function(item) {
                //item.gender == 0 性别判断
                if(item.gender === 0) {
                    console.log("正在抓取" + item.avatar_url);
                    users.push({
                        "name": item.name,
                        "img": item.avatar_url.replace("_is", ""),
                        "url_token": item.url_token
                    })
                }
            })
            //is_end当前用户的关注用户是否到最后一页
            if(res.paging.is_end) {
                //这里判断抓取的条数
                console.log(users.length);
                if(users.length >= 1000) {
                    console.log("抓取完成");
                    downLoadContent(JSON.stringify(users));
                    return 0;
                } else {
                    console.log("第" + (i + 1) + "个用户的数据");
                    getDataList(zurl.replace("demouser", users[i].url_token))
                    i++;
                }
            } else {
                if(users.length >= 1000) {
                    console.log("抓取完成");
                    downLoadContent(JSON.stringify(users));
                    return;
                }
                getDataList(res.paging.next);
            }
        } else {
            console.error(body);
        }
    })
}

function downLoadContent(cont) {
    fs.appendFile('./' + 'data.js', "module.exports =" + cont, 'utf-8', function(err) {
        if(err) {
            console.log(err);
        } else
            console.log('success');
    });
}

getDataList(url);