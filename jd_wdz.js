/**
 微定制瓜分京豆-加密

 目前实现：

 1.指定首位账号即指定PIN变量：（京东用户名）：
 //export jd_wdz_pin="pin值"  (不填写，默认首位账号以 jd_wdz_mixnu 为准)

 2.指定从账号几跑到账号几变量：(jd_wdz_mixnu代表开始，jd_wdz_maxnum代表结束)
 //export jd_wdz_mixnum="0" 0代表青龙排位为1的账号
 //export jd_wdz_maxnum="90"

 PS：jd_wdz_maxnum必须大于jd_wdz_mixnum  才能生效  不填写默认运行0-90账号

 3.IP被限流自动退出脚本、账号是黑号自动跳过。

 4.优化大量重复请求。

 2022.8.17 更新：
 1.支持缓存token   需要在容器安装依赖：npm install -g ds  （或者直接在青龙面板-依赖管理-添加依赖-类型 nodejs -名称：ds  安装即可使用）
 生成的token文件在 function/cache/token.json中。
 2.优化流程，减少493概率。
 3.清楚显示助力人昵称，再次运行显示已助力昵称。
 4.默认首位账号助力作者。
 5.开卡未开完全进行二次重试。(试验性)



 必须条件：配置文件或者环境变量中添加变量：
 ## 微定制瓜分京豆-jd_wdz.js
 //export jd_wdz_activityId="活动ID"
 //export jd_wdz_activityUrl="https://cjhydz-isv.isvjcloud.com"

 cron:7 7 7 7 *
 ============Quantumultx===============
 [task_local]
 #微定制瓜分京豆-加密
 7 7 7 7 * jd_wdz.js, tag=微定制瓜分京豆-加密, enabled=true
 */

let jd_wdz_activityId = "" // 活动ID
let jd_wdz_activityUrl = "https://cjhydz-isv.isvjcloud.com" // 活动地址

const $ = new Env("微定制瓜分京豆-加密");

var __encode = 'jsjiami.com', _a = {},
    _0xb483 = ["\x5F\x64\x65\x63\x6F\x64\x65", "\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x73\x6F\x6A\x73\x6F\x6E\x2E\x63\x6F\x6D\x2F\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x6F\x62\x66\x75\x73\x63\x61\x74\x6F\x72\x2E\x68\x74\x6D\x6C"];
