// 这个文件服务器重要的配置文件，会有很多重要的配置
exports.httpResult = {
    success: (data = null) => ({ code: 200, data, msg: '' }),
    fail: (msg = "") => ({ code: 199, data: null, msg }),
    error: (msg = "") => ({ code: 500, data: null, msg }),
    untoken: (msg = "") => ({ code: 401, data: null, msg }),
    notFound: (msg = "") => ({ code: 404, data: null, msg })
};

exports.dbConfig = {
    host: "localhost",
    user: "root",
    password: "123456",
    database: "mini_mall"
};