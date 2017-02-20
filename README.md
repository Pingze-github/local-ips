# local-ips
根据地域获取IPv4地址列表，数据储存于json。

## 使用

```
var local_ips = require('./local-ips.js');

var locations = local_ips.provinces(); //获取可选省份
var locations = local_ips.cities(); //获取可选城市

local_ips.load("上海",function(list){ //异步获取区域ip分段列表
    console.log(list); 
});
console.log(local_ips.loadSync("中国")); //同步获取区域ip分段列表

console.log(local_ips.loadRandom("广州")); //同步获取区域中一个随机ip

console.log(exports.matchLocation("湖南省长沙市新天地科技有限公司")); //获取字符串中包含的最精确有效区域名
```

## 注意
+ ip分段指IPv4地址以"."划分四个分段的前三段。
+ 包含同步方法和异步方法。
+ 获取列表储存了ipv4地址前两段，后两段可以随机生成。
+ 地域列表包括“中国”、省级单位、地级市，另外还有北京海淀区等少数区划。
+ “provinces”包含31个大陆范围的省、直辖市、自治区。
+ “cities”包含共428个地级市及少数区划。并非中国所有地级市都包含其中。
+ 因不同源对ip位置的判断不同，数据可能在其他源不能100%准确。
+ 可以使用matchLocation()方法，获取字符串中的区域名，便于进一步获取ip。