(function (_0xd642x1) {
    _0xd642x1[_0xb483[0]] = _0xb483[1]
})(_a);
var __Oxe8a94 = ["\x69\x73\x4E\x6F\x64\x65", "\x2E\x2F\x73\x65\x6E\x64\x4E\x6F\x74\x69\x66\x79", "", "\x2E\x2F\x6A\x64\x43\x6F\x6F\x6B\x69\x65\x2E\x6A\x73", "\x2E\x2F\x66\x75\x6E\x63\x74\x69\x6F\x6E\x2F\x6B\x72\x67\x65\x74\x54\x6F\x6B\x65\x6E", "\x68\x74\x74\x70\x73\x3A\x2F\x2F\x63\x6A\x68\x79\x64\x7A\x2D\x69\x73\x76\x2E\x69\x73\x76\x6A\x63\x6C\x6F\x75\x64\x2E\x63\x6F\x6D", "\x61\x63\x74\x69\x76\x69\x74\x79\x45\x6E\x64", "\x6A\x64\x5F\x6B\x72\x5F\x77\x64\x7A\x5F\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64", "\x67\x65\x74\x64\x61\x74\x61", "\x6A\x64\x5F\x6B\x72\x5F\x77\x64\x7A\x5F\x61\x63\x74\x69\x76\x69\x74\x79\x55\x72\x6C", "\x6A\x64\x5F\x77\x64\x7A\x5F\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64", "\x65\x6E\x76", "\x6A\x64\x5F\x77\x64\x7A\x5F\x61\x63\x74\x69\x76\x69\x74\x79\x55\x72\x6C", "\x6A\x64\x5F\x77\x64\x7A\x5F\x70\x69\x6E", "\x6A\x64\x5F\x77\x64\x7A\x5F\x6D\x69\x78\x6E\x75\x6D", "\x6A\x64\x5F\x77\x64\x7A\x5F\x6D\x61\x78\x6E\x75\x6D", "\x47\x49\x54\x48\x55\x42", "\x69\x6E\x64\x65\x78\x4F\x66", "\x73\x74\x72\x69\x6E\x67\x69\x66\x79", "\x65\x78\x69\x74", "\x70\x75\x73\x68", "\x66\x6F\x72\x45\x61\x63\x68", "\x6B\x65\x79\x73", "\x4A\x44\x5F\x44\x45\x42\x55\x47", "\x66\x61\x6C\x73\x65", "\x6C\x6F\x67", "\x66\x69\x6C\x74\x65\x72", "\x43\x6F\x6F\x6B\x69\x65\x4A\x44", "\x43\x6F\x6F\x6B\x69\x65\x4A\x44\x32", "\x63\x6F\x6F\x6B\x69\x65", "\x6D\x61\x70", "\x43\x6F\x6F\x6B\x69\x65\x73\x4A\x44", "\x5B\x5D", "\x74\x6F\x4F\x62\x6A", "\x69\x6E\x63\x6C\x75\x64\x65\x73", "\x66\x69\x6E\x64\x49\x6E\x64\x65\x78", "\x73\x70\x6C\x69\x63\x65", "\x73\x6C\x69\x63\x65", "\x0A\u272A\u272A\u672C\u6B21\u5B9E\u9645\u8FD0\u884C", "\x6C\x65\x6E\x67\x74\x68", "\u4E2A\u4EAC\u4E1C\u8D26\u53F7\u272A\u272A\x0A", "\x75\x6E\x64\x65\x66\x69\x6E\x65\x64", "\x64\x6F\x6E\x65", "\x66\x69\x6E\x61\x6C\x6C\x79", "\x20", "\x6E\x61\x6D\x65", "\x2C\x20\u5931\u8D25\x21\x20\u539F\u56E0\x3A\x20", "\x21", "\x63\x61\x74\x63\x68", "\u6D3B\u52A8\x69\x64\u4E0D\u5B58\u5728", "\x6D\x73\x67", "\x68\x74\x74\x70\x3A\x2F\x2F\x63\x6F\x64\x65\x2E\x6B\x69\x6E\x67\x72\x61\x6E\x2E\x67\x61\x2F\x77\x64\x7A\x2E\x6A\x73\x6F\x6E", "\u265A\u265A\u6D3B\u52A8\u5165\u53E3\u265A\u265A\x0A\x68\x74\x74\x70\x73\x3A\x2F\x2F\x63\x6A\x68\x79\x64\x7A\x2D\x69\x73\x76\x2E\x69\x73\x76\x6A\x63\x6C\x6F\x75\x64\x2E\x63\x6F\x6D\x2F\x6D\x69\x63\x72\x6F\x44\x7A\x2F\x69\x6E\x76\x69\x74\x65\x2F\x61\x63\x74\x69\x76\x69\x74\x79\x2F\x77\x78\x2F\x76\x69\x65\x77\x2F\x69\x6E\x64\x65\x78\x2F\x38\x38\x38\x32\x37\x36\x31\x3F\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64\x3D", "\x0A\u273F\u273F\u5F53\u524D\u6307\u5B9A\u9996\u4F4D\u8D26\u53F7\u273F\u273F\x20\uFF1A", "\x0A\u2764\u2764\u5F53\u524D\u6307\u5B9A\u4ECE\u8D26\u53F7", "\u8FD0\u884C\u81F3\u8D26\u53F7", "\u505C\u6B62\u2764\u2764", "\u3010\u63D0\u793A\u3011\u8BF7\u5148\u83B7\u53D6\u4EAC\u4E1C\u8D26\u53F7\u4E00\x63\x6F\x6F\x6B\x69\x65\x0A\u76F4\u63A5\u4F7F\u7528\x4E\x6F\x62\x79\x44\x61\u7684\u4EAC\u4E1C\u7B7E\u5230\u83B7\u53D6", "\x68\x74\x74\x70\x73\x3A\x2F\x2F\x62\x65\x61\x6E\x2E\x6D\x2E\x6A\x64\x2E\x63\x6F\x6D\x2F", "\x55\x73\x65\x72\x4E\x61\x6D\x65", "\x6D\x61\x74\x63\x68", "\x69\x6E\x64\x65\x78", "\x69\x73\x4C\x6F\x67\x69\x6E", "\x6E\x69\x63\x6B\x4E\x61\x6D\x65", "\x0A\u5F00\u59CB\u3010\u4EAC\u4E1C\u8D26\u53F7", "\u3011", "\x0A", "\u3010\u63D0\u793A\u3011\x63\x6F\x6F\x6B\x69\x65\u5DF2\u5931\u6548", "\u4EAC\u4E1C\u8D26\u53F7", "\x0A\u8BF7\u91CD\u65B0\u767B\u5F55\u83B7\u53D6\x0A\x68\x74\x74\x70\x73\x3A\x2F\x2F\x62\x65\x61\x6E\x2E\x6D\x2E\x6A\x64\x2E\x63\x6F\x6D\x2F", "\x63\x6F\x6F\x6B\x69\x65\u5DF2\u5931\u6548\x20\x2D\x20", "\x0A\u8BF7\u91CD\u65B0\u767B\u5F55\u83B7\u53D6\x63\x6F\x6F\x6B\x69\x65", "\x73\x65\x6E\x64\x4E\x6F\x74\x69\x66\x79", "\x77\x61\x69\x74", "\x6F\x75\x74\x46\x6C\x61\x67", "\x73\x69\x64", "\x75\x73\x65\x72\x49\x64", "\x35\x39\x39\x31\x31\x39", "\x74\x6F\x6B\x65\x6E", "\x50\x69\x6E", "\x68\x69\x73\x50\x69\x6E", "\x63\x61\x72\x64", "\u6B64\x69\x70\u5DF2\u88AB\u9650\u5236\uFF0C\u8BF7\u8FC7\u66F4\u6362\x49\x50\u540E\u6216\u8005\u7B49\u5F85\u4E00\u4F1A\u513F\u518D\u6267\u884C\u811A\u672C\x0A", "\u83B7\u53D6\x5B\x74\x6F\x6B\x65\x6E\x5D\u5931\u8D25\uFF01", "\u83B7\u53D6\x5B\x50\x69\x6E\x5D\u5931\u8D25\uFF01", "\x68\x69\x73", "\x68\x69\x73\x49\x6E\x76\x69\x74\x65\x72\x49\x6D\x67", "\x61\x74\x74\x72\x54\x6F\x75\x58\x69\x61\x6E\x67", "\x76\x65\x6E\x64\x65\x72\x49\x64\x73", "\x73\x68\x6F\x70\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64", "\x6A\x6F\x69\x6E\x56\x65\x6E\x64\x65\x72\x49\x64", "\x34\x30\x31", "\x6F\x70\x65\x6E\x43\x61\x72\x64\x53\x74\x61\x74\x75\x73", "\u60A8\u8FD8\u4E0D\u662F\u4F1A\u5458\u8BF6\uFF0C\u5F00\u5361\u4E2D\x7E\x7E\x7E\x7E", "\u7B2C", "\u6B21\x20\u91CD\u65B0\u5F00\u5361", "\u6D3B\u52A8\u592A\u706B\u7206\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5", "\x65\x72\x72\x6F\x72\x4A\x6F\x69\x6E\x53\x68\x6F\x70", "\u5F00\u5361\u5931\u8D25\u274C\x20\uFF0C\u91CD\u65B0\u6267\u884C\u811A\u672C", "\x67\x65\x74\x41\x75\x74\x68\x6F\x72\x43\x6F\x64\x65\x4C\x69\x73\x74\x65\x72\x72", "\x61\x75\x74\x68\x6F\x72\x43\x6F\x64\x65", "\x69\x6E\x76\x69\x74\x65\x65\x4E\x69\x63\x6B", "\x69\x6E\x76\x69\x74\x65\x72", "\u3010\u4EAC\u4E1C\u8D26\u53F7", "\u3011\x20\u672A\u80FD\u83B7\u53D6\u6D3B\u52A8\u4FE1\u606F", "\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64\x3D", "\x2F\x63\x75\x73\x74\x6F\x6D\x65\x72\x2F\x67\x65\x74\x53\x69\x6D\x70\x6C\x65\x41\x63\x74\x49\x6E\x66\x6F\x56\x6F", "\x74\x6F\x53\x74\x72", "\x20\x67\x65\x74\x53\x69\x6D\x70\x6C\x65\x41\x63\x74\x49\x6E\x66\x6F\x56\x6F\x20\x41\x50\x49\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5", "\x73\x74\x61\x74\x75\x73", "\x6C\x6F\x67\x45\x72\x72", "\x70\x6F\x73\x74", "\x2F\x6D\x69\x63\x72\x6F\x44\x7A\x2F\x69\x6E\x76\x69\x74\x65\x2F\x61\x63\x74\x69\x76\x69\x74\x79\x2F\x77\x78\x2F\x76\x69\x65\x77\x2F\x69\x6E\x64\x65\x78\x3F\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64\x3D", "\x55\x41", "\x73\x74\x61\x74\x75\x73\x43\x6F\x64\x65", "\u6B64\x69\x70\u5DF2\u88AB\u9650\u5236\uFF0C\u8BF7\u8FC7\x31\x30\u5206\u949F\u540E\u518D\u6267\u884C\u811A\u672C\x0A", "\x20\x63\x6F\x6F\x6B\x69\x65\x20\x41\x50\x49\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5", "\x67\x65\x74", "\x75\x73\x65\x72\x49\x64\x3D", "\x26\x74\x6F\x6B\x65\x6E\x3D", "\x26\x66\x72\x6F\x6D\x54\x79\x70\x65\x3D\x41\x50\x50", "\x2F\x63\x75\x73\x74\x6F\x6D\x65\x72\x2F\x67\x65\x74\x4D\x79\x50\x69\x6E\x67", "\x20\x33\x20\x41\x50\x49\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5", "\x70\x61\x72\x73\x65", "\x72\x65\x73\x75\x6C\x74", "\x64\x61\x74\x61", "\x73\x65\x63\x72\x65\x74\x50\x69\x6E", "\x6E\x69\x63\x6B\x6E\x61\x6D\x65", "\x41\x55\x54\x48\x5F\x43\x5F\x55\x53\x45\x52", "\x79\x75\x6E\x4D\x69\x64\x49\x6D\x61\x67\x65\x55\x72\x6C", "\x68\x74\x74\x70\x73\x3A\x2F\x2F\x69\x6D\x67\x31\x30\x2E\x33\x36\x30\x62\x75\x79\x69\x6D\x67\x2E\x63\x6F\x6D\x2F\x69\x6D\x67\x7A\x6F\x6E\x65\x2F\x6A\x66\x73\x2F\x74\x31\x2F\x32\x31\x33\x38\x33\x2F\x32\x2F\x36\x36\x33\x33\x2F\x33\x38\x37\x39\x2F\x35\x63\x35\x31\x33\x38\x64\x38\x45\x30\x39\x36\x37\x63\x63\x66\x32\x2F\x39\x31\x64\x61\x35\x37\x63\x35\x65\x32\x31\x36\x36\x30\x30\x35\x2E\x6A\x70\x67", "\x6B\x72\x6E\x69\x63\x6B\x6E\x61\x6D\x65", "\x68\x74\x74\x70\x73\x3A\x2F\x2F\x61\x70\x69\x2E\x6D\x2E\x6A\x64\x2E\x63\x6F\x6D\x2F\x63\x6C\x69\x65\x6E\x74\x2E\x61\x63\x74\x69\x6F\x6E\x3F\x61\x70\x70\x69\x64\x3D\x6A\x64\x5F\x73\x68\x6F\x70\x5F\x6D\x65\x6D\x62\x65\x72\x26\x66\x75\x6E\x63\x74\x69\x6F\x6E\x49\x64\x3D\x67\x65\x74\x53\x68\x6F\x70\x4F\x70\x65\x6E\x43\x61\x72\x64\x49\x6E\x66\x6F\x26\x62\x6F\x64\x79\x3D", "\x26\x63\x6C\x69\x65\x6E\x74\x3D\x48\x35\x26\x63\x6C\x69\x65\x6E\x74\x56\x65\x72\x73\x69\x6F\x6E\x3D\x39\x2E\x32\x2E\x30\x26\x75\x75\x69\x64\x3D\x38\x38\x38\x38\x38\x26\x68\x35\x73\x74\x3D\x32\x30\x32\x32\x30\x34\x31\x32\x31\x36\x34\x36\x34\x35\x32\x34\x31\x25\x33\x42\x33\x36\x33\x34\x64\x31\x61\x65\x61\x64\x61\x36\x64\x39\x63\x64\x31\x31\x61\x37\x35\x32\x36\x61\x33\x61\x36\x61\x63\x36\x33\x65\x25\x33\x42\x31\x36\x39\x66\x31\x25\x33\x42\x74\x6B\x30\x32\x77\x64\x36\x36\x66\x31\x64\x37\x34\x31\x38\x6E\x58\x75\x4C\x6A\x73\x6D\x4F\x33\x6F\x4A\x4D\x43\x78\x55\x71\x4B\x56\x77\x49\x66\x34\x71\x31\x57\x52\x70\x74\x4B\x52\x54\x33\x6E\x4A\x53\x72\x78\x30\x31\x6F\x59\x59\x42\x41\x79\x6C\x62\x53\x75\x79\x67\x34\x73\x69\x70\x6E\x45\x7A\x79\x45\x4A\x4F\x5A\x75\x46\x6A\x66\x47\x32\x51\x45\x52\x63\x42\x74\x7A\x64\x25\x33\x42\x36\x62\x34\x35\x35\x32\x33\x34\x65\x39\x33\x62\x65\x34\x65\x63\x39\x36\x33\x63\x64\x37\x63\x35\x37\x35\x64\x37\x30\x38\x38\x32\x62\x38\x33\x38\x62\x61\x35\x38\x38\x31\x34\x39\x61\x31\x66\x35\x34\x62\x36\x39\x63\x38\x64\x30\x64\x61\x63\x66\x31\x34\x64\x61\x25\x33\x42\x33\x2E\x30\x25\x33\x42\x31\x36\x34\x39\x37\x35\x33\x32\x30\x35\x32\x34\x31", "\x61\x70\x69\x2E\x6D\x2E\x6A\x64\x2E\x63\x6F\x6D", "\x2A\x2F\x2A", "\x6B\x65\x65\x70\x2D\x61\x6C\x69\x76\x65", "\x68\x74\x74\x70\x73\x3A\x2F\x2F\x73\x68\x6F\x70\x6D\x65\x6D\x62\x65\x72\x2E\x6D\x2E\x6A\x64\x2E\x63\x6F\x6D\x2F\x73\x68\x6F\x70\x63\x61\x72\x64\x2F\x3F\x76\x65\x6E\x64\x65\x72\x49\x64\x3D", "\x26\x63\x68\x61\x6E\x6E\x65\x6C\x3D\x38\x30\x31\x26\x72\x65\x74\x75\x72\x6E\x55\x72\x6C\x3D", "\x67\x7A\x69\x70\x2C\x20\x64\x65\x66\x6C\x61\x74\x65\x2C\x20\x62\x72", "\x52\x65\x73\x70\x6F\x6E\x73\x65\x20\x63\x6F\x64\x65\x20\x34\x30\x33\x20\x28\x46\x6F\x72\x62\x69\x64\x64\x65\x6E\x29", "\x65\x72\x72", "\x73\x75\x63\x63\x65\x73\x73", "\x75\x73\x65\x72\x49\x6E\x66\x6F", "\x69\x6E\x74\x65\x72\x65\x73\x74\x73\x52\x75\x6C\x65\x4C\x69\x73\x74", "\x6F\x70\x65\x6E\x43\x61\x72\x64\x41\x63\x74\x69\x76\x69\x74\x79\x49\x64", "\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64", "\x69\x6E\x74\x65\x72\x65\x73\x74\x73\x49\x6E\x66\x6F", "\x70\x69\x6E\x3D", "\x2F\x77\x78\x41\x63\x74\x69\x6F\x6E\x43\x6F\x6D\x6D\x6F\x6E\x2F\x67\x65\x74\x55\x73\x65\x72\x49\x6E\x66\x6F", "\x20\x36\x2D\x31\x20\x41\x50\x49\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5", "\u5F02\u5E38\x36\x2D\x32\uFF1A", "\x26\x69\x6E\x76\x69\x74\x65\x72\x3D", "\x26\x70\x61\x67\x65\x4E\x6F\x3D\x31\x26\x70\x61\x67\x65\x53\x69\x7A\x65\x3D\x31\x35\x26\x74\x79\x70\x65\x3D\x30", "\x2F\x6D\x69\x63\x72\x6F\x44\x7A\x2F\x69\x6E\x76\x69\x74\x65\x2F\x61\x63\x74\x69\x76\x69\x74\x79\x2F\x77\x78\x2F\x69\x6E\x76\x69\x74\x65\x52\x65\x63\x6F\x72\x64", "\x69\x6E\x76\x69\x74\x65\x52\x65\x63\x6F\x72\x64\x20\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5", "\x69\x6E\x76\x69\x74\x65\x72\x47\x65\x74\x42\x65\x61\x6E\x73", "\u5F53\u524D\u5DF2\u9080\u8BF7\u4EBA\u6570\uFF1A", "\x63\x6F\x75\x6E\x74", "\u5F53\u524D\u83B7\u5F97\u5956\u52B1\uFF1A", "\x6D\x61\x78\x69\x6E\x76\x69\x74\x65\x72\x47\x65\x74\x42\x65\x61\x6E\x73", "\x74\x65\x61\x6D\x4E\x75\x6D", "\u592A\u68D2\u4E86\uFF0C\u4F60\u5DF2\u7ECF\u83B7\u5F97\u4E86\u6D3B\u52A8\u6700\u5927\u5956\u52B1\uFF01\uFF01", "\x2F\x6D\x69\x63\x72\x6F\x44\x7A\x2F\x69\x6E\x76\x69\x74\x65\x2F\x61\x63\x74\x69\x76\x69\x74\x79\x2F\x77\x78\x2F\x67\x65\x74\x41\x63\x74\x69\x76\x69\x74\x79\x49\x6E\x66\x6F", "\x72\x65\x73\x69\x64\x75\x61\x6C\x50\x65\x72\x63\x65\x6E\x74\x61\x67\x65", "\x62\x65\x61\x6E\x73\x52\x65\x73\x69\x64\x75\x65\x42\x79\x44\x61\x79", "\x61\x63\x74\x52\x75\x6C\x65", "\x2C", "\x73\x70\x6C\x69\x74", "\u5F53\u524D\u6D3B\u52A8\u5F00\u5361\x49\x44\uFF1A", "\x26", "\x72\x65\x70\x6C\x61\x63\x65", "\u5F53\u524D\u6D3B\u52A8\u5269\u4F59\uFF1A", "\u5F53\u65E5\u5269\u4F59\u4EAC\u8C46\u6570\uFF1A", "\u5F53\u524D\u6D3B\u52A8\u6700\u591A\u7EC4\u961F\x3A", "\u6B21", "\x72\x65\x73\x69\x64\x75\x61\x6C\x50\x65\x72\x63\x65\x6E\x74\x61\x67\x65\x45\x6E\x64", "\x26\x69\x6E\x76\x69\x74\x65\x72\x4E\x69\x63\x6B\x3D", "\x26\x69\x6E\x76\x69\x74\x65\x65\x4E\x69\x63\x6B\x3D", "\x26\x69\x6E\x76\x69\x74\x65\x65\x3D", "\x26\x69\x6E\x76\x69\x74\x65\x72\x49\x6D\x67\x3D", "\x26\x69\x6E\x76\x69\x74\x65\x65\x49\x6D\x67\x3D", "\x2F\x6D\x69\x63\x72\x6F\x44\x7A\x2F\x69\x6E\x76\x69\x74\x65\x2F\x61\x63\x74\x69\x76\x69\x74\x79\x2F\x77\x78\x2F\x61\x63\x63\x65\x70\x74\x49\x6E\x76\x69\x74\x65", "\x6A\x6F\x69\x6E\x54\x65\x61\x6D\x20\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5", "\u5B9D\uFF0C\u52A0\u5165\u961F\u4F0D\u6210\u529F", "\x65\x72\x72\x6F\x72\x4D\x65\x73\x73\x61\x67\x65", "\u5B9D\uFF0C\u5F53\u524D\u52A9\u529B\u8D26\u53F7\u6635\u79F0\uFF1A", "\x6F\x70\x65\x6E\x43\x61\x72\x64\x54\x69\x6D\x65\x73", "\u62B1\u6B49\x2C\u60A8\u5DF2\u7ECF\u53C2\u52A0\u4E86\u5176\u4ED6\u961F\u4F0D\x2C\u65E0\u6CD5\u52A0\u5165\u6B64\u961F\u4F0D\uFF01", "\u5B9D\uFF0C\u8BF7\u81EA\u884C\u786E\u8BA4\uFF0C\u6B64\u8D26\u53F7\u5DF2\u52A9\u529B\u8D26\u53F7\u6635\u79F0\uFF1A", "\x69\x6E\x76\x69\x74\x65\x72\x4E\x69\x63\x6B", "\u5B9D\uFF0C\u6B64\u8D26\u53F7\u5DF2\u5168\u90E8\u5F00\u5361\uFF0C\u662F\u6709\u6548\u52A9\u529B", "\u5B9D\uFF0C\u6B64\u8D26\u53F7\u672A\u5168\u90E8\u5F00\u5361\uFF0C\u4E0D\u7B97\u6709\u6548\u4EBA\u6570\uFF0C\u5F53\u524D\u5F00\u5361\u6570\uFF1A", "\u7A0D\u7B49\u91CD\u8BD5\u5F00\u5361\uFF0C\u53EF\u80FD\u9ED1\u53F7\x7E", "\x68\x74\x74\x70\x73\x3A\x2F\x2F\x63\x6A\x68\x79\x64\x7A\x2D\x69\x73\x76\x2E\x69\x73\x76\x6A\x63\x6C\x6F\x75\x64\x2E\x63\x6F\x6D\x2F\x6D\x69\x63\x72\x6F\x44\x7A\x2F\x69\x6E\x76\x69\x74\x65\x2F\x61\x63\x74\x69\x76\x69\x74\x79\x2F\x77\x78\x2F\x67\x65\x74\x4F\x70\x65\x6E\x43\x61\x72\x64\x41\x6C\x6C\x53\x74\x61\x74\x75\x65\x73\x4E\x65\x77", "\x3B\x49\x73\x76\x54\x6F\x6B\x65\x6E\x3D", "\x3B\x41\x55\x54\x48\x5F\x43\x5F\x55\x53\x45\x52\x3D", "\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x78\x2D\x77\x77\x77\x2D\x66\x6F\x72\x6D\x2D\x75\x72\x6C\x65\x6E\x63\x6F\x64\x65\x64\x3B\x20\x63\x68\x61\x72\x73\x65\x74\x3D\x55\x54\x46\x2D\x38", "\x7A\x68\x2D\x63\x6E", "\x68\x74\x74\x70\x73\x3A\x2F\x2F\x63\x6A\x68\x79\x64\x7A\x2D\x69\x73\x76\x2E\x69\x73\x76\x6A\x63\x6C\x6F\x75\x64\x2E\x63\x6F\x6D\x2F\x6D\x69\x63\x72\x6F\x44\x7A\x2F\x69\x6E\x76\x69\x74\x65\x2F\x61\x63\x74\x69\x76\x69\x74\x79\x2F\x77\x78\x2F\x76\x69\x65\x77\x2F\x69\x6E\x64\x65\x78\x3F\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64\x3D", "\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x6A\x73\x6F\x6E\x2C\x20\x74\x65\x78\x74\x2F\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x2C\x20\x2A\x2F\x2A\x3B\x20\x71\x3D\x30\x2E\x30\x31", "\x69\x73\x49\x6E\x76\x69\x74\x65\x64\x3D\x31\x26\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64\x3D", "\x26\x70\x69\x6E\x3D", "\x20\x31\x20\x41\x50\x49\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5", "\x69\x73\x43\x61\x6E\x4A\x6F\x69\x6E", "\x6F\x70\x65\x6E\x43\x61\x72\x64\x4C\x69\x6E\x6B", "\x6C\x69\x73\x74", "\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x6A\x73\x6F\x6E", "\x63\x6A\x68\x79\x64\x7A\x2D\x69\x73\x76\x2E\x69\x73\x76\x6A\x63\x6C\x6F\x75\x64\x2E\x63\x6F\x6D", "\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x78\x2D\x77\x77\x77\x2D\x66\x6F\x72\x6D\x2D\x75\x72\x6C\x65\x6E\x63\x6F\x64\x65\x64", "\x68\x74\x74\x70\x73\x3A\x2F\x2F\x61\x70\x69\x2E\x6D\x2E\x6A\x64\x2E\x63\x6F\x6D\x2F\x63\x6C\x69\x65\x6E\x74\x2E\x61\x63\x74\x69\x6F\x6E", "\x68\x74\x74\x70\x73\x3A\x2F\x2F\x63\x6A\x68\x79\x64\x7A\x2D\x69\x73\x76\x2E\x69\x73\x76\x6A\x63\x6C\x6F\x75\x64\x2E\x63\x6F\x6D\x2F\x63\x6F\x6D\x6D\x6F\x6E\x2F\x61\x63\x63\x65\x73\x73\x4C\x6F\x67", "\x76\x65\x6E\x64\x65\x72\x49\x64\x3D\x31\x26\x63\x6F\x64\x65\x3D\x39\x39\x26\x70\x69\x6E\x3D", "\x26\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64\x3D", "\x26\x70\x61\x67\x65\x55\x72\x6C\x3D\x68\x74\x74\x70\x73\x25\x33\x41\x25\x32\x46\x25\x32\x46\x24\x63\x6A\x68\x79\x64\x7A\x2D\x69\x73\x76\x2E\x69\x73\x76\x6A\x63\x6C\x6F\x75\x64\x2E\x63\x6F\x6D\x25\x32\x46\x6D\x69\x63\x72\x6F\x44\x7A\x25\x32\x46\x69\x6E\x76\x69\x74\x65\x25\x32\x46\x61\x63\x74\x69\x76\x69\x74\x79\x25\x32\x46\x77\x78\x25\x32\x46\x76\x69\x65\x77\x25\x32\x46\x69\x6E\x64\x65\x78\x25\x33\x46\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64\x25\x33\x44", "\x26\x73\x75\x62\x54\x79\x70\x65\x3D\x61\x70\x70", "\x20\x41\x50\x49\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5", "\x73\x65\x74\x2D\x63\x6F\x6F\x6B\x69\x65", "\x68\x65\x61\x64\x65\x72\x73", "\x3B", "\x3D", "\x73\x75\x62\x73\x74\x72", "\x3F", "\x4D\x6F\x7A\x69\x6C\x6C\x61\x2F\x35\x2E\x30\x20\x28\x69\x50\x68\x6F\x6E\x65\x3B\x20\x43\x50\x55\x20\x69\x50\x68\x6F\x6E\x65\x20\x4F\x53\x20\x31\x33\x5F\x32\x5F\x33\x20\x6C\x69\x6B\x65\x20\x4D\x61\x63\x20\x4F\x53\x20\x58\x29\x20\x41\x70\x70\x6C\x65\x57\x65\x62\x4B\x69\x74\x2F\x36\x30\x35\x2E\x31\x2E\x31\x35\x20\x28\x4B\x48\x54\x4D\x4C\x2C\x20\x6C\x69\x6B\x65\x20\x47\x65\x63\x6B\x6F\x29\x20\x56\x65\x72\x73\x69\x6F\x6E\x2F\x31\x33\x2E\x30\x2E\x33\x20\x4D\x6F\x62\x69\x6C\x65\x2F\x31\x35\x45\x31\x34\x38\x20\x53\x61\x66\x61\x72\x69\x2F\x36\x30\x34\x2E\x31\x20\x45\x64\x67\x2F\x38\x37\x2E\x30\x2E\x34\x32\x38\x30\x2E\x38\x38", "\x6A\x64\x61\x70\x70\x3B\x69\x50\x68\x6F\x6E\x65\x3B\x31\x30\x2E\x32\x2E\x32\x3B\x31\x34\x2E\x33\x3B", "\x3B\x4D\x2F\x35\x2E\x30\x3B\x6E\x65\x74\x77\x6F\x72\x6B\x2F\x77\x69\x66\x69\x3B\x41\x44\x49\x44\x2F\x3B\x6D\x6F\x64\x65\x6C\x2F\x69\x50\x68\x6F\x6E\x65\x31\x32\x2C\x31\x3B\x61\x64\x64\x72\x65\x73\x73\x69\x64\x2F\x34\x31\x39\x39\x31\x37\x35\x31\x39\x33\x3B\x61\x70\x70\x42\x75\x69\x6C\x64\x2F\x31\x36\x37\x38\x36\x33\x3B\x6A\x64\x53\x75\x70\x70\x6F\x72\x74\x44\x61\x72\x6B\x4D\x6F\x64\x65\x2F\x30\x3B\x4D\x6F\x7A\x69\x6C\x6C\x61\x2F\x35\x2E\x30\x20\x28\x69\x50\x68\x6F\x6E\x65\x3B\x20\x43\x50\x55\x20\x69\x50\x68\x6F\x6E\x65\x20\x4F\x53\x20\x31\x34\x5F\x33\x20\x6C\x69\x6B\x65\x20\x4D\x61\x63\x20\x4F\x53\x20\x58\x29\x20\x41\x70\x70\x6C\x65\x57\x65\x62\x4B\x69\x74\x2F\x36\x30\x35\x2E\x31\x2E\x31\x35\x20\x28\x4B\x48\x54\x4D\x4C\x2C\x20\x6C\x69\x6B\x65\x20\x47\x65\x63\x6B\x6F\x29\x20\x4D\x6F\x62\x69\x6C\x65\x2F\x31\x35\x45\x31\x34\x38\x3B\x73\x75\x70\x70\x6F\x72\x74\x4A\x44\x53\x48\x57\x4B\x2F\x31\x3B", "\x61\x62\x63\x64\x65\x66\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39", "\x72\x61\x6E\x64\x6F\x6D", "\x66\x6C\x6F\x6F\x72", "\x63\x68\x61\x72\x41\x74", "\x6F\x62\x6A\x65\x63\x74", "\u4EAC\u4E1C\u670D\u52A1\u5668\u8BBF\u95EE\u6570\u636E\u4E3A\u7A7A\uFF0C\u8BF7\u68C0\u67E5\u81EA\u8EAB\u8BBE\u5907\u7F51\u7EDC\u60C5\u51B5", "\x73\x74\x72\x69\x6E\x67", "\u8BF7\u52FF\u968F\u610F\u5728\x42\x6F\x78\x4A\x73\u8F93\u5165\u6846\u4FEE\u6539\u5185\u5BB9\x0A\u5EFA\u8BAE\u901A\u8FC7\u811A\u672C\u53BB\u83B7\u53D6\x63\x6F\x6F\x6B\x69\x65", "\x2C\x22\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64\x22\x3A", "\x7B\x22\x76\x65\x6E\x64\x65\x72\x49\x64\x22\x3A\x22", "\x22\x2C\x22\x73\x68\x6F\x70\x49\x64\x22\x3A\x22", "\x22\x2C\x22\x62\x69\x6E\x64\x42\x79\x56\x65\x72\x69\x66\x79\x43\x6F\x64\x65\x46\x6C\x61\x67\x22\x3A\x31\x2C\x22\x72\x65\x67\x69\x73\x74\x65\x72\x45\x78\x74\x65\x6E\x64\x22\x3A\x7B\x7D\x2C\x22\x77\x72\x69\x74\x65\x43\x68\x69\x6C\x64\x46\x6C\x61\x67\x22\x3A\x30", "\x2C\x22\x63\x68\x61\x6E\x6E\x65\x6C\x22\x3A\x34\x30\x36\x7D", "\x68\x74\x74\x70\x73\x3A\x2F\x2F\x61\x70\x69\x2E\x6D\x2E\x6A\x64\x2E\x63\x6F\x6D\x2F\x63\x6C\x69\x65\x6E\x74\x2E\x61\x63\x74\x69\x6F\x6E\x3F\x61\x70\x70\x69\x64\x3D\x6A\x64\x5F\x73\x68\x6F\x70\x5F\x6D\x65\x6D\x62\x65\x72\x26\x66\x75\x6E\x63\x74\x69\x6F\x6E\x49\x64\x3D\x62\x69\x6E\x64\x57\x69\x74\x68\x56\x65\x6E\x64\x65\x72\x26\x62\x6F\x64\x79\x3D", "\x26\x63\x6C\x69\x65\x6E\x74\x56\x65\x72\x73\x69\x6F\x6E\x3D\x39\x2E\x32\x2E\x30\x26\x63\x6C\x69\x65\x6E\x74\x3D\x48\x35\x26\x75\x75\x69\x64\x3D\x38\x38\x38\x38\x38\x26\x68\x35\x73\x74\x3D", "\x7A\x68\x2D\x43\x4E\x2C\x7A\x68\x3B\x71\x3D\x30\x2E\x39\x2C\x65\x6E\x2D\x55\x53\x3B\x71\x3D\x30\x2E\x38\x2C\x65\x6E\x3B\x71\x3D\x30\x2E\x37", "\x68\x74\x74\x70\x73\x3A\x2F\x2F\x73\x68\x6F\x70\x6D\x65\x6D\x62\x65\x72\x2E\x6D\x2E\x6A\x64\x2E\x63\x6F\x6D\x2F", "\x4D\x6F\x7A\x69\x6C\x6C\x61\x2F\x35\x2E\x30\x20\x28\x4D\x61\x63\x69\x6E\x74\x6F\x73\x68\x3B\x20\x49\x6E\x74\x65\x6C\x20\x4D\x61\x63\x20\x4F\x53\x20\x58\x20\x31\x30\x5F\x31\x35\x5F\x37\x29\x20\x41\x70\x70\x6C\x65\x57\x65\x62\x4B\x69\x74\x2F\x35\x33\x37\x2E\x33\x36\x20\x28\x4B\x48\x54\x4D\x4C\x2C\x20\x6C\x69\x6B\x65\x20\x47\x65\x63\x6B\x6F\x29\x20\x43\x68\x72\x6F\x6D\x65\x2F\x39\x39\x2E\x30\x2E\x34\x38\x34\x34\x2E\x35\x31\x20\x53\x61\x66\x61\x72\x69\x2F\x35\x33\x37\x2E\x33\x36", "\x20\x3E\x3E\x20", "\x6D\x65\x73\x73\x61\x67\x65", "\x67\x69\x66\x74\x49\x6E\x66\x6F", "\x67\x69\x66\x74\x4C\x69\x73\x74", "\x20\x3E\x3E\x20\u5165\u4F1A\u83B7\u5F97\uFF1A", "\x64\x69\x73\x63\x6F\x75\x6E\x74\x53\x74\x72\x69\x6E\x67", "\x70\x72\x69\x7A\x65\x4E\x61\x6D\x65", "\x73\x65\x63\x6F\x6E\x64\x4C\x69\x6E\x65\x44\x65\x73\x63", "\x22\x2C\x22\x63\x68\x61\x6E\x6E\x65\x6C\x22\x3A\x34\x30\x36\x2C\x22\x70\x61\x79\x55\x70\x53\x68\x6F\x70\x22\x3A\x74\x72\x75\x65\x7D", "\u53BB\u52A0\u5165\uFF1A", "\x76\x65\x6E\x64\x65\x72\x43\x61\x72\x64\x4E\x61\x6D\x65", "\x73\x68\x6F\x70\x4D\x65\x6D\x62\x65\x72\x43\x61\x72\x64\x49\x6E\x66\x6F", "\x20\x28", "\x29", "\x6A\x73\x6A\x69\x61\x6D\x69\x2E\x63\x6F\x6D\x2E\x76\x36", "\u202E\x5F\x30\x78\x6F\x64\x62", "\x77\x71\x6B\x67\x41\x63\x4B\x65\x4F\x51\x3D\x3D", "\x4E\x42\x44\x43\x6E\x44\x45\x66", "\x77\x71\x68\x68\x77\x37\x48\x44\x69\x38\x4B\x61", "\x77\x72\x7A\x43\x75\x48\x4D\x2F\x77\x36\x51\x6A", "\x77\x70\x4A\x79\x77\x37\x50\x44\x75\x4D\x4B\x45", "\x45\x30\x62\x43\x6E\x41\x3D\x3D", "\x42\x78\x62\x43\x67\x38\x4B\x6F\x53\x41\x3D\x3D", "\x51\x6E\x6A\x44\x6B\x30\x59\x63\x77\x36\x64\x31\x5A\x73\x4B\x38\x77\x36\x52\x61\x77\x70\x54\x44\x68\x4D\x4B\x32\x44\x4D\x4F\x79\x5A\x63\x4B\x76\x42\x54\x70\x59\x77\x34\x70\x76\x50\x38\x4F\x79\x4E\x46\x6E\x43\x73\x73\x4F\x2F\x77\x35\x44\x44\x6A\x56\x76\x44\x68\x48\x33\x44\x6F\x63\x4B\x57\x77\x70\x4D\x47\x55\x4D\x4B\x56\x56\x73\x4B\x2F\x4A\x44\x58\x43\x76\x63\x4B\x39\x51\x4D\x4F\x49\x77\x71\x48\x44\x70\x4D\x4F\x58\x47\x6B\x2F\x44\x6C\x41\x6E\x44\x6B\x78\x72\x44\x6E\x4D\x4F\x2F\x77\x35\x76\x44\x6E\x32\x7A\x43\x71\x38\x4F\x39\x55\x73\x4B\x42\x77\x37\x68\x33\x48\x31\x4A\x46\x77\x70\x37\x43\x67\x7A\x54\x43\x6F\x38\x4B\x54\x61\x63\x4F\x61\x62\x32\x44\x43\x71\x63\x4F\x53\x77\x37\x55\x5A\x42\x56\x4C\x43\x67\x57\x50\x44\x6F\x38\x4B\x6F\x4A\x47\x62\x44\x73\x4D\x4B\x44\x42\x41\x2F\x43\x6C\x38\x4B\x54\x77\x6F\x42\x73\x46\x38\x4F\x59\x50\x63\x4F\x56\x77\x70\x55\x53\x57\x63\x4F\x61\x61\x47\x6C\x6B\x77\x71\x30\x41\x46\x32\x74\x6E\x50\x63\x4B\x36\x77\x34\x74\x6D\x65\x38\x4F\x63\x54\x4D\x4B\x5A\x77\x72\x77\x4E\x44\x38\x4F\x4D\x4C\x44\x4E\x43\x77\x35\x54\x43\x71\x38\x4F\x48\x77\x34\x42\x5A\x4A\x6B\x7A\x44\x6C\x42\x6F\x4F\x77\x6F\x48\x43\x69\x38\x4B\x73\x77\x6F\x66\x43\x75\x38\x4B\x65\x58\x38\x4F\x45\x77\x71\x37\x44\x72\x48\x73\x59\x77\x37\x62\x44\x6E\x38\x4B\x6E\x47\x43\x45\x43\x61\x6B\x77\x6A\x4B\x69\x54\x43\x72\x38\x4F\x44\x52\x68\x2F\x43\x67\x51\x3D\x3D", "\x4E\x38\x4B\x74\x52\x77\x3D\x3D", "\x4C\x44\x62\x43\x72\x4D\x4B\x53\x66\x51\x3D\x3D", "\x77\x36\x4C\x44\x70\x47\x31\x71\x4E\x41\x3D\x3D", "\x77\x70\x45\x58\x55\x63\x4F\x6A\x43\x41\x3D\x3D", "\x46\x56\x37\x43\x68\x38\x4B\x47\x5A\x51\x3D\x3D", "\x43\x57\x50\x43\x6D\x58\x50\x43\x6E\x41\x3D\x3D", "\x77\x72\x67\x30\x77\x34\x67\x3D", "\x59\x73\x4F\x59\x77\x34\x6F\x51\x77\x37\x6F\x4B\x41\x4D\x4F\x6F\x77\x6F\x6B\x3D", "\x41\x41\x62\x43\x67\x51\x77\x48\x77\x36\x67\x3D", "\x77\x35\x62\x44\x6A\x43\x6C\x61\x43\x63\x4F\x38\x59\x63\x4B\x37", "\x4A\x4D\x4B\x70\x4F\x73\x4F\x32\x61\x79\x52\x49", "\x57\x73\x4F\x35\x43\x4D\x4B\x66\x77\x71\x37\x44\x6E\x4D\x4F\x4A\x77\x71\x45\x3D", "\x77\x34\x30\x4B\x51\x6E\x6E\x43\x6E\x4D\x4F\x59\x66\x38\x4F\x4A\x77\x34\x4E\x61", "\x50\x73\x4B\x6E\x52\x47\x76\x43\x74\x6A\x55\x54\x5A\x45\x68\x45", "\x77\x37\x51\x6A\x77\x72\x56\x65\x53\x63\x4F\x77", "\x4A\x63\x4B\x67\x49\x63\x4F\x64\x65\x41\x3D\x3D", "\x4F\x4D\x4B\x67\x58\x30\x72\x43\x6B\x41\x3D\x3D", "\x56\x48\x6A\x43\x6C\x4D\x4F\x43\x77\x34\x51\x31\x77\x72\x37\x43\x6A\x51\x6A\x43\x68\x48\x66\x44\x72\x4D\x4F\x4B\x77\x6F\x7A\x44\x73\x41\x3D\x3D", "\x77\x35\x62\x43\x6D\x4D\x4F\x74\x77\x72\x41\x58\x77\x34\x4A\x65", "\x55\x48\x4C\x43\x6A\x73\x4F\x73\x77\x34\x77\x74", "\x46\x38\x4F\x33\x56\x73\x4F\x6D\x4B\x58\x58\x44\x6A\x44\x73\x4C\x4A\x43\x51\x3D", "\x77\x71\x6F\x6A\x4C\x38\x4B\x2F\x4C\x38\x4B\x65", "\x50\x6C\x66\x44\x67\x4D\x4B\x6D\x53\x63\x4F\x72", "\x77\x71\x5A\x6F\x77\x36\x6E\x44\x6E\x38\x4B\x77\x77\x6F\x67\x3D", "\x43\x55\x7A\x43\x6D\x48\x34\x3D", "\x77\x72\x48\x44\x6B\x54\x77\x3D", "\x54\x4D\x4F\x4E\x64\x4D\x4F\x63\x77\x71\x30\x3D", "\x4B\x67\x7A\x43\x6E\x51\x59\x53\x77\x37\x51\x3D", "\x4F\x63\x4B\x37\x4E\x38\x4B\x38\x77\x37\x77\x3D", "\x77\x72\x6F\x35\x49\x38\x4B\x76\x4F\x73\x4B\x59", "\x77\x72\x6F\x2B\x77\x35\x46\x6C\x48\x46\x67\x3D", "\x63\x38\x4F\x6D\x4D\x63\x4B\x68\x77\x6F\x4D\x3D", "\x57\x51\x51\x54\x77\x36\x46\x6F", "\x78\x6A\x73\x6A\x69\x61\x4E\x55\x6D\x69\x2E\x78\x75\x63\x6F\x4C\x4F\x77\x71\x6D\x2E\x76\x42\x6C\x65\x36\x56\x4B\x45\x3D\x3D", "\x70\x6F", "\x73\x68\x69\x66\x74", "\u202E", "\x70", "\x63\x6F\x6E\x63\x61\x74", "\x30\x78", "\x5A\x48\x76\x66\x49\x48", "\x66\x75\x6E\x63\x74\x69\x6F\x6E", "\x41\x42\x43\x44\x45\x46\x47\x48\x49\x4A\x4B\x4C\x4D\x4E\x4F\x50\x51\x52\x53\x54\x55\x56\x57\x58\x59\x5A\x61\x62\x63\x64\x65\x66\x67\x68\x69\x6A\x6B\x6C\x6D\x6E\x6F\x70\x71\x72\x73\x74\x75\x76\x77\x78\x79\x7A\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x2B\x2F\x3D", "\x61\x74\x6F\x62", "\x66\x72\x6F\x6D\x43\x68\x61\x72\x43\x6F\x64\x65", "\x25", "\x30\x30", "\x74\x6F\x53\x74\x72\x69\x6E\x67", "\x63\x68\x61\x72\x43\x6F\x64\x65\x41\x74", "\x75\x5A\x6B\x68\x4C\x4B", "\x50\x67\x42\x78\x74\x76", "\x6D\x7A\x77\x4F\x77\x67", "\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39", "\u202E\x30", "\x77\x6A\x29\x69", "\u202E\x32", "\x33\x40\x51\x2A", "\u202E\x31", "\x5A\x2A\x68\x52", "\u202E\x35", "\x4C\x77\x57\x69", "\u202E\x34", "\x44\x61\x25\x59", "\u202E\x33", "\x79\x79\x79\x79\x4D\x4D\x64\x64\x68\x68\x6D\x6D\x73\x73\x53\x53\x53", "\x3B\x65\x66\x37\x39\x61\x3B\x74\x6B\x30\x32\x77\x39\x32\x36\x33\x31\x62\x66\x61\x31\x38\x6E\x68\x44\x34\x75\x62\x66\x33\x51\x66\x4E\x69\x55\x38\x45\x44\x32\x50\x49\x32\x37\x30\x79\x67\x73\x6E\x2B\x76\x61\x6D\x75\x42\x51\x68\x30\x6C\x56\x45\x36\x76\x37\x55\x41\x77\x63\x6B\x7A\x33\x73\x32\x4F\x74\x6C\x46\x45\x66\x74\x68\x35\x4C\x62\x51\x64\x57\x4F\x50\x4E\x76\x50\x45\x59\x48\x75\x55\x32\x54\x77\x3B\x62\x30\x31\x63\x37\x63\x34\x66\x39\x39\x61\x38\x66\x66\x62\x32\x62\x35\x65\x36\x39\x32\x38\x32\x66\x34\x35\x61\x31\x34\x65\x31\x62\x38\x37\x63\x39\x30\x61\x39\x36\x32\x31\x37\x30\x30\x36\x33\x31\x31\x61\x65\x34\x63\x66\x64\x63\x62\x64\x31\x61\x39\x33\x32\x3B\x33\x2E\x30\x3B", "\u202E\x36", "\x40\x68\x58\x66", "\u202E\x37", "\x33\x42\x32\x53", "\u202B\x38", "\x46\x6F\x72\x6D\x61\x74", "\x45\x52\x64\x7A\x79", "\u202E\x39", "\x53\x43\x51\x46", "\u202E\x63", "\u202B\x62", "\x76\x57\x44\x57", "\u202E\x64", "\x37\x5D\x42\x6E", "\x44\x71\x72\x71\x48", "\u202B\x61", "\x25\x48\x6F\x4D", "\u202B\x66", "\u202B\x65", "\x67\x4D\x39\x24", "\u202E\x31\x30", "\x6C\x45\x62\x59", "\x67\x65\x74\x44\x61\x74\x65", "\u202E\x31\x31", "\x6D\x5D\x49\x72", "\x67\x65\x74\x48\x6F\x75\x72\x73", "\u202B\x31\x32", "\x68\x4C\x6D\x62", "\u202B\x31\x33", "\x79\x5B\x6D\x53", "\u202E\x31\x34", "\u202B\x31\x35", "\x24\x6E\x30\x25", "\x67\x65\x74\x4D\x6F\x6E\x74\x68", "\u202E\x31\x37", "\x77\x47\x41\x56\x6C", "\u202E\x31\x36", "\u202B\x31\x38", "\x33\x61\x41\x4E", "\x74\x65\x73\x74", "\x24\x31", "\u202B\x31\x64", "\x54\x38\x2A\x77", "\u202E\x31\x63", "\x63\x74\x75\x26", "\u202B\x31\x62", "\x6E\x31\x40\x42", "\u202E\x31\x61", "\u202B\x31\x39", "\x62\x6F\x73\x76", "\u202E\x31\x66", "\u202E\x31\x65", "\x28", "\x53\x2B", "\x6B\x68\x76\x79\x41", "\u202B\x32\x30", "\x64\x76\x63\x48", "\u202B\x32\x32", "\u202B\x32\x31", "\x4A\x70\x40\x2A", "\u202B\x32\x35", "\u202E\x32\x34", "\u202B\x32\x33", "\x4A\x48\x39\x58", "\x4B\x4E\x67\x41\x43", "\u202E\x32\x38", "\u202B\x32\x37", "\x65\x53\x68\x6D", "\u202B\x32\x36", "\u5220\u9664", "\u7248\u672C\u53F7\uFF0C\x6A\x73\u4F1A\u5B9A", "\u671F\u5F39\u7A97\uFF0C", "\u8FD8\u8BF7\u652F\u6301\u6211\u4EEC\u7684\u5DE5\u4F5C", "\x6A\x73\x6A\x69\x61", "\x6D\x69\x2E\x63\x6F\x6D"];
const notify = $[__Oxe8a94[0x0]]() ? require(__Oxe8a94[0x1]) : __Oxe8a94[0x2];
const jdCookieNode = $[__Oxe8a94[0x0]]() ? require(__Oxe8a94[0x3]) : __Oxe8a94[0x2];
const getToken = require(__Oxe8a94[0x4]);
let domains = __Oxe8a94[0x5];
let lz_cookie = {};
let activityCookie = __Oxe8a94[0x2];
let mixnum = 0;
let maxnum = 90;
let pin = __Oxe8a94[0x2];
let Signz = __Oxe8a94[0x2];
let inviteeNicks, inviters;
$[__Oxe8a94[0x6]] = false;
let cookiesArr = [], cookie = __Oxe8a94[0x2], message = __Oxe8a94[0x2], messageTitle = __Oxe8a94[0x2];
activityId = $[__Oxe8a94[0x8]](__Oxe8a94[0x7]) ? $[__Oxe8a94[0x8]](__Oxe8a94[0x7]) : jd_wdz_activityId;
activityUrl = $[__Oxe8a94[0x8]](__Oxe8a94[0x9]) ? $[__Oxe8a94[0x8]](__Oxe8a94[0x9]) : jd_wdz_activityUrl;
if ($[__Oxe8a94[0x0]]()) {
    if (process[__Oxe8a94[0xb]][__Oxe8a94[0xa]]) {
        activityId = process[__Oxe8a94[0xb]][__Oxe8a94[0xa]]
    }
    ;
    if (process[__Oxe8a94[0xb]][__Oxe8a94[0xc]]) {
        activityUrl = process[__Oxe8a94[0xb]][__Oxe8a94[0xc]]
    }
    ;
    if (process[__Oxe8a94[0xb]][__Oxe8a94[0xd]]) {
        pin = process[__Oxe8a94[0xb]][__Oxe8a94[0xd]]
    }
    ;
    if (process[__Oxe8a94[0xb]][__Oxe8a94[0xe]]) {
        mixnum = process[__Oxe8a94[0xb]][__Oxe8a94[0xe]]
    }
    ;
    if (process[__Oxe8a94[0xb]][__Oxe8a94[0xf]]) {
        maxnum = process[__Oxe8a94[0xb]][__Oxe8a94[0xf]]
    }
    ;
    if (JSON[__Oxe8a94[0x12]](process[__Oxe8a94[0xb]])[__Oxe8a94[0x11]](__Oxe8a94[0x10]) > -0x1) {
        process[__Oxe8a94[0x13]](0)
    }
    ;Object[__Oxe8a94[0x16]](jdCookieNode)[__Oxe8a94[0x15]]((_0x64efx11) => {
        cookiesArr[__Oxe8a94[0x14]](jdCookieNode[_0x64efx11])
    });
    if (process[__Oxe8a94[0xb]][__Oxe8a94[0x17]] && process[__Oxe8a94[0xb]][__Oxe8a94[0x17]] === __Oxe8a94[0x18]) {
        console[__Oxe8a94[0x19]] = () => {
        }
    }
} else {
    cookiesArr = [$[__Oxe8a94[0x8]](__Oxe8a94[0x1b]), $[__Oxe8a94[0x8]](__Oxe8a94[0x1c]), ...$[__Oxe8a94[0x21]]($[__Oxe8a94[0x8]](__Oxe8a94[0x1f]) || __Oxe8a94[0x20])[__Oxe8a94[0x1e]]((_0x64efx11) => {
        return _0x64efx11[__Oxe8a94[0x1d]]
    })][__Oxe8a94[0x1a]]((_0x64efx11) => {
        return !!_0x64efx11
    })
}
;
if (pin) {
    const idx = cookiesArr[__Oxe8a94[0x23]]((_0x64efx13) => {
        return _0x64efx13[__Oxe8a94[0x22]](pin)
    });
    const currentCookie = cookiesArr[__Oxe8a94[0x24]](idx, 1);
    cookiesArr = [...currentCookie, ...cookiesArr[__Oxe8a94[0x25]](mixnum, maxnum)];
    console[__Oxe8a94[0x19]](__Oxe8a94[0x26] + cookiesArr[__Oxe8a94[0x27]] + __Oxe8a94[0x28])
} else {
    cookiesArr = [...cookiesArr[__Oxe8a94[0x25]](mixnum, maxnum)];
    console[__Oxe8a94[0x19]](__Oxe8a94[0x26] + cookiesArr[__Oxe8a94[0x27]] + __Oxe8a94[0x28])
}
;let isGetCookie = typeof $request !== __Oxe8a94[0x29];
if (isGetCookie) {
    GetCookie();
    $[__Oxe8a94[0x2a]]()
}
;!(async () => {
    if (!activityId) {
        $[__Oxe8a94[0x32]]($[__Oxe8a94[0x2d]], __Oxe8a94[0x2], __Oxe8a94[0x31]);
        $[__Oxe8a94[0x2a]]();
        return
    }
    ;authorCodeList = await getAuthorCodeList(__Oxe8a94[0x33]);
    console[__Oxe8a94[0x19]](__Oxe8a94[0x34] + activityId);
    console[__Oxe8a94[0x19]](__Oxe8a94[0x35] + pin + __Oxe8a94[0x36] + mixnum + __Oxe8a94[0x37] + maxnum + __Oxe8a94[0x38]);
    if (!cookiesArr[0x0]) {
        $[__Oxe8a94[0x32]]($[__Oxe8a94[0x2d]], __Oxe8a94[0x39], __Oxe8a94[0x3a], {'\x6F\x70\x65\x6E\x2D\x75\x72\x6C': __Oxe8a94[0x3a]});
        return
    }
    ;
    for (let _0x64efx17 = 0; _0x64efx17 < cookiesArr[__Oxe8a94[0x27]]; _0x64efx17++) {
        if (cookiesArr[_0x64efx17]) {
            cookie = cookiesArr[_0x64efx17];
            originCookie = cookiesArr[_0x64efx17];
            $[__Oxe8a94[0x3b]] = decodeURIComponent(cookie[__Oxe8a94[0x3c]](/pt_pin=(.+?);/) && cookie[__Oxe8a94[0x3c]](/pt_pin=(.+?);/)[0x1]);
            $[__Oxe8a94[0x3d]] = _0x64efx17 + 1;
            $[__Oxe8a94[0x3e]] = true;
            $[__Oxe8a94[0x3f]] = __Oxe8a94[0x2];
            console[__Oxe8a94[0x19]](__Oxe8a94[0x40] + $[__Oxe8a94[0x3d]] + __Oxe8a94[0x41] + ($[__Oxe8a94[0x3f]] || $[__Oxe8a94[0x3b]]) + __Oxe8a94[0x42]);
            if (!$[__Oxe8a94[0x3e]]) {
                $[__Oxe8a94[0x32]]($[__Oxe8a94[0x2d]], __Oxe8a94[0x43], __Oxe8a94[0x44] + $[__Oxe8a94[0x3d]] + __Oxe8a94[0x2c] + ($[__Oxe8a94[0x3f]] || $[__Oxe8a94[0x3b]]) + __Oxe8a94[0x45], {'\x6F\x70\x65\x6E\x2D\x75\x72\x6C': __Oxe8a94[0x3a]});
                if ($[__Oxe8a94[0x0]]()) {
                    await notify[__Oxe8a94[0x48]]($[__Oxe8a94[0x2d]] + __Oxe8a94[0x46] + $[__Oxe8a94[0x3b]], __Oxe8a94[0x44] + $[__Oxe8a94[0x3d]] + __Oxe8a94[0x2c] + $[__Oxe8a94[0x3b]] + __Oxe8a94[0x47])
                }
                ;
                continue
            }
            ;await getUA();
            await wdz();
            await $[__Oxe8a94[0x49]](2000);
            if ($[__Oxe8a94[0x4a]]) {
                break
            }
        }
    }
})()[__Oxe8a94[0x30]]((_0x64efx16) => {
    $[__Oxe8a94[0x19]](__Oxe8a94[0x2], `${__Oxe8a94[0x2c]}${$[__Oxe8a94[0x2d]]}${__Oxe8a94[0x2e]}${_0x64efx16}${__Oxe8a94[0x2f]}`, __Oxe8a94[0x2])
})[__Oxe8a94[0x2b]](() => {
    $[__Oxe8a94[0x2a]]()
});

