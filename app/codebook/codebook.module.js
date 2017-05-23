/**
 * Created by Chris Rocco on 5/15/2017.
 */

angular.module("codebook", [])
    .config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
    });