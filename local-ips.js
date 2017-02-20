//local-ips.js

var fs = require('fs');

var json_path = './ips.json';

function randomInt(arr){ 
    var under = arr[0];
    var over = arr[1];
    return parseInt(Math.random()*(over-under+1) + under);
}

function load_data(location){
    if(typeof(ips_data)!="undefined"){
        return ips_data;
    }else{
        var json = fs.readFileSync(json_path,'utf-8');
        ips_data = JSON.parse(json);
        return ips_data;
    }
}

exports.load = function(location){
    var data = load_data();
    var provinces = data["provinces"]; 
    var cities = data["cities"];
    var province_list = Object.keys(provinces);
    var city_list = Object.keys(cities);
    if (province_list.indexOf(location)>-1){
        return(provinces[location]);
    }else if (city_list.indexOf(location)>-1){
        return(cities[location])
    }else if(location=="国内" || location=="中国"){
        var data_all = [];
        for (var key in provinces){
            data_all = data_all.concat(provinces[key]);
        }
        return(data_all);
    }else{
        console.log("[local-ips] 不支持的区域名称。")
        return null
    }
}

exports.loadRandom = function(location){
    var ips = exports.load(location);
    if (ips!==null){
        var index = Math.floor(Math.random()*ips.length);
        var ip = ips[index] + "." + randomInt([0,255]).toString();
        return ip;
    }else{
        return null;
    }
}

exports.cities = function(){
    var data = load_data();
    var cities = data["cities"];
    var city_list = Object.keys(cities);
    return city_list;
}

exports.provinces = function(){
    var data = load_data();
    var provinces = data["provinces"]; 
    var province_list = Object.keys(provinces);
    return province_list;
}

exports.matchLocation = function(string){
    var city_list = exports.cities();
    var province_list = exports.provinces();
    for (var i in city_list){
        if (string.indexOf(city_list[i])>-1){
            return city_list[i];
        }
    }
    for (var i in province_list){
        if (string.indexOf(province_list[i])>-1){
            return province_list[i];
        }
    }
    return "无匹配";
}

exports.where = function(ip){
    var ipt = ip.substr(0,ip.lastIndexOf("."));
    console.log(ipt)
    var city_list = exports.cities();
    var province_list = exports.provinces();
    for(var i in city_list){
        var ipt_list = exports.load(city_list[i]);
        if (ipt_list.indexOf(ipt)>-1){
            return city_list[i];
        }
    }
    for(var i in province_list){
        var ipt_list = exports.load(province_list[i]);
        if (ipt_list.indexOf(ipt)>-1){
            return province_list[i];
        }
    }
    return null    
} 

// test
if(!module.parent){
    var provinces = exports.provinces();
    console.log(provinces);
    console.log(provinces.length);
    var cities = exports.cities();
    console.log(cities);
    console.log(cities.length);
    var ipt = exports.load("上海");
    console.log(exports.loadRandom("上海"));
    console.log(exports.where("221.237.82.101"));
    console.log(exports.matchLocation("湖南省长沙市新天地科技有限公司"));
}