async function wdz() {
    $[__Oxe8a94[0x4b]] = __Oxe8a94[0x2];
    $[__Oxe8a94[0x4c]] = __Oxe8a94[0x4d];
    $[__Oxe8a94[0x4e]] = __Oxe8a94[0x2];
    $[__Oxe8a94[0x4f]] = __Oxe8a94[0x2];
    $[__Oxe8a94[0x50]] = __Oxe8a94[0x2];
    $[__Oxe8a94[0x51]] = [];
    await getCk();
    if ($[__Oxe8a94[0x4a]]) {
        console[__Oxe8a94[0x19]](__Oxe8a94[0x52]);
        return
    }
    ;$[__Oxe8a94[0x4e]] = await getToken(cookie, domains);
    if ($[__Oxe8a94[0x4e]] == __Oxe8a94[0x2]) {
        console[__Oxe8a94[0x19]](__Oxe8a94[0x53]);
        return
    }
    ;await $[__Oxe8a94[0x49]](1000);
    if ($[__Oxe8a94[0x4c]]) {
        await $[__Oxe8a94[0x49]](1000);
        if ($[__Oxe8a94[0x4e]]) {
            await getPin()
        }
        ;
        if (!$[__Oxe8a94[0x4f]]) {
            console[__Oxe8a94[0x19]](__Oxe8a94[0x54]);
            return
        }
        ;await accessLog();
        await $[__Oxe8a94[0x49]](1000);
        await $[__Oxe8a94[0x49]](1000);
        if ($[__Oxe8a94[0x3d]] === 1) {
            $[__Oxe8a94[0x55]] = $[__Oxe8a94[0x4f]];
            $[__Oxe8a94[0x56]] = $[__Oxe8a94[0x57]];
            await getActivityInfo();
            await inviteRecord()
        }
        ;
        for (let _0x64efx19 = 0; _0x64efx19 < $[__Oxe8a94[0x58]][__Oxe8a94[0x27]]; _0x64efx19++) {
            $[__Oxe8a94[0x59]] = __Oxe8a94[0x2];
            $[__Oxe8a94[0x5a]] = $[__Oxe8a94[0x58]][_0x64efx19];
            await getShopOpenCardInfo({
                '\x76\x65\x6E\x64\x65\x72\x49\x64': $[__Oxe8a94[0x5a]],
                '\x63\x68\x61\x6E\x6E\x65\x6C': __Oxe8a94[0x5b]
            });
            if ($[__Oxe8a94[0x5c]] === 0) {
                console[__Oxe8a94[0x19]](__Oxe8a94[0x5d]);
                await getshopactivityId();
                for (let _0x64efx17 = 0; _0x64efx17 < Array(5)[__Oxe8a94[0x27]]; _0x64efx17++) {
                    if (_0x64efx17 > 0) {
                        console[__Oxe8a94[0x19]](`${__Oxe8a94[0x5e]}${_0x64efx17}${__Oxe8a94[0x5f]}`)
                    }
                    ;await joinShop();
                    await $[__Oxe8a94[0x49]](500);
                    if ($[__Oxe8a94[0x61]][__Oxe8a94[0x11]](__Oxe8a94[0x60]) == -1) {
                        break
                    }
                }
                ;
                if ($[__Oxe8a94[0x61]][__Oxe8a94[0x11]](__Oxe8a94[0x60]) > -1) {
                    console[__Oxe8a94[0x19]](__Oxe8a94[0x62])
                }
            }
        }
        ;await $[__Oxe8a94[0x49]](1500);
        if ($[__Oxe8a94[0x3d]] === 1) {
            if ($[__Oxe8a94[0x63]]) {
                $[__Oxe8a94[0x64]] = authorCodeList[random(0, authorCodeList[__Oxe8a94[0x27]])];
                inviteeNicks = $[__Oxe8a94[0x64]][__Oxe8a94[0x65]];
                inviters = $[__Oxe8a94[0x64]][__Oxe8a94[0x66]];
                await joinTeamz();
                await $[__Oxe8a94[0x49]](1500)
            } else {
                await joinTeam();
                await $[__Oxe8a94[0x49]](1500)
            }
        }
        ;
        if ($[__Oxe8a94[0x3d]] > 1) {
            await joinTeam();
            await $[__Oxe8a94[0x49]](1500)
        }
        ;await getOpenCardAllStatuesNew();
        if ($[__Oxe8a94[0x51]][__Oxe8a94[0x27]] > 0) {
            let _0x64efx17 = 0;
            do {
                $[__Oxe8a94[0x61]] = __Oxe8a94[0x2];
                $[__Oxe8a94[0x5a]] = $[__Oxe8a94[0x51]][_0x64efx17][__Oxe8a94[0x3c]](/venderId=(\d+)/)[0x1];
                console[__Oxe8a94[0x19]]($[__Oxe8a94[0x5a]]);
                await getshopactivityId();
                for (let _0x64efx17 = 0; _0x64efx17 < Array(2)[__Oxe8a94[0x27]]; _0x64efx17++) {
                    if (_0x64efx17 > 0) {
                        console[__Oxe8a94[0x19]](`${__Oxe8a94[0x5e]}${_0x64efx17}${__Oxe8a94[0x5f]}`)
                    }
                    ;await joinShop();
                    await $[__Oxe8a94[0x49]](500);
                    if ($[__Oxe8a94[0x61]][__Oxe8a94[0x11]](__Oxe8a94[0x60]) == -1) {
                        break
                    }
                }
                ;
                if ($[__Oxe8a94[0x61]][__Oxe8a94[0x11]](__Oxe8a94[0x60]) > -1) {
                    console[__Oxe8a94[0x19]](__Oxe8a94[0x62])
                }
                ;await $[__Oxe8a94[0x49]](500);
                _0x64efx17++
            } while (_0x64efx17 < $[__Oxe8a94[0x51]][__Oxe8a94[0x27]]);
        }
    } else {
        console[__Oxe8a94[0x19]](__Oxe8a94[0x67] + $[__Oxe8a94[0x3d]] + __Oxe8a94[0x68])
    }
}

