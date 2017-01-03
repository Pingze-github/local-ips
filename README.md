# local-ips
根据地域获取IPv4地址列表，数据储存于json。

## 使用

```
var local_ips = require('./local-ips.js');

var locations = local_ips.locations(); //查看可选区域
local_ips.load("上海",function(list){
    console.log(list);
});
```

## 注意
+ 获取列表储存了ipv4地址前两段，后两段可以随机生成。
+ 地域列表是“国内”和省份，不支持地级市。
+ 目前只包含31个大陆范围的省、直辖市、自治区。
