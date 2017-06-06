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
    urls['api'] = "https://dev.researchcoder.com/api";
    urls['login'] = urls['api'] + "/users/login";
    urls['register'] = urls['api'] + "/users/register";
    urls['resetPasswordCallback'] = "https://dev.researchcoder.com/reset-password.html";

    if (localStorage.hostOverride) {
        urls['api'] = localStorage.hostOverride;
        urls['login'] = urls['api'] + "/users/login";
        urls['register'] = urls['api'] + "/users/register";
        urls['resetPasswordCallback'] = "https://www.youtube.com/watch?v=xfr64zoBTAQ";
    }

    function getUrl(name) {
        return urls[name];
    }

    /* Development */
    function localhost() {
        localStorage.hostOverride = "http://localhost:8080";
        window.location.reload();
    }
    function defaulthost() {
        delete localStorage.hostOverride;
        window.location.reload();
    }

    exports.getUrl = getUrl;
    exports.localhost = localhost;
    exports.defaulthost = defaulthost;
});