function showMsg() {
    return new Promise((_0x64efx1b) => {
        $[__Oxe8a94[0x32]]($[__Oxe8a94[0x2d]], __Oxe8a94[0x2], __Oxe8a94[0x67] + $[__Oxe8a94[0x3d]] + __Oxe8a94[0x41] + $[__Oxe8a94[0x3f]] + __Oxe8a94[0x42] + message);
        _0x64efx1b()
    })
}

function getSimpleActInfoVo() {
    return new Promise((_0x64efx1b) => {
        let _0x64efx1d = `${__Oxe8a94[0x69]}${activityId}${__Oxe8a94[0x2]}`;
        $[__Oxe8a94[0x6f]](taskPostUrl(__Oxe8a94[0x6a], _0x64efx1d), async (_0x64efx1e, _0x64efx1f, _0x64efx20) => {
            try {
                if (_0x64efx1e) {
                    console[__Oxe8a94[0x19]](`${__Oxe8a94[0x2]}${$[__Oxe8a94[0x6b]](_0x64efx1e)}${__Oxe8a94[0x2]}`);
                    console[__Oxe8a94[0x19]](`${__Oxe8a94[0x2]}${$[__Oxe8a94[0x2d]]}${__Oxe8a94[0x6c]}`)
                } else {
                    if (_0x64efx1f[__Oxe8a94[0x6d]] == 200) {
                        refreshToken(_0x64efx1f)
                    }
                }
            } catch (e) {
                $[__Oxe8a94[0x6e]](e, _0x64efx1f)
            } finally {
                _0x64efx1b()
            }
        })
    })
}

