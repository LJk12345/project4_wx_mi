const http = require('../utils/http.js');
const Router = require('koa-router');
// 创建路由对象
const router = new Router({ prefix: "/order" });
// 自定义配置路由对象
// 数据结构转换辅助函数
function formatOrderList(list) {
	let result = [];
	list.forEach(item => {
        let  { order_id, pid, count, price, name, avatar, brief } = item;
        let detailItem = { pid, name, count, price, avatar, brief };
        let target = result.find(item => item.order_id === order_id);
        if(target) target.details.push(detailItem);
        else {
            let { account, order_time, is_pay } = item;
            let { address_id, receive_name, receive_phone, receive_region, receive_detail, is_default } = item;
            let address = { address_id, receive_name, receive_phone, receive_region, receive_detail, is_default };
            result.push({ order_id, account, order_time, is_pay, address, details: [detailItem] });
        }
	});
	return result;
}


// 新增一个订单（在订单确认页的，下单按钮使用）
router.post('/add', async (ctx, next) => {
    const openid = ctx.state.openid;
    const { ids, account, address_id } = ctx.request.body;
    let sql = "call p_orderConfirm(?,?,?,?,?);";
    let date = new Date();
    let order_time = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    let results = await http(sql, [ ids, account, order_time, openid, address_id ]);
    return Promise.resolve(results[0][0].order_id);
});
// 根据订单编号查询订单的详细信息(订单付款页面、查询某个订单详情页时要用)
router.get('/model/:id', async (ctx, next) => {
    const order_id = ctx.params.id;
    let sql = 'select * from `v_order_address_product` where `order_id`= ?;';
    let results = await http(sql, [order_id]);
    return Promise.resolve(formatOrderList(results));
});
// 订单的付款
router.get('/pay/:id', async (ctx, next) => {
    // 自己完成
});
// 根据条件查询查询用户的订单列表信息
router.get('/list/:flag', async (ctx, next) => {
    const openid = ctx.state.openid;
    const flag = ctx.params.flag;
    let sql = "";
    switch(flag) {
        case "2":   // 查询当前用户已付款订单信息
            sql = "select * from `v_order_address_product` where `openid` = ? and `is_pay` = 1;";
            break;
        case "3":   // 查询当前用户未付款订单信息
            sql = "select * from `v_order_address_product` where `openid` = ? and `is_pay` = 0;";
            break;
        case "1": 
        default:    // 查询当前用户所有订单信息
            sql = "select * from `v_order_address_product` where `openid` = ?;";
            break;
    }
    const results = await http(sql, [openid]);
    return Promise.resolve(formatOrderList(results));
});

// 导出路由对象
module.exports = router.routes();







// 1. 这个中间件是干什么的？
    // 新增一个订单
    // 2. 要操作数据库中的哪张表？是什么操作？
    // dt_order 插入一条 dt_order_detail 插入最少一条 dt_cart 删除最少一条
    // 3. 要完成这次操作需要传几个数据给数据库？
    // address_id、openid、account、ids、order_time
    // 4. 为了完成上述任务，希望小程序客户端传什么过来？
    // 带token、address_id、account、ids
    // 5. 我要返回什么给小程序客户端？
    // 成功的话：数据库生成订单产生的随机的订单编号