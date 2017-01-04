//local-ips.js

var fs = require('fs');

var json_path = './local-ips.json';

var locations = ['北京','天津','河北','山西','内蒙古','辽宁','吉林','黑龙江','上海','江苏','浙江','安徽','福建','江西','山东','河南','湖北','湖南','广东','广西','海南','重庆','四川','贵州','云南','西藏','陕西','甘肃','青海','宁夏','新疆'];

exports.load = function(location,callback){
    fs.readFile(json_path,'utf-8', function(err,json){
        if(err){
            throw err;
        }else{
            var data = JSON.parse(json);
            if (locations.indexOf(location)>-1){
                callback(data[location]);
            }else if(location=="国内"){
                var data_all = [];
                for (var key in data){
                    data_all = data_all.concat(data[key]);
                }
                callback(data_all);
            }
        }
    })
}

exports.loadSync = function(location){
    console.log(location)
    var json = fs.readFileSync(json_path,'utf-8');
    var data = JSON.parse(json);
    if (locations.indexOf(location)>-1){
        return(data[location]);
    }else if(location=="国内"){
        var data_all = [];
        for (var key in data){
            data_all = data_all.concat(data[key]);
            console.log(data_all);
        }
        return(data_all);
    }else{
        console.log("[local-ips] 查询位置不在列表中")
    }
}

exports.locations = function(){
    var locations_all = locations.slice();
    locations_all.push("国内");
    return locations_all;
}

//test
/*exports.load("上海",function(list){
    console.log(list);
});*/
/*console.log(exports.loadSync("国内"));*/