function getCk() {
    return new Promise((_0x64efx1b) => {
        let _0x64efx22 = {
            url: activityUrl + __Oxe8a94[0x70] + activityId,
            headers: {Cookie: cookie, "\x55\x73\x65\x72\x2D\x41\x67\x65\x6E\x74": $[__Oxe8a94[0x71]]}
        };
        $[__Oxe8a94[0x75]](_0x64efx22, async (_0x64efx1e, _0x64efx1f, _0x64efx20) => {
            try {
                if (_0x64efx1e) {
                    if (_0x64efx1f && typeof _0x64efx1f[__Oxe8a94[0x72]] != __Oxe8a94[0x29]) {
                        if (_0x64efx1f[__Oxe8a94[0x72]] == 493) {
                            console[__Oxe8a94[0x19]](__Oxe8a94[0x73]);
                            $[__Oxe8a94[0x4a]] = true
                        }
                    }
                    ;console[__Oxe8a94[0x19]](__Oxe8a94[0x2] + JSON[__Oxe8a94[0x12]](_0x64efx1e));
                    console[__Oxe8a94[0x19]]($[__Oxe8a94[0x2d]] + __Oxe8a94[0x74])
                } else {
                    if (_0x64efx1f[__Oxe8a94[0x6d]] == 200) {
                        refreshToken(_0x64efx1f)
                    }
                }
            } catch (e) {
                $[__Oxe8a94[0x6e]](e, _0x64efx1f)
            } finally {
                _0x64efx1b()
            }
        })
    })
}

function getPin() {
    return new Promise((_0x64efx1b) => {
        let _0x64efx1d = __Oxe8a94[0x76] + $[__Oxe8a94[0x4c]] + __Oxe8a94[0x77] + $[__Oxe8a94[0x4e]] + __Oxe8a94[0x78];
        $[__Oxe8a94[0x6f]](taskPostUrl(__Oxe8a94[0x79], _0x64efx1d), async (_0x64efx1e, _0x64efx1f, _0x64efx20) => {
            try {
                if (_0x64efx1e) {
                    console[__Oxe8a94[0x19]](__Oxe8a94[0x2] + JSON[__Oxe8a94[0x12]](_0x64efx1e));
                    console[__Oxe8a94[0x19]]($[__Oxe8a94[0x2d]] + __Oxe8a94[0x7a])
                } else {
                    if (_0x64efx1f[__Oxe8a94[0x6d]] == 200) {
                        refreshToken(_0x64efx1f)
                    }
                    ;
                    if (safeGet(_0x64efx20)) {
                        _0x64efx20 = JSON[__Oxe8a94[0x7b]](_0x64efx20);
                        if (_0x64efx20[__Oxe8a94[0x7c]] && _0x64efx20[__Oxe8a94[0x7d]]) {
                            $[__Oxe8a94[0x4f]] = _0x64efx20[__Oxe8a94[0x7d]][__Oxe8a94[0x7e]];
                            $[__Oxe8a94[0x7f]] = _0x64efx20[__Oxe8a94[0x7d]][__Oxe8a94[0x7f]];
                            $[__Oxe8a94[0x80]] = $[__Oxe8a94[0x4f]];
                            $[__Oxe8a94[0x57]] = _0x64efx20[__Oxe8a94[0x7d]][__Oxe8a94[0x81]] ? _0x64efx20[__Oxe8a94[0x7d]][__Oxe8a94[0x81]] : __Oxe8a94[0x82];
                            if ($[__Oxe8a94[0x3d]] === 1) {
                                $[__Oxe8a94[0x83]] = $[__Oxe8a94[0x7f]]
                            }
                        } else {
                        }
                    }
                }
            } catch (e) {
                $[__Oxe8a94[0x6e]](e, _0x64efx1f)
            } finally {
                _0x64efx1b()
            }
        })
    })
}

function getShopOpenCardInfo(_0x64efx25) {
    let _0x64efx26 = {
        '\x75\x72\x6C': __Oxe8a94[0x84] + encodeURIComponent(JSON[__Oxe8a94[0x12]](_0x64efx25)) + __Oxe8a94[0x85],
        '\x68\x65\x61\x64\x65\x72\x73': {
            '\x48\x6F\x73\x74': __Oxe8a94[0x86],
            '\x41\x63\x63\x65\x70\x74': __Oxe8a94[0x87],
            '\x43\x6F\x6E\x6E\x65\x63\x74\x69\x6F\x6E': __Oxe8a94[0x88],
            '\x43\x6F\x6F\x6B\x69\x65': cookie,
            '\x55\x73\x65\x72\x2D\x41\x67\x65\x6E\x74': $[__Oxe8a94[0x71]],
            '\x52\x65\x66\x65\x72\x65\x72': __Oxe8a94[0x89] + $[__Oxe8a94[0x5a]] + __Oxe8a94[0x8a] + encodeURIComponent(activityUrl),
            '\x41\x63\x63\x65\x70\x74\x2D\x45\x6E\x63\x6F\x64\x69\x6E\x67': __Oxe8a94[0x8b]
        }
    };
    return new Promise((_0x64efx1b) => {
        $[__Oxe8a94[0x75]](_0x64efx26, (_0x64efx1e, _0x64efx1f, _0x64efx20) => {
            try {
                if (_0x64efx1e) {
                    if (_0x64efx1e === __Oxe8a94[0x8c]) {
                        $[__Oxe8a94[0x8d]] = true;
                        console[__Oxe8a94[0x19]](_0x64efx1e)
                    }
                } else {
                    res = JSON[__Oxe8a94[0x7b]](_0x64efx20);
                    if (res[__Oxe8a94[0x8e]]) {
                        $[__Oxe8a94[0x5c]] = res[__Oxe8a94[0x7c]][__Oxe8a94[0x8f]][__Oxe8a94[0x5c]];
                        if (res[__Oxe8a94[0x7c]][__Oxe8a94[0x90]]) {
                            $[__Oxe8a94[0x91]] = res[__Oxe8a94[0x7c]][__Oxe8a94[0x90]][0x0][__Oxe8a94[0x93]][__Oxe8a94[0x92]]
                        }
                    }
                }
            } catch (e) {
                console[__Oxe8a94[0x19]](e)
            } finally {
                _0x64efx1b()
            }
        })
    })
}

function getUserInfo() {
    return new Promise((_0x64efx1b) => {
        let _0x64efx1d = __Oxe8a94[0x94] + encodeURIComponent(encodeURIComponent($.Pin));
        $[__Oxe8a94[0x6f]](taskPostUrl(__Oxe8a94[0x95], _0x64efx1d), async (_0x64efx1e, _0x64efx1f, _0x64efx20) => {
            try {
                if (_0x64efx1e) {
                    console[__Oxe8a94[0x19]](__Oxe8a94[0x2] + JSON[__Oxe8a94[0x12]](_0x64efx1e));
                    console[__Oxe8a94[0x19]]($[__Oxe8a94[0x2d]] + __Oxe8a94[0x96])
                } else {
                    if (safeGet(_0x64efx20)) {
                        _0x64efx20 = JSON[__Oxe8a94[0x7b]](_0x64efx20);
                        if (_0x64efx20[__Oxe8a94[0x7c]] && _0x64efx20[__Oxe8a94[0x7d]]) {
                            $[__Oxe8a94[0x57]] = _0x64efx20[__Oxe8a94[0x7d]][__Oxe8a94[0x81]] ? _0x64efx20[__Oxe8a94[0x7d]][__Oxe8a94[0x81]] : __Oxe8a94[0x82]
                        } else {
                            console[__Oxe8a94[0x19]](__Oxe8a94[0x97] + JSON[__Oxe8a94[0x12]](_0x64efx20))
                        }
                    }
                }
            } catch (e) {
                $[__Oxe8a94[0x6e]](e, _0x64efx1f)
            } finally {
                _0x64efx1b()
            }
        })
    })
}

function inviteRecord() {
    return new Promise((_0x64efx1b) => {
        let _0x64efx1d = `${__Oxe8a94[0x69]}${activityId}${__Oxe8a94[0x98]}${encodeURIComponent(encodeURIComponent($.Pin))}${__Oxe8a94[0x99]}`;
        $[__Oxe8a94[0x6f]](taskPostUrl(__Oxe8a94[0x9a], _0x64efx1d), async (_0x64efx1e, _0x64efx1f, _0x64efx20) => {
            try {
                if (_0x64efx1e) {
                    console[__Oxe8a94[0x19]](__Oxe8a94[0x2] + JSON[__Oxe8a94[0x12]](_0x64efx1e));
                    console[__Oxe8a94[0x19]]($[__Oxe8a94[0x2d]] + __Oxe8a94[0x9b])
                } else {
                    if (safeGet(_0x64efx20)) {
                        _0x64efx20 = JSON[__Oxe8a94[0x7b]](_0x64efx20);
                        if (_0x64efx20[__Oxe8a94[0x7c]] && _0x64efx20[__Oxe8a94[0x7d]]) {
                            $[__Oxe8a94[0x9c]] = _0x64efx20[__Oxe8a94[0x7d]][__Oxe8a94[0x9c]] || 0;
                            console[__Oxe8a94[0x19]](`${__Oxe8a94[0x9d]}${_0x64efx20[__Oxe8a94[0x7d]][__Oxe8a94[0x9e]]}${__Oxe8a94[0x2]}`);
                            console[__Oxe8a94[0x19]](`${__Oxe8a94[0x9f]}${_0x64efx20[__Oxe8a94[0x7d]][__Oxe8a94[0x9c]]}${__Oxe8a94[0x2]}`);
                            $[__Oxe8a94[0xa0]] = parseInt($[__Oxe8a94[0xa1]] * 40 + 20);
                            if ($[__Oxe8a94[0x9c]] >= $[__Oxe8a94[0xa0]]) {
                                console[__Oxe8a94[0x19]](__Oxe8a94[0xa2]);
                                $[__Oxe8a94[0xa0]] = true
                            }
                        } else {
                            console[__Oxe8a94[0x19]](JSON[__Oxe8a94[0x12]](_0x64efx20))
                        }
                    }
                }
            } catch (e) {
                $[__Oxe8a94[0x6e]](e, _0x64efx1f)
            } finally {
                _0x64efx1b()
            }
        })
    })
}

function getActivityInfo() {
    return new Promise((_0x64efx1b) => {
        let _0x64efx1d = `${__Oxe8a94[0x69]}${activityId}${__Oxe8a94[0x2]}`;
        $[__Oxe8a94[0x6f]](taskPostUrl(__Oxe8a94[0xa3], _0x64efx1d), async (_0x64efx1e, _0x64efx1f, _0x64efx20) => {
            try {
                if (_0x64efx1e) {
                    console[__Oxe8a94[0x19]](__Oxe8a94[0x2] + JSON[__Oxe8a94[0x12]](_0x64efx1e));
                    console[__Oxe8a94[0x19]]($[__Oxe8a94[0x2d]] + __Oxe8a94[0x9b])
                } else {
                    if (safeGet(_0x64efx20)) {
                        _0x64efx20 = JSON[__Oxe8a94[0x7b]](_0x64efx20);
                        if (_0x64efx20[__Oxe8a94[0x7c]] && _0x64efx20[__Oxe8a94[0x7d]]) {
                            $[__Oxe8a94[0xa4]] = _0x64efx20[__Oxe8a94[0x7d]][__Oxe8a94[0xa4]] || 0;
                            $[__Oxe8a94[0xa5]] = _0x64efx20[__Oxe8a94[0x7d]][__Oxe8a94[0xa5]] || 0;
                            $[__Oxe8a94[0xa6]] = _0x64efx20[__Oxe8a94[0x7d]][__Oxe8a94[0xa6]];
                            $[__Oxe8a94[0xa1]] = _0x64efx20[__Oxe8a94[0x7d]][__Oxe8a94[0xa6]][__Oxe8a94[0x3c]](/每人每天最多可组队(\d+)次/);
                            if ($[__Oxe8a94[0xa1]]) {
                                $[__Oxe8a94[0xa1]] = $[__Oxe8a94[0xa1]][0x1]
                            } else {
                                $[__Oxe8a94[0xa1]] = 10
                            }
                            ;$[__Oxe8a94[0x58]] = (_0x64efx20[__Oxe8a94[0x7d]][__Oxe8a94[0x58]])[__Oxe8a94[0xa8]](__Oxe8a94[0xa7]);
                            console[__Oxe8a94[0x19]](`${__Oxe8a94[0xa9]}` + (_0x64efx20[__Oxe8a94[0x7d]][__Oxe8a94[0x58]])[__Oxe8a94[0xab]](/\,/g, __Oxe8a94[0xaa]));
                            console[__Oxe8a94[0x19]](`${__Oxe8a94[0xac]}${_0x64efx20[__Oxe8a94[0x7d]][__Oxe8a94[0xa4]]}${__Oxe8a94[0x2]}`);
                            console[__Oxe8a94[0x19]](`${__Oxe8a94[0xad]}${$[__Oxe8a94[0xa5]]}${__Oxe8a94[0x2]}`);
                            console[__Oxe8a94[0x19]](__Oxe8a94[0xae] + $[__Oxe8a94[0xa1]] + __Oxe8a94[0xaf]);
                            if ($[__Oxe8a94[0xa4]] <= 0 || $[__Oxe8a94[0xa5]] <= 50) {
                                $[__Oxe8a94[0xb0]] = true
                            }
                        } else {
                            console[__Oxe8a94[0x19]](JSON[__Oxe8a94[0x12]](_0x64efx20))
                        }
                    }
                }
            } catch (e) {
                $[__Oxe8a94[0x6e]](e, _0x64efx1f)
            } finally {
                _0x64efx1b()
            }
        })
    })
}

