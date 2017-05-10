(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define('/BigData', ['exports', 'jquery', 'Site'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('jquery'), require('Site'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.jQuery, global.Site);
        global.BigData = mod.exports;
    }
})(this, function (exports, _jquery, _Site2) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.getInstance = exports.run = exports.BigData = undefined;

    var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

    var _Site3 = babelHelpers.interopRequireDefault(_Site2);

    var EMAIL_SELECTOR = ".bd-email";
    var NAME_SELECTOR = ".bd-name";

    var BigData = function (_Site) {
        babelHelpers.inherits(BigData, _Site);

        function BigData() {
            babelHelpers.classCallCheck(this, BigData);
            return babelHelpers.possibleConstructorReturn(this, (BigData.__proto__ || Object.getPrototypeOf(BigData)).apply(this, arguments));
        }

        babelHelpers.createClass(BigData, [{
            key: 'processed',
            value: function processed() {
                babelHelpers.get(BigData.prototype.__proto__ || Object.getPrototypeOf(BigData.prototype), 'processed', this).call(this);
                this.renderSession();
            }
        }, {
            key: 'renderSession',
            value: function renderSession() {
                // TODO
            }
        }]);
        return BigData;
    }(_Site3.default);

    var instance = null;
    function getInstance() {
        if (!instance) {
            instance = new BigData();
        }
        return instance;
    }
    function run() {
        var site = getInstance();
        site.run();
    }
    exports.default = BigData;
    exports.BigData = BigData;
    exports.run = run;
    exports.getInstance = getInstance;
});
