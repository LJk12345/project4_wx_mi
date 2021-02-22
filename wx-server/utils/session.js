let randomString = require('random-string');

let session = {
    list: new Map(),
    set: function(value) {
        const str_3rd_session = randomString({ length: 22 });
        this.list.set(str_3rd_session, value);
        return str_3rd_session;
    },
    get: function(key) { return this.list.get(key); },
    has: function(key) { return this.list.has(key); }
};

module.exports = session;