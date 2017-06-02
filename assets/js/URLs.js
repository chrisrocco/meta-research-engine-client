(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define('/URLs', ['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.URLs = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var urls = {};
    urls['api'] = "https://researchcoder.com/api";
    urls['login'] = urls['api'] + "/users/login";
    urls['register'] = urls['api'] + "/users/register";
    urls['resetPasswordCallback'] = "https://researchcoder.com/reset-password.html";

    function getUrl(name) {
        return urls[name];
    }

    exports.getUrl = getUrl;
});
