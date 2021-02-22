// 导入路由对象构造函数
const http = require('../utils/http.js');
const Router = require('koa-router');

// 创建路由对象
const router = new Router({ prefix: "/category" });
// 自定义配置路由对象
router.get('/list/:fid', async (ctx, next) => {
    // routes中的所有中间件，关注(应该知道的是)的是:
    // 1. 要执行的sql语句是什么？
    // 2. 要执行sql相应的参数是什么？什么类型？代表什么函义
    // 3. 若成功执行返回的结果是什么？结果是什么结构？结果要不要处理一下再返回？
    // 4. 只关注200和199的情况，其它情不用管
    let fid = parseInt(ctx.params.fid);
    let sql = 'select * from `dt_category` where `fid` = ?;';
    let results = await http(sql, [fid]);
    return Promise.resolve(results);
});

// 导出路由对象
module.exports = router.routes();
