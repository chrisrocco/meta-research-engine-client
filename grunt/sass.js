module.exports = function () {
    "use strict";

    return {
        options: {
            precision: 6,
            sourcemap: 'auto',
            outputStyle: 'expanded',
            trace: true,
            bundleExec: true,
            includePaths: [
                '<%= config.source.sass %>',
                '<%= config.bootstrap.sass %>',
                '<%= config.bootstrap.mixins %>'
            ]
        },
        compileBootstrap: {
            src: '<%= config.source.sass %>/bootstrap.scss',
            dest: '<%= config.destination.css %>/bootstrap.css'
        },
        compileExtend: {
            src: '<%= config.source.sass %>/bootstrap-extend.scss',
            dest: '<%= config.destination.css %>/bootstrap-extend.css'
        },
        compileSite: {
            src: '<%= config.source.sass %>/site.scss',
            dest: '<%= config.destination.css %>/site.css'
        },
        skins: {
            options: {
                strictMath: true,
                includePaths: [
                    '<%= config.source.skins %>/scss',
                    '<%= config.source.skins %>',
                    '<%= config.source.sass %>',
                    '<%= config.bootstrap.sass %>',
                    '<%= config.bootstrap.mixins %>'
                ]
            },
            files: [
                {
                    expand: true,
                    cwd: '<%= config.source.skins %>',
                    src: ['*.scss'],
                    dest: '<%= config.destination.skins %>',
                    ext: '.css',
                    extDot: 'last'
                }
            ]
        },
        examples: {
            files: [
                {
                    expand: true,
                    cwd: '<%= config.source.examples %>/scss',
                    src: ['**/*.scss'],
                    dest: '<%= config.destination.examples %>/css',
                    ext: '.css',
                    extDot: 'last'
                }
            ]
        },
    };
};