function joinTeamz(_0x64efx2b = 0x0) {
    return new Promise((_0x64efx1b) => {
        let pin = encodeURIComponent(encodeURIComponent($.Pin));
        let _0x64efx2c = encodeURIComponent(encodeURIComponent($[__Oxe8a94[0x55]]));
        let _0x64efx1d = `${__Oxe8a94[0x69]}${activityId}${__Oxe8a94[0xb1]}${inviteeNicks}${__Oxe8a94[0xb2]}${encodeURIComponent($[__Oxe8a94[0x3f]])}${__Oxe8a94[0x98]}${inviters}${__Oxe8a94[0xb3]}${pin}${__Oxe8a94[0xb4]}${encodeURIComponent($[__Oxe8a94[0x56]])}${__Oxe8a94[0xb5]}${encodeURIComponent($[__Oxe8a94[0x57]])}${__Oxe8a94[0x2]}`;
        $[__Oxe8a94[0x6f]](taskPostUrl(__Oxe8a94[0xb6], _0x64efx1d), async (_0x64efx1e, _0x64efx1f, _0x64efx20) => {
            try {
                if (_0x64efx1e) {
                    console[__Oxe8a94[0x19]](__Oxe8a94[0x2] + JSON[__Oxe8a94[0x12]](_0x64efx1e));
                    console[__Oxe8a94[0x19]]($[__Oxe8a94[0x2d]] + __Oxe8a94[0xb7])
                } else {
                    if (safeGet(_0x64efx20)) {
                        _0x64efx20 = JSON[__Oxe8a94[0x7b]](_0x64efx20);
                        if (_0x64efx20[__Oxe8a94[0x7c]] && _0x64efx20[__Oxe8a94[0x7d]]) {
                            $[__Oxe8a94[0x19]](__Oxe8a94[0xb8])
                        } else {
                            console[__Oxe8a94[0x19]](_0x64efx20[__Oxe8a94[0xb9]] || __Oxe8a94[0x2])
                        }
                    }
                }
            } catch (e) {
                $[__Oxe8a94[0x6e]](e, _0x64efx1f)
            } finally {
                _0x64efx1b()
            }
        })
    })
}

function joinTeam(_0x64efx2b = 0x0) {
    return new Promise((_0x64efx1b) => {
        let pin = encodeURIComponent(encodeURIComponent($.Pin));
        let _0x64efx2c = encodeURIComponent(encodeURIComponent($[__Oxe8a94[0x55]]));
        console[__Oxe8a94[0x19]](__Oxe8a94[0xba] + $[__Oxe8a94[0x83]]);
        let _0x64efx1d = `${__Oxe8a94[0x69]}${activityId}${__Oxe8a94[0xb1]}${encodeURIComponent($[__Oxe8a94[0x83]])}${__Oxe8a94[0xb2]}${encodeURIComponent($[__Oxe8a94[0x3f]])}${__Oxe8a94[0x98]}${_0x64efx2c}${__Oxe8a94[0xb3]}${pin}${__Oxe8a94[0xb4]}${encodeURIComponent($[__Oxe8a94[0x56]])}${__Oxe8a94[0xb5]}${encodeURIComponent($[__Oxe8a94[0x57]])}${__Oxe8a94[0x2]}`;
        $[__Oxe8a94[0x6f]](taskPostUrl(__Oxe8a94[0xb6], _0x64efx1d), async (_0x64efx1e, _0x64efx1f, _0x64efx20) => {
            try {
                if (_0x64efx1e) {
                    console[__Oxe8a94[0x19]](__Oxe8a94[0x2] + JSON[__Oxe8a94[0x12]](_0x64efx1e));
                    console[__Oxe8a94[0x19]]($[__Oxe8a94[0x2d]] + __Oxe8a94[0xb7])
                } else {
                    if (_0x64efx20 && safeGet(_0x64efx20)) {
                        _0x64efx20 = JSON[__Oxe8a94[0x7b]](_0x64efx20);
                        if (_0x64efx20[__Oxe8a94[0x7c]] && _0x64efx20[__Oxe8a94[0x7d]]) {
                            $[__Oxe8a94[0x19]](__Oxe8a94[0xb8])
                        } else {
                            $[__Oxe8a94[0xbb]] = _0x64efx20[__Oxe8a94[0x7d]][__Oxe8a94[0xbb]];
                            if (_0x64efx20[__Oxe8a94[0xb9]] == __Oxe8a94[0xbc]) {
                                console[__Oxe8a94[0x19]](__Oxe8a94[0xbd] + _0x64efx20[__Oxe8a94[0x7d]][__Oxe8a94[0xbe]]);
                                if ($[__Oxe8a94[0xbb]] >= 5) {
                                    console[__Oxe8a94[0x19]](__Oxe8a94[0xbf])
                                } else {
                                    console[__Oxe8a94[0x19]](__Oxe8a94[0xc0] + $[__Oxe8a94[0xbb]]);
                                    console[__Oxe8a94[0x19]](__Oxe8a94[0xc1])
                                }
                            } else {
                                console[__Oxe8a94[0x19]](_0x64efx20[__Oxe8a94[0xb9]] || __Oxe8a94[0x2])
                            }
                        }
                    }
                }
            } catch (e) {
                $[__Oxe8a94[0x6e]](e, _0x64efx1f)
            } finally {
                _0x64efx1b()
            }
        })
    })
}

function getOpenCardAllStatuesNew() {
    return new Promise((_0x64efx1b) => {
        let _0x64efx22 = {
            url: `${__Oxe8a94[0xc2]}`,
            headers: {
                cookie: activityCookie + __Oxe8a94[0xc3] + $[__Oxe8a94[0x4e]] + __Oxe8a94[0xc4] + $[__Oxe8a94[0x4f]],
                Connection: `${__Oxe8a94[0x88]}`,
                "\x41\x63\x63\x65\x70\x74\x2D\x45\x6E\x63\x6F\x64\x69\x6E\x67": `${__Oxe8a94[0x8b]}`,
                "\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x54\x79\x70\x65": `${__Oxe8a94[0xc5]}`,
                "\x55\x73\x65\x72\x2D\x41\x67\x65\x6E\x74": $[__Oxe8a94[0x71]],
                "\x41\x63\x63\x65\x70\x74\x2D\x4C\x61\x6E\x67\x75\x61\x67\x65": `${__Oxe8a94[0xc6]}`,
                Referer: `${__Oxe8a94[0xc7]}${activityId}${__Oxe8a94[0x2]}`,
                Accept: `${__Oxe8a94[0xc8]}`
            },
            body: `${__Oxe8a94[0xc9]}${activityId}${__Oxe8a94[0xca]}${encodeURIComponent(encodeURIComponent($.Pin))}${__Oxe8a94[0x2]}`
        };
        $[__Oxe8a94[0x6f]](_0x64efx22, async (_0x64efx1e, _0x64efx1f, _0x64efx20) => {
            try {
                if (_0x64efx1e) {
                    if (_0x64efx1f && typeof _0x64efx1f[__Oxe8a94[0x72]] != __Oxe8a94[0x29]) {
                        if (_0x64efx1f[__Oxe8a94[0x72]] == 493) {
                            console[__Oxe8a94[0x19]](__Oxe8a94[0x73]);
                            $[__Oxe8a94[0x4a]] = true
                        }
                    }
                    ;console[__Oxe8a94[0x19]](__Oxe8a94[0x2] + JSON[__Oxe8a94[0x12]](_0x64efx1e));
                    console[__Oxe8a94[0x19]]($[__Oxe8a94[0x2d]] + __Oxe8a94[0xcb])
                } else {
                    if (_0x64efx20 && safeGet(_0x64efx20)) {
                        _0x64efx20 = JSON[__Oxe8a94[0x7b]](_0x64efx20);
                        if (_0x64efx20[__Oxe8a94[0x7d]] && _0x64efx20[__Oxe8a94[0x7d]][__Oxe8a94[0xcc]]) {
                            (_0x64efx20[__Oxe8a94[0x7d]][__Oxe8a94[0xce]] || [])[__Oxe8a94[0x15]]((_0x64efx13) => {
                                if (_0x64efx13[__Oxe8a94[0xcd]]) {
                                    $[__Oxe8a94[0x51]][__Oxe8a94[0x14]](_0x64efx13[__Oxe8a94[0xcd]])
                                }
                            })
                        }
                    }
                }
            } catch (e) {
                $[__Oxe8a94[0x6e]](e, _0x64efx1f)
            } finally {
                _0x64efx1b()
            }
        })
    })
}

function taskPostUrl(_0x64efx30, _0x64efx1d) {
    return {
        url: __Oxe8a94[0x2] + activityUrl + _0x64efx30,
        body: _0x64efx1d,
        headers: {
            Accept: __Oxe8a94[0xcf],
            "\x41\x63\x63\x65\x70\x74\x2D\x45\x6E\x63\x6F\x64\x69\x6E\x67": __Oxe8a94[0x8b],
            "\x41\x63\x63\x65\x70\x74\x2D\x4C\x61\x6E\x67\x75\x61\x67\x65": __Oxe8a94[0xc6],
            Connection: __Oxe8a94[0x88],
            Host: `${__Oxe8a94[0xd0]}`,
            Origin: `${__Oxe8a94[0x5]}`,
            "\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x54\x79\x70\x65": __Oxe8a94[0xd1],
            Referer: activityUrl + __Oxe8a94[0x70] + activityId,
            Cookie: cookie + activityCookie + __Oxe8a94[0xc3] + $[__Oxe8a94[0x4e]] + __Oxe8a94[0xc4] + $[__Oxe8a94[0x80]],
            "\x55\x73\x65\x72\x2D\x41\x67\x65\x6E\x74": $[__Oxe8a94[0x71]]
        }
    }
}

function taskUrl(_0x64efx30, _0x64efx1d) {
    return {
        url: __Oxe8a94[0xd2] + _0x64efx30,
        body: _0x64efx1d,
        headers: {
            Accept: __Oxe8a94[0x87],
            "\x41\x63\x63\x65\x70\x74\x2D\x45\x6E\x63\x6F\x64\x69\x6E\x67": __Oxe8a94[0x8b],
            "\x41\x63\x63\x65\x70\x74\x2D\x4C\x61\x6E\x67\x75\x61\x67\x65": __Oxe8a94[0xc6],
            Connection: __Oxe8a94[0x88],
            "\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x54\x79\x70\x65": __Oxe8a94[0xd1],
            Host: __Oxe8a94[0x86],
            Cookie: cookie,
            "\x55\x73\x65\x72\x2D\x41\x67\x65\x6E\x74": $[__Oxe8a94[0x71]]
        }
    }
}

function accessLog() {
    return new Promise(async (_0x64efx1b) => {
        const _0x64efx22 = {
            url: `${__Oxe8a94[0xd3]}`,
            headers: {
                Accept: __Oxe8a94[0xcf],
                "\x41\x63\x63\x65\x70\x74\x2D\x45\x6E\x63\x6F\x64\x69\x6E\x67": __Oxe8a94[0x8b],
                "\x41\x63\x63\x65\x70\x74\x2D\x4C\x61\x6E\x67\x75\x61\x67\x65": __Oxe8a94[0xc6],
                Connection: __Oxe8a94[0x88],
                Host: `${__Oxe8a94[0xd0]}`,
                Origin: `${__Oxe8a94[0x5]}`,
                "\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x54\x79\x70\x65": __Oxe8a94[0xd1],
                Referer: activityUrl + __Oxe8a94[0x70] + activityId,
                Cookie: cookie + activityCookie + __Oxe8a94[0xc3] + $[__Oxe8a94[0x4e]] + __Oxe8a94[0xc4] + $[__Oxe8a94[0x80]],
                "\x55\x73\x65\x72\x2D\x41\x67\x65\x6E\x74": $[__Oxe8a94[0x71]]
            },
            body: `${__Oxe8a94[0xd4]}${encodeURIComponent(encodeURIComponent($.Pin))}${__Oxe8a94[0xd5]}${activityId}${__Oxe8a94[0xd6]}${activityId}${__Oxe8a94[0xd7]}`
        };
        $[__Oxe8a94[0x6f]](_0x64efx22, (_0x64efx1e, _0x64efx1f, _0x64efx20) => {
            try {
                if (_0x64efx1e) {
                    console[__Oxe8a94[0x19]](__Oxe8a94[0x2] + JSON[__Oxe8a94[0x12]](_0x64efx1e));
                    console[__Oxe8a94[0x19]]($[__Oxe8a94[0x2d]] + __Oxe8a94[0xd8])
                } else {
                    if (_0x64efx1f[__Oxe8a94[0x6d]] == 200) {
                        refreshToken(_0x64efx1f)
                    }
                }
            } catch (e) {
                $[__Oxe8a94[0x6e]](e, _0x64efx1f)
            } finally {
                _0x64efx1b()
            }
        })
    })
}

function refreshToken(_0x64efx1f) {
    if (_0x64efx1f[__Oxe8a94[0xda]][__Oxe8a94[0xd9]]) {
        cookie = `${__Oxe8a94[0x2]}${originCookie}${__Oxe8a94[0xdb]}`;
        for (let _0x64efx34 of _0x64efx1f[__Oxe8a94[0xda]][__Oxe8a94[0xd9]]) {
            lz_cookie[_0x64efx34[__Oxe8a94[0xa8]](__Oxe8a94[0xdb])[0x0][__Oxe8a94[0xdd]](0, _0x64efx34[__Oxe8a94[0xa8]](__Oxe8a94[0xdb])[0x0][__Oxe8a94[0x11]](__Oxe8a94[0xdc]))] = _0x64efx34[__Oxe8a94[0xa8]](__Oxe8a94[0xdb])[0x0][__Oxe8a94[0xdd]](_0x64efx34[__Oxe8a94[0xa8]](__Oxe8a94[0xdb])[0x0][__Oxe8a94[0x11]](__Oxe8a94[0xdc]) + 1)
        }
        ;
        for (const _0x64efx35 of Object[__Oxe8a94[0x16]](lz_cookie)) {
            cookie += _0x64efx35 + __Oxe8a94[0xdc] + lz_cookie[_0x64efx35] + __Oxe8a94[0xdb]
        }
        ;activityCookie = cookie
    }
}

function getAuthorCodeList(_0x64efx30) {
    return new Promise((_0x64efx1b) => {
        const _0x64efx22 = {
            url: `${__Oxe8a94[0x2]}${_0x64efx30}${__Oxe8a94[0xde]}${new Date()}${__Oxe8a94[0x2]}`,
            timeout: 20000,
            headers: {"\x55\x73\x65\x72\x2D\x41\x67\x65\x6E\x74": __Oxe8a94[0xdf]}
        };
        $[__Oxe8a94[0x75]](_0x64efx22, async (_0x64efx1e, _0x64efx1f, _0x64efx20) => {
            try {
                if (_0x64efx1e) {
                } else {
                    if (_0x64efx20) {
                        _0x64efx20 = JSON[__Oxe8a94[0x7b]](_0x64efx20)
                    }
                    ;
                    if (_0x64efx20 != __Oxe8a94[0x2]) {
                        $[__Oxe8a94[0x63]] = true
                    }
                }
            } catch (e) {
                $[__Oxe8a94[0x6e]](e, _0x64efx1f);
                _0x64efx20 = null
            } finally {
                _0x64efx1b(_0x64efx20)
            }
        })
    })
}

