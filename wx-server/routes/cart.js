const http = require('../utils/http.js');
const Router = require('koa-router');
// 创建路由对象
const router = new Router({ prefix: "/cart" });
// 自定义配置路由对象
router.get('/list', async (ctx, next) => {   
    const openid = ctx.state.openid;
    let sql = "SELECT T1.`id`, T1.`pid`, T1.`count`, T1.`price`, T2.`name`, T2.`avatar`, T2.`brief` FROM `dt_cart` T1,`dt_product` T2 where T1.`pid` = T2.`id` and T1.`openid` = ?;";
    const results = await http(sql, [openid]);
    return Promise.resolve(results);
});

router.post('/listbyids', async (ctx, next) => {
    const { ids } = ctx.request.body;
    let sql = "SELECT T1.`id`, T1.`pid`, T1.`count`, T1.`price`, T2.`name`, T2.`avatar`, T2.`brief` FROM `dt_cart` T1,`dt_product` T2 where T1.`pid` = T2.`id` and T1.`id` in (?);";
    const results = await http(sql, [ids]);
    return Promise.resolve(results);
});

router.post('/add_product', async (ctx, next) => {
    const openid = ctx.state.openid;
    const {pid, count, price} = ctx.request.body;
    let sql = 'call p_addProductToCart(?,?,?,?);';
    const results = await http(sql, [openid,pid,count,price]);
    if(results[0][0].result) return Promise.reject(results[0][0].result);
    else return Promise.resolve();
});

router.get('/increase/:id', async (ctx, next) => {
    const id = parseInt(ctx.params.id);
    let sql = "update `dt_cart` set `count` = `count` + 1 where `id` = ?;";
    await http(sql, [id]);
    return Promise.resolve();
});

router.get('/decrease/:id', async (ctx, next) => {
    const id = parseInt(ctx.params.id);
    let sql = "update `dt_cart` set `count` = `count` - 1 where `id` = ?;";
    await http(sql, [id]);
    return Promise.resolve();
});

router.post('/batch_remove', async (ctx, next) => {
    const { ids } = ctx.request.body;
    let sql = "delete from `dt_cart` where `id` in (?);";
    await http(sql, [ ids ]);
    return Promise.resolve();
});

// 导出路由对象
module.exports = router.routes();


// 1. 这个中间件是干什么的？
    // 批量删除购物记录
    // 2. 要操作数据库中的哪张表？是什么操作？
    // dt_cart 删除
    // 3. 要完成这次操作需要传几个数据给数据库？
    // 所有的要删除的购物记录的id
    // 4. 为了完成上述任务，希望小程序客户端传什么过来？
    // 所有的要删除的购物记录的id
    // 5. 我要返回什么给小程序客户端？
    // 成功的话：不需要