const http = require('../utils/http.js');
const Router = require('koa-router');
// 创建路由对象
const router = new Router({ prefix: '/product' });
// 自定义配置路由对象
// 分页获取商品信息
router.post('/list', async (ctx, next) => {
    let { name, cid, orderCol, orderDir, begin, pageSize } = ctx.request.body;
    let sql = "call p_getProduct(?,?,?,?,?,?);";
    let results = await http(sql, [name, cid, orderCol, orderDir, begin, pageSize]);
    return Promise.resolve(results[0]);
});
// 获取指定商品的信息
router.get('/model/:id', async (ctx, next) => {
    let id = parseInt(ctx.params.id);
    let sql = "select * from `dt_product` where `id` = ?;";
    let results = await http(sql, [id]);
    return Promise.resolve(results[0]);
});

// 导出路由对象
module.exports = router.routes();