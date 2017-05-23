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
    urls['api'] = "https://coursebooks.xyz";
    urls['login'] = urls['api'] + "/users/login";
    urls['register'] = urls['api'] + "/users/register";
    urls['resetPasswordCallback'] = "https://www.researchcoder.com/reset-password.html";

    // urls['api'] = "https://api.researchcoder.com:8081";
    // urls['login'] = urls['api'] + "/users/login";
    // urls['register'] = urls['api'] + "/users/register";
    // urls['resetPasswordCallback'] = "https://www.researchcoder.com/reset-password.html";


    function getUrl(name) {
        return urls[name];
    }

    exports.getUrl = getUrl;
});
