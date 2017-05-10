module.exports = function (grunt) {
  "use strict";

  var plugins = grunt.file.readJSON('plugins.json');
  var pluginsSrc = [];

  for(var plugin in plugins) {
    if(plugins[plugin]){
      pluginsSrc.push('<%= config.source.js %>/plugins/'+plugin+'.js');
    }
  }

  return {
    options: {
      banner: '<%= banner %>',
      stripBanners: false
    },
    js: {
      expand: true,
      cwd: '<%= config.source.js %>',
      src: ['**/*.js'],
      dest: '<%= config.destination.js %>',
    },
    plugins: {
      src: pluginsSrc,
      dest: '<%= config.destination.js %>/plugins.js'
    },
    examples: {
      expand: true,
      cwd: '<%= config.source.examples %>/js',
      src: ['**/*.js'],
      dest: '<%= config.destination.examples %>/js',
    }
  };
};
