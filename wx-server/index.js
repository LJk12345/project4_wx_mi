const Koa = require('koa');
const cors = require('koa2-cors');
const serve = require('koa-static');
const body = require('koa-body');
const routerMiddleWares = require('./routes');
const httpResult = require('./config').httpResult;
const session = require('./utils/session.js');

const path = require('path');

// new Koa创建一个服务器对象
const server = new Koa();
// 支持跨域
server.use(cors({
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
// 在控制台回显，客户端请求的url，便于开发调试
server.use(async (ctx, next) => {
    console.log(ctx.url);
    await next(); // 中间件middleWare
});
// 处理客户端的静态资源请求(html/js/css/图片/音频/视频)
server.use(serve(path.join(__dirname, "public")));
// 注意：后续的中间件将是动态数据请求
// 对客户端(动态数据请求)传来的数据进行解析处理，便于后续中间件进行使用
server.use(body({
    multipart: true,
    formidable: {
        keepExtensions: true,
        uploadDir: path.join(__dirname, "public/tmp")
    },
    onError: (error, ctx) => { console.log(error); }
}));
// 这个中间件是最终统一返回服务器响应结果的中间件
server.use(async (ctx, next) => {
    // 先让后面的中间件执行，我在后面的then和catch里托底
    return next()       
        .then(data => {
            // 成功要做的事情
            ctx.body = httpResult.success(data);
        })
        .catch(error => {
            // 失败要做的事情
            if(error === "401") 
                ctx.body = httpResult.untoken();
            else if(error === "404") 
                ctx.body = httpResult.notFound();
            else if(typeof error === "string") 
                ctx.body = httpResult.fail(error);
            else {
                console.log(error);
                ctx.body = httpResult.error(error.message);
            }
        });
});
// 登录验证
server.use(async (ctx, next) => {
    const regArr = [/^\/category/, /^\/product/, /^\/user\/login/];
    let isNext = regArr.some(reg => reg.test(ctx.url));
    if(isNext) return next();
    // 如果是登录，直接放行
    // if(ctx.url.indexOf('/user/login') !== -1) { return next(); }
    // 不是登录，进行登录验证
    else {
        // 从请求头中拿authorization 节点中的token值
        const str_3rd_session = ctx.headers["authorization"];
        // 使用自定义的session.js文件中的has方法进行验证是否在session中有这个token键
        // 如果token有效
        if(session.has(str_3rd_session)) {
            const [ openid, session_key ] = session.get(str_3rd_session);
            ctx.state.openid = openid;
            ctx.state.session_key = session_key;
            return next();
        }
        // 如果token无效
        else return Promise.reject("401");
    }
});

routerMiddleWares.forEach(router => server.use(router));

server.use(async (ctx, next) => {
    return Promise.reject('404');
});


// 让server对象linsten监听指定的端口，开启服务器
server.listen(1314, () => console.log('Server is running at port: 1314'));


// 如果koa服务器没有控制好，请求来了服务器，服务器没有任何地方调用ctx.body =?? 设置返回，
// 则默认返回 not found

// 服务器的代码肯定很复杂，有很多地方可以能要ctx.body但是，我们最好集中对ctx.body进行
// 管理，换句话说，我们应该把服务器ctx.body操作收拢在同一个server.use里面，不要分散在
// 多个server.use里面

// 我们在使用koa开发服务器自定义中间件时，如果要放行到下一个中间件，最好用await next()来放行，
// 不要使用next()放行，后续会有隐患

// await 后面如果出现了失败的Promise会出现异常