module.exports = function(grunt) {

    grunt.initConfig({
        clean: ["css/", "dist/"],
        jshint: {
            dev: ['Gruntfile.js']
        },
        lesslint: {
            options: {
                csslint: {
                    "font-faces": false
                }
            },
            dev: {
                src: ['less/*.less']
            },
        },
        less: {
            options: {
                isCompat: true
            },
            dev: {
                files: {
                    "css/fonts.css": "less/fonts.less",
                    "css/fonts-ie.css": "less/fonts-ie.less"
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['> 1%', '> 1% in CN', 'last 2 versions', 'ie 8', 'ie 9']
            },
            dev: {
                src: ['css/*.css']
            }
        },
        cssmin: {
            options: {
                advance: true,
                compatibility: 'ie8',
                keepSpecialComments: 0
                    //root:
            },
            dev: {
                files: [{
                    expand: true,
                    cwd: './',
                    src: ['css/*.css'],
                    dest: 'dist/',
                    ext: '.min.css'
                }]
            }
        },
        copy: {
            options: {
                timestamp: true
            },
            dev: {
                files: [{
                    expand: true,
                    src: ['css/*.css'],
                    dest: 'dist/',
                    filter: 'isFile'
                }, {
                    expand: true,
                    src: ['fonts/**'],
                    dest: 'dist/'
                }],
            },
        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-lesslint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['clean', 'jshint', 'lesslint', 'less', 'autoprefixer', 'cssmin', 'copy']);
};
