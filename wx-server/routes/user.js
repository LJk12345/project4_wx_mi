const querystring = require('querystring');
const http = require('../utils/http.js');
const Router = require('koa-router');
const request = require('request');
const session = require('../utils/session.js');
const file = require('../utils/file.js');
const path = require('path');
// 创建路由对象
const router = new Router({ prefix: "/user" });
// 自定义配置路由对象
router.get('/login/:code', async (ctx, next) => {
    const code = ctx.params.code;
    // 向微信服务器发起get请求拿code换open_id和session_key
    let url = "https://api.weixin.qq.com/sns/jscode2session?";
    let params = {
        appid: "wx2046ab1e26553dce",
        secret: "6da1eb24257c9916b4f632f04e916859",
        js_code: code,
        grant_type: "authorization_code"
    };
    let urlParams = querystring.stringify(params);
    return new Promise((resolve, reject) => {
        request.get({url: url + urlParams}, async function(error, response, body) {
            if(error) { reject(error); }
            else {
                const {session_key, openid} = JSON.parse(body);
                const str_3rd_session = session.set([openid, session_key]);
                await http('call p_login(?);', [openid]);
                resolve(str_3rd_session);
            }
        });
    });
});

// 修改个人头像
router.post('/update', async (ctx, next) => {
    // ctx.request.files.file.path 可以获取前面的body中间件把上传来的文件搞到哪里去了
    // 将上传来的文件从临时目录保存到真实目录中去
    const openid = ctx.state.openid;
    const { nickname, avatar, avatar2 } = ctx.request.body;
    if(avatar !== avatar2) {
        let fromPath = ctx.request.files.file.path;
        var fileName = fromPath.slice(fromPath.lastIndexOf('\\') + 1);
        let toPath = path.join(__dirname, '../public/images/user/', fileName);
        await file.copy(fromPath, toPath);					// 把文件从临时目录拷贝到最终目录
        await file.unlink(fromPath);		                // 把临时目录中的文件删除
        // 如果用户原来有头像，把原来的头像从文件夹中删除
        if(avatar) await file.unlink(path.join(__dirname, '../public', avatar));
    }
    const sql = 'update `dt_user` set `avatar` = ?, `nickname` = ? where `openid` = ?';
    await http(sql, ['/images/user/' + fileName, nickname, openid]);
    return Promise.resolve();
});

// 导出路由对象
module.exports = router.routes();