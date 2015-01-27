module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: grunt.file.readJSON('bower.json'),

        clean: ["css/", "dist/"],

        jshint: {
            grunt: ['Gruntfile.js']
        },

        lesslint: {
            options: {
                csslint: {
                    "font-faces": false
                }
            },
            core: {
                src: ['less/*.less']
            },
        },

        less: {
            options: {
                isCompat: true,
                strictMath: true,
                sourceMap: true,
                outputSourceFiles: true
            },
            core: {
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
            core: {
                src: ['css/**/*.css', '!css/**/*.min.css']
            }
        },

        cssmin: {
            options: {
                advance: true,
                compatibility: 'ie8',
                keepSpecialComments: 0
            },
            core: {
                files: [{
                    expand: true,
                    cwd: './',
                    src: ['css/**/*.css', '!css/**/*.min.css'],
                    dest: './',
                    ext: '.min.css'
                }]
            }
        },

        copy: {
            options: {
                timestamp: true
            },
            core: {
                files: [{
                    expand: true,
                    src: ['css/**'],
                    dest: 'dist/',
                    filter: 'isFile'
                }, {
                    expand: true,
                    src: ['fonts/**'],
                    dest: 'dist/'
                }],
            },
        },

        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: [],
                commit: true,
                commitMessage: 'Release %VERSION%',
                commitFiles: ['-a'],
                createTag: false,
                tagName: '%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: false,
                pushTo: 'upstream',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                globalReplace: false
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-lesslint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-bump');

    grunt.registerTask('default', ['clean', 'jshint', 'lesslint', 'less', 'autoprefixer', 'cssmin', 'copy']);
};
