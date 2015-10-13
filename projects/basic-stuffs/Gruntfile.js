'use strict';

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            options: {
            },
            files: ['./dist/**/*']
        },
        jshint: {
            options: {
            },
            files: ['./src/js']
        },
        uglify: {
            target: {
                files: [{
                    expand: true,
                    cwd: './src/js/',
                    src: '**/*.js',
                    dest: './dist/js/'
                }],
                options: {
                    mangle: true,
                    compress: {
                        drop_console: true
                    }
                }
            }
        },
        htmlhint: {
            templates: {
                options: {
                    'attr-lower-case': true,
                    'attr-value-not-empty': false,
                    'tag-pair': true,
                    'tag-self-close': true,
                    'tagname-lowercase': true,
                    'id-class-value': true,
                    'id-class-unique': true,
                    'src-not-empty': true,
                    'img-alt-required': true
                },
                src: [
                    './src/**/*.html'
                ]
            }
        },
        htmlmin: {
            dev: {
                options: {
                    removeEmptyAttributes: false,
                    removeEmptyElements: true,
                    removeRedundantAttributes: true,
                    removeComments: true,
                    removeOptionalTags: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: './src',
                    dest: './dist',
                    src: ['**/*.html']
                }]
            }
        },
        less: {
            dev: {
                options: {
                    cleancss: true,
                    compress: true
                },
                files: [{
                    expand: true,
                    cwd: './src/less',
                    dest: './dist/css',
                    src: ['**/*.less'],
                    ext: '.css',
                    extDot: 'last'
                }]
            }
        },
        csslint: {
            strict: {
                options: {
                },
                files: [{
                }]
            },
            laxed: {
                options: {
                    csslintrc: 'csslintrc.json'
                },
                src: ['dist/css/*.css']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-htmlhint');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.registerTask('default', ['clean', 'jshint', 'uglify', 'htmlhint', 'htmlmin', 'less', 'csslint']);
};