function getUA() {
    $[__Oxe8a94[0x71]] = `${__Oxe8a94[0xe0]}${randomString(40)}${__Oxe8a94[0xe1]}`
}

function randomString(_0x64efx16) {
    _0x64efx16 = _0x64efx16 || 32;
    let _0x64efx39 = __Oxe8a94[0xe2], _0x64efx3a = _0x64efx39[__Oxe8a94[0x27]], _0x64efx3b = __Oxe8a94[0x2];
    for (i = 0; i < _0x64efx16; i++) {
        _0x64efx3b += _0x64efx39[__Oxe8a94[0xe5]](Math[__Oxe8a94[0xe4]](Math[__Oxe8a94[0xe3]]() * _0x64efx3a))
    }
    ;
    return _0x64efx3b
}

function safeGet(_0x64efx20) {
    try {
        if (typeof JSON[__Oxe8a94[0x7b]](_0x64efx20) == __Oxe8a94[0xe6]) {
            return true
        }
    } catch (e) {
        console[__Oxe8a94[0x19]](e);
        console[__Oxe8a94[0x19]](`${__Oxe8a94[0xe7]}`);
        return false
    }
}

function jsonParse(_0x64efx3e) {
    if (typeof _0x64efx3e == __Oxe8a94[0xe8]) {
        try {
            return JSON[__Oxe8a94[0x7b]](_0x64efx3e)
        } catch (e) {
            console[__Oxe8a94[0x19]](e);
            $[__Oxe8a94[0x32]]($[__Oxe8a94[0x2d]], __Oxe8a94[0x2], __Oxe8a94[0xe9]);
            return []
        }
    }
}

async function joinShop() {
    if (!$[__Oxe8a94[0x5a]]) {
        return
    }
    ;
    return new Promise(async (_0x64efx1b) => {
        $[__Oxe8a94[0x61]] = __Oxe8a94[0x60];
        let _0x64efx40 = `${__Oxe8a94[0x2]}`;
        if ($[__Oxe8a94[0x59]]) {
            _0x64efx40 = `${__Oxe8a94[0xea]}${$[__Oxe8a94[0x59]]}${__Oxe8a94[0x2]}`
        }
        ;let _0x64efx1d = `${__Oxe8a94[0xeb]}${$[__Oxe8a94[0x5a]]}${__Oxe8a94[0xec]}${$[__Oxe8a94[0x5a]]}${__Oxe8a94[0xed]}${_0x64efx40}${__Oxe8a94[0xee]}`;
        let _0x64efx41 = await geth5st();
        const _0x64efx22 = {
            url: `${__Oxe8a94[0xef]}${_0x64efx1d}${__Oxe8a94[0xf0]}${_0x64efx41}${__Oxe8a94[0x2]}`,
            headers: {
                '\x61\x63\x63\x65\x70\x74': __Oxe8a94[0x87],
                '\x61\x63\x63\x65\x70\x74\x2D\x65\x6E\x63\x6F\x64\x69\x6E\x67': __Oxe8a94[0x8b],
                '\x61\x63\x63\x65\x70\x74\x2D\x6C\x61\x6E\x67\x75\x61\x67\x65': __Oxe8a94[0xf1],
                '\x63\x6F\x6F\x6B\x69\x65': cookie,
                '\x6F\x72\x69\x67\x69\x6E': __Oxe8a94[0xf2],
                '\x75\x73\x65\x72\x2D\x61\x67\x65\x6E\x74': __Oxe8a94[0xf3]
            }
        };
        $[__Oxe8a94[0x75]](_0x64efx22, async (_0x64efx1e, _0x64efx1f, _0x64efx20) => {
            try {
                _0x64efx20 = _0x64efx20 && _0x64efx20[__Oxe8a94[0x3c]](/jsonp_.*?\((.*?)\);/) && _0x64efx20[__Oxe8a94[0x3c]](/jsonp_.*?\((.*?)\);/)[0x1] || _0x64efx20;
                let _0x64efx42 = $[__Oxe8a94[0x21]](_0x64efx20, _0x64efx20);
                if (_0x64efx42 && typeof _0x64efx42 == __Oxe8a94[0xe6]) {
                    if (_0x64efx42 && _0x64efx42[__Oxe8a94[0x8e]] === true) {
                        console[__Oxe8a94[0x19]](`${__Oxe8a94[0xf4]}${_0x64efx42[__Oxe8a94[0xf5]]}${__Oxe8a94[0x2]}`);
                        $[__Oxe8a94[0x61]] = _0x64efx42[__Oxe8a94[0xf5]];
                        if (_0x64efx42[__Oxe8a94[0x7c]] && _0x64efx42[__Oxe8a94[0x7c]][__Oxe8a94[0xf6]]) {
                            for (let _0x64efx17 of _0x64efx42[__Oxe8a94[0x7c]][__Oxe8a94[0xf6]][__Oxe8a94[0xf7]]) {
                                console[__Oxe8a94[0x19]](`${__Oxe8a94[0xf8]}${_0x64efx17[__Oxe8a94[0xf9]]}${__Oxe8a94[0x2]}${_0x64efx17[__Oxe8a94[0xfa]]}${__Oxe8a94[0x2]}${_0x64efx17[__Oxe8a94[0xfb]]}${__Oxe8a94[0x2]}`)
                            }
                        }
                    } else {
                        if (_0x64efx42 && typeof _0x64efx42 == __Oxe8a94[0xe6] && _0x64efx42[__Oxe8a94[0xf5]]) {
                            $[__Oxe8a94[0x61]] = _0x64efx42[__Oxe8a94[0xf5]];
                            console[__Oxe8a94[0x19]](`${__Oxe8a94[0x2]}${_0x64efx42[__Oxe8a94[0xf5]] || __Oxe8a94[0x2]}${__Oxe8a94[0x2]}`)
                        } else {
                            console[__Oxe8a94[0x19]](_0x64efx20)
                        }
                    }
                } else {
                    console[__Oxe8a94[0x19]](_0x64efx20)
                }
            } catch (e) {
                $[__Oxe8a94[0x6e]](e, _0x64efx1f)
            } finally {
                _0x64efx1b()
            }
        })
    })
}

async function getshopactivityId() {
    return new Promise(async (_0x64efx1b) => {
        let _0x64efx1d = `${__Oxe8a94[0xeb]}${$[__Oxe8a94[0x5a]]}${__Oxe8a94[0xfc]}`;
        let _0x64efx41 = await geth5st();
        const _0x64efx22 = {
            url: `${__Oxe8a94[0x84]}${_0x64efx1d}${__Oxe8a94[0xf0]}${_0x64efx41}${__Oxe8a94[0x2]}`,
            headers: {
                '\x61\x63\x63\x65\x70\x74': __Oxe8a94[0x87],
                '\x61\x63\x63\x65\x70\x74\x2D\x65\x6E\x63\x6F\x64\x69\x6E\x67': __Oxe8a94[0x8b],
                '\x61\x63\x63\x65\x70\x74\x2D\x6C\x61\x6E\x67\x75\x61\x67\x65': __Oxe8a94[0xf1],
                '\x63\x6F\x6F\x6B\x69\x65': cookie,
                '\x6F\x72\x69\x67\x69\x6E': __Oxe8a94[0xf2],
                '\x75\x73\x65\x72\x2D\x61\x67\x65\x6E\x74': __Oxe8a94[0xf3]
            }
        };
        $[__Oxe8a94[0x75]](_0x64efx22, async (_0x64efx1e, _0x64efx1f, _0x64efx20) => {
            try {
                _0x64efx20 = _0x64efx20 && _0x64efx20[__Oxe8a94[0x3c]](/jsonp_.*?\((.*?)\);/) && _0x64efx20[__Oxe8a94[0x3c]](/jsonp_.*?\((.*?)\);/)[0x1] || _0x64efx20;
                let _0x64efx42 = $[__Oxe8a94[0x21]](_0x64efx20, _0x64efx20);
                if (_0x64efx42 && typeof _0x64efx42 == __Oxe8a94[0xe6]) {
                    if (_0x64efx42 && _0x64efx42[__Oxe8a94[0x8e]] == true) {
                        console[__Oxe8a94[0x19]](`${__Oxe8a94[0xfd]}${_0x64efx42[__Oxe8a94[0x7c]][__Oxe8a94[0xff]][__Oxe8a94[0xfe]] || __Oxe8a94[0x2]}${__Oxe8a94[0x100]}${$[__Oxe8a94[0x5a]]}${__Oxe8a94[0x101]}`);
                        $[__Oxe8a94[0x59]] = _0x64efx42[__Oxe8a94[0x7c]][__Oxe8a94[0x90]] && _0x64efx42[__Oxe8a94[0x7c]][__Oxe8a94[0x90]][0x0] && _0x64efx42[__Oxe8a94[0x7c]][__Oxe8a94[0x90]][0x0][__Oxe8a94[0x93]] && _0x64efx42[__Oxe8a94[0x7c]][__Oxe8a94[0x90]][0x0][__Oxe8a94[0x93]][__Oxe8a94[0x92]] || __Oxe8a94[0x2]
                    }
                } else {
                    console[__Oxe8a94[0x19]](_0x64efx20)
                }
            } catch (e) {
                $[__Oxe8a94[0x6e]](e, _0x64efx1f)
            } finally {
                _0x64efx1b()
            }
        })
    })
}

var _0xodb = __Oxe8a94[0x102], _0xodb_ = [__Oxe8a94[0x103]],
    _0x3c1b = [_0xodb, __Oxe8a94[0x104], __Oxe8a94[0x105], __Oxe8a94[0x106], __Oxe8a94[0x107], __Oxe8a94[0x108], __Oxe8a94[0x109], __Oxe8a94[0x10a], __Oxe8a94[0x10b], __Oxe8a94[0x10c], __Oxe8a94[0x10d], __Oxe8a94[0x10e], __Oxe8a94[0x10f], __Oxe8a94[0x110], __Oxe8a94[0x111], __Oxe8a94[0x112], __Oxe8a94[0x113], __Oxe8a94[0x114], __Oxe8a94[0x115], __Oxe8a94[0x116], __Oxe8a94[0x117], __Oxe8a94[0x118], __Oxe8a94[0x119], __Oxe8a94[0x11a], __Oxe8a94[0x11b], __Oxe8a94[0x11c], __Oxe8a94[0x11d], __Oxe8a94[0x11e], __Oxe8a94[0x11f], __Oxe8a94[0x120], __Oxe8a94[0x121], __Oxe8a94[0x122], __Oxe8a94[0x123], __Oxe8a94[0x124], __Oxe8a94[0x125], __Oxe8a94[0x126], __Oxe8a94[0x127], __Oxe8a94[0x128], __Oxe8a94[0x129], __Oxe8a94[0x12a], __Oxe8a94[0x12b], __Oxe8a94[0x12c], __Oxe8a94[0x12d]];
if (function (_0x64efx47, _0x64efx48, _0x64efx49) {
    function _0x64efx4a(_0x64efx4b, _0x64efx4c, _0x64efx4d, _0x64efx4e, _0x64efx4f, _0x64efx50) {
        _0x64efx4c = _0x64efx4c >> 0x8, _0x64efx4f = __Oxe8a94[0x12e];
        var _0x64efx51 = __Oxe8a94[0x12f], _0x64efx52 = __Oxe8a94[0x14], _0x64efx50 = __Oxe8a94[0x130];
        if (_0x64efx4c < _0x64efx4b) {
            while (--_0x64efx4b) {
                _0x64efx4e = _0x64efx47[_0x64efx51]();
                if (_0x64efx4c === _0x64efx4b && _0x64efx50 === __Oxe8a94[0x130] && _0x64efx50[__Oxe8a94[0x27]] === 0x1) {
                    _0x64efx4c = _0x64efx4e, _0x64efx4d = _0x64efx47[_0x64efx4f + __Oxe8a94[0x131]]()
                } else {
                    if (_0x64efx4c && _0x64efx4d[__Oxe8a94[0xab]](/[xNUxuLOwqBleVKE=]/g, __Oxe8a94[0x2]) === _0x64efx4c) {
                        _0x64efx47[_0x64efx52](_0x64efx4e)
                    }
                }
            }
            ;_0x64efx47[_0x64efx52](_0x64efx47[_0x64efx51]())
        }
        ;
        return 0xec806
    }

    return _0x64efx4a(++_0x64efx48, _0x64efx49) >> _0x64efx48 ^ _0x64efx49
}(_0x3c1b, 0x19b, 0x19b00), _0x3c1b) {
    _0xodb_ = _0x3c1b[__Oxe8a94[0x27]] ^ 0x19b
}
;

function _0x80d0(_0x64efx54, _0x64efx55) {
    _0x64efx54 = ~~__Oxe8a94[0x133][__Oxe8a94[0x132]](_0x64efx54[__Oxe8a94[0x25]](0x1));
    var _0x64efx56 = _0x3c1b[_0x64efx54];
    if (_0x80d0[__Oxe8a94[0x134]] === undefined) {
        (function () {
            var _0x64efx57 = typeof window !== __Oxe8a94[0x29] ? window : typeof process === __Oxe8a94[0xe6] && typeof require === __Oxe8a94[0x135] && typeof global === __Oxe8a94[0xe6] ? global : this;
            var _0x64efx58 = __Oxe8a94[0x136];
            _0x64efx57[__Oxe8a94[0x137]] || (_0x64efx57[__Oxe8a94[0x137]] = function (_0x64efx59) {
                var _0x64efx5a = String(_0x64efx59)[__Oxe8a94[0xab]](/=+$/, __Oxe8a94[0x2]);
                for (var _0x64efx5b = 0x0, _0x64efx5c, _0x64efx5d, _0x64efx5e = 0x0, _0x64efx5f = __Oxe8a94[0x2]; _0x64efx5d = _0x64efx5a[__Oxe8a94[0xe5]](_0x64efx5e++); ~_0x64efx5d && (_0x64efx5c = _0x64efx5b % 0x4 ? _0x64efx5c * 0x40 + _0x64efx5d : _0x64efx5d, _0x64efx5b++ % 0x4) ? _0x64efx5f += String[__Oxe8a94[0x138]](0xff & _0x64efx5c >> (-0x2 * _0x64efx5b & 0x6)) : 0x0) {
                    _0x64efx5d = _0x64efx58[__Oxe8a94[0x11]](_0x64efx5d)
                }
                ;
                return _0x64efx5f
            })
        }());

        function _0x64efx60(_0x64efx61, _0x64efx55) {
            var _0x64efx62 = [], _0x64efx63 = 0x0, _0x64efx64, _0x64efx65 = __Oxe8a94[0x2], _0x64efx66 = __Oxe8a94[0x2];
            _0x64efx61 = atob(_0x64efx61);
            for (var _0x64efx67 = 0x0, _0x64efx68 = _0x64efx61[__Oxe8a94[0x27]]; _0x64efx67 < _0x64efx68; _0x64efx67++) {
                _0x64efx66 += __Oxe8a94[0x139] + (__Oxe8a94[0x13a] + _0x64efx61[__Oxe8a94[0x13c]](_0x64efx67)[__Oxe8a94[0x13b]](0x10))[__Oxe8a94[0x25]](-0x2)
            }
            ;_0x64efx61 = decodeURIComponent(_0x64efx66);
            for (var _0x64efx69 = 0x0; _0x64efx69 < 0x100; _0x64efx69++) {
                _0x64efx62[_0x64efx69] = _0x64efx69
            }
            ;
            for (_0x64efx69 = 0x0; _0x64efx69 < 0x100; _0x64efx69++) {
                _0x64efx63 = (_0x64efx63 + _0x64efx62[_0x64efx69] + _0x64efx55[__Oxe8a94[0x13c]](_0x64efx69 % _0x64efx55[__Oxe8a94[0x27]])) % 0x100;
                _0x64efx64 = _0x64efx62[_0x64efx69];
                _0x64efx62[_0x64efx69] = _0x64efx62[_0x64efx63];
                _0x64efx62[_0x64efx63] = _0x64efx64
            }
            ;_0x64efx69 = 0x0;
            _0x64efx63 = 0x0;
            for (var _0x64efx6a = 0x0; _0x64efx6a < _0x64efx61[__Oxe8a94[0x27]]; _0x64efx6a++) {
                _0x64efx69 = (_0x64efx69 + 0x1) % 0x100;
                _0x64efx63 = (_0x64efx63 + _0x64efx62[_0x64efx69]) % 0x100;
                _0x64efx64 = _0x64efx62[_0x64efx69];
                _0x64efx62[_0x64efx69] = _0x64efx62[_0x64efx63];
                _0x64efx62[_0x64efx63] = _0x64efx64;
                _0x64efx65 += String[__Oxe8a94[0x138]](_0x64efx61[__Oxe8a94[0x13c]](_0x64efx6a) ^ _0x64efx62[(_0x64efx62[_0x64efx69] + _0x64efx62[_0x64efx63]) % 0x100])
            }
            ;
            return _0x64efx65
        }

        _0x80d0[__Oxe8a94[0x13d]] = _0x64efx60;
        _0x80d0[__Oxe8a94[0x13e]] = {};
        _0x80d0[__Oxe8a94[0x134]] = !![]
    }
    ;var _0x64efx6b = _0x80d0[__Oxe8a94[0x13e]][_0x64efx54];
    if (_0x64efx6b === undefined) {
        if (_0x80d0[__Oxe8a94[0x13f]] === undefined) {
            _0x80d0[__Oxe8a94[0x13f]] = !![]
        }
        ;_0x64efx56 = _0x80d0[__Oxe8a94[0x13d]](_0x64efx56, _0x64efx55);
        _0x80d0[__Oxe8a94[0x13e]][_0x64efx54] = _0x64efx56
    } else {
        _0x64efx56 = _0x64efx6b
    }
    ;
    return _0x64efx56
}

