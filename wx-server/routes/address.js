const http = require('../utils/http.js');
const Router = require('koa-router');
// 创建路由对象
const router = new Router({ prefix: "/address" });
// 自定义配置路由对象

// 查询当前登录户的地址列表
router.get('/list', async (ctx, next) => {
	const openid = ctx.state.openid;
    const sql = 'select * from `dt_address` where `openid` = ?;';
    const results = await http(sql, [ openid ]);
    return Promise.resolve(results);
});
// 新增一个地址
router.post('/add', async (ctx, next) => {
    const openid = ctx.state.openid;
    const { receive_name, receive_phone, receive_region, receive_detail } = ctx.request.body;
    let sql = "insert `dt_address`(`openid`,`receive_name`,`receive_phone`,`receive_region`,`receive_detail`) values (?,?,?,?,?);";
    const results = await http(sql, [openid, receive_name, receive_phone, receive_region, receive_detail]);
    return Promise.resolve(results.insertId);
});
// 修改一个地址
router.post('/update', async (ctx, next) => {
	const { id, receiveName, receivePhone, receiveRegion, receiveDetail } = ctx.request.body;
	const sql = 'update `dt_address` set `receive_name`=?,`receive_phone`=?,`receive_region`=?,`receive_detail`=? where `id`=?;';
	const results = await http(sql, [ receiveName, receivePhone, receiveRegion, receiveDetail, id ]);
	if(results.affectedRows === 1)
		return Promise.resolve();
	else
		return Promise.reject('地址修改失败..');
});
// 删除一个地址
router.get('/remove/:id', async (ctx, next) => {
	const id = parseInt(ctx.params.id);
	const sql = 'call p_removeAddress(?);';
	const results = await http(sql, [ id ]);
	if(results[0][0].result === '')
		return Promise.resolve();
	else 
		return Promise.reject(results[0][0].result);
});
// 设置默认地址
router.get('/set_default/:id', async (ctx, next) => {
    const openid = ctx.state.openid;
    const id = parseInt(ctx.params.id);
    let sql = "update `dt_address` set `is_default` = 0 where `openid` = ?;update `dt_address` set `is_default` = 1 where `id` = ?;";
    await http(sql, [openid, id], { multipleStatements: true });
    return Promise.resolve();
});
// 获取用户的默认地址
router.get('/get_default', async (ctx, next) => {
    const openid = ctx.state.openid;
    const sql = "select `id`, `receive_name`, `receive_phone`, `receive_region`, `receive_detail` from `dt_address` where `openid` = ? and `is_default` = 1;";
    let results = await http(sql, [openid]);
    return Promise.resolve(results[0] || null);
});

// 导出路由对象
module.exports = router.routes();