function generateFp() {
    var _0x64efx6d = {
        '\x72\x79\x6F\x50\x79': __Oxe8a94[0x140],
        '\x6D\x66\x76\x77\x4B': function (_0x64efx6e, _0x64efx6f) {
            return _0x64efx6e | _0x64efx6f
        },
        '\x57\x75\x74\x44\x55': function (_0x64efx70, _0x64efx71) {
            return _0x64efx70 + _0x64efx71
        }
    };
    let _0x64efx72 = _0x64efx6d[_0x80d0(__Oxe8a94[0x141], __Oxe8a94[0x142])];
    let _0x64efx73 = 0xd;
    let _0x64efx74 = __Oxe8a94[0x2];
    for (; _0x64efx73--;) {
        _0x64efx74 += _0x64efx72[_0x64efx6d[_0x80d0(__Oxe8a94[0x145], __Oxe8a94[0x146])](Math[__Oxe8a94[0xe3]]() * _0x64efx72[_0x80d0(__Oxe8a94[0x143], __Oxe8a94[0x144])], 0x0)]
    }
    ;
    return _0x64efx6d[_0x80d0(__Oxe8a94[0x14b], __Oxe8a94[0x146])](_0x64efx74, Date[_0x80d0(__Oxe8a94[0x149], __Oxe8a94[0x14a])]())[_0x80d0(__Oxe8a94[0x147], __Oxe8a94[0x148])](0x0, 0x10)
}

function geth5st() {
    var _0x64efx76 = {
        '\x58\x4C\x46\x59\x50': __Oxe8a94[0x14c],
        '\x45\x52\x64\x7A\x79': __Oxe8a94[0x14d],
        '\x65\x61\x46\x76\x73': _0x80d0(__Oxe8a94[0x14e], __Oxe8a94[0x14f]),
        '\x4E\x71\x6B\x6C\x51': function (_0x64efx77, _0x64efx78) {
            return _0x64efx77(_0x64efx78)
        },
        '\x44\x71\x72\x71\x48': function (_0x64efx79, _0x64efx7a) {
            return _0x64efx79 + _0x64efx7a
        },
        '\x47\x45\x44\x70\x61': function (_0x64efx7b, _0x64efx7c) {
            return _0x64efx7b + _0x64efx7c
        },
        '\x74\x4A\x72\x79\x4A': function (_0x64efx7d, _0x64efx7e) {
            return _0x64efx7d + _0x64efx7e
        }
    };
    let _0x64efx7f = Date[_0x80d0(__Oxe8a94[0x150], __Oxe8a94[0x151])]();
    let _0x64efx80 = generateFp();
    let _0x64efx81 = new Date(_0x64efx7f)[__Oxe8a94[0x153]](_0x64efx76[_0x80d0(__Oxe8a94[0x152], __Oxe8a94[0x148])]);
    let _0x64efx82 = [_0x64efx76[__Oxe8a94[0x154]], _0x64efx76[_0x80d0(__Oxe8a94[0x155], __Oxe8a94[0x156])]];
    let _0x64efx83 = _0x64efx82[random(0x0, _0x64efx82[__Oxe8a94[0x27]])];
    return _0x64efx76[_0x80d0(__Oxe8a94[0x15d], __Oxe8a94[0x15e])](encodeURIComponent, _0x64efx76[__Oxe8a94[0x15c]](_0x64efx76[_0x80d0(__Oxe8a94[0x158], __Oxe8a94[0x159])](_0x64efx76[_0x80d0(__Oxe8a94[0x157], __Oxe8a94[0x14a])](_0x64efx81, __Oxe8a94[0xdb]) + _0x64efx80, _0x64efx83), Date[_0x80d0(__Oxe8a94[0x15a], __Oxe8a94[0x15b])]()))
}

Date[_0x80d0(__Oxe8a94[0x160], __Oxe8a94[0x161])][_0x80d0(__Oxe8a94[0x15f], __Oxe8a94[0x142])] = function (_0x64efx84) {
    var _0x64efx85 = {
        '\x77\x47\x41\x56\x6C': function (_0x64efx86, _0x64efx87) {
            return _0x64efx86 / _0x64efx87
        }, '\x61\x62\x6F\x72\x43': function (_0x64efx88, _0x64efx89) {
            return _0x64efx88 + _0x64efx89
        }, '\x6B\x68\x76\x79\x41': function (_0x64efx8a, _0x64efx8b) {
            return _0x64efx8a === _0x64efx8b
        }, '\x52\x6B\x68\x48\x4E': function (_0x64efx8c, _0x64efx8d) {
            return _0x64efx8c == _0x64efx8d
        }
    };
    var _0x64efx8e, _0x64efx8f = this, _0x64efx90 = _0x64efx84, _0x64efx91 = {
        '\x4D\x2B': _0x64efx8f[_0x80d0(__Oxe8a94[0x162], __Oxe8a94[0x163])]() + 0x1,
        '\x64\x2B': _0x64efx8f[__Oxe8a94[0x164]](),
        '\x44\x2B': _0x64efx8f[_0x80d0(__Oxe8a94[0x165], __Oxe8a94[0x166])](),
        '\x68\x2B': _0x64efx8f[__Oxe8a94[0x167]](),
        '\x48\x2B': _0x64efx8f[_0x80d0(__Oxe8a94[0x168], __Oxe8a94[0x169])](),
        '\x6D\x2B': _0x64efx8f[_0x80d0(__Oxe8a94[0x16a], __Oxe8a94[0x16b])](),
        '\x73\x2B': _0x64efx8f[_0x80d0(__Oxe8a94[0x16c], __Oxe8a94[0x151])](),
        '\x77\x2B': _0x64efx8f[_0x80d0(__Oxe8a94[0x16d], __Oxe8a94[0x16e])](),
        '\x71\x2B': Math[_0x80d0(__Oxe8a94[0x172], __Oxe8a94[0x166])](_0x64efx85[__Oxe8a94[0x171]](_0x64efx85[_0x80d0(__Oxe8a94[0x170], __Oxe8a94[0x151])](_0x64efx8f[__Oxe8a94[0x16f]](), 0x3), 0x3)),
        '\x53\x2B': _0x64efx8f[_0x80d0(__Oxe8a94[0x173], __Oxe8a94[0x174])]()
    };
    /(y+)/i[__Oxe8a94[0x175]](_0x64efx90) && (_0x64efx90 = _0x64efx90[_0x80d0(__Oxe8a94[0x17e], __Oxe8a94[0x17f])](RegExp[__Oxe8a94[0x176]], __Oxe8a94[0x2][_0x80d0(__Oxe8a94[0x17d], __Oxe8a94[0x174])](_0x64efx8f[_0x80d0(__Oxe8a94[0x17b], __Oxe8a94[0x17c])]())[_0x80d0(__Oxe8a94[0x179], __Oxe8a94[0x17a])](0x4 - RegExp[__Oxe8a94[0x176]][_0x80d0(__Oxe8a94[0x177], __Oxe8a94[0x178])])));
    for (var _0x64efx92 in _0x64efx91) {
        if (new RegExp(__Oxe8a94[0x182][_0x80d0(__Oxe8a94[0x181], __Oxe8a94[0x146])](_0x64efx92, __Oxe8a94[0x101]))[_0x80d0(__Oxe8a94[0x180], __Oxe8a94[0x14a])](_0x64efx90)) {
            var _0x64efx93,
                _0x64efx94 = _0x64efx85[__Oxe8a94[0x184]](__Oxe8a94[0x183], _0x64efx92) ? _0x80d0(__Oxe8a94[0x185], __Oxe8a94[0x186]) : __Oxe8a94[0x13a];
            _0x64efx90 = _0x64efx90[__Oxe8a94[0xab]](RegExp[__Oxe8a94[0x176]], _0x64efx85[_0x80d0(__Oxe8a94[0x188], __Oxe8a94[0x189])](0x1, RegExp[__Oxe8a94[0x176]][_0x80d0(__Oxe8a94[0x187], __Oxe8a94[0x142])]) ? _0x64efx91[_0x64efx92] : _0x64efx85[_0x80d0(__Oxe8a94[0x18c], __Oxe8a94[0x18d])](__Oxe8a94[0x2][__Oxe8a94[0x132]](_0x64efx94), _0x64efx91[_0x64efx92])[__Oxe8a94[0xdd]](__Oxe8a94[0x2][_0x80d0(__Oxe8a94[0x18b], __Oxe8a94[0x17a])](_0x64efx91[_0x64efx92])[_0x80d0(__Oxe8a94[0x18a], __Oxe8a94[0x15b])]))
        }
    }
    ;
    return _0x64efx90
};

function random(_0x64efx96, _0x64efx97) {
    var _0x64efx98 = {
        '\x4E\x7A\x4D\x76\x42': function (_0x64efx99, _0x64efx9a) {
            return _0x64efx99 + _0x64efx9a
        }, '\x70\x76\x4C\x52\x62': function (_0x64efx9b, _0x64efx9c) {
            return _0x64efx9b * _0x64efx9c
        }, '\x4B\x4E\x67\x41\x43': function (_0x64efx9d, _0x64efx9e) {
            return _0x64efx9d - _0x64efx9e
        }
    };
    return _0x64efx98[_0x80d0(__Oxe8a94[0x192], __Oxe8a94[0x169])](Math[_0x80d0(__Oxe8a94[0x190], __Oxe8a94[0x191])](_0x64efx98[_0x80d0(__Oxe8a94[0x18f], __Oxe8a94[0x17a])](Math[__Oxe8a94[0xe3]](), _0x64efx98[__Oxe8a94[0x18e]](_0x64efx97, _0x64efx96))), _0x64efx96)
}

_0xodb = __Oxe8a94[0x102];
;
;(function (_0x64efx9f, _0x64efxa0, _0x64efxa1, _0x64efxa2, _0x64efxa3, _0x64efxa4) {
    _0x64efxa4 = __Oxe8a94[0x29];
    _0x64efxa2 = function (_0x64efxa5) {
        if (typeof alert !== _0x64efxa4) {
            alert(_0x64efxa5)
        }
        ;
        if (typeof console !== _0x64efxa4) {
            console[__Oxe8a94[0x19]](_0x64efxa5)
        }
    };
    _0x64efxa1 = function (_0x64efx3a, _0x64efx9f) {
        return _0x64efx3a + _0x64efx9f
    };
    _0x64efxa3 = _0x64efxa1(__Oxe8a94[0x193], _0x64efxa1(_0x64efxa1(__Oxe8a94[0x194], __Oxe8a94[0x195]), __Oxe8a94[0x196]));
    try {
        _0x64efx9f = __encode;
        if (!(typeof _0x64efx9f !== _0x64efxa4 && _0x64efx9f === _0x64efxa1(__Oxe8a94[0x197], __Oxe8a94[0x198]))) {
            _0x64efxa2(_0x64efxa3)
        }
    } catch (e) {
        _0x64efxa2(_0x64efxa3)
    }
})({})

// prettier-ignore
function Env(t, e) {
    "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);

    class s {
        constructor(t) {
            this.env = t
        }

        send(t, e = "GET") {
            t = "string" == typeof t ? {url: t} : t;
            let s = this.get;
            return "POST" === e && (s = this.post), new Promise((e, i) => {
                s.call(this, t, (t, s, r) => {
                    t ? i(t) : e(s)
                })
            })
        }

        get(t) {
            return this.send.call(this.env, t)
        }

        post(t) {
            return this.send.call(this.env, t, "POST")
        }
    }

    return new class {
        constructor(t, e) {
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`)
        }

        isNode() {
            return "undefined" != typeof module && !!module.exports
        }

        isQuanX() {
            return "undefined" != typeof $task
        }

        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }

        isLoon() {
            return "undefined" != typeof $loon
        }

        toObj(t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }

        toStr(t, e = null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }

        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i) try {
                s = JSON.parse(this.getdata(t))
            } catch {
            }
            return s
        }

        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }

        getScript(t) {
            return new Promise(e => {
                this.get({url: t}, (t, s, i) => e(i))
            })
        }

        runScript(t, e) {
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"), n = {
                    url: `http://${h}/v1/scripting/evaluate`,
                    body: {script_text: t, mock_type: "cron", timeout: r},
                    headers: {"X-Key": o, Accept: "*/*"}
                };
                this.post(n, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }

        loaddata() {
            if (!this.isNode()) return {};
            {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e);
                if (!s && !i) return {};
                {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }

        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }

        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i) if (r = Object(r)[t], void 0 === r) return s;
            return r
        }

        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }

        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
                if (r) try {
                    const t = JSON.parse(r);
                    e = t ? this.lodash_get(t, i, "") : e
                } catch (t) {
                    e = ""
                }
            }
            return e
        }

        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i),
                    h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
                }
            } else s = this.setval(t, e);
            return s
        }

        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }

        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }

        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }

        get(t, e = (() => {
        })) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {"X-Surge-Skip-Scripting": !1})), $httpClient.get(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {hints: !1})), $task.fetch(t).then(t => {
                const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                e(null, {status: s, statusCode: i, headers: r, body: o}, o)
            }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                try {
                    if (t.headers["set-cookie"]) {
                        const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                        s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                    }
                } catch (t) {
                    this.logErr(t)
                }
            }).then(t => {
                const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                e(null, {status: s, statusCode: i, headers: r, body: o}, o)
            }, t => {
                const {message: s, response: i} = t;
                e(s, i, i && i.body)
            }))
        }

        post(t, e = (() => {
        })) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {"X-Surge-Skip-Scripting": !1})), $httpClient.post(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {hints: !1})), $task.fetch(t).then(t => {
                const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                e(null, {status: s, statusCode: i, headers: r, body: o}, o)
            }, t => e(t)); else if (this.isNode()) {
                this.initGotEnv(t);
                const {url: s, ...i} = t;
                this.got.post(s, i).then(t => {
                    const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                    e(null, {status: s, statusCode: i, headers: r, body: o}, o)
                }, t => {
                    const {message: s, response: i} = t;
                    e(s, i, i && i.body)
                })
            }
        }

        time(t, e = null) {
            const s = e ? new Date(e) : new Date;
            let i = {
                "M+": s.getMonth() + 1,
                "d+": s.getDate(),
                "H+": s.getHours(),
                "m+": s.getMinutes(),
                "s+": s.getSeconds(),
                "q+": Math.floor((s.getMonth() + 3) / 3),
                S: s.getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
            return t
        }

        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t) return t;
                if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {"open-url": t} : this.isSurge() ? {url: t} : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"];
                        return {openUrl: e, mediaUrl: s}
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl;
                        return {"open-url": e, "media-url": s}
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {url: e}
                    }
                }
            };
            if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
                let t = ["", "==============📣系统通知📣=============="];
                t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t)
            }
        }

        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }

        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t)
        }

        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }

        done(t = {}) {
            const e = (new Date).getTime(), s = (e - this.startTime) / 1e3;
            this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}